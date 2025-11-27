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
  'design-and-drafting': 'Design & Drafting',
  'bim-modeling': 'BIM Modeling',
  '3d-modeling-rendering': '3D Modeling & Rendering',
  'survey-drafting': 'Survey Drafting',
  'qa-practice': 'QA Practice',
  'ml-services': 'ML Services',
  'tool-proficiency': 'Tool Proficiency',
};

const SLUG_TO_SECTIONS = {
  'design-and-drafting': [
    { h: 'Mechanical', p: 'Production-ready mechanical drawings with GD&T.' },
    { h: 'Electrical', p: 'Panels, wiring, and schematics.' },
    { h: 'Civil', p: 'Site plans, grading, and utilities.' },
    { h: 'Standards', p: 'Layering, linetypes, and title blocks.' },
    { h: 'Delivery', p: 'DWG/DXF with plotted PDFs and issue logs.' },
  ],
  'bim-modeling': [
    { h: 'LOD 200–400', p: 'Discipline-specific BIM models to the required LOD.' },
    { h: 'Coordination', p: 'Clash detection and model federation.' },
    { h: 'Families', p: 'Parametric families and content libraries.' },
    { h: 'Documentation', p: 'Sheets, schedules, and details.' },
    { h: 'Handover', p: 'COBie and asset data for facilities.' },
  ],
  '3d-modeling-rendering': [
    { h: 'Concept Models', p: 'Fast iteration for early-stage design.' },
    { h: 'Photoreal Renders', p: 'Lighting, materials, and composition.' },
    { h: 'Animations', p: 'Storyboarded camera paths and captions.' },
    { h: 'Optimization', p: 'Topology, UVs, and LOD for real-time.' },
    { h: 'Delivery', p: 'Image/video packages and source assets.' },
  ],
  'survey-drafting': [
    { h: 'Topo', p: 'Contours, spot elevations, and surface creation.' },
    { h: 'Boundary', p: 'Metes and bounds with closures.' },
    { h: 'Plats', p: 'Sheeted deliverables per jurisdiction.' },
    { h: 'QA', p: 'Checks for accuracy and legibility.' },
    { h: 'Export', p: 'CAD/GIS formats as needed.' },
  ],
  'qa-practice': [
    { h: 'Manual Testing', p: 'Test plans, cases, and bug triage.' },
    { h: 'Automation', p: 'UI, API, and performance automation.' },
    { h: 'Tooling', p: 'CICD hooks, reporting, and dashboards.' },
    { h: 'Process', p: 'Definition of done and quality gates.' },
    { h: 'Metrics', p: 'Coverage, lead time, and defect escape rate.' },
  ],
  'ml-services': [
    { h: 'Annotation', p: 'Image/text/3D labeling workflows.' },
    { h: 'Guidelines', p: 'Consistent taxonomies and examples.' },
    { h: 'Validation', p: 'Consensus, audits, and review loops.' },
    { h: 'Pipelines', p: 'Capture, cleaning, versioning.' },
    { h: 'Handoff', p: 'Export formats and model-ready datasets.' },
  ],
  'tool-proficiency': [
    { h: 'AutoCAD', p: 'Advanced CAD drafting and automation.' },
    { h: 'Revit', p: 'Modeling, families, and documentation.' },
    { h: 'SolidWorks', p: 'Parts, assemblies, and drawings.' },
    { h: 'Engines', p: 'Unity/Unreal for real-time visuals.' },
    { h: 'Interoperability', p: 'IFC, STEP, USDZ integrations.' },
  ],
};

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const title = SLUG_TO_TITLE[slug] || 'Service';
  const sections = SLUG_TO_SECTIONS[slug] || SLUG_TO_SECTIONS['design-and-drafting'];
  const toc = useMemo(() => sections.map(s => ({ id: s.h.toLowerCase().replace(/[^a-z0-9]+/g, '-'), label: s.h })), [sections]);
  const [activeId, setActiveId] = useState(toc[0]?.id);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveId(entry.target.id);
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
  const serviceSchema = getServiceSchema({ title, slug, description: `Overview and details for ${title}` });
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: `${siteUrl}/` },
    { name: 'Services', url: `${siteUrl}/services` },
    { name: title, url: `${siteUrl}/services/${slug}` }
  ]);

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [serviceSchema, breadcrumbSchema]
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <SEO
        title={`${title} - CAD Services`}
        description={`Overview and details for ${title}`}
        structuredData={structuredData}
      />
      <InternalBanner title={title} subtitle="Detailed scope, deliverables, and workflows" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="text-sm mb-8">
          <ol className="flex items-center gap-2 text-gray-600">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li>/</li>
            <li><Link to="/services" className="hover:underline">CAD Services</Link></li>
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


