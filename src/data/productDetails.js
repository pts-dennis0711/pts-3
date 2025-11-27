// Product-specific details including pricing, features, and additional information
// This file now imports from individual constant files in src/data/products/
// Each product has its own file making it easy to modify product-specific data

import { allProductDetails, productPricing } from './products/constants';

// Export the aggregated product details
// All product data is stored in individual files in src/data/products/
// Modify individual product files to update product details on the webpage
export const productDetails = allProductDetails;

// Export pricing (shared across all products)
export { productPricing };

// Helper function to get product slug from name
// This converts product names to slugs: "3D PDF Exporter" → "3d-pdf-exporter"
export const getProductSlug = (productName) => {
  return productName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
};

// Get product details by slug
export const getProductDetails = (productSlug) => {
  return productDetails[productSlug] || null;
};
