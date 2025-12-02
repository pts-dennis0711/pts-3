import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import SEO from './components/SEO';
import ScrollToTop from './components/ScrollToTop';
import { getOrganizationSchema } from './utils/structuredData';
import { Routes, Route, useNavigate, useLocation, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import SearchResultsPage from './pages/SearchResultsPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import SuccessStoriesPage from './pages/SuccessStoriesPage';
import SuccessStoryDetailPage from './pages/SuccessStoryDetailPage';
import SolutionsPage from './pages/SolutionsPage';
import ServicesPage from './pages/ServicesPage';
import CompanyPage from './pages/CompanyPage';
import ResourcesPage from './pages/ResourcesPage';
import AboutPage from './pages/AboutPage';
import CareersPage from './pages/CareersPage';
import PartnersPage from './pages/PartnersPage';
import SupportPage from './pages/SupportPage';
import SolutionDetailPage from './pages/SolutionDetailPage';
import ServiceDetailPage from './pages/ServiceDetailPage';

// Solution Pages
import WebApplicationPage from './pages/solutions/WebApplicationPage';
import DesktopApplicationPage from './pages/solutions/DesktopApplicationPage';
import MobileApplicationPage from './pages/solutions/MobileApplicationPage';
import EyeshotDevelopmentPage from './pages/solutions/EyeshotDevelopmentPage';
import ProductConfiguratorPage from './pages/solutions/ProductConfiguratorPage';
import CPQConfiguratorPage from './pages/solutions/CPQConfiguratorPage';
import FurnitureConfiguratorPage from './pages/solutions/FurnitureConfiguratorPage';
import CloudServicesPage from './pages/solutions/CloudServicesPage';
import BIMApplicationPage from './pages/solutions/BIMApplicationPage';
import BIMAutomationPage from './pages/solutions/BIMAutomationPage';
import ARVRDevelopmentPage from './pages/solutions/ARVRDevelopmentPage';
import DataInteroperabilityPage from './pages/solutions/DataInteroperabilityPage';
import CADTranslationPage from './pages/solutions/CADTranslationPage';
import CADCustomizationPage from './pages/solutions/CADCustomizationPage';
import DataAnnotationPage from './pages/solutions/DataAnnotationPage';
import QualityAssurancePage from './pages/solutions/QualityAssurancePage';
import GameTestingPage from './pages/solutions/GameTestingPage';

// Service Pages
import CADDraftingPage from './pages/services/CADDraftingPage';
import ArchitecturalDraftingPage from './pages/services/ArchitecturalDraftingPage';
import MillworkDraftingPage from './pages/services/MillworkDraftingPage';
import StructuralCADDraftingPage from './pages/services/StructuralCADDraftingPage';
import BIMModelingPage from './pages/services/BIMModelingPage';
import RevitMEPDraftingPage from './pages/services/RevitMEPDraftingPage';
import ScanToBIMPage from './pages/services/ScanToBIMPage';
import RevitFamilyCreationPage from './pages/services/RevitFamilyCreationPage';
import CADtoBIMPage from './pages/services/CADtoBIMPage';
import BIMCoordinationPage from './pages/services/BIMCoordinationPage';
import AsBuiltDrawingPage from './pages/services/AsBuiltDrawingPage';
import CivilCADDraftingPage from './pages/services/CivilCADDraftingPage';
import RoadHighwayDesignPage from './pages/services/RoadHighwayDesignPage';
import LandSurveyDraftingPage from './pages/services/LandSurveyDraftingPage';
import MechanicalDraftingPage from './pages/services/MechanicalDraftingPage';
import PlantDesignEngineeringPage from './pages/services/PlantDesignEngineeringPage';

// Product Category Pages
import ProductCategoryPage from './pages/products/ProductCategoryPage';
import ProductPage from './pages/products/ProductPage';
import ProductFAQPage from './pages/products/ProductFAQPage';
import TrialDownloadForm from './pages/products/TrialDownloadForm';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminBlogs from './pages/admin/AdminBlogs';
import AdminStories from './pages/admin/AdminStories';
import { initialData } from './data/initialData';
import { useStore } from './store/useStore';
import { useCartStore } from './store/cartStore';
import { useAuthStore } from './store/authStore';
// E-commerce pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AccountPage from './pages/AccountPage';
import OrderDetailPage from './pages/OrderDetailPage';

import AdminLogin from './admin/AdminLogin';
import Dashboard from './admin/Dashboard';
import ProductList from './admin/ProductList';
import ProductEditor from './admin/ProductEditor';

// Simple Admin Route Wrapper
const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!token) navigate('/admin/login');
  }, [token, navigate]);

  return token ? children : null;
};

