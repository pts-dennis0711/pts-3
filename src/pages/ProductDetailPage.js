import React from 'react';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';

const ProductDetailPage = () => {
  const { selectedProduct, addToCart } = useStore();
  const navigate = useNavigate();
  const product = selectedProduct;

  if (!product) {
    navigate('/products');
    return null;
  }
  
  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <SEO title={`${product.name} - Details`} description={product.description} />
      <section className="relative py-10 bg-gradient-to-br from-gray-900 via-gray-950 to-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={() => navigate('/products')} 
            className="mb-6 px-6 py-3 rounded-lg bg-white text-gray-900 font-medium hover:bg-gray-100 transition-colors flex items-center gap-2 shadow-lg"
          >
            <ArrowLeft size={20} />
            Back to Shop
          </button>
        </div>
      </section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 gap-12 bg-white rounded-2xl shadow-xl p-8 border border-gray-200 text-gray-900">
          <div className="flex items-center justify-center text-9xl bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl h-80 border-2 border-gray-200">
            {product.image}
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">{product.description}</p>
            <div className="text-4xl font-bold mb-8 text-[#01A5BF]">${product.price}</div>
            
            {product.features && (
              <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="font-bold text-xl mb-4 text-[#01A5BF]">Features</h3>
                <ul className="space-y-2">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-center text-gray-700">
                      <span className="w-2 h-2 rounded-full mr-3 bg-[#01A5BF]"></span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {product.specs && (
              <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="font-bold text-xl mb-4 text-[#01A5BF]">Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(product.specs).map(([k, v]) => (
                    <div key={k} className="flex justify-between items-center p-2 bg-white rounded-lg">
                      <span className="capitalize font-medium text-gray-700">{k}</span>
                      <span className="font-semibold text-[#01A5BF]">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <button 
              onClick={() => addToCart(product)} 
              className="w-full px-8 py-4 rounded-lg bg-[#01A5BF] text-white font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg flex items-center justify-center gap-2 transform hover:scale-105 transition-transform"
            >
              <ShoppingCart size={24} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

