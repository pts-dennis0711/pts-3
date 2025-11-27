import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import SEO from '../../components/SEO';
import { useAuthStore } from '../../store/authStore';
import { Mail, Lock, LogIn, UserPlus, ArrowLeft, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const from = location.state?.from?.pathname || '/cart';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }

    gsap.from('.login-hero', {
      y: 50,
      duration: 1,
      ease: 'power3.out'
    });

    gsap.from('.login-form', {
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.2
    });
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));

      const result = login(email, password);

      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-950 text-white min-h-screen flex items-center justify-center relative overflow-hidden">
      <SEO title="Login - ProtoTech Solutions" description="Sign in to your account" />

      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_60%)]"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative z-10 w-full max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <Link
          to="/3d-products"
          className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 mb-8 transition-all group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Products</span>
        </Link>

        {/* Header */}
        <div className="login-hero text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sky-500/30 bg-sky-500/20 text-sm text-sky-200 mb-6 backdrop-blur-sm">
            <LogIn size={16} />
            <span>Account Access</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-sky-100 to-purple-100 leading-tight">
            Welcome Back
          </h1>
          <p className="text-gray-300 text-lg">
            Sign in to continue shopping and manage your account
          </p>
        </div>

        {/* Login Form */}
        <div className="login-form bg-gray-900 border border-gray-700 rounded-2xl p-8 shadow-2xl relative overflow-hidden opacity-100">
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-300 text-sm">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 placeholder-gray-400 transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 placeholder-gray-400 transition-all"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-sky-500 focus:ring-sky-500"
                  />
                  <span className="text-sm text-gray-400">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-sm text-sky-400 hover:text-sky-300 transition-colors">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 px-6 bg-gradient-to-r from-sky-500 to-cyan-500 text-white rounded-xl font-semibold text-lg hover:from-sky-600 hover:to-cyan-600 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <LogIn size={20} />
                    <span>Sign In</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-700">
              <p className="text-center text-gray-400 text-sm mb-4">
                Don't have an account?
              </p>
              <Link
                to="/register"
                className="w-full py-3 px-6 bg-gray-700/50 border border-gray-600 text-white rounded-xl font-semibold hover:bg-gray-700 transition-all flex items-center justify-center gap-2"
              >
                <UserPlus size={18} />
                <span>Create Account</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Demo credentials hint */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Demo: Use any email and password to sign in
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

