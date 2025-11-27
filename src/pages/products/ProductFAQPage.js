import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import SEO from '../../components/SEO';
import { productCategories } from '../../data/productCategories';
import { getProductDetails } from '../../data/productDetails';

const ProductFAQPage = () => {
  const { categorySlug, productSlug } = useParams();
  const [openIndex, setOpenIndex] = useState(null);

  // Find category
  const category = Object.values(productCategories).find(cat => cat.slug === categorySlug);

  // Get product details
  const productDetails = getProductDetails(productSlug);

  // Find product name
  const product = category 
    ? [...category.exporters, ...category.importers].find(p => {
        const slug = p.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        return slug === productSlug;
      })
    : null;

  // Get FAQs
  const faqs = productDetails?.faqs || [
    {
      question: `What is ${product}?`,
      answer: `${product} is a plugin for ${category?.name} that allows you to export/import files in various formats with precision and reliability.`
    },
    {
      question: 'Is there a trial version?',
      answer: 'Yes, we offer a free 30-day trial with full feature access. No credit card required.'
    },
    {
      question: 'What are the system requirements?',
      answer: 'The plugin is compatible with Windows 10 and Windows 11 only. Make sure you have the latest version of the CAD software installed.'
    },
    {
      question: 'How do I install the plugin?',
      answer: 'Download the plugin from our website or the Autodesk App Store and follow the installation instructions provided.'
    },
    {
      question: 'What happens after my trial expires?',
      answer: 'After the trial period, you will need to purchase a license to continue using the plugin. Your trial data will be preserved.'
    },
    {
      question: 'Can I transfer my license?',
      answer: 'This depends on your license type. Locked licenses are tied to a specific machine, while transferable licenses can be moved between machines.'
    },
    {
      question: 'Do you offer support?',
      answer: 'Yes, we provide email support for all licensed users. Premium licenses include priority support.'
    },
    {
      question: 'Are updates included?',
      answer: 'All license types include free updates for the first year. After that, you may need to purchase a renewal for updates and support.'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!category || !product) {
    return (
      <div className="bg-gray-950 text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link
            to={category ? `/3d-products/${categorySlug}` : '/3d-products'}
            className="inline-flex items-center gap-2 px-6 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
          >
            <ArrowLeft size={18} />
            {category ? `Back to ${category.name}` : 'Back to Products'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <SEO 
        title={`${product} - FAQs - ProtoTech Solutions`} 
        description={`Frequently asked questions about ${product} for ${category.name}`}
      />

      {/* Header */}
      <section className="relative py-12 md:py-16 bg-gradient-to-br from-gray-900 via-gray-950 to-black border-b border-gray-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.1),transparent_60%)]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to={`/3d-products/${categorySlug}/${productSlug}`}
            className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 mb-6 transition-colors group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to {product}</span>
          </Link>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 text-sm text-yellow-300 mb-6 backdrop-blur-sm">
              <HelpCircle size={16} />
              <span>FAQs</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-sky-100 to-cyan-100">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-300 mb-2">{product} for {category.name}</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden hover:border-sky-500/50 transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-700/30 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
                  {openIndex === index ? (
                    <ChevronUp size={20} className="text-sky-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown size={20} className="text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-5 border-t border-gray-700/50">
                    <p className="text-gray-300 leading-relaxed pt-4">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Still have questions?</h3>
              <p className="text-gray-400 mb-6">Can't find the answer you're looking for? Please reach out to our support team.</p>
              <Link
                to={`/products/${categorySlug}/${productSlug}#contact-form`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors font-medium"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductFAQPage;

