import React from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../../components/SEO';

export default function LandSurveyDraftingPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-emerald-50 text-gray-900 min-h-screen">
      <SEO title="Land Survey Drafting" description="Land survey drafting and mapping services" />
      
      <section className="min-h-[85vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl">
            <h1 className="text-7xl font-bold mb-8">
              Land Survey
              <span className="block text-emerald-600">Drafting</span>
            </h1>
            <p className="text-xl text-gray-700 mb-12">
              Land survey drafting and topographic mapping services.
            </p>
            <button 
              onClick={() => navigate('/contact')}
              className="px-10 py-4 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-500"
            >
              Survey Drafting
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

