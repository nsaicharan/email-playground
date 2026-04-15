import postgres from 'postgres';

if (!process.env.DATABASE_URL) {
  throw new Error(
    'DATABASE_URL environment variable is not set. Please configure it in your .env file.',
  );
}

const sql = postgres(process.env.DATABASE_URL, {
  // Limit connections for serverless environments
  max: 1,
  idle_timeout: 20,
  connect_timeout: 10,
});

/**
 * Ensures the snippets table exists.
 * Uses CREATE TABLE IF NOT EXISTS so it's safe to call on every request.
 */
async function ensureTable() {
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
  await ensureTable();
  await sql`INSERT INTO snippets (id, html) VALUES (${id}, ${html})`;
}

/**
 * Retrieve a snippet by ID.
 *
 * @param {string} id - The snippet ID
 * @returns {object|null} The snippet row or null if not found
 */
export async function getSnippet(id) {
  await ensureTable();
  const rows = await sql`SELECT id, html, created_at FROM snippets WHERE id = ${id} LIMIT 1`;
  return rows.length > 0 ? rows[0] : null;
}