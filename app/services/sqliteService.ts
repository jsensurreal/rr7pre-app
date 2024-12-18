import sqlite3 from 'sqlite3'
import { open, Database } from 'sqlite'

let db: Database | null = null

export type Framework = {
  value: string
  label: string
}

export type User = {
  id: number
  name: string
  email: string
}

(async () => {
  if (!db) {
    db = await open({
      filename: process.env.SQLITE_DB_FILENAME || './dev.db',
      driver: sqlite3.Database,
    })

    await db.run('PRAGMA journal_mode = WAL')
    await db.run('PRAGMA synchronous = 1')
    await db.run('PRAGMA cache_size = 10000')
    await db.run('PRAGMA synchronous = NORMAL')

    if (process.env.NODE_ENV === 'development') {
      /*sqlite3.verbose()
      db.on('trace', (sql: string) => {
        console.log('Executing SQL:', sql)
      });*/
    }

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
      throw error
    }
  }

  return db
})()

export async function closeDatabase() {
  console.log('Closing database connection...')
  if (db) {
    await db.close()
    db = null
    console.log('Database connection closed.')
  }
}

// Register process event listeners for cleanup
// TODO: Doesn't seem to get triggered when killing process
process.on('SIGINT', closeDatabase)
process.on('SIGTERM', closeDatabase)

export async function fetchFrameworks(searchTerm: string): Promise<Framework[]> {
  return db ? db.all<Framework[]>(
    'SELECT value, label FROM frameworks WHERE LOWER(label) LIKE LOWER(?) ORDER by label',
    `%${searchTerm}%`
  ) : []
}

export async function getUsers(searchTerm: string): Promise<User[]> {
  return db ? db.all<User[]>(
    'SELECT id, name, email FROM users WHERE LOWER(name) LIKE LOWER(?) ORDER by name',
    `%${searchTerm}%`
  ) : []
}