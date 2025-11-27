import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  ShoppingCart, 
  Menu, 
  X, 
  User, 
  Code, 
  Wrench, 
  Package, 
  Building2, 
  Info, 
  BookOpen,
  LayoutDashboard,
  FileText,
  Award,
  Search,
  Download,
  Upload,
  ChevronRight,
  Grid3x3,
  Box,
  Cpu,
  Sparkles,
  File,
  Settings,
  Globe,
  Cloud,
  Image,
  Layers,
  Monitor,
  Laptop,
  Smartphone,
  Sliders,
  RefreshCw,
  PenTool,
  MapPin,
  Factory,
  CheckCircle,
  ScanLine,
  Home,
  Ruler,
  Cog,
  Zap
} from 'lucide-react';
import logo from './logo.svg';
import { productCategories } from '../data/productCategories';

const Navigation = ({ cartCount, isAdmin, setIsAdmin, onSearch }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [openMenu, setOpenMenu] = useState(null); // 'solutions' | 'services' | null
  const [openMobileKey, setOpenMobileKey] = useState(null);
  const closeTimerRef = useRef(null);

  // Submenu data (grouped)
  const solutionsMenu = [
    {
      group: 'Applications',
      items: [
        { label: '3D Web Application', to: '/3d-services/3d-web-application' },
        { label: '3D Desktop Application', to: '/3d-services/3d-desktop-application' },
        { label: '3D Mobile Application', to: '/3d-services/3d-mobile-application' },
        { label: 'Eyeshot Development', to: '/3d-services/eyeshot-development' },
      ],
    },
    {
      group: 'Configurators',
      items: [
        { label: '3D Product Configurator', to: '/3d-services/3d-product-configurator' },
        { label: 'CPQ Configurator', to: '/3d-services/cpq-configurator' },
        { label: '3D Furniture Configurator', to: '/3d-services/3d-furniture-configurator' },
      ],
    },
    {
      group: 'Platforms & Cloud',
      items: [
        { label: 'Cloud Services', to: '/3d-services/cloud-services' },
        { label: '3D AR/VR Development', to: '/3d-services/3d-ar-vr-development' },
      ],
    },
    {
      group: 'Data & CAD',
      items: [
        { label: 'Data Interoperability', to: '/3d-services/data-interoperability' },
        { label: 'CAD Translation', to: '/3d-services/cad-translation' },
        { label: 'CAD Customization', to: '/3d-services/cad-customization' },
        { label: 'ML Data Annotation', to: '/services/ml-data-annotation' },
      ],
    },
    {
      group: 'BIM & QA',
      items: [
        { label: 'BIM Application', to: '/3d-services/bim-application' },
        { label: 'BIM Automation', to: '/3d-services/bim-automation' },
        { label: 'Quality Assurance', to: '/3d-services/quality-assurance' },
        { label: 'Game Testing', to: '/3d-services/game-testing' },
      ],
    },
  ];

  const servicesMenu = [
    {
      group: 'BIM Services',
      items: [
        { label: 'BIM Modeling', to: '/services/bim-modeling' },
        { label: 'Revit MEP Drafting', to: '/services/revit-mep-drafting' },
        { label: 'Scan To BIM', to: '/services/scan-to-bim' },
        { label: 'Revit Family Creation', to: '/services/revit-family-creation' },
        { label: 'CAD to BIM', to: '/services/cad-to-bim' },
        { label: 'BIM Coordination', to: '/services/bim-coordination' },
        { label: 'As-Built Drawing', to: '/services/as-built-drawing' },
      ],
    },
    {
      group: 'Drafting Services',
      items: [
        { label: 'CAD Drafting', to: '/services/cad-drafting' },
        { label: 'Architectural Drafting', to: '/services/architectural-drafting' },
        { label: 'Millwork Drafting', to: '/services/millwork-drafting' },
        { label: 'Structural CAD Drafting', to: '/services/structural-cad-drafting' },
        { label: 'Mechanical Drafting', to: '/services/mechanical-drafting' },
      ],
    },
    {
      group: 'Civil & Plant',
      items: [
        { label: 'Civil CAD Drafting', to: '/services/civil-cad-drafting' },
        { label: 'Land Survey Drafting', to: '/services/land-survey-drafting' },
        { label: 'Road and Highway Design', to: '/services/road-highway-design' },
        { label: 'Plant Design Engineering', to: '/services/plant-design-engineering' },
      ],
    },
  ];

  // Helper function to create product slug from product name
  const createProductSlug = (productName) => {
    return productName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  };

  // Helper function to get icon for product based on name
  const getProductIcon = (productName) => {
    const name = productName.toLowerCase();
    if (name.includes('pdf')) return FileText;
    if (name.includes('obj')) return Box;
    if (name.includes('webgl')) return Globe;
    if (name.includes('step')) return Settings;
    if (name.includes('dwg') || name.includes('dxf') || name.includes('compare')) return FileText;
    if (name.includes('jt')) return File;
    if (name.includes('catia')) return Cpu;
    if (name.includes('json')) return Code;
    if (name.includes('gltf')) return Sparkles;
    if (name.includes('usdz')) return Cloud;
    if (name.includes('fbx')) return Box;
    if (name.includes('iges')) return File;
    if (name.includes('parasolid')) return Settings;
    return Package; // Default icon
  };

  // Helper function to get icon for solutions menu items
  const getSolutionIcon = (itemName) => {
    const name = itemName.toLowerCase();
    if (name.includes('web application')) return Monitor;
    if (name.includes('desktop application')) return Laptop;
    if (name.includes('mobile application')) return Smartphone;
    if (name.includes('eyeshot')) return Code;
    if (name.includes('configurator')) return Sliders;
    if (name.includes('cpq')) return Settings;
    if (name.includes('furniture')) return Home;
    if (name.includes('cloud')) return Cloud;
    if (name.includes('ar') || name.includes('vr')) return Sparkles;
    if (name.includes('interoperability') || name.includes('translation')) return RefreshCw;
    if (name.includes('customization')) return Cog;
    if (name.includes('annotation')) return PenTool;
    if (name.includes('bim')) return Building2;
    if (name.includes('automation')) return Zap;
    if (name.includes('quality') || name.includes('assurance')) return CheckCircle;
    if (name.includes('game') || name.includes('testing')) return Award;
    return Code; // Default icon
  };

  // Helper function to get icon for services menu items
  const getServiceIcon = (itemName) => {
    const name = itemName.toLowerCase();
    if (name.includes('bim modeling') || name.includes('bim')) return Building2;
    if (name.includes('revit')) return Building2;
    if (name.includes('scan to bim') || name.includes('scan')) return ScanLine;
    if (name.includes('family')) return Home;
    if (name.includes('cad to bim') || name.includes('coordination')) return RefreshCw;
    if (name.includes('as-built')) return FileText;
    if (name.includes('cad drafting') || name.includes('drafting')) return FileText;
    if (name.includes('architectural')) return Home;
    if (name.includes('millwork')) return Box;
    if (name.includes('structural')) return Layers;
    if (name.includes('mechanical')) return Cog;
    if (name.includes('civil')) return MapPin;
    if (name.includes('survey')) return MapPin;
    if (name.includes('road') || name.includes('highway')) return MapPin;
    if (name.includes('plant')) return Factory;
    return Wrench; // Default icon
  };

  // Helper function to get icon for resources menu items
  const getResourceIcon = (itemName) => {
    const name = itemName.toLowerCase();
    if (name.includes('blog')) return FileText;
    if (name.includes('success') || name.includes('stories')) return Award;
    if (name.includes('resources')) return BookOpen;
    return BookOpen; // Default icon
  };

  // Build products menu with categories, exporters, and importers
  const buildProductsMenu = () => {
    const menuGroups = [];
    
    // Group categories
    const cadPlatformItems = [];
    const visualizationItems = [];
    const engineeringItems = [];

    // Category icons mapping
    const categoryIcons = {
      'autocad': 'Grid3x3',
      'inventor': 'Box',
      'revit': 'Building2',
      'fusion360': 'Cpu',
      'solidworks': 'Grid3x3',
      'maya': 'Sparkles',
      '3dsmax': 'Sparkles',
      'sketchup': 'Sparkles',
      'navisworks': 'Building2',
      'solidedge': 'Grid3x3'
    };

    Object.values(productCategories).forEach((category) => {
      const categoryItem = {
        label: category.name,
        to: `/3d-products/${category.slug}`,
        isCategory: true,
        icon: categoryIcons[category.id] || 'Package'
      };
      
      const exporters = [];
      const importers = [];

      // Add exporters section if they exist
      if (category.exporters.length > 0) {
        category.exporters.forEach((exporter) => {
          const productSlug = createProductSlug(exporter);
          exporters.push({
            label: exporter,
            to: `/3d-products/${category.slug}/${productSlug}`,
            indent: true,
            type: 'exporter',
            categorySlug: category.slug,
            productSlug: productSlug
          });
        });
      }

      // Add importers section if they exist
      if (category.importers.length > 0) {
        category.importers.forEach((importer) => {
          const productSlug = createProductSlug(importer);
          importers.push({
            label: importer,
            to: `/3d-products/${category.slug}/${productSlug}`,
            indent: true,
            type: 'importer',
            categorySlug: category.slug,
            productSlug: productSlug
          });
        });
      }

      // Categorize based on category ID
      const cadPlatformIds = ['autocad', 'inventor', 'revit', 'fusion360', 'solidworks'];
      const visualizationIds = ['maya', '3dsmax', 'sketchup'];
      const engineeringIds = ['navisworks', 'solidedge'];
      
      const categoryWithProducts = {
        category: categoryItem,
        exporters,
        importers
      };
      
      if (cadPlatformIds.includes(category.id)) {
        cadPlatformItems.push(categoryWithProducts);
      } else if (visualizationIds.includes(category.id)) {
        visualizationItems.push(categoryWithProducts);
      } else if (engineeringIds.includes(category.id)) {
        engineeringItems.push(categoryWithProducts);
      }
    });

    if (cadPlatformItems.length > 0) {
      menuGroups.push({
        group: 'CAD Platforms',
        icon: 'Grid3x3',
        items: cadPlatformItems
      });
    }

    if (visualizationItems.length > 0) {
      menuGroups.push({
        group: '3D & Visualization',
        icon: 'Sparkles',
        items: visualizationItems
      });
    }

    if (engineeringItems.length > 0) {
      menuGroups.push({
        group: 'Engineering & Construction',
        icon: 'Building2',
        items: engineeringItems
      });
    }

    return menuGroups;
  };

  const productsMenu = buildProductsMenu();
  
  // Debug: Log the products menu structure
  useEffect(() => {
    console.log('Products menu structure:', productsMenu);
    console.log('Product categories:', Object.values(productCategories).map(cat => ({ name: cat.name, slug: cat.slug })));
  }, []);

  // Resources submenu
  const resourcesMenu = [
    {
      group: 'Content',
      items: [
        { label: 'Blog', to: '/blog' },
        { label: 'Success Stories', to: '/success' },
        { label: 'Resources', to: '/resources' },
      ],
    },
  ];

  const navItems = isAdmin 
    ? [
        { name: 'Dashboard', to: '/admin', icon: LayoutDashboard },
        { name: 'Products', to: '/admin/products', icon: Package },
        { name: 'Blogs', to: '/admin/blogs', icon: FileText },
        { name: 'Stories', to: '/admin/stories', icon: Award },
      ]
    : [
        { name: 'Product Development', to: '/solutions', icon: Code, submenu: solutionsMenu, key: 'solutions' },
        { name: 'CAD Services', to: '/services', icon: Wrench, submenu: servicesMenu, key: 'services' },
        { name: 'Products', to: '/3d-products', icon: Package, submenu: productsMenu, key: 'products' },
        { name: 'Company', to: '/company', icon: Building2 },
        { name: 'About', to: '/about', icon: Info },
        { name: 'Resources', to: '/resources', icon: BookOpen, submenu: resourcesMenu, key: 'resources' },
      ];

  const beginOpen = (key) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setOpenMenu(key);
  };

  const scheduleClose = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => setOpenMenu(null), 300);
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50 backdrop-blur-sm bg-opacity-95 w-full">
      {/* Full width navigation container - no max-width constraint */}
      <div className="w-full">
        <div className="flex items-center h-20 w-full px-4 sm:px-6 lg:px-8">
          {/* Logo - Left side with padding */}
          <Link to="/" className="flex items-center cursor-pointer group flex-shrink-0 mr-8" aria-label="Go to homepage">
            <img src={logo} alt="ProtoTech Solutions" className="w-40 h-20 " />
          </Link>

          {/* Full width menu items - Spread across full width */}
          <div className="hidden lg:flex items-center flex-1 justify-center gap-1 px-2 min-w-0">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const hasSubmenu = !!item.submenu;
              return (
                <div
                  key={item.to}
                  className="relative"
                  onMouseEnter={() => beginOpen(item.key || null)}
                  onMouseLeave={scheduleClose}
                >
                  {hasSubmenu ? (
                    <div className="flex items-center">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          if (!openMenu || openMenu !== item.key) {
                            beginOpen(item.key);
                          } else {
                            // If menu is open, navigate to the base route
                            navigate(item.to);
                            setOpenMenu(null);
                          }
                        }}
                        className={`flex items-center gap-2 px-3 xl:px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                          location.pathname.startsWith(item.to)
                            ? 'text-gray-900 bg-white shadow-md' 
                            : 'text-gray-300 hover:text-white hover:bg-gray-800'
                        }`}
                      >
                        <IconComponent size={18} className="flex-shrink-0" />
                        <span>{item.name}</span>
                      </button>
                    </div>
                  ) : (
                    <NavLink
                      to={item.to}
                      className={({ isActive }) => `flex items-center gap-2 px-3 xl:px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                        isActive 
                          ? 'text-gray-900 bg-white shadow-md' 
                          : 'text-gray-300 hover:text-white hover:bg-gray-800'
                      }`}
                    >
                      <IconComponent size={18} className="flex-shrink-0" />
                      <span>{item.name}</span>
                    </NavLink>
                  )}

                  {/* Desktop submenu */}
                  {hasSubmenu && openMenu === item.key && (
                    <div 
                      className={`absolute left-0 top-full mt-2 p-6 rounded-2xl bg-gray-900/95 backdrop-blur-xl border border-gray-800 shadow-2xl z-50 ${
                        item.key === 'products' 
                          ? 'w-[95vw] max-w-[1400px] left-1/2 -translate-x-1/2' 
                          : 'min-w-[720px] max-w-[900px]'
                      }`}
                      onMouseEnter={() => beginOpen(item.key)}
                      onMouseLeave={scheduleClose}
                    >
                      {/* Special rendering for Products menu */}
                      {item.key === 'products' ? (
                        <div className="grid grid-cols-3 gap-6">
                          {item.submenu.map((group) => {
                            const GroupIcon = group.icon === 'Grid3x3' ? Grid3x3 : 
                                             group.icon === 'Sparkles' ? Sparkles : 
                                             group.icon === 'Building2' ? Building2 : Package;
                            return (
                              <div key={group.group} className="border-r border-gray-800 last:border-r-0 pr-6 last:pr-0">
                                <div className="flex items-center gap-2 mb-5 sticky top-0 bg-gray-900/95 pb-3 z-10">
                                  <div className="p-2.5 rounded-lg bg-sky-500/10 border border-sky-500/20">
                                    <GroupIcon size={20} className="text-sky-400" />
                                  </div>
                                  <div className="text-base uppercase tracking-wider text-gray-300 font-bold">{group.group}</div>
                                </div>
                                <div className="space-y-3 max-h-[calc(100vh-180px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                                  {group.items.map((categoryGroup, idx) => {
                                    const CategoryIcon = categoryGroup.category.icon === 'Grid3x3' ? Grid3x3 :
                                                         categoryGroup.category.icon === 'Box' ? Box :
                                                         categoryGroup.category.icon === 'Building2' ? Building2 :
                                                         categoryGroup.category.icon === 'Cpu' ? Cpu :
                                                         categoryGroup.category.icon === 'Sparkles' ? Sparkles : Package;
                                    return (
                                      <div key={`${categoryGroup.category.to}-${idx}`} className="group/category mb-5 last:mb-0">
                                        {/* Category Header */}
                                        <Link
                                          to={categoryGroup.category.to}
                                          onClick={() => setOpenMenu(null)}
                                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-base font-semibold text-white hover:bg-gray-800/70 transition-all mb-2 group-hover/category:bg-gray-800/50"
                                        >
                                          <div className="p-1.5 rounded-md bg-sky-500/10 group-hover/category:bg-sky-500/20 transition-colors flex-shrink-0">
                                            <CategoryIcon size={16} className="text-sky-400" />
                                          </div>
                                          <span className="flex-1 truncate">{categoryGroup.category.label}</span>
                                          <ChevronRight size={16} className="text-gray-500 group-hover/category:text-sky-400 group-hover/category:translate-x-0.5 transition-all flex-shrink-0" />
                                        </Link>
                                        
                                        {/* Exporters */}
                                        {categoryGroup.exporters.length > 0 && (
                                          <div className="ml-7 mb-2">
                                            <div className="flex items-center gap-2 mb-2">
                                              <Download size={14} className="text-emerald-400 flex-shrink-0" />
                                              <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Exporters</span>
                                            </div>
                                            <div className="space-y-1">
                                              {categoryGroup.exporters.map((exporter, expIdx) => {
                                                const ProductIcon = getProductIcon(exporter.label);
                                                return (
                                                  <Link
                                                    key={`${exporter.to}-${expIdx}`}
                                                    to={exporter.to}
                                                    onClick={() => { 
                                                      setOpenMenu(null);
                                                    }}
                                                    className="flex items-center gap-2 w-full text-left px-3 py-1.5 rounded text-sm text-gray-400 hover:text-emerald-300 hover:bg-emerald-500/10 pl-5 border-l-2 border-gray-700 hover:border-emerald-500 transition-all group/exporter truncate"
                                                    title={exporter.label}
                                                  >
                                                    <ProductIcon size={14} className="text-emerald-400 flex-shrink-0 group-hover/exporter:text-emerald-300" />
                                                    <span className="truncate">{exporter.label}</span>
                                                  </Link>
                                                );
                                              })}
                                            </div>
                                          </div>
                                        )}
                                        
                                        {/* Importers */}
                                        {categoryGroup.importers.length > 0 && (
                                          <div className="ml-7">
                                            <div className="flex items-center gap-2 mb-2">
                                              <Upload size={14} className="text-blue-400 flex-shrink-0" />
                                              <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Importers</span>
                                            </div>
                                            <div className="space-y-1">
                                              {categoryGroup.importers.map((importer, impIdx) => {
                                                const ProductIcon = getProductIcon(importer.label);
                                                return (
                                                  <Link
                                                    key={`${importer.to}-${impIdx}`}
                                                    to={importer.to}
                                                    onClick={() => { 
                                                      setOpenMenu(null);
                                                    }}
                                                    className="flex items-center gap-2 w-full text-left px-3 py-1.5 rounded text-sm text-gray-400 hover:text-blue-300 hover:bg-blue-500/10 pl-5 border-l-2 border-gray-700 hover:border-blue-500 transition-all group/importer truncate"
                                                    title={importer.label}
                                                  >
                                                    <ProductIcon size={14} className="text-blue-400 flex-shrink-0 group-hover/importer:text-blue-300" />
                                                    <span className="truncate">{importer.label}</span>
                                                  </Link>
                                                );
                                              })}
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        // Default rendering for other menus
                        <div className="grid grid-cols-2 gap-6">
                          {item.submenu.map((group) => (
                            <div key={group.group} className="min-w-[300px]">
                              <div className="text-xs uppercase tracking-wider text-gray-400 mb-3 font-semibold">{group.group}</div>
                              <ul className="space-y-1">
                                {group.items.map((sub, idx) => {
                                  const ItemIcon = item.key === 'solutions' 
                                    ? getSolutionIcon(sub.label)
                                    : item.key === 'services'
                                    ? getServiceIcon(sub.label)
                                    : item.key === 'resources'
                                    ? getResourceIcon(sub.label)
                                    : Package;
                                  return (
                                    <li key={`${sub.to}-${idx}`}>
                                      {sub.indent ? (
                                        <button
                                          onClick={() => { 
                                            const path = sub.to.split('#')[0];
                                            navigate(path); 
                                            setOpenMenu(null);
                                            setTimeout(() => {
                                              const hash = sub.to.split('#')[1];
                                              if (hash) {
                                                const element = document.getElementById(hash);
                                                if (element) {
                                                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                                }
                                              }
                                            }, 200);
                                          }}
                                          className="flex items-center gap-2 w-full text-left px-3 py-1.5 rounded-md text-sm text-gray-400 hover:text-sky-300 hover:bg-gray-800/50 pl-5 border-l-2 border-gray-700 hover:border-sky-500 transition-colors group/item"
                                        >
                                          <ItemIcon size={14} className="text-sky-400 flex-shrink-0 group-hover/item:text-sky-300" />
                                          <span className="truncate">{sub.label}</span>
                                        </button>
                                      ) : (
                                        <Link
                                          to={sub.to}
                                          onClick={() => { 
                                            setOpenMenu(null); 
                                          }}
                                          className="flex items-center gap-2 w-full text-left px-2 py-1.5 rounded-md text-sm font-semibold text-gray-200 hover:text-white hover:bg-gray-800 transition-colors cursor-pointer group/item"
                                        >
                                          <ItemIcon size={14} className="text-sky-400 flex-shrink-0 group-hover/item:text-white" />
                                          <span className="truncate">{sub.label}</span>
                                        </Link>
                                      )}
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right side actions with padding */}
          <div className="flex items-center gap-3 ml-auto flex-shrink-0 px-4 lg:px-6 xl:px-8">
            {/* Search */}
            <div className="hidden md:flex relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              <input
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { navigate(`/search?q=${encodeURIComponent(searchText)}`); } }}
                placeholder="Search..."
                className="bg-gray-800 border border-gray-700 text-white rounded-lg pl-10 pr-4 py-2 w-40 xl:w-48 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all placeholder-gray-400"
              />
            </div>
            
            {!isAdmin && (
              <>
                <button 
                  onClick={() => navigate('/cart')}
                  className="text-gray-300 hover:text-white relative p-2 rounded-lg hover:bg-gray-800 transition-colors"
                  aria-label="Shopping cart"
                >
                  <ShoppingCart size={20} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 text-xs text-gray-900 bg-white rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {cartCount}
                    </span>
                  )}
                </button>
                <button 
                  onClick={() => navigate('/account')}
                  className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
                  aria-label="My Account"
                >
                  <User size={20} className="text-gray-300 hover:text-white" />
                </button>
                {/* Admin Access - Press Shift+Click or Double Click */}
                <button 
                  onClick={(e) => {
                    if (e.shiftKey || e.ctrlKey) {
                      setIsAdmin(true);
                      navigate('/admin');
                    }
                  }}
                  onDoubleClick={() => {
                    setIsAdmin(true);
                    navigate('/admin');
                  }}
                  className="p-2 rounded-lg hover:bg-gray-800 transition-colors opacity-30 hover:opacity-100"
                  aria-label="Admin mode (Shift+Click or Double Click)"
                  title="Admin Access: Shift+Click, Ctrl+Click, or Double Click"
                >
                  <Settings size={20} className="text-gray-300 hover:text-white" />
                </button>
              </>
            )}
            {isAdmin && (
              <button 
                onClick={() => setIsAdmin(false)} 
                className="px-4 py-2 rounded-lg bg-white text-gray-900 font-medium hover:bg-gray-100 transition-colors text-sm"
              >
                Exit Admin
              </button>
            )}

            {/* Mobile menu button */}
            <button 
              className="lg:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-300" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-gray-900 border-t border-gray-800">
          <div className="px-4 py-2 space-y-1">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const hasSubmenu = !!item.submenu;
              return (
                <div key={item.to} className="border-b border-gray-800 last:border-b-0">
                  <button
                    onClick={() => {
                      if (hasSubmenu) {
                        setOpenMobileKey((k) => (k === item.to ? null : item.to));
                      } else {
                        navigate(item.to);
                        setMobileMenuOpen(false);
                      }
                    }}
                    className="w-full flex items-center justify-between px-4 py-3 text-left text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg"
                  >
                    <span className="flex items-center gap-3">
                      <IconComponent size={20} />
                      <span className="font-medium">{item.name}</span>
                    </span>
                    {hasSubmenu && <span className="text-gray-500">{openMobileKey === item.to ? '−' : '+'}</span>}
                  </button>
                  {hasSubmenu && openMobileKey === item.to && (
                    <div className="px-6 pb-3">
                      {item.key === 'products' ? (
                        // Special rendering for Products menu on mobile
                        <div className="space-y-4">
                          {item.submenu.map((group) => {
                            const GroupIcon = group.icon === 'Grid3x3' ? Grid3x3 : 
                                             group.icon === 'Sparkles' ? Sparkles : 
                                             group.icon === 'Building2' ? Building2 : Package;
                            return (
                              <div key={group.group} className="mb-4 pb-4 border-b border-gray-800 last:border-b-0 last:pb-0">
                                <div className="flex items-center gap-2 mb-3">
                                  <div className="p-1.5 rounded-md bg-sky-500/10 border border-sky-500/20">
                                    <GroupIcon size={16} className="text-sky-400" />
                                  </div>
                                  <div className="text-xs uppercase tracking-wider text-gray-400 font-bold">{group.group}</div>
                                </div>
                                <div className="space-y-3">
                                  {group.items.map((categoryGroup, idx) => {
                                    const CategoryIcon = categoryGroup.category.icon === 'Grid3x3' ? Grid3x3 :
                                                         categoryGroup.category.icon === 'Box' ? Box :
                                                         categoryGroup.category.icon === 'Building2' ? Building2 :
                                                         categoryGroup.category.icon === 'Cpu' ? Cpu :
                                                         categoryGroup.category.icon === 'Sparkles' ? Sparkles : Package;
                                    return (
                                      <div key={`${categoryGroup.category.to}-${idx}`} className="bg-gray-800/30 rounded-lg p-2">
                                        <Link
                                          to={categoryGroup.category.to}
                                          onClick={() => setMobileMenuOpen(false)}
                                          className="flex items-center gap-2 px-2 py-2 rounded-md text-sm font-semibold text-white hover:bg-gray-700 transition-colors mb-2"
                                        >
                                          <CategoryIcon size={16} className="text-sky-400" />
                                          <span>{categoryGroup.category.label}</span>
                                          <ChevronRight size={12} className="ml-auto text-gray-500" />
                                        </Link>
                                        
                                        {categoryGroup.exporters.length > 0 && (
                                          <div className="ml-6 mb-2">
                                            <div className="flex items-center gap-1.5 mb-1.5">
                                              <Download size={10} className="text-emerald-400" />
                                              <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Exporters</span>
                                            </div>
                                            {categoryGroup.exporters.map((exporter, expIdx) => {
                                              const ProductIcon = getProductIcon(exporter.label);
                                              return (
                                                <Link
                                                  key={`${exporter.to}-${expIdx}`}
                                                  to={exporter.to}
                                                  onClick={() => { 
                                                    setMobileMenuOpen(false);
                                                  }}
                                                  className="flex items-center gap-2 w-full text-left px-2 py-1 rounded text-xs text-gray-400 hover:text-emerald-300 hover:bg-emerald-500/10 border-l-2 border-gray-700 hover:border-emerald-500 transition-colors"
                                                >
                                                  <ProductIcon size={12} className="text-emerald-400 flex-shrink-0" />
                                                  <span className="truncate">{exporter.label}</span>
                                                </Link>
                                              );
                                            })}
                                          </div>
                                        )}
                                        
                                        {categoryGroup.importers.length > 0 && (
                                          <div className="ml-6">
                                            <div className="flex items-center gap-1.5 mb-1.5">
                                              <Upload size={10} className="text-blue-400" />
                                              <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Importers</span>
                                            </div>
                                            {categoryGroup.importers.map((importer, impIdx) => {
                                              const ProductIcon = getProductIcon(importer.label);
                                              return (
                                                <Link
                                                  key={`${importer.to}-${impIdx}`}
                                                  to={importer.to}
                                                  onClick={() => { 
                                                    setMobileMenuOpen(false);
                                                  }}
                                                  className="flex items-center gap-2 w-full text-left px-2 py-1 rounded text-xs text-gray-400 hover:text-blue-300 hover:bg-blue-500/10 border-l-2 border-gray-700 hover:border-blue-500 transition-colors"
                                                >
                                                  <ProductIcon size={12} className="text-blue-400 flex-shrink-0" />
                                                  <span className="truncate">{importer.label}</span>
                                                </Link>
                                              );
                                            })}
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        // Default rendering for other menus on mobile
                        <>
                          {item.submenu.map((group) => (
                            <div key={group.group} className="mb-3">
                              <div className="text-xs uppercase tracking-wider text-gray-500 mb-2 font-semibold">{group.group}</div>
                              <ul className="space-y-1">
                                {group.items.map((sub, idx) => {
                                  const ItemIcon = item.key === 'solutions' 
                                    ? getSolutionIcon(sub.label)
                                    : item.key === 'services'
                                    ? getServiceIcon(sub.label)
                                    : item.key === 'resources'
                                    ? getResourceIcon(sub.label)
                                    : Package;
                                  return (
                                    <li key={`${sub.to}-${idx}`}>
                                      {sub.indent ? (
                                        <button
                                          onClick={() => { 
                                            const path = sub.to.split('#')[0];
                                            navigate(path); 
                                            setMobileMenuOpen(false);
                                            setTimeout(() => {
                                              const hash = sub.to.split('#')[1];
                                              if (hash) {
                                                const element = document.getElementById(hash);
                                                if (element) {
                                                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                                }
                                              }
                                            }, 200);
                                          }}
                                          className="flex items-center gap-2 w-full text-left px-3 py-1.5 rounded-md text-sm text-gray-400 hover:text-sky-300 hover:bg-gray-800 pl-5 border-l-2 border-gray-700 hover:border-sky-500 transition-colors"
                                        >
                                          <ItemIcon size={14} className="text-sky-400 flex-shrink-0" />
                                          <span className="truncate">{sub.label}</span>
                                        </button>
                                      ) : (
                                        <Link
                                          to={sub.to}
                                          onClick={() => { 
                                            setMobileMenuOpen(false); 
                                          }}
                                          className="flex items-center gap-2 w-full text-left px-2 py-1.5 rounded-md text-sm font-semibold text-gray-200 hover:text-white hover:bg-gray-800 transition-colors"
                                        >
                                          <ItemIcon size={14} className="text-sky-400 flex-shrink-0" />
                                          <span className="truncate">{sub.label}</span>
                                        </Link>
                                      )}
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile search */}
          <div className="p-4 border-t border-gray-800">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => { 
                  if (e.key === 'Enter') { 
                    navigate(`/search?q=${encodeURIComponent(searchText)}`); 
                    setMobileMenuOpen(false); 
                  } 
                }}
                placeholder="Search..."
                className="bg-gray-800 border border-gray-700 text-white rounded-lg pl-10 pr-4 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-400"
              />
            </div>
          </div>

          {/* Mobile cart and user */}
          {!isAdmin && (
            <div className="p-4 border-t border-gray-800 flex gap-3">
              <button 
                onClick={() => { navigate('/cart'); setMobileMenuOpen(false); }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-colors"
              >
                <ShoppingCart size={20} />
                <span>Cart</span>
                {cartCount > 0 && (
                  <span className="bg-white text-gray-900 rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs">
                    {cartCount}
                  </span>
                )}
              </button>
              <button 
                onClick={() => { navigate('/account'); setMobileMenuOpen(false); }}
                className="px-4 py-3 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-colors"
              >
                <User size={20} />
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navigation;

