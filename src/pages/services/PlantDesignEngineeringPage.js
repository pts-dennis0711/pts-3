import React from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../../components/SEO';

export default function PlantDesignEngineeringPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-blue-950 text-white min-h-screen">
      <SEO title="Plant Design Engineering" description="Plant design and engineering services" />
      
      <section className="min-h-[85vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl">
            <h1 className="text-7xl font-bold mb-8">
              Plant Design
              <span className="block text-blue-300">Engineering</span>
            </h1>
            <p className="text-xl text-gray-300 mb-12">
              Plant design and engineering services for industrial facilities.
            </p>
            <button 
              onClick={() => navigate('/contact')}
              className="px-10 py-4 bg-blue-400 text-blue-950 rounded-lg font-bold hover:bg-blue-300"
            >
              Design Plant
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

