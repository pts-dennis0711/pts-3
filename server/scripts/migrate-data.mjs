import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';
import dotenv from 'dotenv';
import { productCategories } from '../../src/data/productCategories.js';
import { allProductDetails } from '../../src/data/products/constants.js';
import { productPricing, customProductPricing } from '../../src/data/products/pricing.js';

// Setup environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const { Pool } = pg;
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.PGSSLMODE === 'disable' ? false : { rejectUnauthorized: false }
});

const migrate = async () => {
    const client = await pool.connect();
    try {
        console.log('🚀 Starting data migration...');
        await client.query('BEGIN');

        // 1. Clear existing data (optional, but good for development)
        // await client.query('TRUNCATE products CASCADE');

        // 2. Iterate through all products
        for (const [slug, details] of Object.entries(allProductDetails)) {
            console.log(`Processing ${details.name} (${slug})...`);

            // Insert Product
            const productRes = await client.query(
                `INSERT INTO products (
          slug, name, category_slug, description, compatibility, 
          plugin_updates, autodesk_store_link, download_url, video_url
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        ON CONFLICT (slug) DO UPDATE SET
          name = EXCLUDED.name,
          category_slug = EXCLUDED.category_slug,
          description = EXCLUDED.description,
          compatibility = EXCLUDED.compatibility,
          plugin_updates = EXCLUDED.plugin_updates,
          autodesk_store_link = EXCLUDED.autodesk_store_link,
          download_url = EXCLUDED.download_url,
          video_url = EXCLUDED.video_url
        RETURNING id`,
                [
                    slug,
                    details.name,
                    details.category,
                    details.description || '', // Description might be missing in details object, usually in category
                    details.compatibility,
                    details.pluginUpdates,
                    details.autodeskStoreLink,
                    details.downloadUrl,
                    details.videoUrl
                ]
            );

            const productId = productRes.rows[0].id;

            // Insert Features
            if (details.features) {
                await client.query('DELETE FROM product_features WHERE product_id = $1', [productId]);
                for (const [idx, feature] of details.features.entries()) {
                    await client.query(
                        `INSERT INTO product_features (product_id, title, description, display_order)
             VALUES ($1, $2, $3, $4)`,
                        [productId, feature.title, feature.description, idx]
                    );
                }
            }

            // Insert Testimonials
            if (details.testimonials) {
                await client.query('DELETE FROM product_testimonials WHERE product_id = $1', [productId]);
                for (const [idx, testimonial] of details.testimonials.entries()) {
                    await client.query(
                        `INSERT INTO product_testimonials (product_id, name, role, company, quote, rating, display_order)
             VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                        [productId, testimonial.name, testimonial.role, testimonial.company, testimonial.quote, testimonial.rating, idx]
                    );
                }
            }

            // Insert FAQs
            if (details.faqs) {
                await client.query('DELETE FROM product_faqs WHERE product_id = $1', [productId]);
                for (const [idx, faq] of details.faqs.entries()) {
                    await client.query(
                        `INSERT INTO product_faqs (product_id, question, answer, display_order)
             VALUES ($1, $2, $3, $4)`,
                        [productId, faq.question, faq.answer, idx]
                    );
                }
            }

            // Insert Pricing
            // Determine pricing: Custom or Default
            const pricing = customProductPricing[slug] || productPricing;

            await client.query('DELETE FROM product_pricing WHERE product_id = $1', [productId]);

            for (const [key, plan] of Object.entries(pricing)) {
                if (key === 'videoUrl') continue; // Skip metadata

                await client.query(
                    `INSERT INTO product_pricing (product_id, plan_type, price, description, cta_text, features)
           VALUES ($1, $2, $3, $4, $5, $6)`,
                    [
                        productId,
                        plan.type,
                        plan.price,
                        plan.description,
                        plan.ctaText,
                        JSON.stringify(plan.features)
                    ]
                );
            }
        }

        await client.query('COMMIT');
        console.log('✅ Data migration completed successfully.');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('❌ Migration failed:', error);
    } finally {
        client.release();
        await pool.end();
    }
};

migrate();
