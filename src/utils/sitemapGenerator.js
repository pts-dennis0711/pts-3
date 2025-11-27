/**
 * Generate sitemap.xml content
 * This should be called server-side or during build time
 */
export const generateSitemap = (data) => {
  const siteUrl = process.env.REACT_APP_SITE_URL || 'https://staging8.prototechsolutions.com';
  const currentDate = new Date().toISOString().split('T')[0];
  
  const urls = [];
  
  // Static pages
  const staticPages = [
    { path: '', priority: '1.0', changefreq: 'daily' },
    { path: '/3d-products', priority: '0.9', changefreq: 'weekly' },
    { path: '/services', priority: '0.9', changefreq: 'weekly' },
    { path: '/solutions', priority: '0.9', changefreq: 'weekly' },
    { path: '/blog', priority: '0.8', changefreq: 'daily' },
    { path: '/about', priority: '0.7', changefreq: 'monthly' },
    { path: '/company', priority: '0.7', changefreq: 'monthly' },
    { path: '/careers', priority: '0.6', changefreq: 'monthly' },
    { path: '/partners', priority: '0.6', changefreq: 'monthly' },
    { path: '/support', priority: '0.7', changefreq: 'monthly' },
    { path: '/resources', priority: '0.7', changefreq: 'weekly' },
  ];
  
  staticPages.forEach(page => {
    urls.push({
      loc: `${siteUrl}${page.path}`,
      lastmod: currentDate,
      changefreq: page.changefreq,
      priority: page.priority
    });
  });
  
  // Product categories
  if (data.productCategories) {
    Object.values(data.productCategories).forEach(category => {
      urls.push({
        loc: `${siteUrl}/3d-products/${category.slug}`,
        lastmod: currentDate,
        changefreq: 'weekly',
        priority: '0.8'
      });
    });
  }
  
  // Products
  if (data.products) {
    data.products.forEach(product => {
      const categorySlug = product.categorySlug || 'products';
      const productSlug = product.slug || product.name?.toLowerCase().replace(/\s+/g, '-');
      urls.push({
        loc: `${siteUrl}/3d-products/${categorySlug}/${productSlug}`,
        lastmod: product.updatedDate || currentDate,
        changefreq: 'monthly',
        priority: '0.7'
      });
    });
  }
  
  // Services
  if (data.services) {
    data.services.forEach(service => {
      const slug = service.slug || service.title?.toLowerCase().replace(/\s+/g, '-');
      urls.push({
        loc: `${siteUrl}/services/${slug}`,
        lastmod: service.updatedDate || currentDate,
        changefreq: 'monthly',
        priority: '0.7'
      });
    });
  }
  
  // Solutions
  if (data.solutions) {
    data.solutions.forEach(solution => {
      const slug = solution.slug || solution.title?.toLowerCase().replace(/\s+/g, '-');
      urls.push({
        loc: `${siteUrl}/solutions/${slug}`,
        lastmod: solution.updatedDate || currentDate,
        changefreq: 'monthly',
        priority: '0.7'
      });
    });
  }
  
  // Blogs
  if (data.blogs) {
    data.blogs.forEach(blog => {
      const slug = blog.slug || `blog-${blog.id}`;
      urls.push({
        loc: `${siteUrl}/blog/${slug}`,
        lastmod: blog.modifiedDate || blog.date || currentDate,
        changefreq: 'monthly',
        priority: '0.6'
      });
    });
  }
  
  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
  
  return xml;
};

/**
 * Generate robots.txt with sitemap reference
 */
export const generateRobotsTxt = () => {
  const siteUrl = process.env.REACT_APP_SITE_URL || 'https://staging8.prototechsolutions.com';
  return `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# Sitemap
Sitemap: ${siteUrl}/sitemap.xml`;
};

