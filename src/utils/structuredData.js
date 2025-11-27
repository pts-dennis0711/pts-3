const SITE_URL = process.env.REACT_APP_SITE_URL || 'https://staging8.prototechsolutions.com';
const SITE_NAME = 'ProtoTech Solutions';

/**
 * Generate Organization structured data
 */
export const getOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo512.png`,
  sameAs: [
    'https://www.linkedin.com/company/prototech-solutions-&-services',
    'https://twitter.com/ProtoTechSoln',
    'https://www.facebook.com/PrototechSolutions',
    'https://www.youtube.com/user/PrototechChannel'
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    email: 'support@staging8.prototechsolutions.com'
  }
});

/**
 * Generate Article structured data for blogs
 */
export const getArticleSchema = (blog) => {
  const slug = blog.slug || `blog-${blog.id}`;
  const url = `${SITE_URL}/blog/${slug}`;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: blog.excerpt,
    image: blog.imageUrl || `${SITE_URL}/logo512.png`,
    datePublished: blog.date,
    dateModified: blog.modifiedDate || blog.date,
    author: {
      '@type': 'Person',
      name: blog.author || 'ProtoTech Solutions'
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo512.png`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    },
    articleSection: blog.category || 'Technology',
    keywords: blog.tags?.join(', ') || blog.category || ''
  };
};

/**
 * Generate Product structured data
 */
export const getProductSchema = (product, category, details) => {
  const categorySlug = category?.slug || 'products';
  const productSlug = product?.slug || product?.name?.toLowerCase().replace(/\s+/g, '-');
  const url = `${SITE_URL}/3d-products/${categorySlug}/${productSlug}`;
  
  // Extract price from pricing if available
  const price = details?.pricing?.['locked-single']?.price || '0';
  const numericPrice = parseFloat(price.replace(/[^0-9.]/g, '')) || 0;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `${product.name || details?.name} for ${category?.name || 'CAD'}`,
    description: details?.description || product?.description || `Professional ${product?.name || details?.name} plugin`,
    url: url,
    applicationCategory: 'CADSoftware',
    operatingSystem: details?.compatibility || 'Windows',
    offers: {
      '@type': 'Offer',
      price: numericPrice,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: url
    },
    aggregateRating: details?.testimonials?.length > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      reviewCount: details.testimonials.length
    } : undefined,
    brand: {
      '@type': 'Brand',
      name: SITE_NAME
    },
    category: category?.name || 'CAD Software'
  };
};

/**
 * Generate Service structured data
 */
export const getServiceSchema = (service) => {
  const slug = service.slug || service.title?.toLowerCase().replace(/\s+/g, '-');
  const url = `${SITE_URL}/services/${slug}`;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title || service.name,
    description: service.description || `Professional ${service.title} services`,
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL
    },
    areaServed: 'Worldwide',
    serviceType: 'CAD Services',
    url: url
  };
};

/**
 * Generate BreadcrumbList structured data
 */
export const getBreadcrumbSchema = (items) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
};

/**
 * Generate FAQPage structured data
 */
export const getFAQSchema = (faqs) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
};

/**
 * Generate WebSite structured data with search action
 */
export const getWebSiteSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };
};

