import React from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../../components/SEO';

export default function CADtoBIMPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-indigo-50 text-gray-900 min-h-screen">
      <SEO title="CAD to BIM Conversion" description="Convert CAD drawings to BIM models" />
      
      <section className="min-h-[85vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl">
            <h1 className="text-7xl font-bold mb-8">
              CAD to
              <span className="block text-indigo-600">BIM</span>
            </h1>
            <p className="text-xl text-gray-700 mb-12">
              Convert existing CAD drawings to intelligent BIM models.
            </p>
            <button 
              onClick={() => navigate('/contact')}
              className="px-10 py-4 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-500"
            >
              Convert CAD
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

