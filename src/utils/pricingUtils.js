/**
 * Pricing Management Utilities
 * Helper functions for managing product pricing
 */

import { productPricing, customProductPricing, getProductPricing, hasCustomPricing } from '../data/products/pricing';

/**
 * Get all products with their pricing information
 * @returns {Array} Array of products with pricing details
 */
export const getAllProductPricing = () => {
    const products = [];

    // Add products with custom pricing
    Object.keys(customProductPricing).forEach(slug => {
        products.push({
            slug,
            hasCustomPricing: true,
            pricing: customProductPricing[slug]
        });
    });

    return products;
};

/**
 * Get pricing comparison for a product
 * @param {string} productSlug - Product slug
 * @returns {object} Comparison of default vs custom pricing
 */
export const getPricingComparison = (productSlug) => {
    const defaultPricing = productPricing;
    const currentPricing = getProductPricing(productSlug);
    const isCustom = hasCustomPricing(productSlug);

    return {
        productSlug,
        isCustom,
        default: defaultPricing,
        current: currentPricing,
        differences: isCustom ? calculateDifferences(defaultPricing, currentPricing) : null
    };
};

/**
 * Calculate price differences between default and custom pricing
 * @param {object} defaultPricing - Default pricing object
 * @param {object} customPricing - Custom pricing object
 * @returns {object} Differences for each tier
 */
const calculateDifferences = (defaultPricing, customPricing) => {
    const differences = {};

    Object.keys(defaultPricing).forEach(tier => {
        if (tier === 'trial') {
            differences[tier] = { difference: 0, percentage: 0 };
            return;
        }

        const defaultPrice = parseFloat(defaultPricing[tier].price.replace('$', '').replace(',', ''));
        const customPrice = parseFloat(customPricing[tier].price.replace('$', '').replace(',', ''));
        const difference = customPrice - defaultPrice;
        const percentage = ((difference / defaultPrice) * 100).toFixed(1);

        differences[tier] = {
            defaultPrice: `$${defaultPrice}`,
            customPrice: `$${customPrice}`,
            difference: `$${difference}`,
            percentage: `${percentage}%`,
            isHigher: difference > 0,
            isLower: difference < 0
        };
    });

    return differences;
};

/**
 * Get pricing summary for all tiers of a product
 * @param {string} productSlug - Product slug
 * @returns {Array} Array of pricing tier summaries
 */
export const getPricingSummary = (productSlug) => {
    const pricing = getProductPricing(productSlug);
    const isCustom = hasCustomPricing(productSlug);

    return Object.entries(pricing).map(([tier, details]) => ({
        tier,
        type: details.type,
        price: details.price,
        description: details.description,
        features: details.features,
        isCustom
    }));
};

/**
 * Generate pricing template for a new product
 * @param {string} productSlug - Product slug
 * @param {object} basePricing - Base pricing to use (optional, defaults to productPricing)
 * @returns {string} JavaScript code for custom pricing
 */
export const generatePricingTemplate = (productSlug, basePricing = null) => {
    const base = basePricing || productPricing;

    const template = `  '${productSlug}': {
    trial: {
      type: 'Trial',
      description: 'No Credit Card Required.',
      price: 'Free',
      ctaText: 'Free Download',
      features: ${JSON.stringify(base.trial.features, null, 6).replace(/\n/g, '\n      ')}
    },
    'locked-single': {
      type: 'Locked-License',
      description: 'Single Machine',
      price: '${base['locked-single'].price}',  // Modify this price
      ctaText: 'Add to Cart',
      features: ${JSON.stringify(base['locked-single'].features, null, 6).replace(/\n/g, '\n      ')}
    },
    'locked-two': {
      type: 'Locked Licenses by Same User',
      description: 'Two Machine',
      price: '${base['locked-two'].price}',  // Modify this price
      ctaText: 'Add to Cart',
      features: ${JSON.stringify(base['locked-two'].features, null, 6).replace(/\n/g, '\n      ')}
    },
    'transferable': {
      type: 'Transferable License',
      description: 'Single Floating',
      price: '${base.transferable.price}',  // Modify this price
      ctaText: 'Add to Cart',
      features: ${JSON.stringify(base.transferable.features, null, 6).replace(/\n/g, '\n      ')}
    },
    automation: {
      type: 'Locked-License',
      description: 'Automation',
      price: '${base.automation.price}',  // Modify this price
      ctaText: 'Add to Cart',
      features: ${JSON.stringify(base.automation.features, null, 6).replace(/\n/g, '\n      ')}
    }
  },`;

    return template;
};

/**
 * Validate pricing object structure
 * @param {object} pricing - Pricing object to validate
 * @returns {object} Validation result
 */
export const validatePricing = (pricing) => {
    const requiredTiers = ['trial', 'locked-single', 'locked-two', 'transferable', 'automation'];
    const requiredFields = ['type', 'description', 'price', 'ctaText', 'features'];

    const errors = [];
    const warnings = [];

    // Check all required tiers exist
    requiredTiers.forEach(tier => {
        if (!pricing[tier]) {
            errors.push(`Missing required tier: ${tier}`);
            return;
        }

        // Check all required fields exist
        requiredFields.forEach(field => {
            if (!pricing[tier][field]) {
                errors.push(`Missing field '${field}' in tier '${tier}'`);
            }
        });

        // Check features is an array
        if (pricing[tier].features && !Array.isArray(pricing[tier].features)) {
            errors.push(`Features must be an array in tier '${tier}'`);
        }

        // Check price format
        if (pricing[tier].price && pricing[tier].price !== 'Free') {
            if (!pricing[tier].price.startsWith('$')) {
                warnings.push(`Price should start with $ in tier '${tier}'`);
            }
        }
    });

    return {
        isValid: errors.length === 0,
        errors,
        warnings
    };
};

/**
 * Get list of all products that should have custom pricing (exporters vs importers)
 * This is a helper to identify which products might need different pricing
 * @returns {object} Categorized product suggestions
 */
export const getPricingSuggestions = () => {
    return {
        exporters: [
            '3d-pdf-exporter',
            'step-exporter',
            'obj-exporter',
            'webgl-exporter',
            'jt-exporter',
            'catia-v5-exporter',
            'json-exporter',
            'revit-step-exporter'
        ],
        importers: [
            'obj-importer'
        ],
        suggestions: {
            exporters: 'Consider higher pricing for exporters (more complex)',
            importers: 'Consider lower pricing for importers (simpler)',
            premium: 'STEP, CATIA, 3D PDF exporters could have premium pricing',
            budget: 'JSON, OBJ importers could have budget pricing'
        }
    };
};

// Export all utilities
export default {
    getAllProductPricing,
    getPricingComparison,
    getPricingSummary,
    generatePricingTemplate,
    validatePricing,
    getPricingSuggestions
};
