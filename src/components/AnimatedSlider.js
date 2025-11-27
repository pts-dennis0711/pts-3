import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import {
  FaArrowRight,
  FaCube,
  FaBuilding,
  FaCogs,
  FaExchangeAlt,
  FaVrCardboard,
  FaPencilRuler,
  FaCity,
  FaProjectDiagram,
  FaShapes,
  FaMapMarkedAlt,
  FaClipboardCheck,
  FaRobot,
  FaDatabase,
  FaTags,
  FaBrain,
} from "react-icons/fa";

const slidesData = [
  {
    id: 1,
    heading: "Product Development",
    subheading: "Custom Solutions",
    description:
      "End-to-end development of 3D, BIM, and CAD applications tailored to your specific business needs.",
    list: [
      { text: "3D Application Development", icon: <FaCube />, link: "/solutions" },
      { text: "BIM Application Development", icon: <FaBuilding />, link: "/3d-services/bim-application" },
      { text: "CAD Customization", icon: <FaCogs />, link: "/3d-services/cad-customization" },
      { text: "Data Interoperability", icon: <FaExchangeAlt />, link: "/3d-services/data-interoperability" },
      { text: "AR/VR/XR/Digital Twin Apps", icon: <FaVrCardboard />, link: "/3d-services/3d-ar-vr-development" },
    ],
    cta: "Explore Services",
  },
  {
    id: 2,
    heading: "CAD Drafting Services",
    subheading: "Precision & Quality",
    description:
      "High-quality drafting and modeling services for architects, engineers, and construction professionals.",
    list: [
      { text: "Design and Drafting", icon: <FaPencilRuler /> },
      { text: "Architectural Drafting", icon: <FaCity /> },
      { text: "BIM Modeling", icon: <FaProjectDiagram /> },
      { text: "3D Modeling / Rendering", icon: <FaShapes /> },
      { text: "Land Survey Drafting", icon: <FaMapMarkedAlt /> },
    ],
    cta: "View Services",
  },
  {
    id: 3,
    heading: "QA and Machine Learning",
    subheading: "Quality & Intelligence",
    description:
      "Comprehensive QA testing and Machine Learning data services to ensure robust and intelligent applications.",
    list: [
      { text: "Setting up QA Practice", icon: <FaClipboardCheck /> },
      { text: "Manual and Automated Testing", icon: <FaRobot /> },
      { text: "ML Data Capture and Cleaning", icon: <FaDatabase /> },
      { text: "ML Data Annotation and Labeling", icon: <FaTags /> },
      { text: "ML Model Training and Validation", icon: <FaBrain /> },
    ],
    cta: "Learn More",
  },
];

