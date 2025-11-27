import React from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../../components/SEO';

export default function CADDraftingPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-blue-50 text-gray-900 min-h-screen">
      <SEO title="CAD Drafting Services" description="Professional CAD drafting services for all industries" />
      
      <section className="min-h-[85vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl">
            <h1 className="text-7xl font-bold mb-8">
              CAD
              <span className="block text-blue-600">Drafting</span>
            </h1>
            <p className="text-xl text-gray-700 mb-12">
              Professional CAD drafting services with precision and accuracy.
            </p>
            <button 
              onClick={() => navigate('/contact')}
              className="px-10 py-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-500"
            >
              Get Quote
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

