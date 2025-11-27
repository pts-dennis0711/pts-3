// PRODUCT TEMPLATE FILE
// Copy this file to create a new product constant file
// 
// INSTRUCTIONS:
// 1. Copy this file and rename it to match your product slug
//    Example: For "WEBGL Exporter" → rename to "webgl-exporter.js"
// 2. Replace all placeholder values with actual product data
// 3. Export the constant with the naming convention: categoryProductName
//    Example: export const autocadWebglExporter = { ... }
// 4. Add the export to src/data/products/constants.js
// 5. Add the product to the allProductDetails object in constants.js
// 6. (OPTIONAL) Set custom pricing in src/data/products/pricing.js
//    - If not set, product will use default pricing
//    - See docs/PRODUCT_PRICING_GUIDE.md for details

export const categoryProductName = {
  // Product name - must match exactly from productCategories.js
  name: 'Product Name',

  // Category slug - must match from productCategories.js (autocad, inventor, maya, etc.)
  category: 'category-slug',

  // Autodesk App Store link (or your store link)
  autodeskStoreLink: 'https://apps.autodesk.com/ACD/en/Detail/Index?id=...',

  // Download URL for trial installer (MSI file)
  // If not provided, will default to: https://staging8.prototechsolutions.com/msi-softwares/{productSlug}.msi
  downloadUrl: 'https://staging8.prototechsolutions.com/msi-softwares/ProductName.msi',

  // System compatibility requirements
  compatibility: 'Windows 10 and Windows 11 Only',

  // Plugin update policy
  pluginUpdates: 'All updates for the first year are free. The plugin license is perpetual, but if it stops working after the first year and you need updates or support, you\'ll need to purchase a renewal.',

  // Features array - minimum 4 features recommended
  features: [
    {
      title: 'Feature Title 1',
      description: 'Feature description explaining what this feature does and its benefits.'
    },
    {
      title: 'Feature Title 2',
      description: 'Feature description explaining what this feature does and its benefits.'
    },
    {
      title: 'Feature Title 3',
      description: 'Feature description explaining what this feature does and its benefits.'
    },
    {
      title: 'Feature Title 4',
      description: 'Feature description explaining what this feature does and its benefits.'
    }
  ],

  // YouTube video embed URL (optional - leave empty string if no video)
  videoUrl: 'https://www.youtube.com/embed/YOUR_VIDEO_ID',

  // Testimonials array (optional - can be empty array)
  testimonials: [
    {
      name: 'Customer Name',
      role: 'Job Title',
      company: 'Company Name',
      quote: 'Testimonial quote from the customer about the product.',
      rating: 5 // Rating from 1 to 5 stars
    }
  ],

  // Version history array (optional - can be empty array)
  versionHistory: [
    {
      version: '1.0.0', // Version number
      date: '2024-01-15', // Date in YYYY-MM-DD format
      changes: [
        'Change description 1',
        'Change description 2',
        'Change description 3'
      ]
    }
  ],

  // FAQs array (optional - can be empty array, defaults will be shown)
  faqs: [
    {
      question: 'Frequently asked question?',
      answer: 'Detailed answer to the question explaining the feature or functionality.'
    }
  ]
};

