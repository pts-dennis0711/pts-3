import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../../components/SEO';
import { gsap } from 'gsap';

export default function DataInteroperabilityPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-indigo-950 via-blue-900 to-indigo-950 text-white min-h-screen">
      <SEO title="Data Interoperability" description="IFC, STEP, USDZ data interoperability and conversion services" />
      
      <section className="relative min-h-[85vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl">
            <div className="text-blue-400 font-mono mb-6">DATA INTEROPERABILITY</div>
            <h1 className="text-7xl md:text-8xl font-bold mb-8">
              Data
              <br />
              <span className="text-blue-400">Interoperability</span>
            </h1>
            <p className="text-xl text-gray-300 mb-12">
              Seamless data exchange between different CAD and BIM formats. 
              Support for IFC, STEP, USDZ, and many more formats.
            </p>
            <button 
              onClick={() => navigate('/contact')}
              className="px-10 py-4 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-400"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-indigo-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-bold mb-16 text-center">Supported Formats</h2>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {['IFC', 'STEP', 'USDZ', 'DWG', 'DXF', 'OBJ', 'STL', 'PLY', 'FBX', '3DS', 'SKP', 'RVT', 'NWD', 'DGN', 'PDF', 'IGES'].map((format, idx) => (
              <div key={idx} className="bg-indigo-800 border border-indigo-700 rounded-lg p-4 text-center">
                <div className="text-sm font-bold">{format}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

