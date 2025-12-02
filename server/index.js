const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();
const { query, testConnection } = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;
const isDatabaseEnabled = Boolean(process.env.DATABASE_URL);

// CORS Configuration
const allowedOrigins = [
  'https://staging8.prototechsolutions.com',
  'https://prototechsolutions.com',
  'https://pts-3.onrender.com', // Render frontend
  'https://pts-3-tau.vercel.app',
  'https://pts-3-tau-*.vercel.app', // Vercel preview deployments
  'http://localhost:3000',
  'http://localhost:5173',
  ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : [])
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman, or curl)
    if (!origin) return callback(null, true);

    // Check if origin is in allowed list
    const isAllowed = allowedOrigins.some(allowed => {
      if (allowed.includes('*')) {
        const pattern = allowed.replace(/\*/g, '.*');
        return new RegExp(`^${pattern}$`).test(origin);
      }
      return allowed === origin;
    });

    if (isAllowed || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      console.warn(`⚠️  Blocked request from origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Handle preflight requests explicitly (Critical for Vercel -> Render)
app.options('*', cors());

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/admin', require('./routes/admin'));

// Database Initialization
const initializeDatabase = async () => {
  if (!isDatabaseEnabled) return;
  try {
    // Create customers table
    await query(`
      CREATE TABLE IF NOT EXISTS customers (
        id SERIAL PRIMARY KEY,
        user_id TEXT,
        session_id TEXT,
        email TEXT NOT NULL UNIQUE,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        phone TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    // Create orders table
    await query(`
      CREATE TABLE IF NOT EXISTS orders (
        id TEXT PRIMARY KEY,
        customer_id INTEGER REFERENCES customers(id),
        user_id TEXT,
        session_id TEXT,
        total DECIMAL(10, 2) NOT NULL,
        tax DECIMAL(10, 2) NOT NULL,
        grand_total DECIMAL(10, 2) NOT NULL,
        status TEXT NOT NULL DEFAULT 'pending',
        payment_method TEXT NOT NULL,
        shipping_address JSONB NOT NULL,
        payment_details JSONB,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    // Create order_items table
    await query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id SERIAL PRIMARY KEY,
        order_id TEXT REFERENCES orders(id) ON DELETE CASCADE,
        product_id TEXT NOT NULL,
        product_name TEXT NOT NULL,
        product_type TEXT,
        quantity INTEGER NOT NULL DEFAULT 1,
        price DECIMAL(10, 2) NOT NULL,
        license_type TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    // Create email_logs table
    await query(`
      CREATE TABLE IF NOT EXISTS email_logs (
        id SERIAL PRIMARY KEY,
        recipient_email TEXT NOT NULL,
        subject TEXT NOT NULL,
        product_name TEXT,
        download_url TEXT,
        status TEXT NOT NULL DEFAULT 'sent',
        error_message TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    console.log('✅ Database schema initialized');
  } catch (error) {
    console.error('Failed to initialize database schema:', error.message);
  }
};

// Initialize DB on startup
if (isDatabaseEnabled) {
  testConnection().then((connected) => {
    if (connected) initializeDatabase();
  });
}

// SMTP Configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.hostinger.com',
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: process.env.SMTP_SECURE !== 'false', // true for 465, false for 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Email service is running',
    database: isDatabaseEnabled ? 'enabled' : 'disabled'
  });
});

