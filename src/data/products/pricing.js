// Shared pricing information for all products
// Modify prices here to update across all product pages

// DEFAULT PRICING - Used when product doesn't specify custom pricing
export const productPricing = {
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
    price: '$79',
    ctaText: 'Add to Cart',
    features: ['Single machine license', 'Perpetual license', '1 year free updates', 'Email support']
  },
  'locked-two': {
    type: 'Locked Licenses by Same User',
    description: 'Two Machine',
    price: '$150',
    ctaText: 'Add to Cart',
    features: ['Two machine licenses', 'Same user only', 'Perpetual licenses', '1 year free updates']
  },
  'transferable': {
    type: 'Transferable License',
    description: 'Single Floating',
    price: '$249',
    ctaText: 'Add to Cart',
    features: ['Floating license', 'Transferable', 'Network installation', 'Priority support']
  },
  automation: {
    type: 'Locked-License',
    description: 'Automation',
    price: '$599',
    ctaText: 'Add to Cart',
    features: ['Automation features', 'API access', 'Batch processing', 'Custom scripting support', 'Dedicated support']
  }
};

// PRODUCT-SPECIFIC PRICING
// Each product has unique pricing based on complexity, features, and market positioning
// Exporters generally have higher pricing than importers
// Premium/complex formats have higher pricing than simple formats

