// Central export file for all product constants
// This file automatically imports and exports all product constant files
// Add new product imports here when creating new product files

// All imports must be at the top of the file
import { productPricing } from './pricing.js';
import { autocad3dPdfExporter } from './autocad/3d-pdf-exporter.js';
import { autocadObjExporter } from './autocad/obj-exporter.js';
import { autocadWebglExporter } from './autocad/webgl-exporter.js';
import { autocadStepExporter } from './autocad/step-exporter.js';
import { autocadDwgDxfCompare } from './autocad/dwg-dxf-compare.js';
import { autocadJtExporter } from './autocad/jt-exporter.js';
import { autocadCatiaV5Exporter } from './autocad/catia-v5-exporter.js';
import { autocadJsonExporter } from './autocad/json-exporter.js';
import { autocadObjImporter } from './autocad/obj-importer.js';

// Revit Products
import { revitStepExporter } from './revit/step-exporter.js';

// Maya Products
import { mayaGltfExporter } from './maya/gltf-exporter.js';
import { mayaGltfImporter } from './maya/gltf-importer.js';

// Pricing is shared across all products
export { productPricing };

// AutoCAD Products - Export individual products
export { autocad3dPdfExporter };
export { autocadObjExporter };
export { autocadWebglExporter };
export { autocadStepExporter };
export { autocadDwgDxfCompare };
export { autocadJtExporter };
export { autocadCatiaV5Exporter };
export { autocadJsonExporter };
export { autocadObjImporter };

// Revit Products - Export individual products
export { revitStepExporter };

// Maya Products - Export individual products
export { mayaGltfExporter };
export { mayaGltfImporter };

// Aggregated product details object
// Map product slugs to their constant objects
// The key must match the product slug used in URLs
export const allProductDetails = {
  // AutoCAD Products
  '3d-pdf-exporter': autocad3dPdfExporter,
  'obj-exporter': autocadObjExporter,
  'webgl-exporter': autocadWebglExporter,
  'step-exporter': autocadStepExporter,
  'dwfdxf-compare': autocadDwgDxfCompare,
  'jt-exporter': autocadJtExporter,
  'catia-v5-exporter': autocadCatiaV5Exporter,
  'json-exporter': autocadJsonExporter,
  'obj-importer': autocadObjImporter,

  // Revit Products
  // Note: Some products have the same slug in different categories
  // The lookup in ProductPage.js uses both categorySlug and productSlug to find the right product
  'revit-step-exporter': revitStepExporter,

  // Maya Products
  'maya-gltf-exporter': mayaGltfExporter,
  'maya-gltf-importer': mayaGltfImporter,

  // Add more products here as you create them
  // Format: 'category-product-slug': productConstant (if same product exists in multiple categories)
  // Or: 'product-slug': productConstant (if unique across all categories)
};
