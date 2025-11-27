# Complete Product Customization Guide

## 🎯 Overview

You can now customize **everything** for each product in ONE file:
- ✅ **Prices** (all 5 tiers)
- ✅ **Features** (unique per pricing tier)
- ✅ **Videos** (product demo videos)

**Single File:** `src/data/products/pricing.js`

---

## 📝 How to Customize a Product

### Complete Example

```javascript
export const customProductPricing = {
  'your-product-slug': {
    // OPTIONAL: Add video URL for this product
    videoUrl: 'https://www.youtube.com/embed/your-video-id',
    
    // REQUIRED: All 5 pricing tiers
    trial: {
      type: 'Trial',
      description: 'No Credit Card Required.',
      price: 'Free',
      ctaText: 'Free Download',
      features: [
        'Feature 1 for trial',
        'Feature 2 for trial',
        'Feature 3 for trial',
        'Feature 4 for trial'
      ]
    },
    'locked-single': {
      type: 'Locked-License',
      description: 'Single Machine',
      price: '$XX',  // Your custom price
      ctaText: 'Add to Cart',
      features: [
        'Feature 1 for single license',
        'Feature 2 for single license',
        'Feature 3 for single license',
        'Feature 4 for single license'
      ]
    },
    'locked-two': {
      type: 'Locked Licenses by Same User',
      description: 'Two Machine',
      price: '$XX',  // Your custom price
      ctaText: 'Add to Cart',
      features: [
        'Feature 1 for two licenses',
        'Feature 2 for two licenses',
        'Feature 3 for two licenses',
        'Feature 4 for two licenses'
      ]
    },
    'transferable': {
      type: 'Transferable License',
      description: 'Single Floating',
      price: '$XX',  // Your custom price
      ctaText: 'Add to Cart',
      features: [
        'Feature 1 for transferable',
        'Feature 2 for transferable',
        'Feature 3 for transferable',
        'Feature 4 for transferable'
      ]
    },
    automation: {
      type: 'Locked-License',
      description: 'Automation',
      price: '$XX',  // Your custom price
      ctaText: 'Add to Cart',
      features: [
        'Feature 1 for automation',
        'Feature 2 for automation',
        'Feature 3 for automation',
        'Feature 4 for automation'
      ]
    }
  },
};
```

---

## 🎬 Adding Videos

### YouTube Videos

1. **Get the embed URL:**
   - Go to your YouTube video
   - Click "Share" → "Embed"
   - Copy the URL from `src="..."` 
   - Example: `https://www.youtube.com/embed/dQw4w9WgXcQ`

2. **Add to pricing.js:**

```javascript
'3d-pdf-exporter': {
  // Add video URL at the top
  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  
  trial: { ... },
  'locked-single': { ... },
  // ... rest of pricing
},
```

### Current Example

The 3D PDF Exporter already has a video URL configured:

```javascript
'3d-pdf-exporter': {
  videoUrl: 'https://www.youtube.com/embed/your-3d-pdf-video-id',
  // ... pricing tiers
},
```

---

## 💰 Customizing Prices

### Change Prices

Simply update the `price` field for each tier:

```javascript
'locked-single': {
  price: '$149',  // Change this number
  // ... rest stays the same
},
```

### Price Guidelines

**Premium Products:** $119-$149  
**Standard Products:** $89-$109  
**Budget Products:** $59-$79  

**Tier Ratios:**
- Two Machine: ~1.8-1.9x Single
- Transferable: ~3.0-3.4x Single
- Automation: ~6.5-8.5x Single

---

## ✨ Customizing Features

### Unique Features Per Tier

Each pricing tier can have different features:

```javascript
'locked-single': {
  price: '$129',
  features: [
    'Single machine license',
    'High-quality 3D PDF export',  // Specific to this product
    'Password protection',          // Unique feature
    'Template designer',            // Unique feature
    '1 year updates'
  ]
},
'transferable': {
  price: '$399',
  features: [
    'Floating license',
    'Network installation',
    'Unlimited templates',          // Enhanced feature
    'Priority support',             // Better support
    'Advanced encryption'           // Premium feature
  ]
},
```

### Feature Best Practices

1. **Be Specific:** Mention format-specific capabilities
2. **Show Value:** Highlight what makes this tier better
3. **Progressive Enhancement:** Higher tiers should have more/better features
4. **4-5 Features:** Keep it concise and scannable

---

## 📋 Complete Customization Checklist

For each product, you can customize:

### Prices (Required)
- [ ] Trial price (always 'Free')
- [ ] Single machine price
- [ ] Two machine price
- [ ] Transferable license price
- [ ] Automation license price

### Features (Required)
- [ ] Trial features (4-5 items)
- [ ] Single machine features (4-5 items)
- [ ] Two machine features (4-5 items)
- [ ] Transferable features (4-5 items)
- [ ] Automation features (4-5 items)

### Video (Optional)
- [ ] Product demo video URL

---

## 🎯 Real Examples from Current Setup

### Premium Product with Video

