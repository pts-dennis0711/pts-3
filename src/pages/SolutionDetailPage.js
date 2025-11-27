import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import SEO from '../components/SEO';
import InternalBanner from '../components/InternalBanner';
import LogosCarousel from '../components/LogosCarousel';
import Testimonials from '../components/Testimonials';
import ContactForm from '../components/ContactForm';
import { Link } from 'react-router-dom';
import { getServiceSchema, getBreadcrumbSchema } from '../utils/structuredData';

const SLUG_TO_TITLE = {
  '3d-web-app-development': '3D Web App Development',
  '3d-desktop-app-development': '3D Desktop App Development',
  '3d-mobile-app-development': '3D Mobile App Development',
  'bim-application-development': 'BIM Application Development',
  'ar-vr-application-development': 'AR | VR Application Development',
  'data-interoperability': 'Data Interoperability',
  'cad-customization': 'CAD Customization',
  'cloud-services': 'Cloud Services',
  'ml-data-annotation': 'ML Data Annotation',
  'quality-assurance': 'Quality Assurance',
};

const SLUG_TO_SECTIONS = {
  '3d-web-app-development': [
    { h: 'Interactive Viewers', p: 'High-performance viewers with slicing, clipping, and measurement tools.' },
    { h: 'Collaboration', p: 'Multi-user sessions, annotations, and versioning.' },
    { h: 'Rendering', p: 'WebGL/WebGPU pipelines with PBR materials and HDR.' },
    { h: 'Data Pipelines', p: 'Asset processing, compression, and streaming.' },
    { h: 'Security', p: 'Auth, RBAC, signed URLs, and audit logs.' },
  ],
  '3d-desktop-app-development': [
    { h: 'Native Performance', p: 'C++/C# stacks for advanced engineering workflows.' },
    { h: 'Offline-first', p: 'Local caches, sync, and conflict resolution.' },
    { h: 'Plugins', p: 'Extend existing tools with custom UI and automation.' },
    { h: 'Scripting', p: 'Expose scripting APIs for customization.' },
    { h: 'Distribution', p: 'Installers, updates, and licensing models.' },
  ],
  '3d-mobile-app-development': [
    { h: 'Field Workflows', p: 'On-site visualization, capture, and markup.' },
    { h: 'AR Overlays', p: 'ARKit/ARCore powered overlays and alignment.' },
    { h: 'Optimized Assets', p: 'LOD strategies and efficient streaming.' },
    { h: 'Offline Modes', p: 'Local storage and conflict-free sync.' },
    { h: 'Device Integrations', p: 'Camera, GPS, sensors, and external devices.' },
  ],
  'bim-application-development': [
    { h: 'Authoring Tools', p: 'Custom authoring, coordination, and clash detection.' },
    { h: 'IFC/BCF', p: 'Robust IFC and BCF support with validation.' },
    { h: 'Rules Engines', p: 'Compliance checks and automated QA.' },
    { h: 'Collaboration', p: 'Issues, assignments, and change tracking.' },
    { h: 'Integrations', p: 'Connect with CDEs and project management tools.' },
  ],
  'ar-vr-application-development': [
    { h: 'Immersive Training', p: 'Scenario-based training and simulations.' },
    { h: 'Design Reviews', p: 'Collaborative sessions with presence and voice.' },
    { h: 'Digital Twins', p: 'Live telemetry overlays and control panels.' },
    { h: 'Device Targets', p: 'HMDs, mobile, and desktop compatibility.' },
    { h: 'Asset Prep', p: 'Optimize assets for real-time engines.' },
  ],
  'data-interoperability': [
    { h: 'Import/Export', p: 'IFC, STEP, USDZ pipelines with schema mapping.' },
    { h: 'Validation', p: 'Schema checks, linting, and repair routines.' },
    { h: 'Converters', p: 'Batch converters and web pipelines.' },
    { h: 'Metadata', p: 'Preserve metadata and relationships.' },
    { h: 'Automation', p: 'Event-driven processing and notifications.' },
  ],
  'cad-customization': [
    { h: 'Plugins', p: 'Extend AutoCAD, Revit, SolidWorks with custom tools.' },
    { h: 'Automation', p: 'Scripting, batch jobs, and macros.' },
    { h: 'UI/UX', p: 'Panels, palettes, and productivity-focused UI.' },
    { h: 'Interoperability', p: 'Exchange data with enterprise systems.' },
    { h: 'Deployment', p: 'Installer packaging and license management.' },
  ],
  'cloud-services': [
    { h: 'APIs & Microservices', p: 'Secure REST/GraphQL APIs and services.' },
    { h: 'Asset Processing', p: 'Workers for conversions, thumbnails, and analysis.' },
    { h: 'CI/CD', p: 'Pipelines, observability, and rollbacks.' },
    { h: 'Scalability', p: 'Autoscaling and multi-region deployments.' },
    { h: 'Security', p: 'IAM, rotated secrets, and defense in depth.' },
  ],
  'ml-data-annotation': [
    { h: 'Modalities', p: 'Image, text, and 3D point cloud labeling.' },
    { h: 'Guidelines', p: 'Clear instructions and examples.' },
    { h: 'QA Loops', p: 'Consensus, spot checks, and audits.' },
    { h: 'Pipelines', p: 'Capture, cleaning, and versioning.' },
    { h: 'Exports', p: 'COCO, Pascal VOC, and custom formats.' },
  ],
  'quality-assurance': [
    { h: 'Test Strategy', p: 'Manual and automated testing strategy.' },
    { h: 'Automation', p: 'UI, API, and load testing frameworks.' },
    { h: 'Environments', p: 'Staging mirrors and seed data.' },
    { h: 'Metrics', p: 'Coverage, flakiness, and performance.' },
    { h: 'Reporting', p: 'Dashboards and alerting.' },
  ],
};

