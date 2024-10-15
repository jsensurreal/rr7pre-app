import sqlite3 from 'sqlite3'
import { open, Database } from 'sqlite' // A wrapper around sqlite3 for promises

let db: Database | null = null

export type Framework = {
  value: string
  label: string
}

// Initialize and configure the database (async because sqlite3 is async)
export async function initializeDatabase() {
  if (!db) {
    db = await open({
      filename: './dev.db',
      driver: sqlite3.Database,
    })

    // Set journal_mode to WAL
    await db.run('PRAGMA journal_mode = WAL')
    await db.run('PRAGMA synchronous = 1')

    try {
      await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE
        );
      `)
    } catch (error) {
      console.error('Error executing SQL:', error)
      throw error // Re-throw the error after logging it
    }
  }

  return db
}

// Close the database connection
export async function closeDatabase() {
  console.log('Closing database connection...')
  if (db) {
    await db.close()
    db = null
    console.log('Database connection closed.')
  }
}

// Register process event listeners for cleanup
process.on('SIGINT', closeDatabase)
process.on('SIGTERM', closeDatabase)

// Fetch frameworks asynchronously
export async function fetchFrameworks(
  searchTerm: string
): Promise<Framework[]> {
  const db = await initializeDatabase()

  // Run the SQL query using async/await
  const rows = await db.all(
    'SELECT value, label FROM frameworks WHERE LOWER(label) LIKE LOWER(?) ORDER by label',
    `%${searchTerm}%`
  )

  const frameworks: Framework[] = rows.map((row) => ({
    value: row.value,
    label: row.label,
  }))

  return frameworks
}