const AnimatedSlider = () => {
  const [current, setCurrent] = useState(0);
  const sliderRef = useRef(null);
  const slidesRef = useRef([]);
  const orbRefs = useRef([]);
  const progressRef = useRef(null);
  const autoSlide = useRef(null);
  const slideAnimations = useRef([]);

  const totalSlides = slidesData.length;

  useEffect(() => {
    const ctx = gsap.context(() => {
      slidesRef.current.forEach((slide, index) => {
        if (!slide) return;

        gsap.killTweensOf(slide);
        gsap.set(slide, {
          autoAlpha: index === 0 ? 1 : 0,
          y: index === 0 ? 0 : 40,
          zIndex: index === 0 ? 2 : 1,
          pointerEvents: index === 0 ? "auto" : "none",
        });
      });
    }, sliderRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      orbRefs.current.forEach((orb, index) => {
        if (!orb) return;

        gsap.to(orb, {
          x: index % 2 === 0 ? 60 : -60,
          y: index % 2 === 0 ? -40 : 40,
          rotate: index % 2 === 0 ? 10 : -10,
          scale: 1.05,
          duration: 14 + index * 3,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      });
    }, sliderRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      slidesRef.current.forEach((slide, index) => {
        if (!slide) return;

        if (slideAnimations.current[index]) {
          slideAnimations.current[index].kill();
          slideAnimations.current[index] = null;
        }

        if (index === current) {
          const q = gsap.utils.selector(slide);
          gsap.set(slide, { pointerEvents: "auto", zIndex: 3 });

          const tl = gsap.timeline({
            defaults: { ease: "expo.out", force3D: true },
            onComplete: () => gsap.set(slide, { clearProps: "transform,filter" }),
          });

          tl.fromTo(
            slide,
            { autoAlpha: 0, y: 46, filter: "blur(10px)" },
            { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 1.4, force3D: true }
          )
            .from(
              q(".slide-meta"),
              {
                yPercent: -20,
                opacity: 0,
                duration: 0.8,
              },
              "-=0.9"
            )
            .from(
              q(".slide-heading"),
              {
                yPercent: 28,
                opacity: 0,
                filter: "blur(14px)",
                duration: 1.3,
                ease: "expo.out",
                force3D: true
              },
              "-=1.1"
            )
            .from(
              q(".slide-subheading"),
              {
                yPercent: 18,
                opacity: 0,
                skewY: 2.5,
                duration: 0.9,
                ease: "power3.out",
                force3D: true
              },
              "-=0.85"
            )
            .from(
              q(".slide-description"),
              {
                opacity: 0,
                y: 18,
                duration: 0.7,
              },
              "-=0.6"
            )
            .from(
              q(".feature-chip"),
              {
                opacity: 1,
                y: 22,
                duration: 0.65,
                stagger: 0.08,
                ease: "power2.out",
              },
              "-=0.55"
            )
            .from(
              q(".slide-cta"),
              {
                y: 18,
                opacity: 0,
                scale: 0.93,
                duration: 0.75,
                ease: "back.out(1.2)",
                force3D: true
              },
              "-=0.5"
            );

          slideAnimations.current[index] = tl;
        } else {
          const fadeTl = gsap.timeline({
            defaults: { ease: "power3.inOut", force3D: true },
            onComplete: () => {
              gsap.set(slide, {
                pointerEvents: "none",
                zIndex: 1,
              });
            },
          });

          fadeTl.to(slide, {
            autoAlpha: 0,
            y: -36,
            duration: 0.9,
            filter: "blur(10px)",
            force3D: true,
            clearProps: "transform,filter",
          });

          slideAnimations.current[index] = fadeTl;
        }
      });
    }, sliderRef);

    return () => ctx.revert();
  }, [current]);

  useEffect(() => {
    startAutoSlide();
    return stopAutoSlide;
  }, []);

  useEffect(() => {
    if (!progressRef.current) return;

    gsap.killTweensOf(progressRef.current);
    gsap.fromTo(
      progressRef.current,
      { width: "0%" },
      {
        width: "100%",
        duration: 6,
        ease: "linear",
      }
    );
  }, [current]);

  const startAutoSlide = () => {
    stopAutoSlide();
    autoSlide.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % totalSlides);
    }, 6000);
  };

  const stopAutoSlide = () => {
    if (autoSlide.current) {
      clearInterval(autoSlide.current);
    }
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div
      ref={sliderRef}
      className="relative w-full h-[80vh] text-white overflow-hidden rounded-[32px] border border-white/5 bg-gradient-to-br from-[#0a0f1e] via-[#10172d] to-[#05060b] shadow-[0px_30px_120px_rgba(14,116,206,0.35)]"
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          ref={(el) => (orbRefs.current[0] = el)}
          className="absolute -top-24 -left-32 h-72 w-72 rounded-full bg-cyan-500/40 blur-[120px]"
        ></div>
        <div
          ref={(el) => (orbRefs.current[1] = el)}
          className="absolute top-24 right-[-6rem] h-80 w-80 rounded-full bg-indigo-500/30 blur-[120px]"
        ></div>
        <div
          ref={(el) => (orbRefs.current[2] = el)}
          className="absolute bottom-[-8rem] left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-sky-400/20 blur-[150px]"
        ></div>
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.25),transparent_55%),radial-gradient(circle_at_80%_0%,rgba(129,140,248,0.18),transparent_45%)] opacity-90 mix-blend-screen pointer-events-none"></div>
      <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px]"></div>

      {slidesData.map((slide, index) => (
        <article
          key={slide.id}
          ref={(el) => (slidesRef.current[index] = el)}
          className={`absolute inset-0 flex items-center justify-center px-6 md:px-12 lg:px-16 ${index === 0 ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
        >
          <div className="relative w-full max-w-6xl">
            <div className="absolute -top-16 -right-14 hidden lg:block">
              <div className="glass-card rotate-6 rounded-[28px] border border-white/10 bg-white/5 px-8 py-6 shadow-[0_25px_60px_rgba(14,165,233,0.35)] backdrop-blur-xl slide-meta">
                <p className="text-xs uppercase tracking-[0.4em] text-cyan-200/80">
                  {String(index + 1).padStart(2, "0")} • spotlight
                </p>
              </div>
            </div>

            <div className="glass-surface relative overflow-hidden rounded-[32px] border border-white/10 bg-white/10 shadow-[0_35px_80px_rgba(79,70,229,0.35)] backdrop-blur-xl px-8 py-10 md:px-12 md:py-14 lg:px-16 lg:py-16">
              <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-white/10 via-white/5 to-transparent opacity-20 pointer-events-none"></div>

              <div className="relative z-10 flex flex-col gap-12 lg:flex-row lg:items-start">
                <div className="flex-1 max-w-3xl">
                  <h2 className="slide-heading text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-snug pb-2 bg-gradient-to-r from-sky-300 via-blue-200 to-indigo-200 bg-clip-text text-transparent drop-shadow-[0_20px_45px_rgba(56,189,248,0.45)]">
                    {slide.heading}
                  </h2>
                  <div className="mt-6 inline-flex items-center gap-4 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-slate-200/80 slide-subheading">
                    <span className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_18px_rgba(56,189,248,1)]"></span>
                    {slide.subheading}
                  </div>

                  <p className="slide-description mt-8 text-lg md:text-xl text-slate-200/80 leading-relaxed">
                    {slide.description}
                  </p>
                </div>

                <div className="flex w-full max-w-sm flex-col gap-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {slide.list.map((item, i) => {
                      const ChipContent = (
                        <div className="feature-chip group relative flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-medium text-slate-100/90 shadow-[0_18px_40px_rgba(56,189,248,0.15)] backdrop-blur-lg transition-all duration-500 ease-out hover:border-sky-400/60 hover:bg-white/20 hover:shadow-[0_0_40px_rgba(56,189,248,0.5),0_0_80px_rgba(129,140,248,0.4),0_0_120px_rgba(79,70,229,0.3),inset_0_0_30px_rgba(56,189,248,0.15)] hover:scale-[1.03] hover:-translate-y-1 cursor-pointer overflow-hidden">
                          {/* Animated glow background layers */}
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-sky-400/0 via-sky-400/30 to-cyan-400/0 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 -z-10"></div>
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 via-indigo-500/40 to-purple-500/0 opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-500 delay-75 -z-10"></div>
                          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-sky-400/0 via-cyan-400/50 to-indigo-400/0 opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-500 -z-10"></div>

                          {/* Animated shimmer effect */}
                          <div className="absolute inset-0 rounded-2xl overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-[200%] transition-all duration-1000 ease-in-out"></div>
                          </div>

                          {/* Content with relative z-index */}
                          <div className="relative z-10 flex items-center gap-3 w-full">
                            <span className="text-sky-400 flex-shrink-0 text-lg transition-all duration-500 group-hover:scale-125 group-hover:text-cyan-300 group-hover:drop-shadow-[0_0_12px_rgba(56,189,248,1),0_0_24px_rgba(129,140,248,0.8)] group-hover:rotate-6">
                              {item.icon}
                            </span>
                            <span className="relative transition-all duration-500 group-hover:text-white group-hover:font-semibold group-hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]">
                              {item.text}
                            </span>
                          </div>

                          {/* Pulsing border glow */}
                          <div className="absolute inset-0 rounded-2xl border-2 border-sky-400/0 group-hover:border-sky-400/60 transition-all duration-500 -z-10 group-hover:shadow-[0_0_20px_rgba(56,189,248,0.6),inset_0_0_20px_rgba(56,189,248,0.1)]"></div>
                        </div>
                      );

                      return item.link ? (
                        <Link key={i} to={item.link} className="block">
                          {ChipContent}
                        </Link>
                      ) : (
                        <div key={i}>
                          {ChipContent}
                        </div>
                      );
                    })}
                  </div>

                  <button className="slide-cta group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-sky-300/40 bg-gradient-to-r from-sky-400 via-sky-500 to-indigo-500 px-6 py-3 text-base font-semibold text-white shadow-[0_18px_40px_rgba(14,165,233,0.4)] transition-transform focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:ring-offset-2 focus:ring-offset-slate-900">
                    <span className="absolute inset-0 translate-x-[-120%] bg-white/25 transition-transform duration-500 group-hover:translate-x-0"></span>
                    <span className="relative flex items-center gap-3">
                      {slide.cta}
                      <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>
      ))}

      <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 md:px-12 md:pb-10 z-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3 text-slate-200/80 uppercase tracking-[0.4em] text-xs md:text-sm">
            <span>Experience</span>
            <div className="relative h-1.5 w-44 overflow-hidden rounded-full bg-white/10 shadow-inner">
              <div ref={progressRef} className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400 shadow-[0_0_10px_rgba(56,189,248,0.6)]"></div>
            </div>
            <span>{String(current + 1).padStart(2, "0")}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 text-slate-200/80 transition hover:border-white/25 hover:text-white"
            >
              <span className="text-lg transition-transform duration-300 group-hover:-translate-x-0.5">‹</span>
            </button>

            <div className="flex items-center gap-2">
              {slidesData.map((slideItem, idx) => (
                <button
                  key={slideItem.id}
                  onClick={() => setCurrent(idx)}
                  className={`group relative h-10 rounded-full border border-white/15 px-4 text-xs uppercase tracking-[0.25em] transition-colors ${idx === current
                    ? "bg-white/20 text-white shadow-[0_12px_30px_rgba(56,189,248,0.35)]"
                    : "bg-white/10 text-slate-300/70 hover:bg-white/15 hover:text-white"
                    }`}
                >
                  <span className="relative z-10">{String(idx + 1).padStart(2, "0")}</span>
                  {idx === current && (
                    <span className="absolute inset-0 bg-gradient-to-r from-sky-500/30 via-sky-400/30 to-transparent opacity-80 blur-xl"></span>
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={handleNext}
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 text-slate-200/80 transition hover:border-white/25 hover:text-white"
            >
              <span className="text-lg transition-transform duration-300 group-hover:translate-x-0.5">›</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedSlider;
