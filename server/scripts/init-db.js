const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const { query, pool } = require('../db');

const initDb = async () => {
    try {
        console.log('🔄 Initializing database schema...');

        const schemaPath = path.join(__dirname, '../schema.sql');
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');

        await query(schemaSql);

        console.log('✅ Database schema applied successfully.');
    } catch (error) {
        console.error('❌ Failed to initialize database:', error);
    } finally {
        await pool.end();
    }
};

initDb();
