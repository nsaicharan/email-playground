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
 * Creates the shared_templates table.
 * Invoked lazily only on the first insertion if the table is missing.
 */
async function createSharedTemplatesTable() {
  if (!sql) throw new Error('Database is not configured (missing DATABASE_URL)');
  await sql`
    CREATE TABLE IF NOT EXISTS shared_templates (
      id TEXT PRIMARY KEY,
      html TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
}

/**
 * Save a template to the database.
 * Auto-creates the table if it doesn't exist.
 *
 * @param {string} id - The nanoid for the template
 * @param {string} html - The HTML content
 */
export async function saveTemplate(id, html) {
  if (!sql) throw new Error('Database is not configured (missing DATABASE_URL)');
  
  try {
    await sql`INSERT INTO shared_templates (id, html) VALUES (${id}, ${html})`;
  } catch (error) {
    // If the table doesn't exist, create it and retry the insert
    if (error.code === '42P01') {
      await createSharedTemplatesTable();
      await sql`INSERT INTO shared_templates (id, html) VALUES (${id}, ${html})`;
    } else {
      throw error;
    }
  }
}

/**
 * Retrieve a template by ID.
 *
 * @param {string} id - The template ID
 * @returns {object|null} The template row or null if not found
 */
export async function getTemplate(id) {
  if (!sql) throw new Error('Database is not configured (missing DATABASE_URL)');

  try {
    const rows = await sql`SELECT id, html, created_at FROM shared_templates WHERE id = ${id} LIMIT 1`;
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    // If the table doesn't exist (Postgres error 42P01), then no shared_templates exist yet
    if (error.code === '42P01') {
      return null;
    }
    throw error;
  }
}
