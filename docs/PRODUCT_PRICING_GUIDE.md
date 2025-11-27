# Product-Specific Pricing Guide

## Overview

This guide explains how to set different prices and features for different products (exporters and importers). The pricing system supports both **default pricing** (used by all products) and **custom product-specific pricing** (for individual products that need different prices).

---

## Quick Start

### Setting Custom Pricing for a Product

1. Open `src/data/products/pricing.js`
2. Find the `customProductPricing` object
3. Add your product with custom prices

**Example:**

```javascript
export const customProductPricing = {
  'step-exporter': {
    trial: {
      type: 'Trial',
      description: 'No Credit Card Required.',
      price: 'Free',
      ctaText: 'Free Download',
      features: ['Full feature access', '30-day trial period', 'No credit card required', 'Full support included']
    },
    'locked-single': {
      type: 'Locked-License',
      description: 'Single Machine',
      price: '$99',  // Custom price for STEP Exporter
      ctaText: 'Add to Cart',
      features: ['Single machine license', 'Perpetual license', '1 year free updates', 'Email support']
    },
    // ... other pricing tiers
  },
};
```

---

## File Structure

```
src/data/products/
├── pricing.js              # Pricing configuration (DEFAULT + CUSTOM)
├── constants.js            # Product imports and exports
├── autocad/
│   ├── 3d-pdf-exporter.js
│   ├── step-exporter.js
│   ├── obj-importer.js
│   └── ...
└── revit/
    └── step-exporter.js
```

---

## How It Works

### 1. Default Pricing

All products use the **default pricing** defined in `productPricing` object unless they have custom pricing.

**Location:** `src/data/products/pricing.js`

```javascript
export const productPricing = {
  trial: { price: 'Free', ... },
  'locked-single': { price: '$79', ... },
  'locked-two': { price: '$150', ... },
  'transferable': { price: '$249', ... },
  automation: { price: '$599', ... }
};
```

### 2. Custom Product Pricing

Products with different pricing are defined in the `customProductPricing` object.

**Location:** `src/data/products/pricing.js`

```javascript
export const customProductPricing = {
  'product-slug': {
    // Custom pricing for this specific product
  }
};
```

### 3. Automatic Selection

The system automatically selects the right pricing:

```javascript
// In ProductPage.js
const productPricing = getProductPricing(productSlug);
// Returns custom pricing if exists, otherwise returns default pricing
```

---

## Pricing Structure

Each pricing tier has the following properties:

```javascript
{
  type: 'License Type',           // Display name
  description: 'Short description', // Subtitle
  price: '$99',                    // Price (can be 'Free')
  ctaText: 'Add to Cart',          // Button text
  features: [                      // Feature list
    'Feature 1',
    'Feature 2',
    'Feature 3'
  ]
}
```

---

## Common Scenarios

### Scenario 1: Different Prices for Exporters vs Importers

**Exporters** (e.g., STEP Exporter) - Higher pricing:

```javascript
'step-exporter': {
  'locked-single': { price: '$99', ... },
  'locked-two': { price: '$180', ... },
  'transferable': { price: '$299', ... },
  automation: { price: '$699', ... }
}
```

**Importers** (e.g., OBJ Importer) - Lower pricing:

```javascript
'obj-importer': {
  'locked-single': { price: '$69', ... },
  'locked-two': { price: '$130', ... },
  'transferable': { price: '$219', ... },
  automation: { price: '$549', ... }
}
```

### Scenario 2: Premium Product with Higher Prices

```javascript
'3d-pdf-exporter': {
  'locked-single': { price: '$129', ... },
  'locked-two': { price: '$240', ... },
  'transferable': { price: '$399', ... },
  automation: { price: '$899', ... }
}
```

### Scenario 3: Budget Product with Lower Prices

```javascript
'json-exporter': {
  'locked-single': { price: '$49', ... },
  'locked-two': { price: '$90', ... },
  'transferable': { price: '$149', ... },
  automation: { price: '$399', ... }
}
```

### Scenario 4: Different Features for Different Products

You can also customize the features list:

```javascript
'catia-v5-exporter': {
  'locked-single': {
    price: '$149',
    features: [
      'Single machine license',
      'CATIA V5 support',        // Custom feature
      'Advanced geometry export', // Custom feature
      '1 year free updates',
      'Priority email support'    // Enhanced support
    ]
  }
}
```

---

## Step-by-Step: Adding Custom Pricing

### Example: Setting Custom Pricing for "WEBGL Exporter"

1. **Find the product slug**
   - Product name: "WEBGL Exporter"
   - Product slug: `webgl-exporter`

2. **Open pricing.js**
   ```
   src/data/products/pricing.js
   ```

3. **Add to customProductPricing**

```javascript
export const customProductPricing = {
  // ... existing products ...
  
  'webgl-exporter': {
    trial: {
      type: 'Trial',
      description: 'No Credit Card Required.',
      price: 'Free',
      ctaText: 'Free Download',
      features: [
        'Full feature access',
        '30-day trial period',
        'No credit card required',
        'Full support included'
      ]
    },
    'locked-single': {
      type: 'Locked-License',
      description: 'Single Machine',
      price: '$89',  // Your custom price
      ctaText: 'Add to Cart',
      features: [
        'Single machine license',
        'Perpetual license',
        '1 year free updates',
        'Email support'
      ]
    },
    'locked-two': {
      type: 'Locked Licenses by Same User',
      description: 'Two Machine',
      price: '$160',  // Your custom price
      ctaText: 'Add to Cart',
      features: [
        'Two machine licenses',
        'Same user only',
        'Perpetual licenses',
        '1 year free updates'
      ]
    },
    'transferable': {
      type: 'Transferable License',
      description: 'Single Floating',
      price: '$269',  // Your custom price
      ctaText: 'Add to Cart',
      features: [
        'Floating license',
        'Transferable',
        'Network installation',
        'Priority support'
      ]
    },
    automation: {
      type: 'Locked-License',
      description: 'Automation',
      price: '$649',  // Your custom price
      ctaText: 'Add to Cart',
      features: [
        'Automation features',
        'API access',
        'Batch processing',
        'Custom scripting support',
        'Dedicated support'
      ]
    }
  },
};
```

