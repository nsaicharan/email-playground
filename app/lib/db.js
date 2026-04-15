import postgres from 'postgres';

let sql = null;

if (process.env.DATABASE_URL) {
  try {
    sql = postgres(process.env.DATABASE_URL, {
      // Limit connections for serverless environments
      max: 1,
      idle_timeout: 20,
      connect_timeout: 10,
    });
  } catch (error) {
    console.error('Failed to initialize database connection. Check if DATABASE_URL is valid:', error.message);
  }
}

/**
 * Creates the snippets table.
 * Invoked lazily only on the first insertion if the table is missing.
 */
async function createSnippetsTable() {
  if (!sql) throw new Error('Database is not configured (missing DATABASE_URL)');
  await sql`
    CREATE TABLE IF NOT EXISTS snippets (
      id TEXT PRIMARY KEY,
      html TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
}

/**
 * Save a snippet to the database.
 * Auto-creates the table if it doesn't exist.
 *
 * @param {string} id - The nanoid for the snippet
 * @param {string} html - The HTML content
 */
export async function saveSnippet(id, html) {
  if (!sql) throw new Error('Database is not configured (missing DATABASE_URL)');
  
  try {
    await sql`INSERT INTO snippets (id, html) VALUES (${id}, ${html})`;
  } catch (error) {
    // If the table doesn't exist, create it and retry the insert
    if (error.code === '42P01') {
      await createSnippetsTable();
      await sql`INSERT INTO snippets (id, html) VALUES (${id}, ${html})`;
    } else {
      throw error;
    }
  }
}

/**
 * Retrieve a snippet by ID.
 *
 * @param {string} id - The snippet ID
 * @returns {object|null} The snippet row or null if not found
 */
export async function getSnippet(id) {
  if (!sql) throw new Error('Database is not configured (missing DATABASE_URL)');

  try {
    const rows = await sql`SELECT id, html, created_at FROM snippets WHERE id = ${id} LIMIT 1`;
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    // If the table doesn't exist (Postgres error 42P01), then no snippets exist yet
    if (error.code === '42P01') {
      return null;
    }
    throw error;
  }
}
