import React from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../../components/SEO';

export default function BIMModelingPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-teal-50 text-gray-900 min-h-screen">
      <SEO title="BIM Modeling Services" description="Building Information Modeling services for AEC projects" />
      
      <section className="min-h-[85vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl">
            <h1 className="text-7xl font-bold mb-8">
              BIM
              <span className="block text-teal-600">Modeling</span>
            </h1>
            <p className="text-xl text-gray-700 mb-12">
              Professional BIM modeling services with LOD 200-400.
            </p>
            <button 
              onClick={() => navigate('/contact')}
              className="px-10 py-4 bg-teal-600 text-white rounded-lg font-bold hover:bg-teal-500"
            >
              Get Quote
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

