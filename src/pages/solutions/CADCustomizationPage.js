import React from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../../components/SEO';

export default function CADCustomizationPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <SEO title="CAD Customization" description="Custom CAD plugins and automation for AutoCAD, Revit, SolidWorks" />
      
      <section className="min-h-[85vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl">
            <h1 className="text-7xl font-bold mb-8">
              CAD
              <span className="block text-yellow-400">Customization</span>
            </h1>
            <p className="text-xl text-gray-300 mb-12">
              Custom plugins, scripts, and automation for AutoCAD, Revit, SolidWorks, and more.
            </p>
            <button 
              onClick={() => navigate('/contact')}
              className="px-10 py-4 bg-yellow-400 text-black rounded-lg font-bold hover:bg-yellow-300"
            >
              Customize CAD
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

