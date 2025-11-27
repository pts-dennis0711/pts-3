import React from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../../components/SEO';

export default function CADTranslationPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <SEO title="CAD Translation" description="CAD file format translation and conversion services" />
      
      <section className="min-h-[85vh] flex items-center bg-gradient-to-r from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl">
            <h1 className="text-7xl font-bold mb-8">
              CAD
              <span className="block text-gray-600">Translation</span>
            </h1>
            <p className="text-xl text-gray-700 mb-12">
              Convert CAD files between different formats with precision and accuracy.
            </p>
            <button 
              onClick={() => navigate('/contact')}
              className="px-10 py-4 bg-gray-900 text-white rounded-lg font-bold hover:bg-gray-800"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

