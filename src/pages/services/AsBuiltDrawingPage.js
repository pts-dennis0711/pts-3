import React from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../../components/SEO';

export default function AsBuiltDrawingPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen">
      <SEO title="As-Built Drawings" description="As-built drawing and documentation services" />
      
      <section className="min-h-[85vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl">
            <h1 className="text-7xl font-bold mb-8">
              As-Built
              <span className="block text-gray-600">Drawings</span>
            </h1>
            <p className="text-xl text-gray-700 mb-12">
              Accurate as-built drawings and documentation services.
            </p>
            <button 
              onClick={() => navigate('/contact')}
              className="px-10 py-4 bg-gray-900 text-white rounded-lg font-bold hover:bg-gray-800"
            >
              Create Drawings
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

