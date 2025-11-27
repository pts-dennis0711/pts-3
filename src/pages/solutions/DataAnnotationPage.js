import React from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../../components/SEO';

export default function DataAnnotationPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-pink-50 text-gray-900 min-h-screen">
      <SEO title="Data Annotation" description="ML data annotation services for images, text, and 3D point clouds" />
      
      <section className="min-h-[85vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl">
            <h1 className="text-7xl font-bold mb-8">
              Data
              <span className="block text-pink-600">Annotation</span>
            </h1>
            <p className="text-xl text-gray-700 mb-12">
              Professional data annotation services for machine learning. 
              Images, text, and 3D point cloud labeling.
            </p>
            <button 
              onClick={() => navigate('/contact')}
              className="px-10 py-4 bg-pink-600 text-white rounded-lg font-bold hover:bg-pink-500"
            >
              Annotate Data
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

