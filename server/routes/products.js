const express = require('express');
const router = express.Router();
const { query } = require('../db');

// GET /api/products - Get all products (summary)
router.get('/', async (req, res) => {
    try {
        const result = await query(`
      SELECT p.id, p.slug, p.name, p.category_slug, p.description, p.download_url
      FROM products p
      ORDER BY p.category_slug, p.name
    `);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET /api/products/:slug - Get full product details
router.get('/:slug', async (req, res) => {
    const { slug } = req.params;
    try {
        // Fetch product core details
        const productRes = await query('SELECT * FROM products WHERE slug = $1', [slug]);

        if (productRes.rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const product = productRes.rows[0];
        const productId = product.id;

        // Fetch related data in parallel
        const [pricingRes, featuresRes, testimonialsRes, faqsRes] = await Promise.all([
            query('SELECT * FROM product_pricing WHERE product_id = $1', [productId]),
            query('SELECT * FROM product_features WHERE product_id = $1 ORDER BY display_order', [productId]),
            query('SELECT * FROM product_testimonials WHERE product_id = $1 ORDER BY display_order', [productId]),
            query('SELECT * FROM product_faqs WHERE product_id = $1 ORDER BY display_order', [productId])
        ]);

        // Construct response object matching the frontend structure
        const response = {
            ...product,
            pricing: pricingRes.rows.reduce((acc, row) => {
                // Parse features JSON if it's a string (pg might return object for JSONB)
                const features = typeof row.features === 'string' ? JSON.parse(row.features) : row.features;
                acc[row.plan_type] = { ...row, features };
                return acc;
            }, {}),
            features: featuresRes.rows,
            testimonials: testimonialsRes.rows,
            faqs: faqsRes.rows
        };

        res.json(response);
    } catch (err) {
        console.error('Error fetching product details:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
