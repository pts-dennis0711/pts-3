const express = require('express');
const router = express.Router();
const { query } = require('../db');
const bcrypt = require('bcrypt');

// Middleware to check admin authentication (Simple version for now)
// In production, use JWT or Session
const requireAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_SECRET_TOKEN}`) {
        // For now, we use a simple secret token in env
        // If not set, we deny access
        if (!process.env.ADMIN_SECRET_TOKEN) {
            console.warn('ADMIN_SECRET_TOKEN not set');
        }
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};

// POST /api/admin/login - Login with database authentication
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check database for admin user
        const result = await query('SELECT * FROM admins WHERE username = $1', [username]);

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const admin = result.rows[0];

        // Verify password using bcrypt
        const isValid = await bcrypt.compare(password, admin.password_hash);

        if (!isValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Return token on successful login
        res.json({ token: process.env.ADMIN_SECRET_TOKEN || 'default-token-change-me' });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Protected Routes
router.use(requireAdmin);

// Helper to upsert pricing, features, testimonials, faqs for a product
const syncProductRelations = async (productId, { pricing = {}, features = [], testimonials = [], faqs = [] }) => {
    // Pricing: replace all rows for this product, then insert fresh
    await query('DELETE FROM product_pricing WHERE product_id = $1', [productId]);
    const pricingEntries = Object.entries(pricing || {});
    for (const [plan_type, plan] of pricingEntries) {
        await query(
            `INSERT INTO product_pricing (product_id, plan_type, price, description, cta_text, features)
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [
                productId,
                plan_type,
                plan.price || null,
                plan.description || null,
                plan.cta_text || null,
                JSON.stringify(plan.features || []),
            ]
        );
    }

    // Features
    await query('DELETE FROM product_features WHERE product_id = $1', [productId]);
    for (let i = 0; i < features.length; i++) {
        const f = features[i];
        await query(
            `INSERT INTO product_features (product_id, title, description, icon, display_order)
             VALUES ($1, $2, $3, $4, $5)`,
            [productId, f.title || '', f.description || null, f.icon || null, i]
        );
    }

    // Testimonials
    await query('DELETE FROM product_testimonials WHERE product_id = $1', [productId]);
    for (let i = 0; i < testimonials.length; i++) {
        const t = testimonials[i];
        await query(
            `INSERT INTO product_testimonials (product_id, name, role, company, quote, rating, display_order)
             VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [productId, t.name || '', t.role || null, t.company || null, t.quote || '', t.rating || 5, i]
        );
    }

    // FAQs
    await query('DELETE FROM product_faqs WHERE product_id = $1', [productId]);
    for (let i = 0; i < faqs.length; i++) {
        const f = faqs[i];
        await query(
            `INSERT INTO product_faqs (product_id, question, answer, display_order)
             VALUES ($1, $2, $3, $4)`,
            [productId, f.question || '', f.answer || '', i]
        );
    }
};

// POST /api/admin/products - Create new product with relations
router.post('/products', async (req, res) => {
    const {
        name,
        slug,
        category_slug,
        description,
        compatibility,
        plugin_updates,
        autodesk_store_link,
        download_url,
        video_url,
        pricing,
        features,
        testimonials,
        faqs,
    } = req.body;

    if (!name || !slug || !category_slug) {
        return res.status(400).json({ error: 'name, slug and category_slug are required' });
    }

    try {
        const result = await query(
            `INSERT INTO products
             (name, slug, category_slug, description, compatibility, plugin_updates, autodesk_store_link, download_url, video_url)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
             RETURNING id`,
            [
                name,
                slug,
                category_slug,
                description || null,
                compatibility || null,
                plugin_updates || null,
                autodesk_store_link || null,
                download_url || null,
                video_url || null,
            ]
        );

        const productId = result.rows[0].id;
        await syncProductRelations(productId, { pricing, features, testimonials, faqs });

        res.status(201).json({ success: true, id: productId });
    } catch (error) {
        console.error('Create product failed:', error);
        res.status(500).json({ error: 'Failed to create product' });
    }
});

// PUT /api/admin/products/:id - Update product + relations
router.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const {
        name,
        slug,
        category_slug,
        description,
        compatibility,
        plugin_updates,
        autodesk_store_link,
        download_url,
        video_url,
        pricing,
        features,
        testimonials,
        faqs,
    } = req.body;

    try {
        const result = await query('SELECT id FROM products WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        await query(
            `UPDATE products
             SET name = $1,
                 slug = $2,
                 category_slug = $3,
                 description = $4,
                 compatibility = $5,
                 plugin_updates = $6,
                 autodesk_store_link = $7,
                 download_url = $8,
                 video_url = $9,
                 updated_at = NOW()
             WHERE id = $10`,
            [
                name,
                slug,
                category_slug,
                description || null,
                compatibility || null,
                plugin_updates || null,
                autodesk_store_link || null,
                download_url || null,
                video_url || null,
                id,
            ]
        );

        await syncProductRelations(id, { pricing, features, testimonials, faqs });

        res.json({ success: true });
    } catch (error) {
        console.error('Update product failed:', error);
        res.status(500).json({ error: 'Failed to update product' });
    }
});

// DELETE /api/admin/products/:id - Delete product (cascades to relations)
router.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await query('DELETE FROM products WHERE id = $1 RETURNING id', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ success: true });
    } catch (error) {
        console.error('Delete product failed:', error);
        res.status(500).json({ error: 'Failed to delete product' });
    }
});

module.exports = router;
