const path = require('path');
const bcrypt = require('bcrypt');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const { query, pool } = require('../db');

const createAdminUser = async () => {
    try {
        console.log('🔐 Creating admin user...');

        // Hash the password
        const password = 'admin@1234';
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        // Insert admin user
        const result = await query(
            `INSERT INTO admins (username, password_hash)
       VALUES ($1, $2)
       ON CONFLICT (username) DO UPDATE 
       SET password_hash = EXCLUDED.password_hash
       RETURNING id, username, created_at`,
            ['admin', passwordHash]
        );

        console.log('✅ Admin user created successfully!');
        console.log('Username:', result.rows[0].username);
        console.log('Password: admin@1234');
        console.log('Created at:', result.rows[0].created_at);

    } catch (error) {
        console.error('❌ Failed to create admin user:', error);
    } finally {
        await pool.end();
    }
};

createAdminUser();
