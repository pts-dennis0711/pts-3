# Guide: Adding Product/Plugin Details

This guide explains how to add details for different products/plugins in the ProtoTech website.

## Quick Start

1. **Open** `src/data/productDetails.js`
2. **Find** the product name in `src/data/productCategories.js` to get the exact name
3. **Create** the product slug (see below)
4. **Add** the product details using the template
5. **Save** and the product page will automatically update

## Step-by-Step Guide

### Step 1: Find the Product Name

First, check what products are available in `src/data/productCategories.js`. For example:

```javascript
exporters: [
  '3D PDF Exporter',
  'OBJ Exporter',
  'WEBGL Exporter',
  // ... more products
]
```

### Step 2: Create the Product Slug

The product slug is created by:
- Converting to lowercase
- Replacing spaces with hyphens
- Removing special characters

**Examples:**
- `'3D PDF Exporter'` → `'3d-pdf-exporter'`
- `'OBJ Exporter'` → `'obj-exporter'`
- `'DWG/DXF Compare'` → `'dwfdxf-compare'`
- `'CATIA V5 Exporter'` → `'catia-v5-exporter'`

You can use the helper function:
```javascript
getProductSlug('3D PDF Exporter') // Returns: '3d-pdf-exporter'
```

### Step 3: Get the Category Slug

Find the category slug from `src/data/productCategories.js`:
- `autocad` → `'autocad'`
- `Fusion 360` → `'fusion-360'`
- `Solid Edge` → `'solid-edge'`
- `3ds Max` → `'3ds-max'`

### Step 4: Add Product Details

Add a new entry in the `productDetails` object in `src/data/productDetails.js`:

```javascript
'product-slug-here': {
  name: 'Product Name', // Must match exactly from productCategories.js
  category: 'category-slug', // Must match category slug
  autodeskStoreLink: 'https://apps.autodesk.com/...',
  compatibility: 'Windows 10 and Windows 11 Only',
  pluginUpdates: 'All updates for the first year are free...',
  features: [
    {
      title: 'Feature Name',
      description: 'Feature description here.'
    }
  ],
  videoUrl: 'https://www.youtube.com/embed/video-id', // Optional
  testimonials: [ // Optional
    {
      name: 'Customer Name',
      role: 'Job Title',
      company: 'Company Name',
      quote: 'Testimonial quote here.',
      rating: 5
    }
  ],
  versionHistory: [ // Optional
    {
      version: '1.0.0',
      date: '2024-01-15',
      changes: ['Change 1', 'Change 2']
    }
  ],
  faqs: [ // Optional
    {
      question: 'Question here?',
      answer: 'Answer here.'
    }
  ]
}
```

## Complete Example

Here's a complete example for adding "WEBGL Exporter" for AutoCAD:

```javascript
'webgl-exporter': {
  name: 'WEBGL Exporter',
  category: 'autocad',
  autodeskStoreLink: 'https://apps.autodesk.com/ACD/en/Detail/Index?id=appstore.exchange.autodesk.com:webglexporter:en',
  compatibility: 'Windows 10 and Windows 11 Only',
  pluginUpdates: 'All updates for the first year are free. The plugin license is perpetual, but if it stops working after the first year and you need updates or support, you\'ll need to purchase a renewal.',
  features: [
    {
      title: 'Web-Ready Export',
      description: 'Export models optimized for web viewing and interactive 3D experiences.'
    },
    {
      title: 'Browser Compatibility',
      description: 'Works with all modern web browsers that support WebGL.'
    },
    {
      title: 'Interactive Controls',
      description: 'Built-in rotation, zoom, and pan controls for web viewers.'
    },
    {
      title: 'Optimized File Size',
      description: 'Compressed exports for fast loading times.'
    }
  ],
  videoUrl: 'https://www.youtube.com/embed/YOUR_VIDEO_ID',
  testimonials: [
    {
      name: 'Jane Doe',
      role: 'Web Developer',
      company: 'Digital Agency',
      quote: 'WEBGL Exporter makes it easy to share AutoCAD models on our website. Great tool!',
      rating: 5
    }
  ],
  versionHistory: [
    {
      version: '1.2.0',
      date: '2024-02-01',
      changes: [
        'Added compression options',
        'Improved browser compatibility',
        'Performance optimizations'
      ]
    },
    {
      version: '1.1.0',
      date: '2023-12-15',
      changes: [
        'Enhanced interactive controls',
        'Fixed texture mapping issues'
      ]
    }
  ],
  faqs: [
    {
      question: 'Which browsers support WebGL exports?',
      answer: 'All modern browsers support WebGL including Chrome, Firefox, Safari, and Edge.'
    },
    {
      question: 'Can I customize the viewer controls?',
      answer: 'Yes, the exported WebGL file includes customizable viewer options.'
    }
  ]
}
```

## Field Descriptions

### Required Fields

- **`name`**: Exact product name from `productCategories.js`
- **`category`**: Category slug (must match `productCategories.js`)
- **`autodeskStoreLink`**: URL to Autodesk App Store listing
- **`compatibility`**: System requirements text
- **`pluginUpdates`**: Update policy description
- **`features`**: Array of at least 4 feature objects

### Optional Fields

- **`videoUrl`**: YouTube embed URL (leave empty string if none)
- **`testimonials`**: Array of testimonial objects (can be empty array)
- **`versionHistory`**: Array of version objects (can be empty array)
- **`faqs`**: Array of FAQ objects (can be empty array, defaults will be shown)

## Product Slug Rules

The product slug must:
1. Match the URL pattern: `/products/:categorySlug/:productSlug`
2. Be created using: `productName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')`
3. Be unique within each category

## Testing

After adding product details:

1. Navigate to the category page: `/products/autocad`
2. Click on the product card
3. The product page should display all your details
4. Check all sections: pricing, features, FAQs, testimonials, etc.

## Troubleshooting

**Product page not found:**
- Verify the product slug matches exactly (check case and special characters)
- Ensure the product name matches exactly in `productCategories.js`

**Default content showing:**
- Product details will fall back to defaults if not found
- Check browser console for any errors
- Verify the product slug is correct

**Features not displaying:**
- Ensure `features` array has at least one object
- Check that each feature has both `title` and `description`

## Tips

1. **Copy existing entries**: Start with an existing product and modify it
2. **Use the template**: There's a commented template in `productDetails.js`
3. **Test incrementally**: Add basic info first, then add optional sections
4. **Keep consistent**: Follow the same structure and style as existing products

