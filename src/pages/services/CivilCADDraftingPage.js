import React from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../../components/SEO';

export default function CivilCADDraftingPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-lime-50 text-gray-900 min-h-screen">
      <SEO title="Civil CAD Drafting" description="Civil engineering CAD drafting services" />
      
      <section className="min-h-[85vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl">
            <h1 className="text-7xl font-bold mb-8">
              Civil CAD
              <span className="block text-lime-600">Drafting</span>
            </h1>
            <p className="text-xl text-gray-700 mb-12">
              Civil engineering CAD drafting and documentation services.
            </p>
            <button 
              onClick={() => navigate('/contact')}
              className="px-10 py-4 bg-lime-600 text-white rounded-lg font-bold hover:bg-lime-500"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

