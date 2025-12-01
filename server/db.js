const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.warn('⚠️  DATABASE_URL is not set. PostgreSQL features will be disabled until it is configured.');
}

const pool = connectionString
  ? new Pool({
      connectionString,
      ssl: process.env.PGSSLMODE === 'disable' ? false : { rejectUnauthorized: false },
      // Connection pool settings for Neon DB
      max: 10, // Maximum number of clients in the pool
      idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
      connectionTimeoutMillis: 10000, // Return an error after 10 seconds if connection cannot be established
      // Handle connection errors
      allowExitOnIdle: true,
    })
  : null;

// Handle pool errors
if (pool) {
  pool.on('error', (err) => {
    console.error('Unexpected error on idle database client:', err);
  });

  pool.on('connect', () => {
    console.log('📊 New database client connected');
  });
}

const query = async (text, params) => {
  if (!pool) {
    throw new Error('PostgreSQL is not configured. Set DATABASE_URL in your environment.');
  }
  return pool.query(text, params);
};

const testConnection = async () => {
  if (!pool) {
    console.warn('⚠️  Database pool is not initialized. DATABASE_URL is missing.');
    return false;
  }
  try {
    const result = await pool.query('SELECT NOW() as current_time, version() as version');
    console.log('✅ Connected to PostgreSQL');
    console.log(`   Database time: ${result.rows[0].current_time}`);
    return true;
  } catch (error) {
    console.error('❌ PostgreSQL connection failed:', error.message);
    if (error.code) {
      console.error(`   Error code: ${error.code}`);
    }
    return false;
  }
};

module.exports = {
  pool,
  query,
  testConnection,
};

