import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { useAuthStore } from '../store/authStore';
import { User, Mail, Calendar, ShoppingBag, Package, LogOut, MapPin } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getUserOrders } from '../services/orderService';

const AccountPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState('profile');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/account' } } });
      return;
    }

    // Load user orders
    const fetchUserOrders = async () => {
      if (!user?.id) return;

      try {
        // Try to fetch from API first
        const dbOrders = await getUserOrders(user.id);
        setOrders(dbOrders);
      } catch (error) {
        console.warn('Failed to fetch user orders from DB, falling back to localStorage:', error);
        // Fallback to localStorage
        const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        const userOrders = allOrders.filter(order => order.userId === user?.id);
        setOrders(userOrders);
      }
    };

    fetchUserOrders();

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from('.account-hero', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
      });

      gsap.from('.account-section', {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.account-section',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
          once: true
        }
      });
    });
    return () => ctx.revert();
  }, [isAuthenticated, navigate, user]);

  const handleLogout = () => {
    logout();
    navigate('/products');
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
  ];

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <SEO title="My Account - ProtoTech Solutions" description="Manage your account" />

      {/* Header */}
      <section className="relative py-16 bg-gradient-to-br from-gray-900 via-gray-950 to-black border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_60%)]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 account-hero">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-sky-100 to-cyan-100">
            My Account
          </h1>
          <p className="text-gray-400 text-lg">
            Manage your profile and view your orders
          </p>
        </div>
      </section>

      {/* Account Content */}
      <section className="account-section py-12 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 sticky top-24">
                {/* User Info */}
                <div className="text-center mb-6 pb-6 border-b border-gray-700">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-sky-500/20 via-purple-500/20 to-pink-500/20 border border-sky-500/30 mb-4">
                    <User size={32} className="text-sky-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{user.name}</h3>
                  <p className="text-sm text-gray-400">{user.email}</p>
                </div>

                {/* Tabs */}
                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === tab.id
                          ? 'bg-sky-500/20 border border-sky-500/30 text-sky-300'
                          : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
                          }`}
                      >
                        <Icon size={18} />
                        <span className="font-medium">{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="w-full mt-6 flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 border border-red-500/20 hover:border-red-500/40 transition-all"
                >
                  <LogOut size={18} />
                  <span className="font-medium">Sign Out</span>
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold mb-6 text-white">Profile Information</h2>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Full Name
                        </label>
                        <div className="flex items-center gap-3 px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl">
                          <User size={18} className="text-gray-400" />
                          <span className="text-white">{user.name}</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Email Address
                        </label>
                        <div className="flex items-center gap-3 px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl">
                          <Mail size={18} className="text-gray-400" />
                          <span className="text-white">{user.email}</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Member Since
                        </label>
                        <div className="flex items-center gap-3 px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl">
                          <Calendar size={18} className="text-gray-400" />
                          <span className="text-white">
                            {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                          </span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          User ID
                        </label>
                        <div className="px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl">
                          <span className="text-gray-400 text-sm font-mono">{user.id}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-700">
                      <Link
                        to="/3d-products"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-500 to-cyan-500 text-white rounded-xl font-semibold hover:from-sky-600 hover:to-cyan-600 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                      >
                        <ShoppingBag size={18} />
                        <span>Continue Shopping</span>
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div className="space-y-6">
                  <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 md:p-8">
                    <h2 className="text-2xl font-bold mb-6 text-white">Order History</h2>
                    {orders.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-700/50 border border-gray-600 mb-4">
                          <Package size={32} className="text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-white">No Orders Yet</h3>
                        <p className="text-gray-400 mb-6">Start shopping to see your orders here</p>
                        <Link
                          to="/3d-products"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-500 to-cyan-500 text-white rounded-xl font-semibold hover:from-sky-600 hover:to-cyan-600 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                        >
                          <ShoppingBag size={18} />
                          <span>Browse Products</span>
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {orders.map((order) => (
                          <Link
                            key={order.id}
                            to={`/order/${order.id}`}
                            className="block bg-gray-700/30 border border-gray-600/50 rounded-xl p-6 hover:border-sky-500/50 transition-all group"
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-sky-400 transition-colors">
                                  Order #{order.id.split('_')[1]}
                                </h3>
                                <p className="text-sm text-gray-400">
                                  Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  })}
                                </p>
                              </div>
                              <div className="text-right">
                                <div className="text-xl font-bold text-sky-400 mb-1">
                                  ${order.total.toFixed(2)}
                                </div>
                                <span className={`inline-block px-3 py-1 rounded-lg text-xs font-semibold ${order.status === 'pending' ? 'bg-yellow-500/10 text-yellow-300 border border-yellow-500/20' :
                                  order.status === 'completed' ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20' :
                                    'bg-gray-500/10 text-gray-300 border border-gray-500/20'
                                  }`}>
                                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-400">
                              <div className="flex items-center gap-2">
                                <Package size={16} />
                                <span>{order.items.length} {order.items.length === 1 ? 'item' : 'items'}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin size={16} />
                                <span>{order.shipping?.city}, {order.shipping?.state}</span>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AccountPage;