// Send trial download email endpoint
app.post('/api/send-trial-email', async (req, res) => {
  try {
    const { to, toName, subject, html, productName, downloadUrl } = req.body;

    if (!to || !subject || !html) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    const transporter = createTransporter();

    const mailOptions = {
      from: `"ProtoTech Solutions" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: to,
      subject: subject,
      html: html,
      text: `Thank you for choosing ProtoTech's ${productName || 'Product'}. Download here: ${downloadUrl}`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info.messageId);

    if (isDatabaseEnabled) {
      await query(
        `INSERT INTO email_logs (recipient_email, subject, product_name, download_url, status)
         VALUES ($1, $2, $3, $4, $5)`,
        [to, subject, productName || null, downloadUrl || null, 'sent']
      );
    }

    res.json({
      success: true,
      message: 'Email sent successfully',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('❌ Error sending email:', error.message);

    if (isDatabaseEnabled) {
      const { to, subject, productName, downloadUrl } = req.body;
      await query(
        `INSERT INTO email_logs (recipient_email, subject, product_name, download_url, status, error_message)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [to || null, subject || null, productName || null, downloadUrl || null, 'failed', error.message]
      ).catch(console.error);
    }

    res.status(500).json({
      success: false,
      error: 'Failed to send email',
      message: error.message
    });
  }
});

// Test email endpoint
app.post('/api/test-email', async (req, res) => {
  try {
    const { to } = req.body;
    if (!to) return res.status(400).json({ error: 'Email required' });

    const transporter = createTransporter();
    await transporter.verify(); // Simple verification check

    const info = await transporter.sendMail({
      from: `"ProtoTech Solutions" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: to,
      subject: 'Test Email',
      text: 'SMTP configuration is working!'
    });

    res.json({ success: true, message: 'Test email sent' });
  } catch (error) {
    console.error('Test email failed:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create Order Endpoint
app.post('/api/orders', async (req, res) => {
  if (!isDatabaseEnabled) return res.status(503).json({ error: 'Database disabled' });

  try {
    const { order, customer } = req.body;
    if (!order || !customer) return res.status(400).json({ error: 'Missing data' });

    const client = await require('./db').pool.connect();
    try {
      await client.query('BEGIN');

      // Insert/Update Customer
      let customerId;
      const customerResult = await client.query(
        `INSERT INTO customers (user_id, session_id, email, first_name, last_name, phone)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT (email) 
         DO UPDATE SET 
           user_id = COALESCE(EXCLUDED.user_id, customers.user_id),
           session_id = COALESCE(EXCLUDED.session_id, customers.session_id),
           phone = COALESCE(EXCLUDED.phone, customers.phone)
         RETURNING id`,
        [customer.userId, customer.sessionId, customer.email, customer.firstName, customer.lastName, customer.phone]
      );

      if (customerResult.rows.length > 0) {
        customerId = customerResult.rows[0].id;
      } else {
        const existing = await client.query('SELECT id FROM customers WHERE email = $1', [customer.email]);
        customerId = existing.rows[0].id;
      }

      const parseNumeric = (val) => typeof val === 'string' ? parseFloat(val.replace(/[$,\s]/g, '')) || 0 : val || 0;

      // Insert Order
      await client.query(
        `INSERT INTO orders (id, customer_id, user_id, session_id, total, tax, grand_total, status, payment_method, shipping_address, payment_details)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
        [
          order.id, customerId, order.userId, order.sessionId,
          parseNumeric(order.total), parseNumeric(order.tax), parseNumeric(order.grandTotal),
          order.status || 'pending', order.paymentMethod,
          JSON.stringify(order.shipping), JSON.stringify(order.payment)
        ]
      );

      // Insert Items
      for (const item of order.items) {
        await client.query(
          `INSERT INTO order_items (order_id, product_id, product_name, product_type, quantity, price, license_type)
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [
            order.id, item.id || item.productId, item.name || item.productName,
            item.type || item.productType, parseInt(item.quantity) || 1,
            parseNumeric(item.price), item.licenseType
          ]
        );
      }

      await client.query('COMMIT');
      res.json({ success: true, message: 'Order created', orderId: order.id });

    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Order creation failed:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get Order Endpoint
app.get('/api/orders/:orderId', async (req, res) => {
  if (!isDatabaseEnabled) return res.status(503).json({ error: 'Database disabled' });
  try {
    const { orderId } = req.params;
    const orderRes = await query(
      `SELECT o.*, c.email, c.first_name, c.last_name, c.phone 
       FROM orders o LEFT JOIN customers c ON o.customer_id = c.id 
       WHERE o.id = $1`, [orderId]
    );

    if (orderRes.rows.length === 0) return res.status(404).json({ error: 'Not found' });

    const itemsRes = await query('SELECT * FROM order_items WHERE order_id = $1', [orderId]);
    res.json({ success: true, order: { ...orderRes.rows[0], items: itemsRes.rows } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get User Orders Endpoint
app.get('/api/orders/user/:userId', async (req, res) => {
  if (!isDatabaseEnabled) return res.status(503).json({ error: 'Database disabled' });
  try {
    const { userId } = req.params;
    const ordersRes = await query(
      `SELECT * FROM orders WHERE user_id = $1 OR session_id = $1 ORDER BY created_at DESC LIMIT 50`,
      [userId]
    );

    const orders = await Promise.all(ordersRes.rows.map(async (order) => {
      const items = await query('SELECT * FROM order_items WHERE order_id = $1', [order.id]);
      return { ...order, items: items.rows };
    }));

    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📧 SMTP Host: ${process.env.SMTP_HOST || 'smtp.hostinger.com'}`);
});
