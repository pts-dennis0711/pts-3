import React from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../../components/SEO';

export default function RevitFamilyCreationPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-green-50 text-gray-900 min-h-screen">
      <SEO title="Revit Family Creation" description="Custom Revit family and component creation services" />
      
      <section className="min-h-[85vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl">
            <h1 className="text-7xl font-bold mb-8">
              Revit Family
              <span className="block text-green-600">Creation</span>
            </h1>
            <p className="text-xl text-gray-700 mb-12">
              Custom Revit family and parametric component creation.
            </p>
            <button 
              onClick={() => navigate('/contact')}
              className="px-10 py-4 bg-green-600 text-white rounded-lg font-bold hover:bg-green-500"
            >
              Create Family
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

