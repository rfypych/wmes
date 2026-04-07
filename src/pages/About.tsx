import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

function AboutHero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-black pt-32 px-4 overflow-hidden relative">
      <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay pointer-events-none" />
      <div className="w-full max-w-[100vw] overflow-hidden flex flex-col items-center">
        <motion.h1 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[12vw] font-black tracking-tighter leading-[0.8] text-white uppercase text-center hover-trigger"
          data-cursor-text="WHO?"
        >
          NOT YOUR
        </motion.h1>
        <motion.h1 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[12vw] font-black tracking-tighter leading-[0.8] text-transparent text-stroke-2 font-serif italic uppercase text-center hover-trigger"
          data-cursor-text="AVERAGE"
        >
          AVERAGE
        </motion.h1>
        <motion.h1 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-[12vw] font-black tracking-tighter leading-[0.8] text-cyan-500 uppercase text-center hover-trigger"
          data-cursor-text="DEV"
        >
          DEVELOPER.
        </motion.h1>
      </div>
    </section>
  );
}

function ExperienceRow({ year, title, company, desc }: { year: string, title: string, company: string, desc: string }) {
  return (
    <div className="border-t border-white/20 py-12 flex flex-col md:flex-row gap-8 hover:bg-white hover:text-black transition-colors duration-500 group hover-trigger px-4 md:px-10" data-cursor-text="READ">
      <div className="md:w-1/4 font-mono text-xl opacity-50 group-hover:opacity-100 transition-opacity">{year}</div>
      <div className="md:w-1/2">
        <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">{title}</h3>
        <p className="text-xl opacity-50 group-hover:opacity-100 font-mono uppercase tracking-widest transition-opacity">{company}</p>
      </div>
      <div className="md:w-1/4 text-sm font-mono leading-relaxed opacity-50 group-hover:opacity-100 transition-opacity">
        {desc}
      </div>
    </div>
  );
}

function Experience() {
  const experiences = [
    { year: "2024 — PRESENT", title: "LEAD ARCHITECT", company: "NEXUS CORP", desc: "Spearheading the transition to edge computing and micro-frontends. Reduced load times by 400%." },
    { year: "2022 — 2024", title: "CREATIVE DEV", company: "STUDIO VOID", desc: "Built award-winning WebGL experiences for global brands. Pushed the limits of browser rendering." },
    { year: "2020 — 2022", title: "UI ENGINEER", company: "FINTECH X", desc: "Developed a robust design system used by 50+ developers across 12 different product lines." },
  ];

  return (
    <section className="py-32 bg-black text-white">
      <div className="max-w-screen-2xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-20 px-4 md:px-10 uppercase">
          THE <span className="text-transparent text-stroke-1 font-serif italic">TIMELINE</span>
        </h2>
        <div className="border-b border-white/20">
          {experiences.map((exp, i) => (
            <ExperienceRow key={i} {...exp} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillsGrid() {
  const skills = [
    "REACT", "NEXT.JS", "TYPESCRIPT", "WEBGL", "THREE.JS", "FRAMER MOTION", 
    "TAILWIND", "NODE.JS", "RUST", "GRAPHQL", "FIGMA", "SHADERS"
  ];

  return (
    <section className="py-32 bg-white text-black relative overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay pointer-events-none" />
      <div className="max-w-screen-2xl mx-auto px-4 md:px-10">
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-20 uppercase">
          ARSENAL
        </h2>
        <div className="flex flex-wrap gap-4">
          {skills.map((skill, i) => (
            <div 
              key={i} 
              className="text-4xl md:text-7xl font-black uppercase tracking-tighter hover:text-transparent hover:text-stroke-2 transition-all duration-300 hover-trigger cursor-crosshair"
              data-cursor-text="SKILL"
            >
              {skill}
              {i !== skills.length - 1 && <span className="mx-4 opacity-20">•</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -40, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="bg-black text-slate-300 font-sans relative"
    >
      <main className="relative z-10">
        <AboutHero />
        <Experience />
        <SkillsGrid />
      </main>
    </motion.div>
  );
}
