import { Pool } from 'pg';

// Single shared Postgres connection pool for the whole app.
// DATABASE_URL comes from .env (see .env.example).
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function query<T = any>(text: string, params?: any[]): Promise<T[]> {
  const result = await pool.query(text, params);
  return result.rows;
}

export default pool;
