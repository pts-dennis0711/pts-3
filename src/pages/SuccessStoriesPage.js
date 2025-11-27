import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { initialData } from '../data/initialData';
import { Building2, TrendingUp, ArrowRight, Star, Award, Search, CheckCircle, Users } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const SuccessStoriesPage = () => {
  const stories = useMemo(() => initialData.successStories || [], []);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredStories, setFilteredStories] = useState(stories);

  useEffect(() => {
    const filtered = stories.filter(story =>
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.client.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredStories(filtered);
  }, [searchQuery, stories]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Hero section animation
      gsap.from('.stories-hero', {
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

      // Story cards animation
      gsap.utils.toArray('.story-card').forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 80,
          scale: 0.95,
          duration: 1,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
            once: true
          },
          delay: i * 0.15
        });
      });
    });
    return () => ctx.revert();
  }, [filteredStories]);

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <SEO title="Success Stories - ProtoTech Solutions" description="Discover how we've helped businesses achieve remarkable results" />

      {/* Hero Section */}
      <section className="relative py-20 md:py-24 bg-gradient-to-br from-gray-900 via-gray-950 to-black border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(234,179,8,0.15),transparent_60%)]"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 stories-hero">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 text-sm text-yellow-300 mb-6 backdrop-blur-sm">
              <Award size={16} className="text-yellow-400" />
              <span>Client Success</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-100 to-emerald-100 leading-tight">
              Success Stories
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Real results from real clients. Discover how we've transformed businesses and driven exceptional outcomes
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
                placeholder="Search success stories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 placeholder-gray-400 transition-all"
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
              {filteredStories.length} {filteredStories.length === 1 ? 'story' : 'stories'} found
            </p>
          </div>
        </div>
      </section>

      {/* Success Stories Grid */}
      {filteredStories.length > 0 ? (
        <section className="py-16 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {filteredStories.map((story, idx) => (
                <div
                  key={story.id}
                  className="story-card group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:border-yellow-500/50 transition-all duration-300 hover:shadow-[0_20px_60px_rgba(234,179,8,0.3)] hover:transform hover:scale-[1.02] hover:-translate-y-1"
                >
                  {/* Background Gradient */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl group-hover:bg-yellow-500/10 transition-all"></div>
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-all"></div>

                  <div className="relative z-10">
                    {/* Icon and Client */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-yellow-500/20 via-emerald-500/20 to-yellow-500/20 flex items-center justify-center border border-yellow-500/30 group-hover:scale-110 transition-transform">
                          <div className="text-3xl">{story.image}</div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Building2 size={14} className="text-gray-400" />
                            <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">{story.client}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-300">
                        Success
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl font-bold mb-4 text-white group-hover:text-yellow-300 transition-colors line-clamp-2">
                      {story.title}
                    </h2>

                    {/* Description */}
                    <p className="text-gray-400 text-lg leading-relaxed mb-6 line-clamp-4">
                      {story.description}
                    </p>

                    {/* Key Results */}
                    <div className="flex flex-wrap gap-3 mb-6">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                        <TrendingUp size={14} className="text-emerald-400" />
                        <span className="text-sm text-emerald-300 font-medium">Results Driven</span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <CheckCircle size={14} className="text-yellow-400" />
                        <span className="text-sm text-yellow-300 font-medium">Verified</span>
                      </div>
                    </div>

                    {/* Read More Link */}
                    <Link
                      to={`/success/${story.id}`}
                      className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 font-semibold group/link"
                    >
                      <span>Read Full Story</span>
                      <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
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
            <h3 className="text-2xl font-bold mb-4 text-white">No stories found</h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Try adjusting your search terms or browse all success stories
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-semibold"
            >
              Clear Search
            </button>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.06),transparent_70%)]"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 text-sm text-yellow-300 mb-4 backdrop-blur-sm">
                <Users size={16} />
                <span>Join Our Success Stories</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Ready to Create Your Success Story?
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
                Let's work together to achieve remarkable results for your business
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  to="/services"
                  className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-yellow-600 hover:to-emerald-600 transition-all shadow-lg hover:shadow-xl hover:scale-105 inline-flex items-center gap-2"
                >
                  <span>Explore Our Services</span>
                  <ArrowRight size={18} />
                </Link>
                <Link
                  to="/company#contact"
                  className="px-8 py-4 bg-gray-700/50 backdrop-blur-sm border border-gray-600 text-white rounded-xl font-semibold hover:bg-gray-700 transition-all inline-flex items-center gap-2"
                >
                  <span>Contact Us</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SuccessStoriesPage;
