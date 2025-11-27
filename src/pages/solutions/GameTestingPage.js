import React from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../../components/SEO';

export default function GameTestingPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-purple-950 text-white min-h-screen">
      <SEO title="Game Testing" description="Quality assurance and testing services for games and interactive applications" />
      
      <section className="min-h-[85vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl">
            <h1 className="text-7xl font-bold mb-8">
              Game
              <span className="block text-purple-400">Testing</span>
            </h1>
            <p className="text-xl text-gray-300 mb-12">
              Professional game testing and QA services. Functional testing, 
              performance testing, and bug reporting for games.
            </p>
            <button 
              onClick={() => navigate('/contact')}
              className="px-10 py-4 bg-purple-500 text-white rounded-lg font-bold hover:bg-purple-400"
            >
              Test Games
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

