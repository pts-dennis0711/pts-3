# Quick Start: Product-Specific Pricing

## 🎯 Goal
Set different prices for different products (exporters vs importers).

## ⚡ Quick Steps

### 1. Open the Pricing File
```
src/data/products/pricing.js
```

### 2. Find Your Product Slug
Product URL: `/3d-products/autocad/step-exporter`  
Product Slug: `step-exporter`

### 3. Add Custom Pricing

Copy this template and modify the prices:

```javascript
export const customProductPricing = {
  'your-product-slug': {
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
      price: '$XX',  // ← Change this
      ctaText: 'Add to Cart',
      features: ['Single machine license', 'Perpetual license', '1 year free updates', 'Email support']
    },
    'locked-two': {
      type: 'Locked Licenses by Same User',
      description: 'Two Machine',
      price: '$XX',  // ← Change this
      ctaText: 'Add to Cart',
      features: ['Two machine licenses', 'Same user only', 'Perpetual licenses', '1 year free updates']
    },
    'transferable': {
      type: 'Transferable License',
      description: 'Single Floating',
      price: '$XX',  // ← Change this
      ctaText: 'Add to Cart',
      features: ['Floating license', 'Transferable', 'Network installation', 'Priority support']
    },
    automation: {
      type: 'Locked-License',
      description: 'Automation',
      price: '$XX',  // ← Change this
      ctaText: 'Add to Cart',
      features: ['Automation features', 'API access', 'Batch processing', 'Custom scripting support', 'Dedicated support']
    }
  },
};
```

### 4. Save & Test
- Save the file
- Refresh browser
- Visit product page to verify

---

## 💡 Pricing Recommendations

### Exporters (Higher)
- Single: $79-149
- Two: $150-280
- Transferable: $249-449
- Automation: $599-999

### Importers (Lower)
- Single: $49-89
- Two: $90-160
- Transferable: $149-269
- Automation: $399-649

---

## 📋 Current Examples

### STEP Exporter (Premium)
```javascript
'step-exporter': {
  'locked-single': { price: '$99', ... },
  'locked-two': { price: '$180', ... },
  'transferable': { price: '$299', ... },
  automation: { price: '$699', ... }
}
```

### OBJ Importer (Budget)
```javascript
'obj-importer': {
  'locked-single': { price: '$69', ... },
  'locked-two': { price: '$130', ... },
  'transferable': { price: '$219', ... },
  automation: { price: '$549', ... }
}
```

---

## 📚 Full Documentation

For detailed instructions:
- [PRODUCT_PRICING_GUIDE.md](file:///d:/React%20JS/prototech-3%20-%20Copy/docs/PRODUCT_PRICING_GUIDE.md)
- [PRICING_OVERVIEW.md](file:///d:/React%20JS/prototech-3%20-%20Copy/docs/PRICING_OVERVIEW.md)

---

## ✅ That's It!

Just edit `pricing.js` and you're done. No other files need to be changed.
