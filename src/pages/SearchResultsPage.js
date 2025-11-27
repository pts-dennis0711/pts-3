import React from 'react';
import SEO from '../components/SEO';
import { initialData } from '../data/initialData';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

const SearchResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setSelectedProduct } = useStore();
  const params = new URLSearchParams(location.search);
  const query = params.get('q') || '';
  const products = initialData.products || [];

  const normalized = query.trim().toLowerCase();
  const results = normalized
    ? products.filter(p => [p.name, p.description, ...(p.features || [])].join(' ').toLowerCase().includes(normalized))
    : [];

  const onOpenDetail = (product) => {
    setSelectedProduct(product);
    navigate('/product');
  };
  
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <SEO title={`Search - ${query || ''}`} description={`Results for ${query}`} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-4" style={{ color: '#01A5BF' }}>Search results for "{query}"</h1>
        {results.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-xl mb-4">No products found.</p>
            <p className="text-gray-500">Try a different search term.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {results.map(product => (
              <div key={product.id} className="border-2 border-gray-200 rounded-xl p-6 bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-6xl mb-4 text-center">{product.image}</div>
                <div className="font-bold text-lg mb-2 text-gray-800">{product.name}</div>
                <div className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold" style={{ color: '#01A5BF' }}>${product.price}</span>
                </div>
                <button 
                  onClick={() => onOpenDetail(product)} 
                  className="w-full px-4 py-2 rounded-lg text-white font-medium hover:opacity-90 transition-opacity" 
                  style={{ backgroundColor: '#01A5BF' }}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;

