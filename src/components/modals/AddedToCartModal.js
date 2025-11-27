import React from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle, ShoppingCart, ArrowRight } from 'lucide-react';

const AddedToCartModal = ({ isOpen, onClose, product, onContinueShopping, onViewCart }) => {
    if (typeof document === 'undefined' || !isOpen || !product) return null;

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto" onClick={onClose}>
            <div
                className="relative w-full max-w-md bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-gray-800/50 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-emerald-400">
                        <CheckCircle size={20} className="fill-emerald-400/20" />
                        <h2 className="font-semibold">Added to Cart</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-lg hover:bg-gray-700 transition-colors text-gray-400 hover:text-white"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="flex gap-4 mb-6">
                        <div className="w-16 h-16 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center text-2xl">
                            {product.image || '📦'}
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-lg mb-1">{product.name}</h3>
                            <p className="text-gray-400 text-sm mb-2">{product.pricingType}</p>
                            <p className="text-sky-400 font-bold">{product.price}</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <button
                            onClick={onViewCart}
                            className="w-full py-3 px-4 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20"
                        >
                            <ShoppingCart size={18} />
                            <span>View Cart & Checkout</span>
                        </button>

                        <button
                            onClick={onContinueShopping}
                            className="w-full py-3 px-4 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2 border border-gray-700"
                        >
                            <span>Continue Shopping</span>
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    , document.body);
};

export default AddedToCartModal;
