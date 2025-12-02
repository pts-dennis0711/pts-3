import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, LogOut, Shield, ChevronRight } from 'lucide-react';
import '../admin/admin.css';

const AdminLayout = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
    };

    const navItems = [
        { path: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
        { path: '/admin/products', icon: Package, label: 'Products' },
    ];

    const isActive = (path, exact = false) => {
        if (exact) {
            return location.pathname === path;
        }
        return location.pathname.startsWith(path);
    };

    return (
        <div className="admin-container min-h-screen flex">
            {/* Sidebar */}
            <aside className="w-64 glass-card m-4 rounded-2xl p-6 flex flex-col animate-slideInRight admin-scrollbar overflow-y-auto">
                {/* Logo/Brand */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-accent flex items-center justify-center shadow-glow">
                            <Shield className="text-white" size={20} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white">ProtoTech</h2>
                            <p className="text-xs text-slate-400">Admin Portal</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.path, item.exact);

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${active
                                        ? 'bg-gradient-accent text-white shadow-glow'
                                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                                    }`}
                            >
                                <Icon size={20} className={active ? 'text-white' : 'text-slate-500 group-hover:text-cyan-400'} />
                                <span className="font-medium flex-1">{item.label}</span>
                                {active && <ChevronRight size={16} />}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Section */}
                <div className="mt-auto pt-6 border-t border-slate-700/50">
                    <div className="glass-card p-3 mb-3">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-accent flex items-center justify-center text-white font-semibold">
                                A
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">Admin</p>
                                <p className="text-xs text-slate-400">Administrator</p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-300"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 admin-scrollbar overflow-y-auto">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
