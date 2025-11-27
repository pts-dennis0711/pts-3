# Product Pricing Overview

This file provides a quick overview of which products have custom pricing vs default pricing.

## Products with Custom Pricing

These products have specific pricing defined in `src/data/products/pricing.js`:

### STEP Exporter (`step-exporter`)
- **Single:** $99 (vs default $79)
- **Two:** $180 (vs default $150)
- **Transferable:** $299 (vs default $249)
- **Automation:** $699 (vs default $599)
- **Reason:** Premium exporter, complex format

### OBJ Importer (`obj-importer`)
- **Single:** $69 (vs default $79)
- **Two:** $130 (vs default $150)
- **Transferable:** $219 (vs default $249)
- **Automation:** $549 (vs default $599)
- **Reason:** Importer, simpler than exporters

---

## Products Using Default Pricing

These products use the default pricing from `productPricing`:

- 3D PDF Exporter (`3d-pdf-exporter`)
- OBJ Exporter (`obj-exporter`)
- WEBGL Exporter (`webgl-exporter`)
- DWG/DXF Compare (`dwfdxf-compare`)
- JT Exporter (`jt-exporter`)
- CATIA V5 Exporter (`catia-v5-exporter`)
- JSON Exporter (`json-exporter`)
- Revit STEP Exporter (`revit-step-exporter`)

**Default Pricing:**
- **Single:** $79
- **Two:** $150
- **Transferable:** $249
- **Automation:** $599

---

## How to Add Custom Pricing

1. Open `src/data/products/pricing.js`
2. Add product to `customProductPricing` object
3. Define all 5 pricing tiers (trial, locked-single, locked-two, transferable, automation)

**Example:**
```javascript
'your-product-slug': {
  trial: { price: 'Free', ... },
  'locked-single': { price: '$XX', ... },
  'locked-two': { price: '$XX', ... },
  'transferable': { price: '$XX', ... },
  automation: { price: '$XX', ... }
}
```

See `docs/PRODUCT_PRICING_GUIDE.md` for detailed instructions.

---

## Pricing Strategy Recommendations

### Exporters (Higher Complexity)
- **Budget:** $79 - $99 (single)
- **Standard:** $99 - $129 (single)
- **Premium:** $129 - $149 (single)

### Importers (Lower Complexity)
- **Budget:** $49 - $69 (single)
- **Standard:** $69 - $89 (single)
- **Premium:** $89 - $109 (single)

### Format Complexity Guide
- **Simple formats** (JSON, OBJ): Lower pricing
- **Standard formats** (STEP, JT): Medium pricing
- **Complex formats** (CATIA, 3D PDF): Higher pricing
- **Specialized tools** (DWG/DXF Compare, WebGL): Medium-high pricing

---

## Quick Actions

### To change default pricing for ALL products:
Edit `productPricing` in `src/data/products/pricing.js`

### To change pricing for ONE product:
Add to `customProductPricing` in `src/data/products/pricing.js`

### To check current pricing:
Run the app and visit: `/3d-products/autocad/[product-slug]`

---

Last Updated: 2024-11-25
