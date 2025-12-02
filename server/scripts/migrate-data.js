const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const { query, pool } = require('../db');

// Import data files
// Note: We need to use dynamic imports or require for these ES modules if possible, 
// but since they are ES modules and this is CommonJS, we might need to read them or use a workaround.
// For simplicity in this script, we'll assume we can require them if we transpile or if they are compatible.
// Actually, the project uses ES modules for frontend data. We might need to parse them or manually reconstruct the data for migration 
// if we can't easily import them in this Node script.
//
// STRATEGY: We will read the constants.js file to get the list of products, 
// but since that imports other files, it's complex.
// ALTERNATIVE: We can just manually define the list of files to process since we know the structure.
// OR: We can use 'esm' package or dynamic import() if Node version supports it.

// Let's try dynamic import() which works in recent Node versions.

const migrateData = async () => {
    try {
        console.log('🚀 Starting data migration...');

        // Dynamic import of the constants file
        // We need to use the file URL protocol for Windows paths if using import()
        const productCategoriesPath = path.join(__dirname, '../../src/data/productCategories.js').replace(/\\/g, '/');
        const constantsPath = path.join(__dirname, '../../src/data/products/constants.js').replace(/\\/g, '/');
        const pricingPath = path.join(__dirname, '../../src/data/products/pricing.js').replace(/\\/g, '/');

        // We can't easily import frontend ES modules in Node without setup.
        // Instead of fighting module systems, let's read the data files directly if they are simple JSON-like objects,
        // OR better: let's create a temporary "manifest" of data that we want to import.
        //
        // Actually, the most robust way for this one-off migration is to just copy the data structure 
        // we want to import directly into this script, or make this script a module.
        // Let's try making this script a module by using .mjs extension? 
        // No, let's just use the known data structure since I have access to the files.

        // I will read the directory structure to find product files.
        const productsDir = path.join(__dirname, '../../src/data/products');

        // Helper to read file content
        const fs = require('fs');

        // We will scan the directories: autocad, revit, maya, etc.
        const categories = ['autocad', 'revit', 'maya', 'inventor', 'fusion360', 'navisworks', 'sketchup', 'solidedge', 'solidworks', '3dsmax'];

        for (const category of categories) {
            const catDir = path.join(productsDir, category);
            if (!fs.existsSync(catDir)) continue;

            const files = fs.readdirSync(catDir);

            for (const file of files) {
                if (!file.endsWith('.js')) continue;

                const filePath = path.join(catDir, file);
                const content = fs.readFileSync(filePath, 'utf8');

                // Extract the object using regex/eval (careful with eval, but this is trusted code)
                // The files usually look like: export const productName = { ... };
                const match = content.match(/export const \w+ = ({[\s\S]+?});/);

                if (match) {
                    try {
                        // Evaluated object
                        // We need to sanitize the string to make it valid JS for eval
                        // It might contain unquoted keys, etc.
                        // A safer way is to use a temporary file and import it if we could.

                        // Let's try a simpler approach: 
                        // We will construct a "Product Importer" that runs in the frontend context? 
                        // No, that's too complex.

                        // Let's just use regex to extract key fields.
                        const objStr = match[1];

                        const extract = (key) => {
                            const regex = new RegExp(`${key}:\\s*'([^']*)'`);
                            const m = objStr.match(regex);
                            return m ? m[1] : null;
                        };

                        const extractArray = (key) => {
                            // Simple extraction for arrays like features
                            // This is getting complicated to parse with regex.
                            return [];
                        };

                        // ... This regex parsing is fragile.

                        // BETTER APPROACH:
                        // I will assume the user has Node.js. 
                        // I will create a temporary "migration.mjs" file that IMPORTS the real data files 
                        // and uses the DB connection to insert them.
                        // This leverages the actual JS engine to parse the objects.

                    } catch (e) {
                        console.error(`Failed to parse ${file}:`, e);
                    }
                }
            }
        }

        console.log('⚠️  Data migration script is a placeholder. Please use the .mjs version.');

    } catch (error) {
        console.error('❌ Migration failed:', error);
    } finally {
        await pool.end();
    }
};

migrateData();
