# Guide: Using Constant Files for Products

This guide explains the new constant file system for managing product data. Each product now has its own constant file, making it easy to modify product-specific information.

## File Structure

```
src/data/products/
├── constants.js          # Central export file (imports all products)
├── pricing.js            # Shared pricing information
├── TEMPLATE.js           # Template for creating new products
└── autocad/              # Category folders
    ├── 3d-pdf-exporter.js
    ├── obj-exporter.js
    ├── webgl-exporter.js
    └── ... (more product files)
```

## How It Works

1. **Individual Product Files**: Each product has its own file in `src/data/products/[category]/[product-slug].js`
2. **Central Export**: `constants.js` imports all products and exports them as `allProductDetails`
3. **Automatic Updates**: When you modify a product constant file, the changes automatically appear on the webpage

## Modifying Product Data

### Step 1: Find the Product File

Products are organized by category:
- AutoCAD products: `src/data/products/autocad/`
- Inventor products: `src/data/products/inventor/` (when created)
- Revit products: `src/data/products/revit/` (when created)
- etc.

### Step 2: Open the Product File

Each file is named using the product slug. For example:
- `3D PDF Exporter` → `3d-pdf-exporter.js`
- `OBJ Exporter` → `obj-exporter.js`
- `DWG/DXF Compare` → `dwfdxf-compare.js`

### Step 3: Modify the Data

Edit the constant object directly. For example, to update features:

```javascript
// In src/data/products/autocad/3d-pdf-exporter.js
export const autocad3dPdfExporter = {
  // ... other fields ...
  features: [
    {
      title: 'New Feature Name',
      description: 'Updated feature description.'
    }
  ]
};
```

### Step 4: Save and View

Save the file and refresh the webpage. The changes will appear immediately!

## Modifying Pricing

Pricing is shared across all products. To update prices:

1. Open `src/data/products/pricing.js`
2. Modify the prices in the `productPricing` object
3. Save - all product pages will show updated pricing

Example:
```javascript
'locked-single': {
  type: 'Locked-License',
  description: 'Single Machine',
  price: '$89', // Changed from $79
  // ... rest of pricing details
}
```

## Creating a New Product

### Step 1: Create the Product File

1. Copy `src/data/products/TEMPLATE.js`
2. Rename it to match your product slug (e.g., `webgl-exporter.js`)
3. Place it in the appropriate category folder (e.g., `src/data/products/autocad/`)

### Step 2: Fill in Product Data

Edit the constant with your product information:

```javascript
// In src/data/products/autocad/webgl-exporter.js
export const autocadWebglExporter = {
  name: 'WEBGL Exporter',
  category: 'autocad',
  autodeskStoreLink: 'https://apps.autodesk.com/...',
  // ... fill in all fields
};
```

### Step 3: Export in constants.js

Add the import and export to `src/data/products/constants.js`:

```javascript
// Add import at the top
export { autocadWebglExporter } from './autocad/webgl-exporter';

// Add to imports section
import { autocadWebglExporter } from './autocad/webgl-exporter';

// Add to allProductDetails object
export const allProductDetails = {
  // ... existing products ...
  'webgl-exporter': autocadWebglExporter,
};
```

### Step 4: Test

Navigate to the product page and verify the data displays correctly.

## Product Slug Rules

The product slug is used as:
1. The filename (e.g., `3d-pdf-exporter.js`)
2. The key in `allProductDetails` (e.g., `'3d-pdf-exporter'`)
3. The URL parameter (e.g., `/products/autocad/3d-pdf-exporter`)

To create a slug from a product name:
- Convert to lowercase
- Replace spaces with hyphens
- Remove special characters

Examples:
- `'3D PDF Exporter'` → `'3d-pdf-exporter'`
- `'DWG/DXF Compare'` → `'dwfdxf-compare'`
- `'CATIA V5 Exporter'` → `'catia-v5-exporter'`

## Available Fields

Each product constant can have:

### Required Fields
- `name`: Product name (must match productCategories.js)
- `category`: Category slug (autocad, inventor, etc.)
- `autodeskStoreLink`: Store URL
- `compatibility`: System requirements
- `pluginUpdates`: Update policy
- `features`: Array of feature objects (minimum 4)

### Optional Fields
- `videoUrl`: YouTube embed URL (or empty string)
- `testimonials`: Array of testimonial objects (or empty array)
- `versionHistory`: Array of version objects (or empty array)
- `faqs`: Array of FAQ objects (or empty array)

## Examples

### Updating Features

```javascript
// In src/data/products/autocad/3d-pdf-exporter.js
features: [
  {
    title: 'Enhanced Mesh Quality',
    description: 'New improved mesh quality controls with better precision.'
  },
  {
    title: 'Advanced Encryption',
    description: '256-bit encryption for maximum PDF security.'
  }
]
```

### Adding Version History

```javascript
versionHistory: [
  {
    version: '2.1.0',
    date: '2024-02-15',
    changes: [
      'New feature added',
      'Bug fixes',
      'Performance improvements'
    ]
  }
]
```

### Adding Testimonials

```javascript
testimonials: [
  {
    name: 'John Doe',
    role: 'CAD Manager',
    company: 'Tech Corp',
    quote: 'Amazing product that improved our workflow!',
    rating: 5
  }
]
```

## Benefits of This System

1. **Easy Updates**: Each product has its own file - no need to scroll through a massive file
2. **Better Organization**: Products organized by category
3. **Automatic Updates**: Changes reflect immediately on the webpage
4. **Version Control**: Easy to track changes per product
5. **Template Available**: Use TEMPLATE.js to quickly create new products
6. **Shared Pricing**: Update prices once, applies to all products

## Troubleshooting

**Product not showing on webpage:**
- Verify the product slug matches in `allProductDetails`
- Check the import/export in `constants.js`
- Ensure the product slug matches the URL parameter

**Pricing not updating:**
- Clear browser cache
- Verify you edited `pricing.js`, not individual product files
- Check that `constants.js` exports `productPricing`

**Changes not appearing:**
- Save the file
- Refresh the browser (hard refresh: Ctrl+F5)
- Check browser console for errors

