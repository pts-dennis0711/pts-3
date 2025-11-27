import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Info, ShoppingCart, Download, Lock } from 'lucide-react';
import InfoModal from './modals/PricingInfoModal';

const PricingCard = ({ pricing, productName, onAddToCart }) => {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const navigate = useNavigate();
  const { categorySlug, productSlug } = useParams();

  const isTrial = pricing.type === 'Trial';
  const colorClass = isTrial
    ? 'from-emerald-500 to-teal-500'
    : pricing.type === 'Automation'
      ? 'from-purple-500 to-pink-500'
      : 'from-sky-500 to-cyan-500';

  return (
    <>
      <div className="pricing-card-animate relative group bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-sky-500/50 transition-all duration-300 hover:shadow-[0_20px_60px_rgba(59,130,246,0.3)] hover:transform hover:scale-[1.02] flex flex-col h-full">
        <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${colorClass} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity duration-300`}></div>

        <div className="relative z-10 flex flex-col flex-1">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-1">{pricing.type}</h3>
              <p className="text-sm text-gray-400">{pricing.description}</p>
            </div>
            <button
              onClick={() => setShowInfoModal(true)}
              className="p-1.5 rounded-lg hover:bg-gray-700/50 transition-all text-gray-400 hover:text-sky-400 group/info flex-shrink-0"
              title="More information"
            >
              <Info size={18} className="group-hover/info:scale-110 transition-transform" />
            </button>
          </div>

          {/* Price */}
          <div className="mb-6">
            <div className="text-4xl font-bold text-white mb-2">{pricing.price}</div>
            {!isTrial && <p className="text-sm text-gray-400">One-time payment</p>}
          </div>

          {/* Features - flex-1 to push button to bottom */}
          <ul className="space-y-2 mb-6 flex-1">
            {pricing.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                <span className="text-sky-400 mt-0.5 flex-shrink-0">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          {/* CTA Button - always at bottom */}
          <button
            onClick={() => {
              if (isTrial) {
                // Check if we are on the product page and the trial form exists
                const trialSection = document.getElementById('free-trial');
                if (trialSection) {
                  trialSection.scrollIntoView({ behavior: 'smooth' });
                } else if (categorySlug && productSlug) {
                  // Fallback: navigate to the trial page if not on the product page
                  navigate(`/3d-products/${categorySlug}/${productSlug}/trial`);
                } else {
                  onAddToCart(pricing);
                }
              } else {
                onAddToCart(pricing);
              }
            }}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 mt-auto group/btn ${isTrial
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 hover:shadow-lg hover:shadow-emerald-500/30 hover:scale-105'
                : 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white hover:from-sky-600 hover:to-cyan-600 hover:shadow-lg hover:shadow-sky-500/30 hover:scale-105'
              }`}
          >
            {isTrial ? (
              <>
                <Download size={18} className="group-hover/btn:animate-bounce" />
                <span>{pricing.ctaText}</span>
              </>
            ) : (
              <>
                <ShoppingCart size={18} className="group-hover/btn:scale-110 transition-transform" />
                <span>{pricing.ctaText}</span>
              </>
            )}
          </button>
        </div>
      </div>

      <InfoModal
        isOpen={showInfoModal}
        onClose={() => setShowInfoModal(false)}
        pricing={pricing}
        productName={productName}
      />
    </>
  );
};

export default PricingCard;

