import React from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../../components/SEO';

export default function ArchitecturalDraftingPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-orange-50 text-gray-900 min-h-screen">
      <SEO title="Architectural Drafting" description="Architectural CAD drafting and documentation services" />
      
      <section className="min-h-[85vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl">
            <h1 className="text-7xl font-bold mb-8">
              Architectural
              <span className="block text-orange-600">Drafting</span>
            </h1>
            <p className="text-xl text-gray-700 mb-12">
              Professional architectural drafting and documentation services.
            </p>
            <button 
              onClick={() => navigate('/contact')}
              className="px-10 py-4 bg-orange-600 text-white rounded-lg font-bold hover:bg-orange-500"
            >
              Start Project
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