export const customProductPricing = {
  // ============================================
  // PREMIUM EXPORTERS - Complex formats, high value
  // ============================================

  // 3D PDF Exporter - Premium visual format
  '3d-pdf-exporter': {
    // Optional: Add video URL for this specific product
    videoUrl: 'https://www.youtube.com/embed/your-3d-pdf-video-id',

    trial: {
      type: 'Trial',
      description: 'No Credit Card Required.',
      price: 'Free',
      ctaText: 'Free Download',
      features: ['Full 3D PDF export', '30-day trial period', 'All quality settings', 'Email support']
    },
    'locked-single': {
      type: 'Locked-License',
      description: 'Single Machine',
      price: '$129',
      ctaText: 'Add to Cart',
      features: ['Single machine license', 'High-quality 3D PDF export', 'Password protection', 'Template designer', '1 year updates']
    },
    'locked-two': {
      type: 'Locked Licenses by Same User',
      description: 'Two Machine',
      price: '$240',
      ctaText: 'Add to Cart',
      features: ['Two machine licenses', 'Same user only', 'Advanced mesh quality', 'Custom templates', '1 year updates']
    },
    'transferable': {
      type: 'Transferable License',
      description: 'Single Floating',
      price: '$399',
      ctaText: 'Add to Cart',
      features: ['Floating license', 'Network installation', 'Unlimited templates', 'Priority support', 'Advanced encryption']
    },
    automation: {
      type: 'Locked-License',
      description: 'Automation',
      price: '$899',
      ctaText: 'Add to Cart',
      features: ['Batch PDF generation', 'API integration', 'Custom scripting', 'Automated workflows', 'Dedicated support']
    }
  },

  // STEP Exporter - Industry standard, high complexity
  'step-exporter': {
    trial: {
      type: 'Trial',
      description: 'No Credit Card Required.',
      price: 'Free',
      ctaText: 'Free Download',
      features: ['Full STEP export', '30-day trial period', 'All STEP protocols', 'Email support']
    },
    'locked-single': {
      type: 'Locked-License',
      description: 'Single Machine',
      price: '$119',
      ctaText: 'Add to Cart',
      features: ['Single machine license', 'STEP AP203/AP214 support', 'Solid & surface export', 'Geometry validation', '1 year updates']
    },
    'locked-two': {
      type: 'Locked Licenses by Same User',
      description: 'Two Machine',
      price: '$220',
      ctaText: 'Add to Cart',
      features: ['Two machine licenses', 'Same user only', 'Advanced STEP options', 'Assembly export', '1 year updates']
    },
    'transferable': {
      type: 'Transferable License',
      description: 'Single Floating',
      price: '$369',
      ctaText: 'Add to Cart',
      features: ['Floating license', 'Network deployment', 'All STEP protocols', 'Priority support', 'Quality assurance tools']
    },
    automation: {
      type: 'Locked-License',
      description: 'Automation',
      price: '$849',
      ctaText: 'Add to Cart',
      features: ['Batch STEP conversion', 'API access', 'Custom export profiles', 'Automated validation', 'Dedicated support']
    }
  },

  // CATIA V5 Exporter - Specialized, premium format
  'catia-v5-exporter': {
    trial: {
      type: 'Trial',
      description: 'No Credit Card Required.',
      price: 'Free',
      ctaText: 'Free Download',
      features: ['Full CATIA export', '30-day trial period', 'V5 format support', 'Email support']
    },
    'locked-single': {
      type: 'Locked-License',
      description: 'Single Machine',
      price: '$149',
      ctaText: 'Add to Cart',
      features: ['Single machine license', 'CATIA V5 R14-R30', 'Solid & surface export', 'Assembly structure', '1 year updates']
    },
    'locked-two': {
      type: 'Locked Licenses by Same User',
      description: 'Two Machine',
      price: '$280',
      ctaText: 'Add to Cart',
      features: ['Two machine licenses', 'Same user only', 'Advanced geometry', 'Feature preservation', '1 year updates']
    },
    'transferable': {
      type: 'Transferable License',
      description: 'Single Floating',
      price: '$449',
      ctaText: 'Add to Cart',
      features: ['Floating license', 'Network installation', 'All CATIA versions', 'Priority support', 'Advanced options']
    },
    automation: {
      type: 'Locked-License',
      description: 'Automation',
      price: '$999',
      ctaText: 'Add to Cart',
      features: ['Batch CATIA export', 'API integration', 'Custom workflows', 'Enterprise features', 'Dedicated support']
    }
  },

  // ============================================
  // STANDARD EXPORTERS - Common formats, good value
  // ============================================

  // WEBGL Exporter - Modern web format
  'webgl-exporter': {
    trial: {
      type: 'Trial',
      description: 'No Credit Card Required.',
      price: 'Free',
      ctaText: 'Free Download',
      features: ['Full WebGL export', '30-day trial period', 'Interactive 3D web', 'Email support']
    },
    'locked-single': {
      type: 'Locked-License',
      description: 'Single Machine',
      price: '$99',
      ctaText: 'Add to Cart',
      features: ['Single machine license', 'WebGL 1.0 & 2.0', 'Optimized meshes', 'Texture export', '1 year updates']
    },
    'locked-two': {
      type: 'Locked Licenses by Same User',
      description: 'Two Machine',
      price: '$180',
      ctaText: 'Add to Cart',
      features: ['Two machine licenses', 'Same user only', 'Advanced optimization', 'Custom shaders', '1 year updates']
    },
    'transferable': {
      type: 'Transferable License',
      description: 'Single Floating',
      price: '$299',
      ctaText: 'Add to Cart',
      features: ['Floating license', 'Network installation', 'Compression options', 'Priority support', 'Web viewer included']
    },
    automation: {
      type: 'Locked-License',
      description: 'Automation',
      price: '$699',
      ctaText: 'Add to Cart',
      features: ['Batch WebGL export', 'API access', 'Custom pipelines', 'CDN integration', 'Dedicated support']
    }
  },

  // JT Exporter - Industrial format
  'jt-exporter': {
    trial: {
      type: 'Trial',
      description: 'No Credit Card Required.',
      price: 'Free',
      ctaText: 'Free Download',
      features: ['Full JT export', '30-day trial period', 'JT Open format', 'Email support']
    },
    'locked-single': {
      type: 'Locked-License',
      description: 'Single Machine',
      price: '$109',
      ctaText: 'Add to Cart',
      features: ['Single machine license', 'JT 9.5/10.x support', 'B-Rep & tessellation', 'PMI export', '1 year updates']
    },
    'locked-two': {
      type: 'Locked Licenses by Same User',
      description: 'Two Machine',
      price: '$200',
      ctaText: 'Add to Cart',
      features: ['Two machine licenses', 'Same user only', 'Advanced JT options', 'Assembly structure', '1 year updates']
    },
    'transferable': {
      type: 'Transferable License',
      description: 'Single Floating',
      price: '$339',
      ctaText: 'Add to Cart',
      features: ['Floating license', 'Network deployment', 'All JT versions', 'Priority support', 'Lightweight export']
    },
    automation: {
      type: 'Locked-License',
      description: 'Automation',
      price: '$799',
      ctaText: 'Add to Cart',
      features: ['Batch JT conversion', 'API integration', 'Custom LOD settings', 'Automated workflows', 'Dedicated support']
    }
  },

  // OBJ Exporter - Common 3D format
  'obj-exporter': {
    trial: {
      type: 'Trial',
      description: 'No Credit Card Required.',
      price: 'Free',
      ctaText: 'Free Download',
      features: ['Full OBJ export', '30-day trial period', 'Material export', 'Email support']
    },
    'locked-single': {
      type: 'Locked-License',
      description: 'Single Machine',
      price: '$89',
      ctaText: 'Add to Cart',
      features: ['Single machine license', 'OBJ & MTL export', 'Texture mapping', 'Normal export', '1 year updates']
    },
    'locked-two': {
      type: 'Locked Licenses by Same User',
      description: 'Two Machine',
      price: '$160',
      ctaText: 'Add to Cart',
      features: ['Two machine licenses', 'Same user only', 'Advanced tessellation', 'Group export', '1 year updates']
    },
    'transferable': {
      type: 'Transferable License',
      description: 'Single Floating',
      price: '$269',
      ctaText: 'Add to Cart',
      features: ['Floating license', 'Network installation', 'Mesh optimization', 'Priority support', 'Batch export']
    },
    automation: {
      type: 'Locked-License',
      description: 'Automation',
      price: '$649',
      ctaText: 'Add to Cart',
      features: ['Automated OBJ export', 'API access', 'Custom mesh settings', 'Scripting support', 'Dedicated support']
    }
  },

  // ============================================
  // BUDGET EXPORTERS - Simple formats, accessible pricing
  // ============================================

  // JSON Exporter - Lightweight data format
  'json-exporter': {
    trial: {
      type: 'Trial',
      description: 'No Credit Card Required.',
      price: 'Free',
      ctaText: 'Free Download',
      features: ['Full JSON export', '30-day trial period', 'Geometry data', 'Email support']
    },
    'locked-single': {
      type: 'Locked-License',
      description: 'Single Machine',
      price: '$69',
      ctaText: 'Add to Cart',
      features: ['Single machine license', 'JSON geometry export', 'Custom schemas', 'Metadata export', '1 year updates']
    },
    'locked-two': {
      type: 'Locked Licenses by Same User',
      description: 'Two Machine',
      price: '$130',
      ctaText: 'Add to Cart',
      features: ['Two machine licenses', 'Same user only', 'Advanced formatting', 'Compression options', '1 year updates']
    },
    'transferable': {
      type: 'Transferable License',
      description: 'Single Floating',
      price: '$229',
      ctaText: 'Add to Cart',
      features: ['Floating license', 'Network installation', 'Custom templates', 'Priority support', 'API ready']
    },
    automation: {
      type: 'Locked-License',
      description: 'Automation',
      price: '$549',
      ctaText: 'Add to Cart',
      features: ['Batch JSON export', 'REST API', 'Custom pipelines', 'Database integration', 'Dedicated support']
    }
  },

  // ============================================
  // IMPORTERS - Lower pricing, simpler functionality
  // ============================================

  // OBJ Importer - Common import format
  'obj-importer': {
    trial: {
      type: 'Trial',
      description: 'No Credit Card Required.',
      price: 'Free',
      ctaText: 'Free Download',
      features: ['Full OBJ import', '30-day trial period', 'Material import', 'Email support']
    },
    'locked-single': {
      type: 'Locked-License',
      description: 'Single Machine',
      price: '$59',
      ctaText: 'Add to Cart',
      features: ['Single machine license', 'OBJ & MTL import', 'Texture mapping', 'Mesh repair', '1 year updates']
    },
    'locked-two': {
      type: 'Locked Licenses by Same User',
      description: 'Two Machine',
      price: '$110',
      ctaText: 'Add to Cart',
      features: ['Two machine licenses', 'Same user only', 'Advanced import options', 'Scale control', '1 year updates']
    },
    'transferable': {
      type: 'Transferable License',
      description: 'Single Floating',
      price: '$199',
      ctaText: 'Add to Cart',
      features: ['Floating license', 'Network installation', 'Batch import', 'Priority support', 'Mesh optimization']
    },
    automation: {
      type: 'Locked-License',
      description: 'Automation',
      price: '$499',
      ctaText: 'Add to Cart',
      features: ['Automated import', 'API access', 'Custom workflows', 'Folder monitoring', 'Dedicated support']
    }
  },

  // ============================================
  // SPECIALIZED TOOLS - Unique pricing
  // ============================================

  // DWG/DXF Compare - Specialized comparison tool
  'dwfdxf-compare': {
    trial: {
      type: 'Trial',
      description: 'No Credit Card Required.',
      price: 'Free',
      ctaText: 'Free Download',
      features: ['Full comparison', '30-day trial period', 'Visual diff', 'Email support']
    },
    'locked-single': {
      type: 'Locked-License',
      description: 'Single Machine',
      price: '$79',
      ctaText: 'Add to Cart',
      features: ['Single machine license', 'DWG & DXF compare', 'Visual highlighting', 'Detailed reports', '1 year updates']
    },
    'locked-two': {
      type: 'Locked Licenses by Same User',
      description: 'Two Machine',
      price: '$150',
      ctaText: 'Add to Cart',
      features: ['Two machine licenses', 'Same user only', 'Advanced filtering', 'Custom reports', '1 year updates']
    },
    'transferable': {
      type: 'Transferable License',
      description: 'Single Floating',
      price: '$249',
      ctaText: 'Add to Cart',
      features: ['Floating license', 'Network installation', 'Batch comparison', 'Priority support', 'Export reports']
    },
    automation: {
      type: 'Locked-License',
      description: 'Automation',
      price: '$599',
      ctaText: 'Add to Cart',
      features: ['Automated comparison', 'API integration', 'Scheduled checks', 'Email alerts', 'Dedicated support']
    }
  },

  // ============================================
  // REVIT PRODUCTS
  // ============================================

  // Revit STEP Exporter - Revit-specific premium exporter
  'revit-step-exporter': {
    trial: {
      type: 'Trial',
      description: 'No Credit Card Required.',
      price: 'Free',
      ctaText: 'Free Download',
      features: ['Full STEP export', '30-day trial period', 'Revit integration', 'Email support']
    },
    'locked-single': {
      type: 'Locked-License',
      description: 'Single Machine',
      price: '$139',
      ctaText: 'Add to Cart',
      features: ['Single machine license', 'STEP AP203/AP214', 'BIM data export', 'Family export', '1 year updates']
    },
    'locked-two': {
      type: 'Locked Licenses by Same User',
      description: 'Two Machine',
      price: '$260',
      ctaText: 'Add to Cart',
      features: ['Two machine licenses', 'Same user only', 'Advanced BIM export', 'Project structure', '1 year updates']
    },
    'transferable': {
      type: 'Transferable License',
      description: 'Single Floating',
      price: '$429',
      ctaText: 'Add to Cart',
      features: ['Floating license', 'Network deployment', 'Multi-project export', 'Priority support', 'BIM coordination']
    },
    automation: {
      type: 'Locked-License',
      description: 'Automation',
      price: '$949',
      ctaText: 'Add to Cart',
      features: ['Batch BIM export', 'Dynamo integration', 'Custom workflows', 'Automated coordination', 'Dedicated support']
    }
  },
};

/**
 * Get pricing for a specific product
 * @param {string} productSlug - The product slug (e.g., 'step-exporter', 'obj-importer')
 * @returns {object} - Pricing object for the product
 */
export const getProductPricing = (productSlug) => {
  // Check if product has custom pricing
  if (customProductPricing[productSlug]) {
    return customProductPricing[productSlug];
  }

  // Return default pricing
  return productPricing;
};

/**
 * Check if a product has custom pricing
 * @param {string} productSlug - The product slug
 * @returns {boolean} - True if product has custom pricing
 */
export const hasCustomPricing = (productSlug) => {
  return !!customProductPricing[productSlug];
};
