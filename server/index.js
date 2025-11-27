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

