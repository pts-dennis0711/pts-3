import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { initialData } from '../data/initialData';
import { ArrowLeft, Building2, TrendingUp, CheckCircle, Star, Award, Users, Target, Zap } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const SuccessStoryDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const story = initialData.successStories.find(s => s.id === parseInt(id));

  useEffect(() => {
    if (!story) {
      navigate('/success');
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from('.story-detail-hero', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
      });

      gsap.from('.story-section', {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.story-section',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
          once: true
        }
      });

      gsap.utils.toArray('.result-item').forEach((item, i) => {
        gsap.from(item, {
          opacity: 0,
          x: -30,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
            once: true
          },
          delay: i * 0.1
        });
      });
    });
    return () => ctx.revert();
  }, [story, navigate]);

  if (!story) {
    return null;
  }

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <SEO title={`${story.title} - ${story.client} Success Story`} description={story.description} />
      
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 bg-gradient-to-br from-gray-900 via-gray-950 to-black border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(234,179,8,0.15),transparent_60%)]"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 story-detail-hero">
          <Link
            to="/success"
            className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 mb-8 transition-all group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Success Stories</span>
          </Link>

          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 text-sm text-yellow-300 mb-6 backdrop-blur-sm">
              <Award size={14} className="text-yellow-400" />
              <span>Success Story</span>
            </div>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-yellow-500/20 via-emerald-500/20 to-yellow-500/20 flex items-center justify-center border border-yellow-500/30">
                <div className="text-3xl">{story.image}</div>
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2 mb-1">
                  <Building2 size={16} className="text-gray-400" />
                  <span className="text-sm uppercase tracking-wider text-gray-400 font-semibold">{story.client}</span>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-100 to-emerald-100 leading-tight">
              {story.title}
            </h1>
            <p className="text-xl text-gray-300 mb-6 max-w-3xl mx-auto">
              {story.description}
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-300">
              <Target size={14} />
              <span>{story.industry}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="story-section py-16 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 md:p-10">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                <Zap size={24} className="text-red-400" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-4 text-white">The Challenge</h2>
                <p className="text-lg text-gray-300 leading-relaxed">
                  {story.challenge || 'The client faced significant challenges in their operations that required innovative solutions.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="story-section py-16 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 md:p-10">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20">
                <CheckCircle size={24} className="text-sky-400" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-4 text-white">Our Solution</h2>
                <p className="text-lg text-gray-300 leading-relaxed">
                  {story.solution || 'We developed a comprehensive solution tailored to address their specific needs and challenges.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="story-section py-16 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-sm text-emerald-300 mb-4 backdrop-blur-sm">
              <TrendingUp size={16} />
              <span>Results</span>
            </div>
            <h2 className="text-4xl font-bold mb-4 text-white">Measurable Impact</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              The results speak for themselves - here's what we achieved together
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {story.results?.map((result, idx) => (
              <div
                key={idx}
                className="result-item bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-emerald-500/50 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors">
                    <CheckCircle size={20} className="text-emerald-400" />
                  </div>
                  <p className="text-lg font-semibold text-white group-hover:text-emerald-300 transition-colors">
                    {result}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      {story.testimonial && (
        <section className="story-section py-16 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-yellow-500/10 via-emerald-500/10 to-yellow-500/10 backdrop-blur-sm border border-yellow-500/20 rounded-2xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-2xl md:text-3xl font-semibold text-white mb-8 leading-relaxed">
                  "{story.testimonial.quote}"
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-500 to-cyan-500 flex items-center justify-center">
                    <Users size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{story.testimonial.author}</p>
                    <p className="text-sm text-gray-400">{story.testimonial.role} at {story.testimonial.company}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="story-section py-16 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.06),transparent_70%)]"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
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
                  <ArrowLeft size={18} className="rotate-180" />
                </Link>
                <Link
                  to="/company#contact"
                  className="px-8 py-4 bg-gray-700/50 backdrop-blur-sm border border-gray-600 text-white rounded-xl font-semibold hover:bg-gray-700 transition-all"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Stories */}
      <section className="story-section py-16 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-8">
            <Award size={20} className="text-yellow-400" />
            <h2 className="text-3xl font-bold text-white">More Success Stories</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {initialData.successStories
              .filter(s => s.id !== story.id)
              .slice(0, 3)
              .map((relatedStory) => (
                <Link
                  key={relatedStory.id}
                  to={`/success/${relatedStory.id}`}
                  className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300 hover:shadow-[0_20px_60px_rgba(234,179,8,0.2)] hover:transform hover:scale-[1.02]"
                >
                  <div className="h-32 bg-gradient-to-br from-yellow-500/20 via-emerald-500/20 to-yellow-500/20 flex items-center justify-center">
                    <div className="text-4xl">{relatedStory.image}</div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Building2 size={12} className="text-gray-400" />
                      <span className="text-xs text-gray-400">{relatedStory.client}</span>
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-white group-hover:text-yellow-300 transition-colors line-clamp-2">
                      {relatedStory.title}
                    </h3>
                    <p className="text-sm text-gray-400 line-clamp-2">{relatedStory.description}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SuccessStoryDetailPage;

