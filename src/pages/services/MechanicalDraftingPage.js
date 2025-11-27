import React from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../../components/SEO';

export default function MechanicalDraftingPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-red-50 text-gray-900 min-h-screen">
      <SEO title="Mechanical Drafting" description="Mechanical engineering CAD drafting services" />
      
      <section className="min-h-[85vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl">
            <h1 className="text-7xl font-bold mb-8">
              Mechanical
              <span className="block text-red-600">Drafting</span>
            </h1>
            <p className="text-xl text-gray-700 mb-12">
              Mechanical engineering drafting and documentation services.
            </p>
            <button 
              onClick={() => navigate('/contact')}
              className="px-10 py-4 bg-red-600 text-white rounded-lg font-bold hover:bg-red-500"
            >
              Start Drafting
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

