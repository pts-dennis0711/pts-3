import React from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../../components/SEO';

export default function QualityAssurancePage() {
  const navigate = useNavigate();

  return (
    <div className="bg-green-50 text-gray-900 min-h-screen">
      <SEO title="Quality Assurance" description="QA and testing services for applications and data pipelines" />
      
      <section className="min-h-[85vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl">
            <h1 className="text-7xl font-bold mb-8">
              Quality
              <span className="block text-green-600">Assurance</span>
            </h1>
            <p className="text-xl text-gray-700 mb-12">
              Comprehensive QA and testing services. Manual and automated testing 
              for applications and data pipelines.
            </p>
            <button 
              onClick={() => navigate('/contact')}
              className="px-10 py-4 bg-green-600 text-white rounded-lg font-bold hover:bg-green-500"
            >
              QA Services
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

