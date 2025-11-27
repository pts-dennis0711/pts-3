import React from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../../components/SEO';

export default function BIMCoordinationPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-900 text-white min-h-screen">
      <SEO title="BIM Coordination" description="BIM coordination and clash detection services" />
      
      <section className="min-h-[85vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl">
            <h1 className="text-7xl font-bold mb-8">
              BIM
              <span className="block text-slate-300">Coordination</span>
            </h1>
            <p className="text-xl text-gray-300 mb-12">
              BIM coordination, clash detection, and model federation services.
            </p>
            <button 
              onClick={() => navigate('/contact')}
              className="px-10 py-4 bg-slate-300 text-slate-900 rounded-lg font-bold hover:bg-slate-200"
            >
              Coordinate Models
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

