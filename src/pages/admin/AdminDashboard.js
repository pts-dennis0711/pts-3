import React, { useEffect, useState } from 'react';
import { Package, FileText, Award, ShoppingBag, Users, DollarSign } from 'lucide-react';

const AdminDashboard = ({ products, blogs, stories }) => {
  const [orders, setOrders] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);

  useEffect(() => {
    // Load orders from localStorage
    const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(allOrders);

    // Calculate total revenue
    const revenue = allOrders.reduce((sum, order) => sum + (order.total || 0), 0);
    setTotalRevenue(revenue);

    // Calculate unique customers
    const uniqueCustomers = new Set(allOrders.map(order => order.userId).filter(Boolean));
    setTotalCustomers(uniqueCustomers.size);
  }, []);

  // Get orders by status
  const pendingOrders = orders.filter(order => order.status === 'pending').length;

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-5xl font-bold mb-8" style={{ color: '#01A5BF' }}>Admin Dashboard</h1>

        {/* Main Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            { title: 'Total Products', count: products.length, icon: Package, color: '#01A5BF' },
            { title: 'Blog Posts', count: blogs.length, icon: FileText, color: '#01A5BF' },
            { title: 'Success Stories', count: stories.length, icon: Award, color: '#01A5BF' }
          ].map((stat, idx) => (
            <div key={idx} className="border-2 border-gray-200 rounded-xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white">
              <stat.icon size={48} className="mb-4" style={{ color: stat.color }} />
              <h3 className="text-4xl font-bold mb-2" style={{ color: stat.color }}>{stat.count}</h3>
              <p className="text-gray-600 text-lg">{stat.title}</p>
            </div>
          ))}
        </div>

        {/* E-commerce Stats */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-6" style={{ color: '#01A5BF' }}>E-commerce Statistics</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { title: 'Total Orders', count: orders.length, icon: ShoppingBag, color: '#10b981' },
              { title: 'Total Revenue', count: `$${totalRevenue.toFixed(2)}`, icon: DollarSign, color: '#10b981' },
              { title: 'Total Customers', count: totalCustomers, icon: Users, color: '#10b981' },
              { title: 'Pending Orders', count: pendingOrders, icon: ShoppingBag, color: '#f59e0b' }
            ].map((stat, idx) => (
              <div key={idx} className="border-2 border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white">
                <stat.icon size={36} className="mb-3" style={{ color: stat.color }} />
                <h3 className="text-2xl font-bold mb-2" style={{ color: stat.color }}>{stat.count}</h3>
                <p className="text-gray-600">{stat.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#01A5BF' }}>Recent Orders</h2>
          {orders.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No orders yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Order ID</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Customer</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Items</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Total</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 10).reverse().map((order) => (
                    <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm font-mono text-gray-600">{order.id.split('_')[1]}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{order.shipping?.email || 'N/A'}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{order.items?.length || 0} item(s)</td>
                      <td className="py-3 px-4 text-sm font-semibold text-gray-900">${order.total?.toFixed(2) || '0.00'}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${order.status === 'completed' ? 'bg-green-100 text-green-800' :
                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                          }`}>
                          {order.status || 'pending'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
          <h3 className="font-bold text-blue-900 mb-2">💡 How to View Order Details</h3>
          <p className="text-blue-800 text-sm">
            Orders are stored in browser localStorage. To view all orders:
          </p>
          <ol className="list-decimal list-inside text-blue-800 text-sm mt-2 space-y-1">
            <li>Open browser console (F12)</li>
            <li>Run: <code className="bg-blue-100 px-2 py-1 rounded">JSON.parse(localStorage.getItem('orders') || '[]')</code></li>
            <li>Or check localStorage in Application/Storage tab of DevTools</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

