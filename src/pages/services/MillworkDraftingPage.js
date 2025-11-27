import React from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../../components/SEO';

export default function MillworkDraftingPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-amber-50 text-gray-900 min-h-screen">
      <SEO title="Millwork Drafting" description="Custom millwork and woodworking CAD drafting services" />
      
      <section className="min-h-[85vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl">
            <h1 className="text-7xl font-bold mb-8">
              Millwork
              <span className="block text-amber-600">Drafting</span>
            </h1>
            <p className="text-xl text-gray-700 mb-12">
              Precision millwork drafting for custom woodworking projects.
            </p>
            <button 
              onClick={() => navigate('/contact')}
              className="px-10 py-4 bg-amber-600 text-white rounded-lg font-bold hover:bg-amber-500"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

