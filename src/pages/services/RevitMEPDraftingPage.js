import React from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../../components/SEO';

export default function RevitMEPDraftingPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-cyan-50 text-gray-900 min-h-screen">
      <SEO title="Revit MEP Drafting" description="Revit MEP (Mechanical, Electrical, Plumbing) drafting services" />
      
      <section className="min-h-[85vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl">
            <h1 className="text-7xl font-bold mb-8">
              Revit MEP
              <span className="block text-cyan-600">Drafting</span>
            </h1>
            <p className="text-xl text-gray-700 mb-12">
              Revit MEP drafting for mechanical, electrical, and plumbing systems.
            </p>
            <button 
              onClick={() => navigate('/contact')}
              className="px-10 py-4 bg-cyan-600 text-white rounded-lg font-bold hover:bg-cyan-500"
            >
              Start Project
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

