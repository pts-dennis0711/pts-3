import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BadgeCheck, Zap, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';
import { getOrganizationSchema, getWebSiteSchema } from '../utils/structuredData';
import { brand } from '../content/brand.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedSlider from "../components/AnimatedSlider.js";

const HomePage = () => {
  const navigate = useNavigate();
  const clientLogos = [
    { title: 'Microsoft', subtitle: 'Enterprise Innovation Partner' },
    { title: 'Roblox', subtitle: 'Quality Assurance Ally' },
    { title: 'Siemens', subtitle: 'Digital Twin Collaborator' },
    { title: 'Sony', subtitle: 'Product Visualization Partner' },
    { title: 'Trimble', subtitle: 'Construction Cloud Innovator' },
    { title: 'Vectorworks', subtitle: 'BIM Platform Partner' },
    { title: 'WGI Engineering', subtitle: 'Infrastructure Consultant' },
    { title: '3D Surgical', subtitle: 'MedTech Visualization Partner' },
  ];
  const clientTestimonials = [
    {
      name: 'Ron Fritz',
      role: 'CEO',
      company: 'Tech Soft 3D',
      quote:
        'Our relationship with ProtoTech has been highly beneficial to many ISV’s using TS3D components. By providing high-value development services to complement our rich components, the team at ProtoTech helps engineering ISV’s build better software, faster. Based on our experience we would recommend them highly as a services partner for any engineering software project.',
      focus: 'ISV Acceleration',
      metric: 'High-value services',
    },
    {
      name: 'David Little',
      role: 'Intergraph (United States)',
      company: 'Hexagon',
      quote:
        'Professionally network team building materials without goal-oriented e-tailers. Collaboratively brand business portals through team building experiences. Completely target intuitive web-readiness vis-a-vis.',
      focus: 'Enterprise Collaboration',
      metric: 'Brand consistency',
    },
    {
      name: 'Brad Strong',
      role: 'Technical Communications Director',
      company: 'TransMagic Inc.',
      quote:
        'I want to take a moment to applaud the ProtoTech team for their outstanding problem-solving abilities. They are a true force of nature when it comes to tackling complex issues. Their dedication and expertise shine through, making them an invaluable asset to our team here at TransMagic.',
      focus: 'Complex problem solving',
      metric: 'Mission-critical delivery',
    },
    {
      name: 'Craig Dennis',
      role: 'CTO',
      company: 'TransMagic Inc.',
      quote:
        'Thank you for doing such a great job - we\'re very excited about this new product and our ProtoTech team. We\'ve got a winner here.',
      focus: 'Product launch support',
      metric: 'Faster time-to-market',
    },
    {
      name: 'Biplab Sarkar',
      role: 'CEO',
      company: 'Nemetschek Vectorworks',
      quote:
        'It has been a pleasure working with the ProtoTech development team. We were looking for a technically competent professional off-site development team for some of the core feature developments in Vectorworks. And ProtoTech stepped up to the plate and delivered the functionality with quality in a timely fashion.',
      focus: 'Core feature delivery',
      metric: 'On-time releases',
    },
    {
      name: 'Tim Loduha',
      role: 'Senior Director',
      company: 'Roblox',
      quote:
        'For six years and counting, ProtoTech has been an extremely valuable quality assurance partner for Roblox. The thorough and disciplined testing conducted by ProtoTech\'s QA team gives us great confidence that we are delivering high-quality product updates to our millions of users.',
      focus: 'QA partnership',
      metric: 'Six-year engagement',
    },
    {
      name: 'Zoé Bezpalko',
      role: 'Senior Sustainability Strategy Manager',
      company: 'Autodesk',
      quote:
        'The new Makersite add-on for Fusion 360 is a game changer in enabling designers to make high-confidence decisions on CO2 and costs in real-time. Thanks to ProtoTech\'s expertise, we were able to implement this solution quickly and in a collaborative way with Makersite.',
      focus: 'Sustainable innovation',
      metric: 'Fusion 360 add-on',
    },
    {
      name: 'Damian Rafferty',
      role: 'Product Leader',
      company: 'Pulse PLM',
      quote:
        'We at Pulse Systems create value enhancing software solutions. For our Pulse PLM Suite we needed an expert team with 3D software development skills. ProtoTech Solutions turned out to be perfect partners for us. They helped us right from making technology decisions to design and implementation of our ideas.',
      focus: 'PLM modernization',
      metric: 'Idea-to-implementation',
    },
    {
      name: 'Peter Saal',
      role: 'Product Manager',
      company: 'Trimble',
      quote:
        'We are very impressed with the ProtoTech team\'s unprompted willingness to always go the extra mile. They did an outstanding job dealing with our application-specific challenges and optimizing large files down to very compact ones, reducing them in some cases by almost 70%.',
      focus: 'File optimization',
      metric: '70% smaller files',
    },
    {
      name: 'Henry Uyeme',
      role: 'CEO',
      company: 'Intrida',
      quote:
        'We had presented a very challenging set of objectives requiring intricate engineering processes. This was expertly handled by ProtoTech Solutions, with a high degree of technology expertise, deep understanding of product requirements, and excellent communications. This has naturally lead to a perfect partnership which we are very proud of.',
      focus: 'Engineering partnership',
      metric: 'High-complexity delivery',
    },
  ];
  const growthStats = [
    { value: '20', prefix: '+', label: 'Years of Domain Experience' },
    { value: '120', prefix: '+', label: 'Skilled Professionals' },
    { value: '3000', prefix: '+', label: 'Happy Clients' },
    { value: '250', prefix: '+', label: 'Projects Delivered' },
    { value: '100', prefix: '+', label: 'Countries Served' },
    { value: '100', prefix: '+', label: 'CAD Plugins Developed' },
  ];
  const servicesOptions = [
    '3D Application Development',
    'BIM Application Development',
    'CAD Customization & Automation',
    'AR/VR/XR Product Experiences',
    'QA & Testing Services',
    'Custom Software Development',
  ];
  const faqItems = [
    {
      question: 'Are your service prices fixed, or do they vary depending on the project scope?',
      answer:
        'Every engagement is scoped based on complexity, integrations, and delivery timelines. We provide transparent estimates and flexible engagement models that scale with your roadmap.',
    },
    {
      question: 'Can ProtoTech Solutions develop custom software solutions for specific business needs?',
      answer:
        'Absolutely. Bespoke engineering software is our DNA—whether you need a new viewer, automation workflow, or a custom plugin, we assemble the right specialists to ship it.',
    },
    {
      question: 'Does ProtoTech Solutions provide technical support for its products and services?',
      answer:
        'Yes. We include warranty support with every launch and offer extended SLAs, dedicated QA pods, and managed support desks for mission-critical deployments.',
    },
    {
      question: 'How does ProtoTech Solutions support clients post-project completion?',
      answer:
        'We stay engaged through hypercare, training, optimization sprints, and telemetry reviews so your team can keep shipping with confidence long after go-live.',
    },
    {
      question: 'How does ProtoTech Solutions ensure the security of client data?',
      answer:
        'We adhere to secure SDLC practices, role-based access, encrypted environments, and follow client-specific compliance guidelines for every project artifact.',
    },
    {
      question: 'Is ProtoTech Solutions involved in any research and development activities?',
      answer:
        'Yes. Our R&D group prototypes CAD automation, visualization, and AI workflows so clients can adopt emerging tech without slowing down their release cycles.',
    },
    {
      question: 'Where is ProtoTech Solutions located?',
      answer:
        'We operate globally from Pune, India with distributed teams that collaborate across North America, Europe, and APAC time zones.',
    },
  ];
  const awards = [
    'Autodesk Platform Services Partner',
    'Autodesk Construction Integration Partner',
    'APS Certified Partner – Manufacturing',
    'APS Certified Partner – Manufacturing Automation',
  ];
  const successStories = [
    {
      title: 'Automated 3D Model Conversion and Visualization Platform for Engineering Workflows',
      summary:
        'Delivered a high-throughput conversion engine with interactive visualization so engineering teams can review complex assemblies in the browser without compromising fidelity.',
      tags: ['3D Application Development', '3D Visualization - Desktop', '3D Visualization - Web'],
      cta: 'Show project',
    },
    {
      title: 'Empowering Construction Teams with WhatsApp and Autodesk Construction Cloud Integration',
      summary:
        'Built a secure communication bridge between field teams and Autodesk Construction Cloud to keep RFIs, approvals, and tasks synchronized in real time.',
      tags: ['3D Application Development', '3D Visualization - Mobile'],
      cta: 'Show project',
    },
  ];
  const partnerHighlights = [
    { text: 'Authorized Autodesk Service Provider', icon: BadgeCheck },
    { text: 'Autodesk Construction Integrator', icon: Zap },
    { text: 'Manufacturing Center of Excellence', icon: Award },
    { text: 'APS Certified Partner', icon: ShieldCheck },
  ];

  const [expandedTestimonials, setExpandedTestimonials] = useState(() => clientTestimonials.map(() => false));
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const contactInitialState = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    country: '',
    services: '',
    interest: 'Other Services',
    message: '',
  };
  const [contactForm, setContactForm] = useState(contactInitialState);
  const [activeFaq, setActiveFaq] = useState(null);
  const testimonialRefs = useRef([]);
  const testimonialAutoSlide = useRef(null);
  const previousTestimonial = useRef(0);
  const shouldAutoPlay = useRef(true);

  const handleToggleTestimonial = (index) => {
    setExpandedTestimonials((prev) =>
      prev.map((value, idx) => (idx === index ? !value : value))
    );
  };

  const startTestimonialAutoSlide = () => {
    stopTestimonialAutoSlide();
    if (!shouldAutoPlay.current) return;

    testimonialAutoSlide.current = setInterval(() => {
      if (shouldAutoPlay.current) {
        setCurrentTestimonial((prev) => (prev + 1) % clientTestimonials.length);
      }
    }, 8000);
  };

  const stopTestimonialAutoSlide = () => {
    if (testimonialAutoSlide.current) {
      clearInterval(testimonialAutoSlide.current);
      testimonialAutoSlide.current = null;
    }
  };

  const pauseAutoPlay = () => {
    shouldAutoPlay.current = false;
    stopTestimonialAutoSlide();
  };

  const resumeAutoPlay = () => {
    shouldAutoPlay.current = true;
    startTestimonialAutoSlide();
  };
  const handleContactChange = (field, value) => {
    setContactForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert('Thank you! Our solutions team will connect with you shortly.');
    setContactForm(contactInitialState);
  };
  const toggleFaq = (index) => {
    setActiveFaq((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.config({
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
    });

    const ctx = gsap.context(() => {
      // Hero section animations - Modern & Futuristic
      const heroTitle = document.querySelector('.hero-title');
      const heroSubtitle = document.querySelector('.hero-subtitle');
      const heroButtons = document.querySelectorAll('.hero-buttons');
      const heroTrusted = document.querySelector('.hero-trusted');

      if (heroTitle || heroSubtitle || heroButtons.length > 0 || heroTrusted) {
        const heroTimeline = gsap.timeline({ defaults: { ease: 'expo.out', force3D: true } });

        if (heroTitle) {
          // Split text effect with blur
          gsap.set(heroTitle, { filter: 'blur(10px)', opacity: 0, y: 80 });
          heroTimeline.to(heroTitle, {
            filter: 'blur(0px)',
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'expo.out',
            force3D: true
          });
        }

        if (heroSubtitle) {
          gsap.set(heroSubtitle, { opacity: 0, y: 50, scale: 0.95 });
          heroTimeline.to(heroSubtitle, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            force3D: true
          }, '-=0.8');
        }

        if (heroButtons.length > 0) {
          heroButtons.forEach((btn, i) => {
            gsap.set(btn, { opacity: 0, scale: 0.8, y: 30 });
            heroTimeline.to(btn, {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.8,
              ease: 'back.out(1.4)',
              force3D: true
            }, `-=${0.6 - i * 0.1}`);
          });
        }

        if (heroTrusted) {
          gsap.set(heroTrusted, { opacity: 0, y: 20 });
          heroTimeline.to(heroTrusted, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            force3D: true
          }, '-=0.4');
        }
      }

      // Animated background elements - optimized
      const bgBlur1 = document.querySelector('.hero-bg-blur-1');
      const bgBlur2 = document.querySelector('.hero-bg-blur-2');

      if (bgBlur1) {
        gsap.to(bgBlur1, {
          x: 50,
          y: 50,
          duration: 20,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          force3D: true
        });
      }

      if (bgBlur2) {
        gsap.to(bgBlur2, {
          x: -50,
          y: -50,
          duration: 25,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          force3D: true
        });
      }

      // About section reveal
      const aboutContent = document.querySelector('.about-content');
      const aboutStats = gsap.utils.toArray('.about-stat-card');

      if (aboutContent) {
        gsap.set(aboutContent, {
          opacity: 0,
          y: 80,
          filter: 'blur(16px)',
        });

        const q = gsap.utils.selector(aboutContent);

        gsap.timeline({
          defaults: { ease: 'expo.out', force3D: true },
          scrollTrigger: {
            trigger: aboutContent,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
            once: true,
            refreshPriority: -1,
          },
        })
          .to(aboutContent, {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.1,
          })
          .from(
            q('.about-badge'),
            {
              y: -20,
              opacity: 0,
              duration: 0.6,
              ease: 'power3.out',
            },
            '-=0.8'
          )
          .from(
            q('.about-heading'),
            {
              y: 30,
              opacity: 0,
              filter: 'blur(12px)',
              duration: 0.9,
            },
            '-=0.7'
          )
          .from(
            q('.about-subheading'),
            {
              y: 20,
              opacity: 0,
              duration: 0.8,
            },
            '-=0.6'
          )
          .from(
            q('.about-description'),
            {
              opacity: 0,
              y: 18,
              duration: 0.7,
              stagger: 0.15,
            },
            '-=0.5'
          );
      }

      if (aboutStats.length > 0) {
        aboutStats.forEach((card, i) => {
          gsap.set(card, {
            opacity: 0,
            y: 60,
            scale: 0.9,
            filter: 'blur(12px)',
          });

          gsap.to(card, {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.9,
            ease: 'expo.out',
            force3D: true,
            delay: i * 0.08,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
              once: true,
              refreshPriority: -1,
            },
          });
        });
      }

      // Client carousel reveal & marquee
      const clientSection = document.querySelector('.client-carousel-section');
      const clientLogosNodes = gsap.utils.toArray('.client-logo');
      const clientTrack = document.querySelector('.client-carousel-track');

      if (clientSection) {
        gsap.set(clientSection, {
          opacity: 0,
          y: 80,
          filter: 'blur(20px)'
        });

        gsap.timeline({
          defaults: { ease: 'expo.out', force3D: true },
          scrollTrigger: {
            trigger: clientSection,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
            once: true,
            refreshPriority: -1
          }
        })
          .to(clientSection, {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.1
          })
          .from(
            '.client-carousel-header',
            {
              y: 30,
              opacity: 0,
              duration: 0.8
            },
            '-=0.7'
          )
          .from(
            '.client-carousel-subheader',
            {
              y: 20,
              opacity: 0,
              duration: 0.7
            },
            '-=0.6'
          );
      }

      if (clientLogosNodes.length > 0) {
        gsap.set(clientLogosNodes, { opacity: 0, y: 24, scale: 0.95 });

        gsap.to(clientLogosNodes, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.client-carousel-mask',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
            once: true,
            refreshPriority: -1
          }
        });
      }

      if (clientTrack) {
        const marquee = gsap.fromTo(
          clientTrack,
          { xPercent: 0 },
          {
            xPercent: -50,
            duration: 24,
            repeat: -1,
            ease: 'none'
          }
        );

        ScrollTrigger.create({
          trigger: clientTrack,
          start: 'top bottom',
          end: 'bottom top',
          onEnter: () => marquee.play(),
          onEnterBack: () => marquee.play(),
          onLeave: () => marquee.pause(),
          onLeaveBack: () => marquee.pause()
        });
      }

      const testimonialSection = document.querySelector('.client-testimonials-section');
      const testimonialCarousel = document.querySelector('.testimonial-carousel');
      const testimonialCards = testimonialRefs.current.filter(Boolean);

      if (testimonialSection) {
        gsap.set(testimonialSection, { opacity: 0, y: 90, filter: 'blur(20px)' });

        gsap.timeline({
          defaults: { ease: 'expo.out', force3D: true },
          scrollTrigger: {
            trigger: testimonialSection,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
            once: true,
            refreshPriority: -1,
          },
        })
          .to(testimonialSection, {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.15,
          })
          .from(
            '.client-testimonials-section .testimonial-carousel',
            {
              y: 40,
              opacity: 0,
              duration: 1,
            },
            '-=0.8'
          )
          .from(
            '.client-testimonials-section .testimonial-carousel .client-testimonial-card button',
            {
              opacity: 0,
              y: 20,
              duration: 0.6,
              stagger: 0.08,
            },
            '-=0.5'
          );
      }

      if (testimonialCarousel && testimonialCards.length > 0) {
        gsap.set(testimonialCards, {
          autoAlpha: 0,
          xPercent: 12,
          pointerEvents: 'none',
          filter: 'blur(12px)',
        });

        gsap.set(testimonialCards[0], {
          autoAlpha: 1,
          xPercent: 0,
          pointerEvents: 'auto',
          filter: 'blur(0px)',
        });
      }

      // Value props - Modern reveal with glow effect
      const valueCards = gsap.utils.toArray('.value-prop-card');
      if (valueCards.length > 0) {
        valueCards.forEach((card, i) => {
          gsap.set(card, {
            opacity: 0,
            y: 80,
            scale: 0.8,
            rotationX: -15,
            transformPerspective: 1000
          });

          gsap.to(card, {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            duration: 1,
            ease: 'expo.out',
            stagger: 0.1,
            force3D: true,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
              once: true,
              refreshPriority: -1
            },
            delay: i * 0.1
          });

          // Hover glow effect
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              scale: 1.05,
              boxShadow: '0 20px 60px rgba(59, 130, 246, 0.3)',
              duration: 0.3,
              ease: 'power2.out'
            });
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              scale: 1,
              boxShadow: '0 0 0 rgba(59, 130, 246, 0)',
              duration: 0.3,
              ease: 'power2.out'
            });
          });
        });
      }

      // Capabilities section - Futuristic slide reveal
      const capabilityItems = gsap.utils.toArray('.capability-item');
      if (capabilityItems.length > 0) {
        capabilityItems.forEach((item, i) => {
          const direction = i % 2 === 0 ? -1 : 1;
          gsap.set(item, {
            opacity: 0,
            x: direction * 100,
            filter: 'blur(20px)',
            scale: 0.9
          });

          gsap.to(item, {
            opacity: 1,
            x: 0,
            filter: 'blur(0px)',
            scale: 1,
            duration: 1.2,
            ease: 'expo.out',
            force3D: true,
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
              once: true,
              refreshPriority: -1
            },
            delay: i * 0.15
          });
        });
      }

      // Parallax effect for capabilities image - Smooth 3D effect
      const capabilityImage = document.querySelector('.capability-image');
      if (capabilityImage) {
        gsap.set(capabilityImage, { transformStyle: 'preserve-3d' });
        gsap.to(capabilityImage, {
          y: -80,
          rotationY: 5,
          scale: 1.05,
          force3D: true,
          scrollTrigger: {
            trigger: capabilityImage,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
            refreshPriority: -1
          }
        });
      }

      // Final CTA animation - Pulsing glow effect
      const finalCta = document.querySelector('.final-cta');
      if (finalCta) {
        gsap.set(finalCta, {
          opacity: 0,
          y: 60,
          scale: 0.9,
          filter: 'blur(15px)'
        });

        gsap.to(finalCta, {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'expo.out',
          force3D: true,
          scrollTrigger: {
            trigger: finalCta,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
            once: true,
            refreshPriority: -1
          }
        });

        // Continuous subtle pulse
        gsap.to(finalCta, {
          scale: 1.02,
          duration: 2,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true
        });
      }

      // Batch refresh all ScrollTriggers
      ScrollTrigger.refresh();
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const cards = testimonialRefs.current.filter(Boolean);
    if (cards.length === 0) return;

    const prev = previousTestimonial.current;
    const total = cards.length;
    if (prev === currentTestimonial) return;

    let direction = 1;
    if ((prev === 0 && currentTestimonial === total - 1) || currentTestimonial < prev) {
      direction = -1;
    }

    const currentCard = cards[currentTestimonial];
    const prevCard = cards[prev];

    if (prevCard) {
      gsap.killTweensOf(prevCard);
      gsap.to(prevCard, {
        autoAlpha: 0,
        xPercent: -12 * direction,
        filter: 'blur(14px)',
        duration: 0.75,
        ease: 'power3.inOut',
        pointerEvents: 'none',
      });
    }

    if (currentCard) {
      gsap.killTweensOf(currentCard);
      gsap.fromTo(
        currentCard,
        {
          autoAlpha: 0,
          xPercent: 16 * direction,
          filter: 'blur(16px)',
        },
        {
          autoAlpha: 1,
          xPercent: 0,
          filter: 'blur(0px)',
          duration: 0.9,
          ease: 'expo.out',
          pointerEvents: 'auto',
        }
      );
    }

    previousTestimonial.current = currentTestimonial;
    // Don't restart autoplay here - it's already running and will continue
  }, [currentTestimonial]);

  useEffect(() => {
    startTestimonialAutoSlide();
    return stopTestimonialAutoSlide;
  }, [startTestimonialAutoSlide, stopTestimonialAutoSlide]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Only handle if not typing in an input/textarea
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentTestimonial((prev) => (prev - 1 + clientTestimonials.length) % clientTestimonials.length);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setCurrentTestimonial((prev) => (prev + 1) % clientTestimonials.length);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [clientTestimonials.length]);


  const testimonialProgress = ((currentTestimonial + 1) / clientTestimonials.length) * 100;

  // Generate structured data for homepage
  const organizationSchema = getOrganizationSchema();
  const websiteSchema = getWebSiteSchema();
  const homepageStructuredData = {
    '@context': 'https://schema.org',
    '@graph': [organizationSchema, websiteSchema]
  };

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <SEO
        title="ProtoTech Solutions - CAD Plugins, BIM Services & 3D Solutions"
        description="Professional CAD plugins, BIM services, and 3D solutions for AutoCAD, Revit, SolidWorks, and more. Transform your design workflows with ProtoTech Solutions."
        structuredData={homepageStructuredData}
      />
      {/* Hero Section */}
      <section className="relative py-10 bg-gray-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_55%)]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs uppercase tracking-[0.3em] text-slate-300/80">
              Our Services
            </span>
            <h2 className="mt-6 text-4xl md:text-5xl font-bold text-white leading-tight">
              Explore the next wave of immersive Product Development Experience
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              Professional CAD services tailored to your engineering and design needs
            </p>
          </div>
          <AnimatedSlider />
        </div>
      </section>


      {/* About Section */}
      <section className="relative py-24 bg-gray-950 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(15,118,110,0.2),transparent_55%)] opacity-70"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gray-950/60 to-gray-950"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] items-start">
            <div className="about-content glass-surface rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-10 lg:p-14 shadow-[0_30px_120px_rgba(15,118,110,0.25)]">
              <span className="about-badge inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/15 bg-white/10 text-xs uppercase tracking-[0.35em] text-slate-200/80">
                Trusted Partner in Digital Transformation
              </span>
              <h2 className="about-heading mt-8 text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Who We Are
              </h2>
              <p className="about-subheading mt-6 text-lg md:text-xl text-slate-200/80 leading-relaxed">
                ProtoTech Solutions is your trusted partner for all your engineering software and drafting service needs. Founded in 2005, we have built a reputation based on quality, excellence, and relentless innovation.
              </p>
              <p className="about-description mt-6 text-base md:text-lg text-slate-300/80 leading-relaxed">
                Our dedicated team of over 120 developers, designers, and engineers brings diverse expertise in APS, Fusion, AutoCAD, Revit, Inventor, and Navisworks APIs. We collaborate as an Authorized Autodesk Service Provider, Construction Integrator, Manufacturing, and Autodesk Platform Services (APS) Certified Partner.
              </p>
              <p className="about-description mt-6 text-base md:text-lg text-slate-300/80 leading-relaxed">
                We specialize in custom software development, 2D/3D visualization, process automation, CAD customization, BIM application development, AR/VR/XR experiences, AI/ML engineering, and CAD design plus drafting services.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-xs uppercase tracking-[0.35em] text-slate-200/80">
                <Award size={14} className="text-sky-400" />
                Our Impact
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {growthStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-lg p-6 shadow-[0_20px_70px_rgba(59,130,246,0.2)] transition-all duration-500 hover:scale-105 hover:shadow-[0_25px_90px_rgba(56,189,248,0.35)]"
                  >
                    {/* Animated gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-indigo-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

                    {/* Glow effect */}
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-sky-400/20 to-indigo-500/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"></div>

                    <div className="relative">
                      <div className="flex items-baseline gap-1 text-4xl md:text-5xl font-black text-white drop-shadow-[0_15px_40px_rgba(56,189,248,0.4)]">
                        <span className="text-sky-400 transition-colors duration-300 group-hover:text-sky-300">{stat.prefix}</span>
                        <span className="transition-transform duration-300 group-hover:scale-110">{stat.value}</span>
                      </div>
                      <p className="mt-3 text-xs uppercase tracking-[0.25em] text-slate-300/80 font-semibold transition-colors duration-300 group-hover:text-white">
                        {stat.label}
                      </p>
                    </div>

                    {/* Corner accent */}
                    <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-br from-sky-400/20 to-transparent rounded-bl-3xl opacity-50"></div>
                  </div>
                ))}
              </div>

              {/* Animated Background Elements */}
              <div className="relative mt-8 h-32 overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-white/5 via-transparent to-white/5 backdrop-blur-sm">
                {/* Animated gradient orbs */}
                <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-gradient-to-br from-sky-500/30 to-indigo-500/30 blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-500/30 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

                {/* Animated gradient bars */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-30">
                  <div className="h-1 w-20 rounded-full bg-gradient-to-r from-transparent via-sky-400 to-transparent animate-pulse"></div>
                  <div className="h-1 w-32 rounded-full bg-gradient-to-r from-transparent via-indigo-400 to-transparent animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <div className="h-1 w-24 rounded-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>

                {/* Subtle text overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-xs uppercase tracking-[0.3em] font-semibold">Trusted by Industry Leaders</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment & Credentials Section */}
      <section className="relative py-20 bg-gray-900 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.1),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-transparent to-gray-950"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Our Promise Column */}
            <div className="relative group">
              <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-r from-sky-500/20 to-indigo-500/20 opacity-50 blur-xl transition-opacity duration-500 group-hover:opacity-100"></div>
              <div className="relative rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl p-10 shadow-2xl">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-sky-400 mb-8 shadow-inner">
                  <BadgeCheck size={32} />
                </div>
                <h3 className="text-3xl font-bold text-white mb-6">Our Promise</h3>
                <p className="text-lg text-slate-300/90 leading-relaxed">
                  Your satisfaction is our top priority. We align to your release cadence, communicate transparently, and stay accountable from the first prototype to long-term support.
                </p>
                <div className="mt-8 flex items-center gap-4 text-sm font-medium text-sky-300">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 size={16} /> Transparent Communication
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle2 size={16} /> Long-term Support
                  </span>
                </div>
              </div>
            </div>

            {/* Credentials Column */}
            <div>
              <div className="mb-8">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs uppercase tracking-[0.3em] text-slate-300/80">
                  <Award size={14} />
                  Recognized Excellence
                </span>
                <h3 className="mt-6 text-3xl md:text-4xl font-bold text-white">Credentials</h3>
                <p className="mt-4 text-slate-400">
                  We are proud to be recognized by industry leaders for our technical expertise and delivery excellence.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {partnerHighlights.map((highlight) => (
                  <div
                    key={highlight.text}
                    className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:border-sky-500/30 hover:bg-sky-500/10 hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] hover:-translate-y-1"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sky-400 transition-colors group-hover:border-sky-500/30 group-hover:bg-sky-500/20 group-hover:text-sky-300 shadow-lg">
                      <highlight.icon size={22} />
                    </div>
                    <span className="text-sm font-semibold text-slate-200 group-hover:text-white leading-tight">
                      {highlight.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section >

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Dark background with subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black"></div>

        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="hero-bg-blur-1 absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="hero-bg-blur-2 absolute bottom-20 right-20 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
          <div className="text-center">
            <h1 className="hero-title text-6xl md:text-8xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-gray-400">
              The backend to build the modern web.
            </h1>
            <p className="hero-subtitle text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
              {brand.hero.subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button
                onClick={() => navigate('/solutions')}
                className="px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
              >
                Get Started
              </button>
              <button
                onClick={() => navigate('/company')}
                className="px-8 py-4 bg-gray-800 border border-gray-700 text-white rounded-lg font-semibold text-lg hover:bg-gray-700 transition-all"
              >
                Learn More
              </button>
            </div>

            {/* Trusted By Section */}
            <div className="hero-trusted mt-20">
              <p className="text-sm text-white uppercase tracking-wider mb-6">Trusted By Industry Leaders</p>
              <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
                <div className="text-2xl font-bold text-gray-400">ASICS</div>
                <div className="text-2xl font-bold text-gray-400">SONOS</div>
                <div className="text-2xl font-bold text-gray-400">Microsoft</div>
                <div className="text-2xl font-bold text-gray-400">BUGATTI</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Carousel */}
      < section className="client-carousel-section relative py-20 bg-gray-900/80 overflow-hidden" >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.22),transparent_55%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.2),transparent_60%)] opacity-80"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gray-950/70 to-gray-950"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-6">
            <span className="client-carousel-header inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-white/10 text-xs uppercase tracking-[0.35em] text-slate-200/80">
              Trusted by the Best
            </span>
            <h2 className="client-carousel-subheader text-4xl md:text-5xl font-bold text-white leading-tight">
              Clients we work for
            </h2>
            <p className="text-base md:text-lg text-slate-300/80">
              Engineering leaders across the globe count on ProtoTech to modernize workflows, accelerate releases, and deliver measurable business outcomes.
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => navigate('/company')}
                className="inline-flex items-center gap-2 rounded-full border border-sky-400/60 bg-sky-500/20 px-6 py-2 text-sm font-semibold uppercase tracking-[0.35em] text-sky-100 transition hover:bg-sky-500/30 hover:border-sky-300"
              >
                View All Our Clients
                <span aria-hidden>→</span>
              </button>
            </div>
          </div>

          <div className="client-carousel-mask relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl px-6 py-10 shadow-[0_30px_120px_rgba(14,165,233,0.28)]">
            <div className="client-carousel-track flex items-stretch gap-10 min-w-max">
              {[...clientLogos, ...clientLogos].map((client, idx) => (
                <div
                  key={`${client.title}-${idx}`}
                  className="client-logo relative flex h-32 w-64 flex-col justify-center rounded-3xl border border-white/10 bg-gradient-to-br from-white/12 via-white/4 to-transparent px-6 py-5 text-left shadow-[0_24px_80px_rgba(59,130,246,0.25)] backdrop-blur-lg"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/15 text-sm font-semibold text-white/80 shadow-[0_12px_32px_rgba(56,189,248,0.25)]">
                    {client.title.charAt(0)}
                  </div>
                  <span className="text-xl font-semibold text-white tracking-tight">
                    {client.title}
                  </span>
                  <span className="mt-2 text-xs uppercase tracking-[0.35em] text-slate-200/70">
                    {client.subtitle}
                  </span>
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-60"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section >

      {/* Contact & FAQ */}
      < section className="py-20 bg-gray-900" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12">
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-10 shadow-[0_40px_120px_rgba(15,118,110,0.25)]">
              <p className="text-xs uppercase tracking-[0.4em] text-slate-200/70">Let’s Discuss</p>
              <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white leading-tight">
                Your Project Requirements
              </h2>
              <p className="mt-3 text-base md:text-lg text-slate-300/80">
                Tell us where you need momentum—our team will respond within one business day.
              </p>
              <form onSubmit={handleContactSubmit} className="mt-8 space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-[0.3em] text-slate-300/70 mb-2">
                      First Name*
                    </label>
                    <input
                      type="text"
                      value={contactForm.firstName}
                      onChange={(e) => handleContactChange('firstName', e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-gray-950/80 px-4 py-3 text-white focus:border-sky-400 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.3em] text-slate-300/70 mb-2">
                      Last Name*
                    </label>
                    <input
                      type="text"
                      value={contactForm.lastName}
                      onChange={(e) => handleContactChange('lastName', e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-gray-950/80 px-4 py-3 text-white focus:border-sky-400 focus:outline-none"
                      required
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-[0.3em] text-slate-300/70 mb-2">
                      Email*
                    </label>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => handleContactChange('email', e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-gray-950/80 px-4 py-3 text-white focus:border-sky-400 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.3em] text-slate-300/70 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={contactForm.phone}
                      onChange={(e) => handleContactChange('phone', e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-gray-950/80 px-4 py-3 text-white focus:border-sky-400 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-[0.3em] text-slate-300/70 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={contactForm.company}
                      onChange={(e) => handleContactChange('company', e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-gray-950/80 px-4 py-3 text-white focus:border-sky-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.3em] text-slate-300/70 mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      value={contactForm.country}
                      onChange={(e) => handleContactChange('country', e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-gray-950/80 px-4 py-3 text-white focus:border-sky-400 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.3em] text-slate-300/70 mb-2">
                    Services Interested In
                  </label>
                  <select
                    value={contactForm.services}
                    onChange={(e) => handleContactChange('services', e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-gray-950/80 px-4 py-3 text-white focus:border-sky-400 focus:outline-none"
                  >
                    <option value="">Select a service</option>
                    {servicesOptions.map((service) => (
                      <option key={service} value={service} className="text-gray-900">
                        {service}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.3em] text-slate-300/70 mb-2">
                    Interested In
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Other Services', 'Products'].map((option) => (
                      <button
                        type="button"
                        key={option}
                        onClick={() => handleContactChange('interest', option)}
                        className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${contactForm.interest === option
                          ? 'border-sky-400 bg-sky-500/20 text-white'
                          : 'border-white/10 bg-gray-950/50 text-slate-300/80 hover:border-white/30'
                          }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.3em] text-slate-300/70 mb-2">
                    Message*
                  </label>
                  <textarea
                    value={contactForm.message}
                    onChange={(e) => handleContactChange('message', e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-gray-950/80 px-4 py-3 text-white focus:border-sky-400 focus:outline-none"
                    rows="4"
                    placeholder="Share project goals, timelines, or success metrics..."
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-2xl bg-gradient-to-r from-sky-400 via-cyan-400 to-indigo-500 px-6 py-4 text-base font-semibold text-white shadow-[0_15px_35px_rgba(56,189,248,0.45)] transition hover:scale-[1.01]"
                >
                  Submit
                </button>
              </form>
            </div>

            <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/0 backdrop-blur-xl p-8 md:p-10 shadow-[0_40px_120px_rgba(79,70,229,0.2)]">
              <p className="text-xs uppercase tracking-[0.4em] text-slate-200/70">Answers</p>
              <h3 className="mt-4 text-3xl font-bold text-white">Frequently Asked Questions</h3>
              <p className="mt-3 text-base text-slate-300/80">
                Everything you need to know about our engagement models, delivery process, and long-term support.
              </p>
              <div className="mt-8 space-y-4">
                {faqItems.map((faq, idx) => (
                  <div key={faq.question} className="rounded-2xl border border-white/10 bg-gray-950/60">
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="flex w-full items-center justify-between px-5 py-4 text-left"
                    >
                      <span className="text-sm font-semibold text-slate-100">
                        {faq.question}
                      </span>
                      <span className="ml-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-lg text-slate-200">
                        {activeFaq === idx ? '–' : '+'}
                      </span>
                    </button>
                    {activeFaq === idx && (
                      <div className="px-5 pb-6 text-sm text-slate-300/90">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* Awards */}
      < section className="py-20 bg-gray-950" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/15 bg-white/5 text-xs uppercase tracking-[0.35em] text-slate-200/80">
              Recognizing Excellence
            </span>
            <h2 className="mt-6 text-4xl md:text-5xl font-bold text-white">Our Awards</h2>
            <p className="mt-4 text-base md:text-lg text-slate-300/80">
              Partnerships that validate our commitment to quality, security, and innovation.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {awards.map((award) => (
              <div
                key={award}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center text-sm font-semibold text-slate-100 shadow-[0_25px_80px_rgba(59,130,246,0.2)]"
              >
                {award}
              </div>
            ))}
          </div>
        </div>
      </section >

      {/* Success Stories */}
      < section className="py-20 bg-gray-900/80" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/15 bg-white/5 text-xs uppercase tracking-[0.35em] text-slate-200/80">
              See How We Make a Difference
            </span>
            <h2 className="mt-6 text-4xl md:text-5xl font-bold text-white">Our Success Stories</h2>
            <p className="mt-4 text-base md:text-lg text-slate-300/80">
              Every launch is tied to business outcomes—here are a few recent highlights.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {successStories.map((story) => (
              <article
                key={story.title}
                className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-[0_25px_80px_rgba(15,118,110,0.25)]"
              >
                <h3 className="text-2xl font-semibold text-white">{story.title}</h3>
                <p className="mt-4 text-base text-slate-300/80">{story.summary}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {story.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-200/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-sky-400/60 bg-sky-500/20 px-5 py-2 text-sm font-semibold uppercase tracking-[0.35em] text-sky-100 transition hover:bg-sky-500/30 hover:border-sky-300"
                >
                  {story.cta}
                  <span aria-hidden>→</span>
                </button>
              </article>
            ))}
          </div>
        </div>
      </section >

      {/* Client Testimonials */}
      < section className="client-testimonials-section relative py-8 md:py-12 bg-gray-900 overflow-hidden" >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.16),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.18),transparent_55%)] opacity-80"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gray-950/70 to-gray-950"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-6 md:mb-8">
            <span className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs uppercase tracking-[0.35em] text-slate-200/80">
              What Our Clients Say
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white leading-tight">
              Your Satisfaction is Our Top Priority
            </h2>
          </div>

          <div
            className="testimonial-carousel relative mx-auto max-w-4xl"
            onMouseEnter={pauseAutoPlay}
            onMouseLeave={resumeAutoPlay}
          >
            <div className="pointer-events-none absolute -top-24 left-1/2 hidden h-64 w-64 -translate-x-1/2 rounded-full bg-sky-500/30 blur-[140px] lg:block"></div>
            <div className="pointer-events-none absolute -bottom-28 right-0 h-72 w-72 rounded-full bg-indigo-500/25 blur-[140px]"></div>
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/10 backdrop-blur-2xl px-6 py-6 md:px-8 md:py-8 shadow-[0_35px_140px_rgba(59,130,246,0.28)] min-h-[320px] md:min-h-[360px]">
              {clientTestimonials.map((testimonial, idx) => (
                <article
                  key={`${testimonial.name}-${testimonial.company}`}
                  ref={(el) => (testimonialRefs.current[idx] = el)}
                  className="testimonial-card client-testimonial-card absolute inset-0 flex flex-col p-4 md:p-6"
                >
                  <div className="absolute inset-0 pointer-events-none rounded-[28px] bg-gradient-to-br from-white/15 via-transparent to-transparent"></div>
                  <div className="relative flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-4 mb-4 md:mb-5">
                      <div className="flex items-center gap-3 md:gap-4">
                        <div className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-2xl md:rounded-3xl border border-white/20 bg-white/15 text-sm md:text-base font-semibold text-white/80 shadow-[0_16px_40px_rgba(56,189,248,0.25)]">
                          {testimonial.name.split(' ').map((part) => part.charAt(0)).slice(0, 2).join('')}
                        </div>
                        <div>
                          <p className="text-base md:text-lg font-semibold text-white tracking-tight">
                            {testimonial.name}
                          </p>
                          <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-slate-200/70">
                            {testimonial.role}
                          </p>
                          <p className="mt-0.5 md:mt-1 text-[10px] md:text-xs text-slate-300/70">
                            {testimonial.company}
                          </p>
                        </div>
                      </div>
                      <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-3xl font-serif text-white/20 shadow-[0_25px_60px_rgba(79,70,229,0.35)]">
                        "
                      </div>
                    </div>

                    <div className="mb-3 flex flex-wrap items-center gap-1">
                      {[...Array(5)].map((_, badgeIdx) => (
                        <span
                          key={badgeIdx}
                          className="rounded-full bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-200/80"
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <div className="mb-4 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-slate-200/70">
                      <span className="rounded-full border border-white/20 bg-white/10 px-5 py-2 text-slate-200/80">
                        {testimonial.focus}
                      </span>
                      <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-5 py-2 text-sky-200/80">
                        {testimonial.metric}
                      </span>
                      <span className="ml-auto flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[10px] font-semibold text-slate-200/60">
                        <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(74,222,128,0.75)]"></span>
                        Partner since 2005
                      </span>
                    </div>

                    <div className="relative flex-1 min-h-[100px] md:min-h-[120px]">
                      <div
                        className={`client-testimonial-quote-wrapper overflow-hidden transition-all duration-500 ease-out ${expandedTestimonials[idx] ? 'max-h-[800px]' : 'max-h-28'
                          }`}
                      >
                        <p className="text-base md:text-lg text-slate-100/90 leading-relaxed tracking-tight">
                          {testimonial.quote}
                        </p>
                      </div>
                      {!expandedTestimonials[idx] && (
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-gray-900/98 via-gray-900/50 to-transparent rounded-b-[28px]"></div>
                      )}
                    </div>

                    <div className="mt-4 md:mt-6 flex flex-wrap items-center gap-3 border-t border-white/10 pt-4">
                      <button
                        type="button"
                        onClick={() => handleToggleTestimonial(idx)}
                        className="group inline-flex items-center gap-2 rounded-full border-2 border-sky-400/60 bg-gradient-to-r from-sky-500/20 to-cyan-500/20 px-4 py-2 md:px-5 md:py-2.5 text-xs md:text-sm font-bold text-sky-200 transition-all duration-300 hover:border-sky-300/80 hover:from-sky-500/30 hover:to-cyan-500/30 hover:text-white hover:scale-105 hover:shadow-[0_8px_24px_rgba(56,189,248,0.4)]"
                      >
                        <span>{expandedTestimonials[idx] ? 'Show less' : 'Read more'}</span>
                        <span className={`inline-flex h-5 w-5 md:h-6 md:w-6 items-center justify-center rounded-full border-2 border-sky-400/70 bg-sky-400/20 text-[10px] md:text-xs font-bold transition-all duration-300 group-hover:border-sky-300 group-hover:bg-sky-400/30 group-hover:rotate-90 ${expandedTestimonials[idx] ? 'rotate-45' : ''}`}>
                          {expandedTestimonials[idx] ? '–' : '+'}
                        </span>
                      </button>

                      <div className="flex flex-1 items-center gap-4 text-xs uppercase tracking-[0.3em] text-slate-200/60">
                        <a
                          href="/success"
                          className="inline-flex items-center gap-2 text-slate-200/60 transition hover:text-white"
                        >
                          Case Study
                          <span aria-hidden>→</span>
                        </a>
                        <span className="hidden h-3 w-px bg-white/20 sm:inline"></span>
                        <span className="text-slate-300/50">
                          Verified engagement
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Navigation Controls - Enhanced Visibility - Outside carousel container */}
          <div className="relative z-50 mt-8 md:mt-10 flex flex-col items-center gap-4 md:gap-6 px-4 w-full max-w-4xl mx-auto">
            {/* Main Navigation Row */}
            <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-2xl gap-4 md:gap-6">
              {/* Left: Previous Button */}
              <button
                type="button"
                onClick={() => {
                  setCurrentTestimonial((prev) => (prev - 1 + clientTestimonials.length) % clientTestimonials.length);
                  pauseAutoPlay();
                  setTimeout(() => {
                    if (shouldAutoPlay.current) {
                      resumeAutoPlay();
                    }
                  }, 2000);
                }}
                className="group flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full border-2 border-sky-400/80 bg-sky-500/60 backdrop-blur-md text-white font-bold transition-all duration-300 hover:border-sky-300 hover:bg-sky-400 hover:text-white hover:scale-110 hover:shadow-[0_12px_40px_rgba(56,189,248,0.8)] shadow-xl active:scale-95"
                aria-label="Previous testimonial"
              >
                <span className="text-2xl md:text-3xl font-bold transition-transform duration-300 group-hover:-translate-x-1">‹</span>
              </button>

              {/* Center: Pagination Dots & Progress */}
              <div className="flex flex-col items-center gap-3 flex-1">
                {/* Pagination Dots */}
                <div className="flex items-center justify-center gap-2 md:gap-3">
                  {clientTestimonials.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setCurrentTestimonial(idx);
                        pauseAutoPlay();
                        setTimeout(() => {
                          if (shouldAutoPlay.current) {
                            resumeAutoPlay();
                          }
                        }, 2000);
                      }}
                      className={`relative flex h-4 w-4 md:h-5 md:w-5 items-center justify-center rounded-full border-2 transition-all duration-300 ${idx === currentTestimonial
                        ? 'border-sky-400 bg-sky-400 scale-125 shadow-[0_0_16px_rgba(56,189,248,0.8)]'
                        : 'border-sky-400/70 bg-sky-500/50 hover:border-sky-300 hover:bg-sky-400/70 hover:scale-110'
                        }`}
                      aria-label={`Go to testimonial ${idx + 1}`}
                    >
                      {idx === currentTestimonial && (
                        <span className="absolute inset-0 rounded-full bg-sky-400 animate-ping opacity-75"></span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Progress Bar */}
                <div className="w-full max-w-xs">
                  <div className="relative h-2 md:h-3 w-full overflow-hidden rounded-full bg-white/20 border border-white/30 shadow-inner">
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-100 transition-all duration-500 ease-out shadow-[0_2px_12px_rgba(56,189,248,0.6)]"
                      style={{ width: `${testimonialProgress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-1.5 text-xs md:text-sm">
                    <span className="font-semibold text-white/80">
                      {String(currentTestimonial + 1).padStart(2, '0')} / {String(clientTestimonials.length).padStart(2, '0')}
                    </span>
                    <span className="font-bold text-sky-300">
                      {Math.round(testimonialProgress)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Next Button */}
              <button
                type="button"
                onClick={() => {
                  setCurrentTestimonial((prev) => (prev + 1) % clientTestimonials.length);
                  pauseAutoPlay();
                  setTimeout(() => {
                    if (shouldAutoPlay.current) {
                      resumeAutoPlay();
                    }
                  }, 2000);
                }}
                className="group flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full border-2 border-sky-400/80 bg-sky-500/60 backdrop-blur-md text-white font-bold transition-all duration-300 hover:border-sky-300 hover:bg-sky-400 hover:text-white hover:scale-110 hover:shadow-[0_12px_40px_rgba(56,189,248,0.8)] shadow-xl active:scale-95"
                aria-label="Next testimonial"
              >
                <span className="text-2xl md:text-3xl font-bold transition-transform duration-300 group-hover:translate-x-1">›</span>
              </button>
            </div>

            {/* Keyboard Hint */}
            <p className="text-[10px] md:text-xs text-white/60 uppercase tracking-[0.15em] font-medium">
              Use ← → arrow keys to navigate
            </p>
          </div>
        </div>
      </section >

      {/* Final CTA */}
      < section className="py-20 bg-gray-950" >
        <div className="final-cta max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Ready to unlock your next engineering milestone?
          </h2>
          <p className="text-xl text-gray-400 mb-8 leading-relaxed">
            From CAD plugins to enterprise-grade BIM experiences, we co-create solutions that fit your roadmap, integrate with your toolchain, and delight your users.
          </p>
          <button
            onClick={() => navigate('/solutions')}
            className="px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105"
          >
            Talk to an Expert
          </button>
        </div>
      </section >
    </div >
  );
};

export default HomePage;
