import React, { useState } from 'react';
import { Edit2, Trash2 } from 'lucide-react';

const AdminProducts = ({ products, setProducts }) => {
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', price: '', category: 'Services', image: '📦', description: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setProducts(products.map(p => p.id === editingId ? { ...formData, id: editingId, price: Number(formData.price) } : p));
      setEditingId(null);
    } else {
      setProducts([...products, { ...formData, id: Date.now(), price: Number(formData.price) }]);
    }
    setFormData({ name: '', price: '', category: 'Services', image: '📦', description: '' });
  };

  const handleEdit = (product) => {
    setFormData(product);
    setEditingId(product.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-5xl font-bold mb-8" style={{ color: '#01A5BF' }}>Manage Products</h1>
        
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg mb-8 border border-gray-200">
          <div className="grid md:grid-cols-2 gap-6">
            <input type="text" placeholder="Product Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            <input type="number" placeholder="Price" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="Services">Services</option>
              <option value="Products">Products</option>
            </select>
            <input type="text" placeholder="Emoji (e.g., 📦)" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} className="border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="border-2 border-gray-300 rounded-lg px-4 py-3 md:col-span-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <button type="submit" className="mt-6 px-8 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity shadow-lg" style={{ backgroundColor: '#01A5BF' }}>
            {editingId ? 'Update' : 'Add'} Product
          </button>
        </form>

        <div className="grid gap-4">
          {products.map(product => (
            <div key={product.id} className="border-2 border-gray-200 rounded-xl p-6 flex justify-between items-center bg-white hover:shadow-lg transition-all">
              <div className="flex items-center gap-6">
                <span className="text-5xl">{product.image}</span>
                <div>
                  <h3 className="font-bold text-xl mb-1">{product.name}</h3>
                  <p className="text-gray-600 mb-2">{product.description}</p>
                  <p className="font-bold text-xl" style={{ color: '#01A5BF' }}>${product.price}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => handleEdit(product)} className="p-3 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Edit2 size={20} />
                </button>
                <button onClick={() => handleDelete(product.id)} className="p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;