export default function SolutionDetailPage() {
  const { slug } = useParams();
  const title = SLUG_TO_TITLE[slug] || 'Solution';
  const sections = SLUG_TO_SECTIONS[slug] || SLUG_TO_SECTIONS['3d-web-app-development'];
  const toc = useMemo(() => sections.map(s => ({ id: s.h.toLowerCase().replace(/[^a-z0-9]+/g, '-'), label: s.h })), [sections]);
  const [activeId, setActiveId] = useState(toc[0]?.id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, { rootMargin: '0px 0px -70% 0px', threshold: 0.1 });

    toc.forEach(item => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [toc]);

  // Generate structured data
  const siteUrl = process.env.REACT_APP_SITE_URL || 'https://staging8.prototechsolutions.com';
  const solutionSchema = getServiceSchema({ title, slug, description: `Overview and details for ${title}` });
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: `${siteUrl}/` },
    { name: 'Solutions', url: `${siteUrl}/solutions` },
    { name: title, url: `${siteUrl}/solutions/${slug}` }
  ]);

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [solutionSchema, breadcrumbSchema]
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <SEO
        title={`${title} - Product Development`}
        description={`Overview and details for ${title}`}
        structuredData={structuredData}
      />
      <InternalBanner title={title} subtitle="Deep-dive into capabilities and deliverables" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="text-sm mb-8">
          <ol className="flex items-center gap-2 text-gray-600">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li>/</li>
            <li><Link to="/solutions" className="hover:underline">Product Development</Link></li>
            <li>/</li>
            <li aria-current="page" className="font-semibold text-gray-800">{title}</li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* TOC */}
          <aside className="lg:col-span-3 hidden lg:block">
            <div className="sticky top-24 bg-white rounded-xl border border-gray-200 p-4">
              <div className="font-semibold mb-3" style={{ color: '#01A5BF' }}>On this page</div>
              <ul className="space-y-2 text-sm">
                {toc.map(item => (
                  <li key={item.id}>
                    <Link to={`#${item.id}`} className={`hover:underline ${activeId === item.id ? 'text-gray-900 font-semibold' : 'text-gray-600'}`}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <main className="lg:col-span-9 space-y-12">
            {sections.map((s, i) => (
              <section key={i} id={s.h.toLowerCase().replace(/[^a-z0-9]+/g, '-')} className="reveal">
                <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                  <h2 className="text-3xl font-bold mb-3" style={{ color: '#01A5BF' }}>{s.h}</h2>
                  <p className="text-lg text-gray-700">{s.p}</p>
                </div>
              </section>
            ))}

            <section className="space-y-6 reveal">
              <h2 className="text-3xl font-bold text-center" style={{ color: '#01A5BF' }}>What Our Clients Say</h2>
              <Testimonials />
            </section>

            <section className="space-y-6 reveal">
              <h2 className="text-3xl font-bold text-center" style={{ color: '#01A5BF' }}>Trusted By Industry Leaders</h2>
              <LogosCarousel />
            </section>

            <section className="space-y-6 reveal">
              <h2 className="text-3xl font-bold text-center" style={{ color: '#01A5BF' }}>Get In Touch</h2>
              <ContactForm />
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}


