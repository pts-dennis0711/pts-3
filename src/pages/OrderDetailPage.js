import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { useAuthStore } from '../store/authStore';
import { ArrowLeft, Package, MapPin, Phone, Mail, CreditCard, Calendar, CheckCircle, Truck } from 'lucide-react';
import { gsap } from 'gsap';
import { getOrder } from '../services/orderService';

const OrderDetailPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: `/order/${orderId}` } } });
      return;
    }

    const fetchOrder = async () => {
      try {
        // Try to fetch from API first
        const dbOrder = await getOrder(orderId);
        if (dbOrder) {
          // Check if order belongs to user (if user ID is present)
          if (dbOrder.user_id && dbOrder.user_id !== user?.id) {
            navigate('/account');
            return;
          }
          setOrder(dbOrder);
        } else {
          throw new Error('Order not found in DB');
        }
      } catch (error) {
        console.warn('Failed to fetch order from DB, falling back to localStorage:', error);
        // Fallback to localStorage
        const orderData = localStorage.getItem(`order_${orderId}`);
        if (orderData) {
          const parsedOrder = JSON.parse(orderData);
          if (parsedOrder.userId === user?.id) {
            setOrder(parsedOrder);
          } else {
            navigate('/account');
          }
        } else {
          navigate('/account');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();

    gsap.from('.order-hero', {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out'
    });

    gsap.from('.order-section', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.2
    });
  }, [orderId, navigate, user, isAuthenticated]);

  if (loading || !order) {
    return (
      <div className="bg-gray-950 text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-sky-500/30 border-t-sky-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading order...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <SEO title={`Order ${order.id} - ProtoTech Solutions`} description="View your order details" />

      {/* Header */}
      <section className="relative py-16 bg-gradient-to-br from-gray-900 via-gray-950 to-black border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_60%)]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 order-hero">
          <Link
            to="/account"
            className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 mb-8 transition-all group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Account</span>
          </Link>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-sky-100 to-cyan-100">
                Order Details
              </h1>
              <p className="text-gray-400 text-lg">
                Order #{order.id.split('_')[1]}
              </p>
            </div>
            <span className={`inline-block px-4 py-2 rounded-lg text-sm font-semibold ${order.status === 'pending' ? 'bg-yellow-500/10 text-yellow-300 border border-yellow-500/20' :
              order.status === 'completed' ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20' :
                'bg-gray-500/10 text-gray-300 border border-gray-500/20'
              }`}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
          </div>
        </div>
      </section>

      {/* Order Content */}
      <section className="order-section py-12 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Items */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                  <Package size={24} className="text-sky-400" />
                  Order Items
                </h2>
                <div className="space-y-4">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex gap-4 p-4 bg-gray-700/30 border border-gray-600/50 rounded-xl"
                    >
                      <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-sky-600/30 via-purple-600/30 to-pink-600/30 flex items-center justify-center flex-shrink-0">
                        <div className="text-2xl">{item.image || '📦'}</div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-1">{item.name || item.title}</h3>
                        {item.pricingType && (
                          <span className="inline-block px-2 py-1 rounded bg-sky-500/10 border border-sky-500/20 text-xs text-sky-300 mb-2">
                            {item.pricingType}
                          </span>
                        )}
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm text-gray-400">
                            Quantity: {item.quantity || 1}
                          </span>
                          <span className="text-lg font-bold text-white">
                            ${((parseFloat(item.price?.replace('$', '').replace(',', '') || 0)) * (item.quantity || 1)).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Information */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                  <Truck size={24} className="text-sky-400" />
                  Shipping Information
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                    <p className="text-white font-semibold">{order.shipping.firstName} {order.shipping.lastName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1 flex items-center gap-1">
                      <Mail size={14} />
                      Email
                    </label>
                    <p className="text-white font-semibold">{order.shipping.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1 flex items-center gap-1">
                      <Phone size={14} />
                      Phone
                    </label>
                    <p className="text-white font-semibold">{order.shipping.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1 flex items-center gap-1">
                      <MapPin size={14} />
                      Address
                    </label>
                    <p className="text-white font-semibold">
                      {order.shipping.address}, {order.shipping.city}, {order.shipping.state} {order.shipping.zipCode}
                    </p>
                    <p className="text-gray-400 text-sm">{order.shipping.country}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 sticky top-24">
                <h2 className="text-2xl font-bold mb-6 text-white">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-2 text-gray-400 mb-4 pb-4 border-b border-gray-700">
                    <Calendar size={18} />
                    <div>
                      <p className="text-sm font-medium">Order Date</p>
                      <p className="text-xs text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-400">
                      <span>Subtotal</span>
                      <span className="text-white">${(order.total / 1.1).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Tax (10%)</span>
                      <span className="text-white">${((order.total / 1.1) * 0.1).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Shipping</span>
                      <span className="text-emerald-400">Free</span>
                    </div>
                  </div>
                  <div className="border-t border-gray-700 pt-4">
                    <div className="flex justify-between text-xl font-bold text-white">
                      <span>Total</span>
                      <span className="text-sky-400">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="pt-6 border-t border-gray-700">
                  <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
                    <CreditCard size={16} />
                    Payment Method
                  </h3>
                  <div className="bg-gray-700/30 rounded-xl p-4">
                    <p className="text-white font-semibold mb-1">{order.payment.cardName}</p>
                    <p className="text-gray-400 text-sm">Card ending in {order.payment.cardNumber.slice(-4)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderDetailPage;

