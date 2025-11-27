import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { initialData } from '../data/initialData';
import { ArrowLeft, Calendar, User, Clock, Share2, Tag, BookOpen } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getArticleSchema, getBreadcrumbSchema } from '../utils/structuredData';

const BlogDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const blog = initialData.blogs.find(b => b.id === parseInt(id));

  useEffect(() => {
    if (!blog) {
      navigate('/blog');
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from('.blog-detail-hero', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
      });

      gsap.from('.blog-content', {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.blog-content',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
          once: true
        }
      });
    });
    return () => ctx.revert();
  }, [blog, navigate]);

  if (!blog) {
    return null;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  // Generate structured data
  const siteUrl = process.env.REACT_APP_SITE_URL || 'https://staging8.prototechsolutions.com';
  const articleSchema = getArticleSchema(blog);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: `${siteUrl}/` },
    { name: 'Blog', url: `${siteUrl}/blog` },
    { name: blog.title, url: `${siteUrl}/blog/${blog.id}` }
  ]);

  // Combine schemas
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [articleSchema, breadcrumbSchema]
  };

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <SEO 
        title={blog.title}
        description={blog.excerpt}
        type="article"
        author={blog.author}
        publishedTime={blog.date}
        tags={[blog.category]}
        structuredData={structuredData}
      />
      
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 bg-gradient-to-br from-gray-900 via-gray-950 to-black border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_60%)]"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl animate-pulse"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 blog-detail-hero">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 mb-8 transition-all group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Blog</span>
          </Link>

          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sky-500/20 bg-sky-500/10 text-sm text-sky-300 mb-6 backdrop-blur-sm">
              <Tag size={14} />
              <span>{blog.category || 'Article'}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-sky-100 to-purple-100 leading-tight">
              {blog.title}
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              {blog.excerpt}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <User size={16} />
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{formatDate(blog.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{blog.readTime || '5 min read'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-8 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-sky-600/30 via-purple-600/30 to-pink-600/30 flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)]"></div>
            <div className="text-9xl z-10">{blog.image}</div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="blog-content py-12 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="prose prose-invert prose-lg max-w-none">
            <div 
              className="text-gray-300 leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: blog.content || `<p>${blog.excerpt}</p><p>Full article content coming soon...</p>` }}
            />
          </article>
        </div>
      </section>

      {/* Share Section */}
      <section className="py-12 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-white">Share this article</h3>
                <p className="text-sm text-gray-400">Help others discover this content</p>
              </div>
              <div className="flex gap-3">
                <button className="p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors border border-gray-600">
                  <Share2 size={18} className="text-gray-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-16 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-8">
            <BookOpen size={20} className="text-sky-400" />
            <h2 className="text-3xl font-bold text-white">Related Articles</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {initialData.blogs
              .filter(b => b.id !== blog.id)
              .slice(0, 3)
              .map((relatedBlog) => (
                <Link
                  key={relatedBlog.id}
                  to={`/blog/${relatedBlog.id}`}
                  className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden hover:border-sky-500/50 transition-all duration-300 hover:shadow-[0_20px_60px_rgba(59,130,246,0.2)] hover:transform hover:scale-[1.02]"
                >
                  <div className="h-32 bg-gradient-to-br from-sky-600/30 via-purple-600/30 to-pink-600/30 flex items-center justify-center">
                    <div className="text-4xl">{relatedBlog.image}</div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-2 text-white group-hover:text-sky-300 transition-colors line-clamp-2">
                      {relatedBlog.title}
                    </h3>
                    <p className="text-sm text-gray-400 line-clamp-2">{relatedBlog.excerpt}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetailPage;

