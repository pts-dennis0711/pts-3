import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { initialData } from '../data/initialData';
import { Calendar, User, ArrowRight, Search, BookOpen, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const BlogPage = () => {
  const blogs = useMemo(() => initialData.blogs || [], []);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBlogs, setFilteredBlogs] = useState(blogs);

  useEffect(() => {
    const filtered = blogs.filter(blog =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBlogs(filtered);
  }, [searchQuery, blogs]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Hero section animation
      gsap.from('.blog-hero', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
      });

      // Search section
      gsap.from('.search-section', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.search-section',
          start: 'top 90%',
          toggleActions: 'play none none reverse',
          once: true
        }
      });

      // Blog cards animation
      gsap.utils.toArray('.blog-card').forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 60,
          scale: 0.95,
          duration: 0.8,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
            once: true
          },
          delay: i * 0.1
        });
      });
    });
    return () => ctx.revert();
  }, [filteredBlogs]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <SEO title="Blog - ProtoTech Solutions" description="Latest insights, articles, and updates from ProtoTech Solutions" />

      {/* Hero Section */}
      <section className="relative py-20 md:py-24 bg-gradient-to-br from-gray-900 via-gray-950 to-black border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_60%)]"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 blog-hero">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sky-500/20 bg-sky-500/10 text-sm text-sky-300 mb-6 backdrop-blur-sm">
              <BookOpen size={16} />
              <span>Insights & Articles</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-sky-100 to-purple-100 leading-tight">
              Our Blog
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Stay updated with the latest insights, industry trends, and expert tips from our team
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="search-section py-12 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 placeholder-gray-400 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  ×
                </button>
              )}
            </div>
            <p className="text-sm text-gray-400 mt-4 text-center">
              {filteredBlogs.length} {filteredBlogs.length === 1 ? 'article' : 'articles'} found
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      {filteredBlogs.length > 0 ? (
        <section className="py-16 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog, idx) => (
                <article
                  key={blog.id}
                  className="blog-card group bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-sky-500/50 transition-all duration-300 hover:shadow-[0_20px_60px_rgba(59,130,246,0.3)] hover:transform hover:scale-[1.02] hover:-translate-y-1 flex flex-col"
                >
                  {/* Image/Icon Section */}
                  <div className="relative h-48 bg-gradient-to-br from-sky-600/30 via-purple-600/30 to-pink-600/30 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)]"></div>
                    <div className="text-6xl z-10 group-hover:scale-110 transition-transform duration-300">{blog.image}</div>
                    <div className="absolute top-4 right-4">
                      <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-xs font-semibold text-white">
                        Article
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        <span>{formatDate(blog.date)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <User size={14} />
                        <span>{blog.author}</span>
                      </div>
                    </div>

                    <h2 className="text-2xl font-bold mb-3 text-white group-hover:text-sky-300 transition-colors line-clamp-2">
                      {blog.title}
                    </h2>
                    <p className="text-gray-400 mb-6 leading-relaxed flex-1 line-clamp-3">
                      {blog.excerpt}
                    </p>

                    <Link
                      to={`/blog/${blog.id}`}
                      className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 font-semibold group/link mt-auto"
                    >
                      <span>Read More</span>
                      <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="py-32 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-800/50 border border-gray-700/50 mb-6">
              <Search size={32} className="text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">No articles found</h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Try adjusting your search terms or browse all articles
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="px-6 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors font-semibold"
            >
              Clear Search
            </button>
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.06),transparent_70%)]"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/10 text-sm text-purple-300 mb-4 backdrop-blur-sm">
                <Sparkles size={16} />
                <span>Stay Updated</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Subscribe to Our Newsletter
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
                Get the latest articles, insights, and updates delivered directly to your inbox
              </p>
              <div className="max-w-md mx-auto flex gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-3 bg-gray-700/50 border border-gray-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder-gray-400 transition-all"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl hover:scale-105">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