```javascript
'3d-pdf-exporter': {
  videoUrl: 'https://www.youtube.com/embed/your-3d-pdf-video-id',
  
  'locked-single': {
    price: '$129',
    features: [
      'Single machine license',
      'High-quality 3D PDF export',
      'Password protection',
      'Template designer',
      '1 year updates'
    ]
  },
  automation: {
    price: '$899',
    features: [
      'Batch PDF generation',
      'API integration',
      'Custom scripting',
      'Automated workflows',
      'Dedicated support'
    ]
  }
},
```

### Standard Product

```javascript
'webgl-exporter': {
  // No video URL (optional)
  
  'locked-single': {
    price: '$99',
    features: [
      'Single machine license',
      'WebGL 1.0 & 2.0',
      'Optimized meshes',
      'Texture export',
      '1 year updates'
    ]
  },
  automation: {
    price: '$699',
    features: [
      'Batch WebGL export',
      'API access',
      'Custom pipelines',
      'CDN integration',
      'Dedicated support'
    ]
  }
},
```

### Budget Product

```javascript
'obj-importer': {
  'locked-single': {
    price: '$59',
    features: [
      'Single machine license',
      'OBJ & MTL import',
      'Texture mapping',
      'Mesh repair',
      '1 year updates'
    ]
  },
  automation: {
    price: '$499',
    features: [
      'Automated import',
      'API access',
      'Custom workflows',
      'Folder monitoring',
      'Dedicated support'
    ]
  }
},
```

---

## 🚀 Quick Actions

### Add Video to Existing Product

1. Open `src/data/products/pricing.js`
2. Find your product (e.g., `'step-exporter'`)
3. Add `videoUrl` at the top:

```javascript
'step-exporter': {
  videoUrl: 'https://www.youtube.com/embed/YOUR_VIDEO_ID',  // Add this line
  
  trial: { ... },
  // ... rest of pricing
},
```

4. Save - changes are immediate!

### Change Price for One Tier

1. Open `src/data/products/pricing.js`
2. Find your product and tier
3. Update the price:

```javascript
'locked-single': {
  price: '$149',  // Change from $129 to $149
  // ... rest stays the same
},
```

4. Save - done!

### Add Custom Feature

1. Open `src/data/products/pricing.js`
2. Find the pricing tier
3. Add to features array:

```javascript
features: [
  'Existing feature 1',
  'Existing feature 2',
  'New custom feature',  // Add this
  'Another new feature'  // Or this
]
```

4. Save!

---

## 📊 What Gets Customized Where

| Element | Location | Example |
|---------|----------|---------|
| **Prices** | `pricing.js` | `price: '$129'` |
| **Features** | `pricing.js` | `features: ['Feature 1', ...]` |
| **Videos** | `pricing.js` | `videoUrl: 'https://...'` |
| **Product Name** | Product detail file | `name: '3D PDF Exporter'` |
| **Compatibility** | Product detail file | `compatibility: 'Windows 10...'` |
| **FAQs** | Product detail file | `faqs: [...]` |

**For most changes, you only need to edit `pricing.js`!**

---

## ✅ Verification

After making changes:

1. **Save the file**
2. **Refresh browser** (Ctrl + Shift + R)
3. **Visit product page:** `/3d-products/autocad/your-product`
4. **Check:**
   - ✅ Prices display correctly
   - ✅ Features show up
   - ✅ Video appears (if added)

---

## 💡 Tips

### Video Tips
- Use YouTube embed URLs (not watch URLs)
- Test video loads before deploying
- Keep videos under 5 minutes for best engagement
- Add captions for accessibility

### Pricing Tips
- Keep prices consistent with market
- Maintain logical tier progression
- Round to clean numbers ($99, not $98.50)
- Test checkout flow after price changes

### Feature Tips
- Lead with the most important feature
- Use action words (Export, Import, Generate)
- Be specific to the format
- Avoid generic features in premium tiers

---

## 🎉 Summary

**One File Controls Everything:**
- `src/data/products/pricing.js`

**What You Can Customize:**
- ✅ Prices (5 tiers per product)
- ✅ Features (unique per tier)
- ✅ Videos (optional demo videos)

**How Many Products:**
- ✅ All 10 products configured
- ✅ Each with unique pricing
- ✅ Each with unique features
- ✅ Videos optional per product

**Changes Take Effect:**
- ✅ Immediately (just save and refresh)
- ✅ No build required
- ✅ No other files to modify

---

## 📞 Need Help?

See also:
- [PRODUCT_PRICING_GUIDE.md](file:///d:/React%20JS/prototech-3%20-%20Copy/docs/PRODUCT_PRICING_GUIDE.md) - Detailed pricing guide
- [PRICING_OVERVIEW.md](file:///d:/React%20JS/prototech-3%20-%20Copy/docs/PRICING_OVERVIEW.md) - Quick reference
- [pricing.js](file:///d:/React%20JS/prototech-3%20-%20Copy/src/data/products/pricing.js) - The main file

---

**Last Updated:** 2024-11-25  
**Status:** ✅ Complete - All features working
