import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { CreditCard, Lock, ArrowLeft, CheckCircle, Mail, MapPin, Phone, User, Wallet } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createOrder } from '../services/orderService';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const { cartItems, getCartTotal, clearCart } = useCartStore();
  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    saveCard: false,
    paymentMethod: 'credit_card', // 'credit_card', 'razorpay', 'paypal'
  });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
      return;
    }

    if (cartItems.length === 0) {
      navigate('/cart');
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from('.checkout-hero', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
      });

      gsap.from('.checkout-section', {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.checkout-section',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
          once: true
        }
      });
    });
    return () => ctx.revert();
  }, [isAuthenticated, cartItems.length, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'Zip code is required';
    if (formData.paymentMethod === 'credit_card') {
      if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
      if (!formData.cardName.trim()) newErrors.cardName = 'Cardholder name is required';
      if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
      if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    try {
      // Create order object
      const total = getCartTotal();
      const tax = total * 0.1;
      const grandTotal = total + tax;

      const order = {
        id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        userId: user?.id,
        sessionId: useAuthStore.getState().sessionId,
        items: cartItems,
        shipping: formData,
        payment: {
          method: formData.paymentMethod,
          ...(formData.paymentMethod === 'credit_card' ? {
            cardNumber: `****${formData.cardNumber.slice(-4)}`,
            cardName: formData.cardName,
          } : {}),
        },
        total: total,
        tax: tax,
        grandTotal: grandTotal,
        paymentMethod: formData.paymentMethod,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      // Customer data
      const customer = {
        userId: user?.id,
        sessionId: useAuthStore.getState().sessionId,
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
      };

      // Save to database
      try {
        await createOrder(order, customer);
        console.log('✅ Order saved to database');
      } catch (dbError) {
        console.error('⚠️ Failed to save to database, using localStorage fallback:', dbError);
      }

      // Also save to localStorage as backup
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      orders.push(order);
      localStorage.setItem('orders', JSON.stringify(orders));
      localStorage.setItem(`order_${order.id}`, JSON.stringify(order));

      // Clear cart
      clearCart();

      setOrderPlaced(true);

      // Redirect to order confirmation after 2 seconds
      setTimeout(() => {
        navigate(`/order/${order.id}`);
      }, 2000);
    } catch (err) {
      console.error('Error during checkout:', err);
      setErrors({ submit: 'An error occurred. Please try again.' });
    } finally {
      setIsProcessing(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="bg-gray-950 text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-emerald-500/20 border border-emerald-500/30 mb-6">
            <CheckCircle size={48} className="text-emerald-400" />
          </div>
          <h1 className="text-4xl font-bold mb-4 text-white">Order Placed!</h1>
          <p className="text-gray-400 text-lg">Redirecting to order confirmation...</p>
        </div>
      </div>
    );
  }

  const total = getCartTotal();
  const tax = total * 0.1;
  const grandTotal = total + tax;

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <SEO title="Checkout - ProtoTech Solutions" description="Complete your purchase" />

      {/* Header */}
      <section className="relative py-16 bg-gradient-to-br from-gray-900 via-gray-950 to-black border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_60%)]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 checkout-hero">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 mb-8 transition-all group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Cart</span>
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-sky-100 to-cyan-100">
            Checkout
          </h1>
          <p className="text-gray-400 text-lg">
            Complete your purchase securely
          </p>
        </div>
      </section>

      {/* Checkout Form */}
      <section className="checkout-section py-12 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Shipping Information */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin size={20} className="text-sky-400" />
                  <h2 className="text-2xl font-bold text-white">Shipping Information</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      First Name *
                    </label>
                    <input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-gray-700/50 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-sky-500 placeholder-gray-400 transition-all ${errors.firstName ? 'border-red-500' : 'border-gray-600'
                        }`}
                      placeholder="John"
                    />
                    {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Last Name *
                    </label>
                    <input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-gray-700/50 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-sky-500 placeholder-gray-400 transition-all ${errors.lastName ? 'border-red-500' : 'border-gray-600'
                        }`}
                      placeholder="Doe"
                    />
                    {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full pl-12 pr-4 py-3 bg-gray-700/50 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-sky-500 placeholder-gray-400 transition-all ${errors.email ? 'border-red-500' : 'border-gray-600'
                          }`}
                        placeholder="john@example.com"
                      />
                    </div>
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full pl-12 pr-4 py-3 bg-gray-700/50 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-sky-500 placeholder-gray-400 transition-all ${errors.phone ? 'border-red-500' : 'border-gray-600'
                          }`}
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                    {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Address *
                    </label>
                    <input
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-gray-700/50 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-sky-500 placeholder-gray-400 transition-all ${errors.address ? 'border-red-500' : 'border-gray-600'
                        }`}
                      placeholder="123 Main Street"
                    />
                    {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      City *
                    </label>
                    <input
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-gray-700/50 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-sky-500 placeholder-gray-400 transition-all ${errors.city ? 'border-red-500' : 'border-gray-600'
                        }`}
                      placeholder="New York"
                    />
                    {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      State *
                    </label>
                    <input
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-gray-700/50 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-sky-500 placeholder-gray-400 transition-all ${errors.state ? 'border-red-500' : 'border-gray-600'
                        }`}
                      placeholder="NY"
                    />
                    {errors.state && <p className="text-red-400 text-xs mt-1">{errors.state}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Zip Code *
                    </label>
                    <input
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-gray-700/50 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-sky-500 placeholder-gray-400 transition-all ${errors.zipCode ? 'border-red-500' : 'border-gray-600'
                        }`}
                      placeholder="10001"
                    />
                    {errors.zipCode && <p className="text-red-400 text-xs mt-1">{errors.zipCode}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Country
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                    </select>
                  </div>
                </div>
              </div>



              {/* Payment Method Selection */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Wallet size={20} className="text-sky-400" />
                  <h2 className="text-2xl font-bold text-white">Payment Method</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'credit_card' })}
                    className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${formData.paymentMethod === 'credit_card'
                      ? 'bg-sky-500/10 border-sky-500 text-sky-400'
                      : 'bg-gray-700/30 border-gray-600 text-gray-400 hover:bg-gray-700/50'
                      }`}
                  >
                    <CreditCard size={24} />
                    <span className="font-semibold">Credit Card</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'razorpay' })}
                    className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${formData.paymentMethod === 'razorpay'
                      ? 'bg-blue-500/10 border-blue-500 text-blue-400'
                      : 'bg-gray-700/30 border-gray-600 text-gray-400 hover:bg-gray-700/50'
                      }`}
                  >
                    <div className="font-bold text-xl">Razorpay</div>
                    <span className="text-xs">UPI, NetBanking</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'paypal' })}
                    className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${formData.paymentMethod === 'paypal'
                      ? 'bg-indigo-500/10 border-indigo-500 text-indigo-400'
                      : 'bg-gray-700/30 border-gray-600 text-gray-400 hover:bg-gray-700/50'
                      }`}
                  >
                    <div className="font-bold text-xl italic">PayPal</div>
                    <span className="text-xs">International</span>
                  </button>
                </div>

                {/* Conditional Payment Fields */}
                {formData.paymentMethod === 'credit_card' && (
                  <div className="space-y-4 animate-fadeIn">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Card Number *
                      </label>
                      <input
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        maxLength="19"
                        placeholder="1234 5678 9012 3456"
                        className={`w-full px-4 py-3 bg-gray-700/50 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-sky-500 placeholder-gray-400 transition-all ${errors.cardNumber ? 'border-red-500' : 'border-gray-600'
                          }`}
                      />
                      {errors.cardNumber && <p className="text-red-400 text-xs mt-1">{errors.cardNumber}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Cardholder Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleChange}
                          className={`w-full pl-12 pr-4 py-3 bg-gray-700/50 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-sky-500 placeholder-gray-400 transition-all ${errors.cardName ? 'border-red-500' : 'border-gray-600'
                            }`}
                          placeholder="John Doe"
                        />
                      </div>
                      {errors.cardName && <p className="text-red-400 text-xs mt-1">{errors.cardName}</p>}
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Expiry Date *
                        </label>
                        <input
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleChange}
                          placeholder="MM/YY"
                          maxLength="5"
                          className={`w-full px-4 py-3 bg-gray-700/50 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-sky-500 placeholder-gray-400 transition-all ${errors.expiryDate ? 'border-red-500' : 'border-gray-600'
                            }`}
                        />
                        {errors.expiryDate && <p className="text-red-400 text-xs mt-1">{errors.expiryDate}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          CVV *
                        </label>
                        <input
                          name="cvv"
                          type="password"
                          value={formData.cvv}
                          onChange={handleChange}
                          maxLength="4"
                          placeholder="123"
                          className={`w-full px-4 py-3 bg-gray-700/50 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-sky-500 placeholder-gray-400 transition-all ${errors.cvv ? 'border-red-500' : 'border-gray-600'
                            }`}
                        />
                        {errors.cvv && <p className="text-red-400 text-xs mt-1">{errors.cvv}</p>}
                      </div>
                    </div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="saveCard"
                        checked={formData.saveCard}
                        onChange={handleChange}
                        className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-sky-500 focus:ring-sky-500"
                      />
                      <span className="text-sm text-gray-400">Save card for future purchases</span>
                    </label>
                  </div>
                )}

                {formData.paymentMethod === 'razorpay' && (
                  <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl text-center animate-fadeIn">
                    <div className="text-blue-300 mb-2 font-semibold">Razorpay Selected</div>
                    <p className="text-sm text-blue-200/70">
                      You will be redirected to Razorpay's secure payment gateway to complete your purchase using UPI, NetBanking, or Cards.
                    </p>
                  </div>
                )}

                {formData.paymentMethod === 'paypal' && (
                  <div className="p-6 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-center animate-fadeIn">
                    <div className="text-indigo-300 mb-2 font-semibold">PayPal Selected</div>
                    <p className="text-sm text-indigo-200/70">
                      You will be redirected to PayPal to complete your purchase securely.
                    </p>
                  </div>
                )}
              </div>

              {errors.submit && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-300 text-sm">
                  {errors.submit}
                </div>
              )}
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 sticky top-24">
                <h2 className="text-2xl font-bold mb-6 text-white">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  {cartItems.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-gray-400 truncate">
                        {item.name || item.title} {item.pricingType && `(${item.pricingType})`}
                        {item.quantity > 1 && ` × ${item.quantity}`}
                      </span>
                      <span className="text-white font-semibold">
                        ${((parseFloat(item.price?.replace('$', '').replace(',', '') || 0)) * (item.quantity || 1)).toFixed(2)}
                      </span>
                    </div>
                  ))}
                  {cartItems.length > 3 && (
                    <div className="text-sm text-gray-400">
                      +{cartItems.length - 3} more items
                    </div>
                  )}
                  <div className="border-t border-gray-700 pt-4 space-y-2">
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
                  </div>
                  <div className="border-t border-gray-700 pt-4">
                    <div className="flex justify-between text-xl font-bold text-white">
                      <span>Total</span>
                      <span className="text-sky-400">${grandTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 px-6 bg-gradient-to-r from-sky-500 to-cyan-500 text-white rounded-xl font-semibold text-lg hover:from-sky-600 hover:to-cyan-600 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-4"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Lock size={20} />
                      <span>Place Order</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-2 text-xs text-gray-400 justify-center">
                  <Lock size={12} />
                  <span>Secure checkout powered by SSL</span>
                </div>
              </div>
            </div>
          </form >
        </div >
      </section >
    </div >
  );
};

export default CheckoutPage;

