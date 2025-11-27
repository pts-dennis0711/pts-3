import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, ArrowLeft, Package } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const CartPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { cartItems, cartCount, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCartStore();
  const animationsInitialized = useRef(false);
  const cartItemsLengthRef = useRef(cartItems.length);
  const itemRefs = useRef({});

  // Handle item removal with animation
  const handleRemoveItem = (itemId, pricingType, itemElement) => {
    if (!itemElement) {
      // If no element reference, remove immediately
      removeFromCart(itemId, pricingType);
      return;
    }

    // Kill any existing animations on this specific item only
    gsap.killTweensOf(itemElement);

    // Animate only the specific item being removed
    gsap.to(itemElement, {
      opacity: 0,
      x: -100,
      scale: 0.8,
      height: 0,
      marginBottom: 0,
      paddingTop: 0,
      paddingBottom: 0,
      overflow: 'hidden',
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => {
        // Remove from cart after animation completes
        removeFromCart(itemId, pricingType);
        // Clean up the ref
        const itemKey = `${itemId}-${pricingType || ''}`;
        delete itemRefs.current[itemKey];
      }
    });
  };

  // Only run animations on initial mount or when items are added (not on quantity changes or removals)
  useEffect(() => {
    // Check if items were actually added (not removed or quantity changed)
    const itemsAdded = cartItems.length > cartItemsLengthRef.current;

    if (!animationsInitialized.current || itemsAdded) {
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        // Only animate hero on initial load
        if (!animationsInitialized.current) {
          gsap.from('.cart-hero', {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out'
          });
        }

        // Only animate new items or on initial load
        if (itemsAdded || !animationsInitialized.current) {
          // Get all cart items
          const allItems = document.querySelectorAll('.cart-item');

          if (allItems.length > 0) {
            if (itemsAdded && animationsInitialized.current) {
              // Items were added - animate only the new ones
              const previousLength = cartItemsLengthRef.current;
              const newItems = Array.from(allItems).slice(previousLength);
              if (newItems.length > 0) {
                // Set initial state for new items
                gsap.set(newItems, { opacity: 0, x: -30 });
                // Animate them in
                gsap.to(newItems, {
                  opacity: 1,
                  x: 0,
                  duration: 0.8,
                  ease: 'power3.out',
                  scrollTrigger: {
                    trigger: newItems[0],
                    start: 'top 90%',
                    toggleActions: 'play none none reverse',
                    once: true
                  },
                  stagger: 0.1
                });
              }
            } else if (!animationsInitialized.current) {
              // On initial load, animate all items
              gsap.from(allItems, {
                opacity: 0,
                x: -30,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: allItems[0],
                  start: 'top 90%',
                  toggleActions: 'play none none reverse',
                  once: true
                },
                stagger: 0.1
              });
            }
          }
        }

        // Only animate summary on initial load
        if (!animationsInitialized.current) {
          gsap.from('.cart-summary', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.cart-summary',
              start: 'top 90%',
              toggleActions: 'play none none reverse',
              once: true
            }
          });
        }
      });

      animationsInitialized.current = true;
      cartItemsLengthRef.current = cartItems.length;

      return () => ctx.revert();
    } else if (cartItems.length < cartItemsLengthRef.current) {
      // Item was removed - just update the ref, don't re-animate
      cartItemsLengthRef.current = cartItems.length;
    }
  }, [cartItems.length]); // Only depend on length, not the full cartItems array

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
      return;
    }
    navigate('/checkout');
  };

  const total = getCartTotal();
  const tax = total * 0.1; // 10% tax
  const shipping = total > 0 ? 0 : 0; // Free shipping
  const grandTotal = total + tax + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="bg-gray-950 text-white min-h-screen">
        <SEO title="Shopping Cart - ProtoTech Solutions" description="Your shopping cart" />

        <section className="relative py-20 md:py-24 bg-gradient-to-br from-gray-900 via-gray-950 to-black border-b border-gray-800 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_60%)]"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              to="/3d-products"
              className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 mb-8 transition-all group"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span>Continue Shopping</span>
            </Link>

            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-800/50 border border-gray-700/50 mb-6 mx-auto">
                <ShoppingCart size={40} className="text-gray-400" />
              </div>
              <h1 className="text-4xl font-bold mb-4 text-white">Your Cart is Empty</h1>
              <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
                Start adding products to your cart to begin shopping
              </p>
              <Link
                to="/3d-products"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-sky-500 to-cyan-500 text-white rounded-xl font-semibold hover:from-sky-600 hover:to-cyan-600 transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                <Package size={20} />
                <span>Browse Products</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <SEO title="Shopping Cart - ProtoTech Solutions" description="Review your cart items" />

      {/* Header */}
      <section className="relative py-16 md:py-20 bg-gradient-to-br from-gray-900 via-gray-950 to-black border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_60%)]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 cart-hero">
          <Link
            to="/3d-products"
            className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 mb-8 transition-all group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span>Continue Shopping</span>
          </Link>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-sky-100 to-cyan-100">
                Shopping Cart
              </h1>
              <p className="text-gray-400 text-lg">
                {cartCount} {cartCount === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
            {cartItems.length > 0 && (
              <button
                onClick={clearCart}
                className="px-4 py-2 text-sm text-red-400 hover:text-red-300 border border-red-500/20 hover:border-red-500/40 rounded-lg transition-colors"
              >
                Clear Cart
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-12 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, idx) => {
                const itemKey = `${item.id}-${item.pricingType || idx}`;
                return (
                  <div
                    key={itemKey}
                    ref={(el) => {
                      if (el) {
                        itemRefs.current[itemKey] = el;
                      }
                    }}
                    className="cart-item bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-sky-500/50 transition-all duration-300"
                    style={{ opacity: 1, transform: 'translateX(0)' }}
                  >
                    <div className="flex gap-6">
                      {/* Product Image/Icon */}
                      <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-sky-600/30 via-purple-600/30 to-pink-600/30 flex items-center justify-center flex-shrink-0">
                        <div className="text-4xl">{item.image || '📦'}</div>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-bold mb-1 text-white">{item.name || item.title}</h3>
                            {item.pricingType && (
                              <span className="inline-block px-3 py-1 rounded-lg bg-sky-500/10 border border-sky-500/20 text-xs text-sky-300 font-semibold">
                                {item.pricingType}
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => {
                              const itemKey = `${item.id}-${item.pricingType || idx}`;
                              const itemElement = itemRefs.current[itemKey];
                              handleRemoveItem(item.id, item.pricingType, itemElement);
                            }}
                            className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>

                        {item.description && (
                          <p className="text-gray-400 text-sm mb-4 line-clamp-2">{item.description}</p>
                        )}

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-400">Quantity:</span>
                            <div className="flex items-center gap-2 bg-gray-700/50 rounded-lg border border-gray-600">
                              <button
                                onClick={() => updateQuantity(item.id, item.pricingType, (item.quantity || 1) - 1)}
                                className="p-2 hover:bg-gray-600 transition-colors rounded-l-lg"
                                disabled={(item.quantity || 1) <= 1}
                              >
                                <Minus size={14} className="text-gray-300" />
                              </button>
                              <span className="px-3 py-1 text-white font-semibold min-w-[3rem] text-center">
                                {item.quantity || 1}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.pricingType, (item.quantity || 1) + 1)}
                                className="p-2 hover:bg-gray-600 transition-colors rounded-r-lg"
                              >
                                <Plus size={14} className="text-gray-300" />
                              </button>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-white">
                              ${((parseFloat(item.price?.replace('$', '').replace(',', '') || 0)) * (item.quantity || 1)).toFixed(2)}
                            </div>
                            {item.quantity > 1 && (
                              <div className="text-sm text-gray-400">
                                ${parseFloat(item.price?.replace('$', '').replace(',', '') || 0).toFixed(2)} each
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="cart-summary bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 sticky top-24">
                <h2 className="text-2xl font-bold mb-6 text-white">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span className="text-white">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Tax (10%)</span>
                    <span className="text-white">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Shipping</span>
                    <span className="text-emerald-400">Free</span>
                  </div>
                  <div className="border-t border-gray-700 pt-4 mt-4">
                    <div className="flex justify-between text-xl font-bold text-white">
                      <span>Total</span>
                      <span className="text-sky-400">${grandTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={cartItems.length === 0}
                  className="w-full py-4 px-6 bg-gradient-to-r from-sky-500 to-cyan-500 text-white rounded-xl font-semibold text-lg hover:from-sky-600 hover:to-cyan-600 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-4"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={18} />
                </button>

                <Link
                  to="/3d-products"
                  className="block w-full text-center py-3 px-6 bg-gray-700/50 border border-gray-600 text-white rounded-xl font-semibold hover:bg-gray-700 transition-all"
                >
                  Continue Shopping
                </Link>

                {!isAuthenticated && (
                  <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <p className="text-sm text-yellow-300 mb-2">
                      <strong>Sign in</strong> to save your cart and view order history
                    </p>
                    <Link
                      to="/login"
                      className="text-sm text-yellow-400 hover:text-yellow-300 underline"
                    >
                      Sign in now
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CartPage;

