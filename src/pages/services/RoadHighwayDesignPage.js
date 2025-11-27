import React from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../../components/SEO';

export default function RoadHighwayDesignPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-yellow-50 text-gray-900 min-h-screen">
      <SEO title="Road and Highway Design" description="Road and highway design and drafting services" />
      
      <section className="min-h-[85vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl">
            <h1 className="text-7xl font-bold mb-8">
              Road & Highway
              <span className="block text-yellow-600">Design</span>
            </h1>
            <p className="text-xl text-gray-700 mb-12">
              Road and highway design and engineering services.
            </p>
            <button 
              onClick={() => navigate('/contact')}
              className="px-10 py-4 bg-yellow-600 text-white rounded-lg font-bold hover:bg-yellow-500"
            >
              Design Road
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

