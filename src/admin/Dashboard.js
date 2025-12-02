import React, { useEffect, useState } from 'react';
import { Package, FileText, Award, ShoppingBag, TrendingUp, Users } from 'lucide-react';
import AdminLayout from './AdminLayout';
import '../admin/admin.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Dashboard = () => {
    const [stats, setStats] = useState({
        products: 0,
        blogs: 0,
        stories: 0,
        orders: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/products`);
                const products = await res.json();
                setStats(prev => ({ ...prev, products: products.length }));
            } catch (err) {
                console.error('Failed to fetch stats', err);
            }
        };
        fetchStats();
    }, []);

    const statCards = [
        {
            title: 'Total Products',
            count: stats.products,
            icon: Package,
            color: 'cyan',
            gradient: 'from-cyan-500 to-blue-500',
            change: '+12%'
        },
        {
            title: 'Blog Posts',
            count: stats.blogs,
            icon: FileText,
            color: 'purple',
            gradient: 'from-purple-500 to-pink-500',
            change: '+8%'
        },
        {
            title: 'Success Stories',
            count: stats.stories,
            icon: Award,
            color: 'orange',
            gradient: 'from-orange-500 to-red-500',
            change: '+15%'
        },
        {
            title: 'Total Orders',
            count: stats.orders,
            icon: ShoppingBag,
            color: 'green',
            gradient: 'from-green-500 to-emerald-500',
            change: '+23%'
        },
    ];

    return (
        <AdminLayout>
            <div className="space-y-8 animate-fadeInUp">
                {/* Header */}
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
                    <p className="text-slate-400">Welcome back! Here's what's happening with your products.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statCards.map((stat, idx) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={idx}
                                className="stat-card"
                                style={{ animationDelay: `${idx * 0.1}s` }}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg`}>
                                        <Icon className="text-white" size={24} />
                                    </div>
                                    <div className="flex items-center gap-1 text-green-400 text-sm font-medium">
                                        <TrendingUp size={16} />
                                        <span>{stat.change}</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-slate-400 text-sm font-medium mb-1">{stat.title}</p>
                                    <p className="text-3xl font-bold text-white">{stat.count}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Quick Actions */}
                <div className="glass-card p-6">
                    <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <a
                            href="/admin/products/new"
                            className="group p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-cyan-500/50 hover:bg-slate-800 transition-all duration-300"
                        >
                            <Package className="text-cyan-400 mb-3 group-hover:scale-110 transition-transform" size={24} />
                            <h3 className="text-white font-semibold mb-1">Add Product</h3>
                            <p className="text-slate-400 text-sm">Create a new product listing</p>
                        </a>
                        <a
                            href="/admin/products"
                            className="group p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-purple-500/50 hover:bg-slate-800 transition-all duration-300"
                        >
                            <FileText className="text-purple-400 mb-3 group-hover:scale-110 transition-transform" size={24} />
                            <h3 className="text-white font-semibold mb-1">Manage Products</h3>
                            <p className="text-slate-400 text-sm">View and edit all products</p>
                        </a>
                        <button
                            onClick={() => alert('Analytics coming soon')}
                            className="group p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-green-500/50 hover:bg-slate-800 transition-all duration-300 text-left w-full"
                        >
                            <Users className="text-green-400 mb-3 group-hover:scale-110 transition-transform" size={24} />
                            <h3 className="text-white font-semibold mb-1">View Analytics</h3>
                            <p className="text-slate-400 text-sm">Check performance metrics</p>
                        </button>
                    </div>
                </div>

                {/* Getting Started */}
                <div className="glass-card p-6 border-l-4 border-cyan-500">
                    <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-cyan-500/10">
                            <Award className="text-cyan-400" size={24} />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-white mb-2">🚀 Getting Started</h3>
                            <p className="text-slate-300 mb-3">
                                You can now manage your products directly from the admin panel.
                                Changes made here will instantly update the website.
                            </p>
                            <a
                                href="/admin/products"
                                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                            >
                                <span>Manage Products</span>
                                <TrendingUp size={16} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Dashboard;
