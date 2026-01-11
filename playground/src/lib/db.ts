import { createClient } from 'libsql';
import { drizzle } from 'drizzle-orm/libsql';

// In-memory DB for playground demo
// Note: This will reset on server restart
const client = createClient({ url: 'file:local.db' });
export const db = drizzle(client);

// Helper to initialize schema (simplified for demo)
export async function initSchema() {
  // Check if threads table exists
  try {
    await client.execute('SELECT 1 FROM threads LIMIT 1');
  } catch (e) {
    console.log('Initializing schema...', e);
    // Create tables manually for demo purposes
    await client.execute(`
      CREATE TABLE IF NOT EXISTS threads (
        id TEXT PRIMARY KEY,
        project_id TEXT NOT NULL,
        scope_type TEXT,
        scope_id TEXT,
        title TEXT,
        metadata TEXT,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL
      )
    `);
    await client.execute(`
      CREATE TABLE IF NOT EXISTS items (
        id TEXT PRIMARY KEY,
        thread_id TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'user',
        parts TEXT NOT NULL,
        run_id TEXT,
        span_id TEXT,
        parent_id TEXT,
        visibility TEXT NOT NULL DEFAULT 'visible',
        attempt INTEGER NOT NULL DEFAULT 1,
        request_id TEXT NOT NULL,
        metadata TEXT,
        created_at INTEGER NOT NULL
      )
    `);
    // Edges and Streams omitted for basic demo
  }
}
