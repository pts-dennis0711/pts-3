const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();
const { query, testConnection } = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;
const isDatabaseEnabled = Boolean(process.env.DATABASE_URL);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const initializeDatabase = async () => {
  if (!isDatabaseEnabled) return;
  try {
    // Create customers table
    await query(`
      CREATE TABLE IF NOT EXISTS customers (
        id SERIAL PRIMARY KEY,
        user_id TEXT,
        session_id TEXT,
        email TEXT NOT NULL,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        phone TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);
    console.log('🗄️  customers table is ready');

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
    console.log('🗄️  orders table is ready');

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
    console.log('🗄️  order_items table is ready');

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
    console.log('🗄️  email_logs table is ready');
  } catch (error) {
    console.error('Failed to initialize database schema:', error.message);
  }
};

if (isDatabaseEnabled) {
  testConnection().then((connected) => {
    if (connected) {
      initializeDatabase();
    }
  });
}

// SMTP Configuration using Hostinger
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.hostinger.com',
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: process.env.SMTP_SECURE === 'true' || true, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER, // Your Hostinger email address
      pass: process.env.SMTP_PASS, // Your Hostinger email password
    },
    tls: {
      // Do not fail on invalid certs
      rejectUnauthorized: false
    }
  });
};

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Email service is running' });
});

// Sitemap endpoint
app.get('/sitemap.xml', (req, res) => {
  try {
    const siteUrl = process.env.SITE_URL || 'https://staging8.prototechsolutions.com';
    const currentDate = new Date().toISOString().split('T')[0];

    // TODO: Load actual data from database or API
    // For now, this is a basic structure - you'll need to populate with actual data
    const urls = [
      // Static pages
      { loc: `${siteUrl}/`, lastmod: currentDate, changefreq: 'daily', priority: '1.0' },
      { loc: `${siteUrl}/products`, lastmod: currentDate, changefreq: 'weekly', priority: '0.9' },
      { loc: `${siteUrl}/services`, lastmod: currentDate, changefreq: 'weekly', priority: '0.9' },
      { loc: `${siteUrl}/solutions`, lastmod: currentDate, changefreq: 'weekly', priority: '0.9' },
      { loc: `${siteUrl}/blog`, lastmod: currentDate, changefreq: 'daily', priority: '0.8' },
      { loc: `${siteUrl}/about`, lastmod: currentDate, changefreq: 'monthly', priority: '0.7' },
      { loc: `${siteUrl}/company`, lastmod: currentDate, changefreq: 'monthly', priority: '0.7' },
      { loc: `${siteUrl}/careers`, lastmod: currentDate, changefreq: 'monthly', priority: '0.6' },
      { loc: `${siteUrl}/partners`, lastmod: currentDate, changefreq: 'monthly', priority: '0.6' },
      { loc: `${siteUrl}/support`, lastmod: currentDate, changefreq: 'monthly', priority: '0.7' },
      { loc: `${siteUrl}/resources`, lastmod: currentDate, changefreq: 'weekly', priority: '0.7' },
    ];

    // TODO: Add dynamic URLs from your data sources:
    // - Product categories and products
    // - Services
    // - Solutions
    // - Blogs

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    res.setHeader('Content-Type', 'application/xml');
    res.send(xml);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).send('Error generating sitemap');
  }
});

// Robots.txt endpoint
app.get('/robots.txt', (req, res) => {
  const siteUrl = process.env.SITE_URL || 'https://staging8.prototechsolutions.com';
  const robotsTxt = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# Sitemap
Sitemap: ${siteUrl}/sitemap.xml`;

  res.setHeader('Content-Type', 'text/plain');
  res.send(robotsTxt);
});

// Send trial download email endpoint
app.post('/api/send-trial-email', async (req, res) => {
  try {
    const { to, toName, subject, html, productName, downloadUrl } = req.body;

    // Validate required fields
    if (!to || !subject || !html) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: to, subject, and html are required'
      });
    }

    // Create transporter
    const transporter = createTransporter();

    // Email options
    const mailOptions = {
      from: `"ProtoTech Solutions" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: to,
      subject: subject,
      html: html,
      // Optional: Add text version for email clients that don't support HTML
      text: `Thank you for choosing ProtoTech's ${productName || 'Product'}.\n\nClick here to download: ${downloadUrl || 'Download link'}\n\nActivation Key is Not Required. Trial is Automatically Activated.`
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent successfully:', info.messageId);

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
    console.error('Error sending email:', error);

    if (isDatabaseEnabled) {
      const { to, subject, productName, downloadUrl } = req.body;
      await query(
        `INSERT INTO email_logs (recipient_email, subject, product_name, download_url, status, error_message)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [to || null, subject || null, productName || null, downloadUrl || null, 'failed', error.message]
      ).catch((dbError) => console.error('Failed to log email error:', dbError.message));
    }
    res.status(500).json({
      success: false,
      error: 'Failed to send email',
      message: error.message
    });
  }
});

// Test email endpoint (for testing SMTP configuration)
app.post('/api/test-email', async (req, res) => {
  try {
    const { to } = req.body;

    if (!to) {
      return res.status(400).json({
        success: false,
        error: 'Email address (to) is required'
      });
    }

    const transporter = createTransporter();

    const mailOptions = {
      from: `"ProtoTech Solutions" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: to,
      subject: 'Test Email - ProtoTech Solutions',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Test Email</h2>
          <p>This is a test email from ProtoTech Solutions.</p>
          <p>If you received this email, your SMTP configuration is working correctly!</p>
          <p>Sent at: ${new Date().toLocaleString()}</p>
        </div>
      `,
      text: 'This is a test email from ProtoTech Solutions. If you received this email, your SMTP configuration is working correctly!'
    };

    const info = await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: 'Test email sent successfully',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('Error sending test email:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send test email',
      message: error.message
    });
  }
});

// ==================== ORDER ENDPOINTS ====================

// Create a new order
app.post('/api/orders', async (req, res) => {
  if (!isDatabaseEnabled) {
    return res.status(503).json({
      success: false,
      error: 'Database is not configured. Orders cannot be stored.'
    });
  }

  try {
    const { order, customer } = req.body;

    if (!order || !customer) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: order and customer data are required'
      });
    }

    // Start a transaction
    const client = await require('./db').pool.connect();
    try {
      await client.query('BEGIN');

      // Insert or update customer
      const customerResult = await client.query(
        `INSERT INTO customers (user_id, session_id, email, first_name, last_name, phone)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT DO NOTHING
         RETURNING id`,
        [
          customer.userId || null,
          customer.sessionId || null,
          customer.email,
          customer.firstName,
          customer.lastName,
          customer.phone || null
        ]
      );

      let customerId;
      if (customerResult.rows.length > 0) {
        customerId = customerResult.rows[0].id;
      } else {
        // Customer already exists, get their ID
        const existingCustomer = await client.query(
          `SELECT id FROM customers WHERE email = $1 ORDER BY created_at DESC LIMIT 1`,
          [customer.email]
        );
        customerId = existingCustomer.rows[0].id;
      }

      // Helper function to parse numeric values (removes $ and converts to number)
      const parseNumeric = (value) => {
        if (typeof value === 'number') return value;
        if (typeof value === 'string') {
          // Remove currency symbols, commas, and whitespace
          const cleaned = value.replace(/[$,\s]/g, '');
          return parseFloat(cleaned) || 0;
        }
        return 0;
      };

      // Insert order
      await client.query(
        `INSERT INTO orders (id, customer_id, user_id, session_id, total, tax, grand_total, status, payment_method, shipping_address, payment_details)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
        [
          order.id,
          customerId,
          order.userId || null,
          order.sessionId || null,
          parseNumeric(order.total),
          parseNumeric(order.tax || 0),
          parseNumeric(order.grandTotal),
          order.status || 'pending',
          order.paymentMethod,
          JSON.stringify(order.shipping),
          JSON.stringify(order.payment)
        ]
      );

      // Insert order items
      for (const item of order.items) {
        await client.query(
          `INSERT INTO order_items (order_id, product_id, product_name, product_type, quantity, price, license_type)
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [
            order.id,
            item.id || item.productId,
            item.name || item.productName,
            item.type || item.productType || null,
            parseInt(item.quantity) || 1,
            parseNumeric(item.price),
            item.licenseType || null
          ]
        );
      }

      await client.query('COMMIT');

      res.json({
        success: true,
        message: 'Order created successfully',
        orderId: order.id
      });

    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }

  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create order',
      message: error.message
    });
  }
});

// Get a specific order by ID
app.get('/api/orders/:orderId', async (req, res) => {
  if (!isDatabaseEnabled) {
    return res.status(503).json({
      success: false,
      error: 'Database is not configured.'
    });
  }

  try {
    const { orderId } = req.params;

    // Get order details
    const orderResult = await query(
      `SELECT o.*, c.email, c.first_name, c.last_name, c.phone
       FROM orders o
       LEFT JOIN customers c ON o.customer_id = c.id
       WHERE o.id = $1`,
      [orderId]
    );

    if (orderResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    // Get order items
    const itemsResult = await query(
      `SELECT * FROM order_items WHERE order_id = $1`,
      [orderId]
    );

    const order = {
      ...orderResult.rows[0],
      items: itemsResult.rows
    };

    res.json({
      success: true,
      order
    });

  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch order'
    });
  }
});

// Get all orders for a specific user
app.get('/api/orders/user/:userId', async (req, res) => {
  if (!isDatabaseEnabled) {
    return res.status(503).json({
      success: false,
      error: 'Database is not configured.'
    });
  }

  try {
    const { userId } = req.params;
    const limit = parseInt(req.query.limit || '50', 10);

    const ordersResult = await query(
      `SELECT o.*, c.email, c.first_name, c.last_name
       FROM orders o
       LEFT JOIN customers c ON o.customer_id = c.id
       WHERE o.user_id = $1 OR o.session_id = $1
       ORDER BY o.created_at DESC
       LIMIT $2`,
      [userId, Math.min(limit, 200)]
    );

    // Get items for each order
    const orders = await Promise.all(
      ordersResult.rows.map(async (order) => {
        const itemsResult = await query(
          `SELECT * FROM order_items WHERE order_id = $1`,
          [order.id]
        );
        return {
          ...order,
          items: itemsResult.rows
        };
      })
    );

    res.json({
      success: true,
      orders
    });

  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch orders'
    });
  }
});

// Get all orders (admin endpoint)
app.get('/api/orders', async (req, res) => {
  if (!isDatabaseEnabled) {
    return res.status(503).json({
      success: false,
      error: 'Database is not configured.'
    });
  }

  try {
    const limit = parseInt(req.query.limit || '100', 10);
    const status = req.query.status;

    let queryText = `
      SELECT o.*, c.email, c.first_name, c.last_name
      FROM orders o
      LEFT JOIN customers c ON o.customer_id = c.id
    `;
    const queryParams = [];

    if (status) {
      queryText += ` WHERE o.status = $1`;
      queryParams.push(status);
      queryText += ` ORDER BY o.created_at DESC LIMIT $2`;
      queryParams.push(Math.min(limit, 500));
    } else {
      queryText += ` ORDER BY o.created_at DESC LIMIT $1`;
      queryParams.push(Math.min(limit, 500));
    }

    const ordersResult = await query(queryText, queryParams);

    // Get items for each order
    const orders = await Promise.all(
      ordersResult.rows.map(async (order) => {
        const itemsResult = await query(
          `SELECT * FROM order_items WHERE order_id = $1`,
          [order.id]
        );
        return {
          ...order,
          items: itemsResult.rows
        };
      })
    );

    res.json({
      success: true,
      orders,
      count: orders.length
    });

  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch orders'
    });
  }
});

// ==================== EMAIL ENDPOINTS ====================

app.get('/api/email-logs', async (req, res) => {
  if (!isDatabaseEnabled) {
    return res.status(503).json({
      success: false,
      error: 'PostgreSQL is not configured. Set DATABASE_URL to enable this endpoint.'
    });
  }

  try {
    const limit = parseInt(req.query.limit || '50', 10);
    const { rows } = await query(
      `SELECT id, recipient_email, subject, product_name, download_url, status, error_message, created_at
       FROM email_logs
       ORDER BY created_at DESC
       LIMIT $1`,
      [Math.min(limit, 200)]
    );
    res.json({ success: true, logs: rows });
  } catch (error) {
    console.error('Failed to fetch email logs:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch email logs' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Email server running on port ${PORT}`);
  console.log(`📧 SMTP Host: ${process.env.SMTP_HOST || 'smtp.hostinger.com'}`);
  console.log(`👤 SMTP User: ${process.env.SMTP_USER || 'Not configured'}`);
});
