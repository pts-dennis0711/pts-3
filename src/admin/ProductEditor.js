import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, ArrowLeft, Layers, DollarSign, List, MessageSquare, HelpCircle } from 'lucide-react';
import AdminLayout from './AdminLayout';
import PricingEditor from './components/PricingEditor';
import FeaturesEditor from './components/FeaturesEditor';
import TestimonialsEditor from './components/TestimonialsEditor';
import FAQsEditor from './components/FAQsEditor';
import '../admin/admin.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const ProductEditor = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const isNew = !slug || slug === 'new';

    const [activeTab, setActiveTab] = useState('general');
    const [formData, setFormData] = useState({
        id: null,
        name: '',
        slug: '',
        category_slug: 'autocad',
        description: '',
        compatibility: '',
        plugin_updates: '',
        autodesk_store_link: '',
        download_url: '',
        video_url: '',
        pricing: {},
        features: [],
        testimonials: [],
        faqs: []
    });

    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(!isNew);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!isNew && slug) {
            fetchProduct();
        }
    }, [slug, isNew]);

    const fetchProduct = async () => {
        try {
            setIsFetching(true);
            setError('');
            const res = await fetch(`${API_BASE_URL}/api/products/${slug}`);
            if (!res.ok) throw new Error('Product not found');
            const data = await res.json();
            setFormData({
                id: data.id || null,
                name: data.name || '',
                slug: data.slug || '',
                category_slug: data.category_slug || 'autocad',
                description: data.description || '',
                compatibility: data.compatibility || '',
                plugin_updates: data.plugin_updates || '',
                autodesk_store_link: data.autodesk_store_link || '',
                download_url: data.download_url || '',
                video_url: data.video_url || '',
                pricing: data.pricing || {},
                features: data.features || [],
                testimonials: data.testimonials || [],
                faqs: data.faqs || []
            });
        } catch (err) {
            console.error('Error loading product:', err);
            setError('Failed to load product: ' + err.message);
        } finally {
            setIsFetching(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const url = isNew
                ? `${API_BASE_URL}/api/admin/products`
                : `${API_BASE_URL}/api/admin/products/${formData.id}`;
            const method = isNew ? 'POST' : 'PUT';

            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                },
                body: JSON.stringify(formData)
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to save product');
            }

            navigate('/admin/products');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const tabs = [
        { id: 'general', label: 'General', icon: Layers },
        { id: 'pricing', label: 'Pricing', icon: DollarSign },
        { id: 'features', label: 'Features', icon: List },
        { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
        { id: 'faqs', label: 'FAQs', icon: HelpCircle },
    ];

    return (
        <AdminLayout>
            <div className="max-w-6xl mx-auto space-y-6 animate-fadeInUp">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/admin/products')}
                        className="p-3 hover:bg-slate-800/50 rounded-xl transition-all duration-200 hover:scale-110"
                    >
                        <ArrowLeft size={24} className="text-slate-400" />
                    </button>
                    <div>
                        <h1 className="text-4xl font-bold text-white">
                            {isNew ? 'Add New Product' : 'Edit Product'}
                        </h1>
                        <p className="text-slate-400 mt-1">
                            {isNew ? 'Create a new product listing' : 'Update product information'}
                        </p>
                    </div>
                </div>

                {isFetching && (
                    <div className="glass-card p-4 border-l-4 border-cyan-500 animate-fadeIn">
                        <div className="flex items-center gap-3">
                            <div className="loading-spinner w-5 h-5 border-2"></div>
                            <span className="text-cyan-400">Loading product data...</span>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="glass-card p-4 border-l-4 border-red-500 animate-fadeIn">
                        <p className="text-red-400">{error}</p>
                    </div>
                )}

                <div className="flex gap-6">
                    {/* Sidebar Tabs */}
                    <div className="w-64 flex-shrink-0 space-y-2">
                        {tabs.map(tab => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === tab.id
                                            ? 'bg-gradient-accent text-white shadow-glow'
                                            : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                                        }`}
                                >
                                    <Icon size={18} />
                                    <span className="font-medium">{tab.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 glass-card p-8">
                        <form onSubmit={handleSubmit}>
                            {activeTab === 'general' && (
                                <div className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">Product Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="input-admin"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">Slug (URL)</label>
                                            <input
                                                type="text"
                                                name="slug"
                                                value={formData.slug}
                                                onChange={handleChange}
                                                required
                                                className="input-admin font-mono text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
                                            <select
                                                name="category_slug"
                                                value={formData.category_slug}
                                                onChange={handleChange}
                                                className="input-admin"
                                            >
                                                <option value="autocad">AutoCAD</option>
                                                <option value="revit">Revit</option>
                                                <option value="maya">Maya</option>
                                                <option value="inventor">Inventor</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">Compatibility</label>
                                            <input
                                                type="text"
                                                name="compatibility"
                                                value={formData.compatibility}
                                                onChange={handleChange}
                                                className="input-admin"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            rows={4}
                                            className="input-admin"
                                        />
                                    </div>
                                </div>
                            )}

                            {activeTab === 'pricing' && (
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-4">Pricing Plans</h3>
                                    <PricingEditor
                                        pricing={formData.pricing || {}}
                                        onChange={(pricing) => setFormData(prev => ({ ...prev, pricing }))}
                                    />
                                </div>
                            )}

                            {activeTab === 'features' && (
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-4">Product Features</h3>
                                    <FeaturesEditor
                                        features={formData.features || []}
                                        onChange={(features) => setFormData(prev => ({ ...prev, features }))}
                                    />
                                </div>
                            )}

                            {activeTab === 'testimonials' && (
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-4">Customer Testimonials</h3>
                                    <TestimonialsEditor
                                        testimonials={formData.testimonials || []}
                                        onChange={(testimonials) => setFormData(prev => ({ ...prev, testimonials }))}
                                    />
                                </div>
                            )}

                            {activeTab === 'faqs' && (
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-4">Frequently Asked Questions</h3>
                                    <FAQsEditor
                                        faqs={formData.faqs || []}
                                        onChange={(faqs) => setFormData(prev => ({ ...prev, faqs }))}
                                    />
                                </div>
                            )}

                            {/* Save Button */}
                            <div className="mt-8 pt-6 border-t border-slate-700/50 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => navigate('/admin/products')}
                                    className="btn-admin-secondary"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="btn-admin-primary flex items-center gap-2 disabled:opacity-50"
                                >
                                    <Save size={20} />
                                    <span>{isLoading ? 'Saving...' : 'Save Product'}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default ProductEditor;
