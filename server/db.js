const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.warn('⚠️  DATABASE_URL is not set. PostgreSQL features will be disabled until it is configured.');
}

const pool = connectionString
  ? new Pool({
      connectionString,
      ssl: process.env.PGSSLMODE === 'disable' ? false : { rejectUnauthorized: false },
    })
  : null;

const query = async (text, params) => {
  if (!pool) {
    throw new Error('PostgreSQL is not configured. Set DATABASE_URL in your environment.');
  }
  return pool.query(text, params);
};

const testConnection = async () => {
  if (!pool) return false;
  try {
    await pool.query('SELECT 1');
    console.log('✅ Connected to PostgreSQL');
    return true;
  } catch (error) {
    console.error('❌ PostgreSQL connection failed:', error.message);
    return false;
  }
};

module.exports = {
  pool,
  query,
  testConnection,
};