function App() {
  const location = useLocation();
  const loadState = (key, fallback) => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (_) {
      return fallback;
    }
  };

  const [products, setProducts] = useState(loadState('products', initialData.products));
  const [blogs, setBlogs] = useState(loadState('blogs', initialData.blogs));
  const [successStories, setSuccessStories] = useState(loadState('successStories', initialData.successStories));
  const [isAdmin, setIsAdmin] = useState(loadState('isAdmin', false));
  const { cartCount } = useStore();
  const { cartCount: ecomCartCount } = useCartStore();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    localStorage.setItem('cartCount', JSON.stringify(cartCount));
  }, [cartCount]);

  // Initialize cart for current user session
  useEffect(() => {
    useCartStore.getState().initializeCart();
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('blogs', JSON.stringify(blogs));
  }, [blogs]);

  useEffect(() => {
    localStorage.setItem('successStories', JSON.stringify(successStories));
  }, [successStories]);

  useEffect(() => {
    localStorage.setItem('isAdmin', JSON.stringify(isAdmin));
  }, [isAdmin]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
  }, [location.pathname, location.search]);



  // Organization schema for app-level
  const organizationSchema = getOrganizationSchema();
  const appStructuredData = {
    '@context': 'https://schema.org',
    '@graph': [organizationSchema]
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <SEO
        title="ProtoTech Solutions - CAD Plugins, BIM Services & 3D Solutions"
        description="Professional CAD plugins, BIM services, and 3D solutions for AutoCAD, Revit, SolidWorks, and more."
        structuredData={appStructuredData}
      />
      <Navigation
        cartCount={ecomCartCount || cartCount}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
      />
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        } />
        <Route path="/admin/products" element={
          <AdminRoute>
            <ProductList />
          </AdminRoute>
        } />
        <Route path="/admin/products/:slug" element={
          <AdminRoute>
            <ProductEditor />
          </AdminRoute>
        } />

        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />

        {/* Solutions Routes - Specific routes first */}
        <Route path="/solutions" element={<SolutionsPage />} />
        <Route path="/solutions/3d-web-application" element={<WebApplicationPage />} />
        <Route path="/solutions/3d-desktop-application" element={<DesktopApplicationPage />} />
        <Route path="/solutions/3d-mobile-application" element={<MobileApplicationPage />} />
        <Route path="/solutions/eyeshot-development" element={<EyeshotDevelopmentPage />} />
        <Route path="/solutions/3d-product-configurator" element={<ProductConfiguratorPage />} />
        <Route path="/solutions/cpq-configurator" element={<CPQConfiguratorPage />} />
        <Route path="/solutions/3d-furniture-configurator" element={<FurnitureConfiguratorPage />} />
        <Route path="/solutions/cloud-services" element={<CloudServicesPage />} />
        <Route path="/solutions/bim-application" element={<BIMApplicationPage />} />
        <Route path="/solutions/bim-automation" element={<BIMAutomationPage />} />
        <Route path="/solutions/3d-ar-vr-development" element={<ARVRDevelopmentPage />} />
        <Route path="/solutions/data-interoperability" element={<DataInteroperabilityPage />} />
        <Route path="/solutions/cad-translation" element={<CADTranslationPage />} />
        <Route path="/solutions/cad-customization" element={<CADCustomizationPage />} />
        <Route path="/solutions/data-annotation" element={<DataAnnotationPage />} />
        <Route path="/solutions/quality-assurance" element={<QualityAssurancePage />} />
        <Route path="/solutions/game-testing" element={<GameTestingPage />} />
        <Route path="/solutions/:slug" element={<SolutionDetailPage />} />

        {/* 3D Services Routes - New routes with /3d-services/ prefix */}
        <Route path="/3d-services/3d-web-application" element={<WebApplicationPage />} />
        <Route path="/3d-services/3d-desktop-application" element={<DesktopApplicationPage />} />
        <Route path="/3d-services/3d-mobile-application" element={<MobileApplicationPage />} />
        <Route path="/3d-services/eyeshot-development" element={<EyeshotDevelopmentPage />} />
        <Route path="/3d-services/3d-product-configurator" element={<ProductConfiguratorPage />} />
        <Route path="/3d-services/cpq-configurator" element={<CPQConfiguratorPage />} />
        <Route path="/3d-services/3d-furniture-configurator" element={<FurnitureConfiguratorPage />} />
        <Route path="/3d-services/cloud-services" element={<CloudServicesPage />} />
        <Route path="/3d-services/bim-application" element={<BIMApplicationPage />} />
        <Route path="/3d-services/bim-automation" element={<BIMAutomationPage />} />
        <Route path="/3d-services/3d-ar-vr-development" element={<ARVRDevelopmentPage />} />
        <Route path="/3d-services/data-interoperability" element={<DataInteroperabilityPage />} />
        <Route path="/3d-services/cad-translation" element={<CADTranslationPage />} />
        <Route path="/3d-services/cad-customization" element={<CADCustomizationPage />} />
        <Route path="/3d-services/quality-assurance" element={<QualityAssurancePage />} />
        <Route path="/3d-services/game-testing" element={<GameTestingPage />} />
        <Route path="/3d-services/:slug" element={<SolutionDetailPage />} />

        {/* Services Routes - Specific routes first */}
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/ml-data-annotation" element={<DataAnnotationPage />} />
        <Route path="/services/cad-drafting" element={<CADDraftingPage />} />
        <Route path="/services/architectural-drafting" element={<ArchitecturalDraftingPage />} />
        <Route path="/services/millwork-drafting" element={<MillworkDraftingPage />} />
        <Route path="/services/structural-cad-drafting" element={<StructuralCADDraftingPage />} />
        <Route path="/services/bim-modeling" element={<BIMModelingPage />} />
        <Route path="/services/revit-mep-drafting" element={<RevitMEPDraftingPage />} />
        <Route path="/services/scan-to-bim" element={<ScanToBIMPage />} />
        <Route path="/services/revit-family-creation" element={<RevitFamilyCreationPage />} />
        <Route path="/services/cad-to-bim" element={<CADtoBIMPage />} />
        <Route path="/services/bim-coordination" element={<BIMCoordinationPage />} />
        <Route path="/services/as-built-drawing" element={<AsBuiltDrawingPage />} />
        <Route path="/services/civil-cad-drafting" element={<CivilCADDraftingPage />} />
        <Route path="/services/road-highway-design" element={<RoadHighwayDesignPage />} />
        <Route path="/services/land-survey-drafting" element={<LandSurveyDraftingPage />} />
        <Route path="/services/mechanical-drafting" element={<MechanicalDraftingPage />} />
        <Route path="/services/plant-design-engineering" element={<PlantDesignEngineeringPage />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />

        {/* Product Routes - Product detail pages first, then category pages */}
        <Route path="/3d-products" element={<ShopPage />} />
        <Route path="/3d-products/:categorySlug/:productSlug/trial" element={<TrialDownloadForm />} />
        <Route path="/3d-products/:categorySlug/:productSlug/faq" element={<ProductFAQPage />} />
        <Route path="/3d-products/:categorySlug/:productSlug" element={<ProductPage />} />
        <Route path="/3d-products/autocad" element={<ProductCategoryPage />} />
        <Route path="/3d-products/inventor" element={<ProductCategoryPage />} />
        <Route path="/3d-products/maya" element={<ProductCategoryPage />} />
        <Route path="/3d-products/fusion-360" element={<ProductCategoryPage />} />
        <Route path="/3d-products/navisworks" element={<ProductCategoryPage />} />
        <Route path="/3d-products/revit" element={<ProductCategoryPage />} />
        <Route path="/3d-products/sketchup" element={<ProductCategoryPage />} />
        <Route path="/3d-products/solid-edge" element={<ProductCategoryPage />} />
        <Route path="/3d-products/solidworks" element={<ProductCategoryPage />} />
        <Route path="/3d-products/3ds-max" element={<ProductCategoryPage />} />
        <Route path="/3d-products/:categorySlug" element={<ProductCategoryPage />} />
        <Route path="/product" element={<ProductDetailPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/company" element={<CompanyPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/partners" element={<PartnersPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/blog/:id" element={<BlogDetailPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/success/:id" element={<SuccessStoryDetailPage />} />
        <Route path="/success" element={<SuccessStoriesPage />} />

        {/* E-commerce Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/order/:orderId" element={<OrderDetailPage />} />
      </Routes>

      {/* Scroll to Top Button */}
      <ScrollToTop />

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold mb-4">USE CASES</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/solutions" className="hover:text-white transition-colors">Product Development</Link></li>
                <li><Link to="/services" className="hover:text-white transition-colors">CAD Services</Link></li>
                <li><Link to="/3d-products" className="hover:text-white transition-colors">Products</Link></li>
                <li><Link to="/resources" className="hover:text-white transition-colors">Resources</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">COMPANY</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link to="/company" className="hover:text-white transition-colors">Company</Link></li>
                <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link to="/partners" className="hover:text-white transition-colors">Partners</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">SUPPORT</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/support" className="hover:text-white transition-colors">Support</Link></li>
                <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="/resources" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">STAY CONNECTED</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition-colors">YouTube</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 YourBusiness. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