4. **Save the file**
   - The changes will be reflected immediately in development mode
   - No other files need to be modified

---

## Pricing Tiers Explained

### 1. Trial
- **Purpose:** Free trial version
- **Price:** Always 'Free'
- **Features:** Full access for 30 days

### 2. Locked-Single
- **Purpose:** Single machine license
- **Typical Price Range:** $49 - $129
- **Use Case:** Individual users, single workstation

### 3. Locked-Two
- **Purpose:** Two machine licenses for same user
- **Typical Price Range:** $90 - $240
- **Use Case:** Users with desktop + laptop

### 4. Transferable
- **Purpose:** Floating/network license
- **Typical Price Range:** $149 - $399
- **Use Case:** Teams, shared workstations

### 5. Automation
- **Purpose:** Advanced automation features
- **Typical Price Range:** $399 - $899
- **Use Case:** Batch processing, API integration

---

## Best Practices

### 1. Consistent Pricing Strategy

**By Product Type:**
- **Exporters:** Generally higher prices (more complex)
- **Importers:** Generally lower prices (simpler)

**By Complexity:**
- **Simple formats (JSON, OBJ):** Lower prices
- **Complex formats (STEP, CATIA):** Higher prices
- **3D/Visual formats (PDF, WebGL):** Medium-high prices

### 2. Pricing Tiers Relationship

Maintain logical price progression:
```
Trial (Free) < Single ($X) < Two ($1.8X) < Transferable ($3X) < Automation ($6-8X)
```

Example:
```
Free → $79 → $150 → $249 → $599
```

### 3. Feature Differentiation

- **Trial:** Emphasize "no commitment"
- **Single/Two:** Emphasize "perpetual license"
- **Transferable:** Emphasize "flexibility"
- **Automation:** Emphasize "advanced features"

---

## Modifying Default Pricing

If you want to change the default pricing for ALL products:

1. Open `src/data/products/pricing.js`
2. Modify the `productPricing` object
3. All products without custom pricing will use these new defaults

**Example:**

```javascript
export const productPricing = {
  'locked-single': {
    price: '$89',  // Changed from $79
    // ... rest stays the same
  },
  // ... other tiers
};
```

---

## Troubleshooting

### Product Not Using Custom Pricing

**Check:**
1. Product slug matches exactly (case-sensitive)
2. File saved properly
3. Development server restarted (if needed)

**Find Product Slug:**
```javascript
// In browser console on product page:
console.log(window.location.pathname);
// Example: /3d-products/autocad/step-exporter
// Product slug: step-exporter
```

### Pricing Not Updating

1. Clear browser cache
2. Hard refresh (Ctrl + Shift + R)
3. Check browser console for errors

---

## Quick Reference

### All Product Slugs

**AutoCAD Products:**
- `3d-pdf-exporter`
- `obj-exporter`
- `webgl-exporter`
- `step-exporter`
- `dwfdxf-compare`
- `jt-exporter`
- `catia-v5-exporter`
- `json-exporter`
- `obj-importer`

**Revit Products:**
- `revit-step-exporter` (or `step-exporter` depending on routing)

### Price Ranges by Category

| Tier | Budget | Standard | Premium |
|------|--------|----------|---------|
| Single | $49-69 | $79-99 | $109-149 |
| Two | $90-130 | $150-180 | $200-280 |
| Transferable | $149-219 | $249-299 | $349-449 |
| Automation | $399-549 | $599-699 | $799-999 |

---

## Examples

### Complete Example: Different Pricing for 3 Products

```javascript
export const customProductPricing = {
  // Budget Importer
  'obj-importer': {
    'locked-single': { price: '$59', ... },
    'locked-two': { price: '$110', ... },
    'transferable': { price: '$199', ... },
    automation: { price: '$499', ... }
  },
  
  // Standard Exporter
  'step-exporter': {
    'locked-single': { price: '$99', ... },
    'locked-two': { price: '$180', ... },
    'transferable': { price: '$299', ... },
    automation: { price: '$699', ... }
  },
  
  // Premium Exporter
  '3d-pdf-exporter': {
    'locked-single': { price: '$129', ... },
    'locked-two': { price: '$240', ... },
    'transferable': { price: '$399', ... },
    automation: { price: '$899', ... }
  },
};
```

---

## Summary

1. **Default pricing** in `productPricing` applies to all products
2. **Custom pricing** in `customProductPricing` overrides default for specific products
3. Use **product slug** (e.g., `step-exporter`) as the key
4. Customize **prices** and **features** for each tier
5. Changes are **automatic** - no other files need modification

---

## Need Help?

- Check product slug in URL: `/3d-products/autocad/[product-slug]`
- Verify pricing object structure matches examples
- Ensure all 5 tiers are defined (trial, locked-single, locked-two, transferable, automation)
- Test in browser after saving changes
