import React, { useEffect, useState } from 'react';
import { Edit2, Trash2, Plus, Search, Package as PackageIcon } from 'lucide-react';
import AdminLayout from './AdminLayout';
import { Link } from 'react-router-dom';
import '../admin/admin.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/products`);
            const data = await res.json();
            setProducts(data || []);
        } catch (err) {
            console.error('Failed to fetch products', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (product) => {
        if (!window.confirm(`Are you sure you want to delete "${product.name}"? This cannot be undone.`)) {
            return;
        }

        try {
            const res = await fetch(`${API_BASE_URL}/api/admin/products/${product.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                }
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                throw new Error(data.error || 'Failed to delete product');
            }

            setProducts(prev => prev.filter(p => p.id !== product.id));
        } catch (err) {
            console.error('Delete failed', err);
            alert(err.message || 'Failed to delete product');
        }
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category_slug.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getCategoryColor = (category) => {
        const colors = {
            autocad: 'from-cyan-500 to-blue-500',
            maya: 'from-purple-500 to-pink-500',
            revit: 'from-orange-500 to-red-500',
            inventor: 'from-green-500 to-emerald-500'
        };
        return colors[category] || 'from-gray-500 to-slate-500';
    };

    return (
        <AdminLayout>
            <div className="space-y-6 animate-fadeInUp">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">Products</h1>
                        <p className="text-slate-400">Manage your product catalog</p>
                    </div>
                    <Link
                        to="/admin/products/new"
                        className="btn-admin-primary flex items-center gap-2"
                    >
                        <Plus size={20} />
                        <span>Add Product</span>
                    </Link>
                </div>

                {/* Search & Filters */}
                <div className="glass-card p-6">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                        <input
                            type="text"
                            placeholder="Search products by name or category..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="input-admin pl-12 w-full"
                        />
                    </div>
                </div>

                {/* Products Table */}
                <div className="glass-card overflow-hidden">
                    {isLoading ? (
                        <div className="p-12 text-center">
                            <div className="loading-spinner mx-auto mb-4"></div>
                            <p className="text-slate-400">Loading products...</p>
                        </div>
                    ) : filteredProducts.length === 0 ? (
                        <div className="p-12 text-center">
                            <PackageIcon className="mx-auto mb-4 text-slate-600" size={48} />
                            <p className="text-slate-400 mb-2">No products found</p>
                            <p className="text-slate-500 text-sm">Try adjusting your search or add a new product</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto admin-scrollbar">
                            <table className="table-admin">
                                <thead>
                                    <tr>
                                        <th>Product Name</th>
                                        <th>Category</th>
                                        <th>Slug</th>
                                        <th className="text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredProducts.map((product) => (
                                        <tr key={product.id}>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getCategoryColor(product.category_slug)} flex items-center justify-center`}>
                                                        <PackageIcon className="text-white" size={20} />
                                                    </div>
                                                    <span className="font-medium text-white">{product.name}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="badge-admin-accent capitalize">
                                                    {product.category_slug}
                                                </span>
                                            </td>
                                            <td>
                                                <code className="text-slate-400 text-sm font-mono">{product.slug}</code>
                                            </td>
                                            <td>
                                                <div className="flex justify-end gap-2">
                                                    <Link
                                                        to={`/admin/products/${product.slug}`}
                                                        className="p-2 text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-all duration-200 hover:scale-110"
                                                        title="Edit"
                                                    >
                                                        <Edit2 size={18} />
                                                    </Link>
                                                    <button
                                                        className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200 hover:scale-110"
                                                        title="Delete"
                                                        onClick={() => handleDelete(product)}
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Stats Footer */}
                {!isLoading && filteredProducts.length > 0 && (
                    <div className="glass-card p-4">
                        <p className="text-slate-400 text-sm">
                            Showing <span className="text-white font-semibold">{filteredProducts.length}</span> of{' '}
                            <span className="text-white font-semibold">{products.length}</span> products
                        </p>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default ProductList;
