import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEO = ({ 
  title, 
  description, 
  image, 
  type = 'website',
  author,
  publishedTime,
  modifiedTime,
  tags = [],
  canonical,
  noindex = false,
  structuredData
}) => {
  const location = useLocation();
  const siteUrl = process.env.REACT_APP_SITE_URL || 'https://staging8.prototechsolutions.com';
  const siteName = 'ProtoTech Solutions';
  const twitterHandle = '@ProtoTechSoln';
  
  // Generate canonical URL
  const canonicalUrl = canonical || `${siteUrl}${location.pathname}`;
  
  // Default image
  const ogImage = image || `${siteUrl}/logo512.png`;
  
  // Full title with site name
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} - CAD Solutions & Services`;

  useEffect(() => {
    // Set document title
    document.title = fullTitle;

    // Helper function to set or update meta tag
    const setMetaTag = (name, content, attribute = 'name') => {
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Helper function to set or update link tag
    const setLinkTag = (rel, href) => {
      let link = document.querySelector(`link[rel="${rel}"]`);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    };

    // Basic meta tags
    setMetaTag('description', description || 'ProtoTech Solutions - CAD plugins, BIM services, and 3D solutions');
    setMetaTag('robots', noindex ? 'noindex, nofollow' : 'index, follow');
    setMetaTag('author', author || siteName);
    
    // Canonical URL
    setLinkTag('canonical', canonicalUrl);

    // Open Graph tags
    setMetaTag('og:title', title || fullTitle, 'property');
    setMetaTag('og:description', description || 'ProtoTech Solutions - CAD plugins, BIM services, and 3D solutions', 'property');
    setMetaTag('og:image', ogImage, 'property');
    setMetaTag('og:url', canonicalUrl, 'property');
    setMetaTag('og:type', type, 'property');
    setMetaTag('og:site_name', siteName, 'property');
    setMetaTag('og:locale', 'en_US', 'property');
    
    if (type === 'article' && publishedTime) {
      setMetaTag('article:published_time', publishedTime, 'property');
      if (modifiedTime) {
        setMetaTag('article:modified_time', modifiedTime, 'property');
      }
      if (author) {
        setMetaTag('article:author', author, 'property');
      }
      tags.forEach(tag => {
        const tagMeta = document.createElement('meta');
        tagMeta.setAttribute('property', 'article:tag');
        tagMeta.setAttribute('content', tag);
        document.head.appendChild(tagMeta);
      });
    }

    // Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:site', twitterHandle);
    setMetaTag('twitter:creator', twitterHandle);
    setMetaTag('twitter:title', title || fullTitle);
    setMetaTag('twitter:description', description || 'ProtoTech Solutions - CAD plugins, BIM services, and 3D solutions');
    setMetaTag('twitter:image', ogImage);

    // Structured Data (JSON-LD)
    if (structuredData) {
      // Remove existing structured data script
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) {
        existingScript.remove();
      }
      
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    // Cleanup function
    return () => {
      // Clean up article tags on unmount
      if (type === 'article') {
        const articleTags = document.querySelectorAll('meta[property^="article:"]');
        articleTags.forEach(tag => tag.remove());
      }
    };
  }, [title, description, image, type, author, publishedTime, modifiedTime, tags, canonical, noindex, structuredData, fullTitle, canonicalUrl, ogImage, siteName, twitterHandle, location.pathname]);

  return null;
};

export default SEO;

