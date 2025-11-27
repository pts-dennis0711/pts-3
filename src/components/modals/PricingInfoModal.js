import React from 'react';
import { X, CheckCircle, Lock } from 'lucide-react';

const PricingInfoModal = ({ isOpen, onClose, pricing, productName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-2xl bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-gray-900 border-b border-gray-700 px-6 py-4 flex items-center justify-between backdrop-blur-sm z-10">
          <div>
            <h2 className="text-2xl font-bold text-white">{pricing.type}</h2>
            <p className="text-gray-400 text-sm mt-1">{pricing.description} - {productName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="text-3xl font-bold text-white mb-2">{pricing.price}</div>
            {pricing.type !== 'Trial' && (
              <p className="text-sm text-gray-400">One-time payment, perpetual license</p>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">What's Included:</h3>
              <ul className="space-y-2">
                {pricing.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-300">
                    <CheckCircle size={20} className="text-sky-400 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {pricing.type !== 'Trial' && (
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 mt-6">
                <div className="flex items-start gap-3">
                  <Lock size={20} className="text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-1">License Terms</h4>
                    <p className="text-sm text-gray-400">
                      {pricing.type === 'Locked-License' 
                        ? 'This license is tied to a specific machine and cannot be transferred. Includes 1 year of free updates and support.'
                        : pricing.type === 'Locked Licenses by Same User'
                        ? 'Two machine licenses for the same user. Each license is tied to its machine. Includes 1 year of free updates and support.'
                        : pricing.type === 'Transferable License'
                        ? 'Floating license that can be transferred between machines. Includes 1 year of free updates and priority support.'
                        : 'Includes automation features, API access, and dedicated support. Includes 1 year of free updates.'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="sticky bottom-0 bg-gray-900 border-t border-gray-700 px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingInfoModal;

