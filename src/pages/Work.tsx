import { motion, useMotionValue, useSpring } from 'motion/react';
import { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  { title: "ETHEREAL", category: "WEB DESKTOP", year: "2026", color: "bg-zinc-900", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" },
  { title: "QUANTUM", category: "FINTECH", year: "2025", color: "bg-blue-900", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop" },
  { title: "NEXUS", category: "AI INTERFACE", year: "2025", color: "bg-purple-900", img: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop" },
  { title: "AURA", category: "GENERATIVE ART", year: "2024", color: "bg-emerald-900", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop" },
  { title: "VOID", category: "EXPERIMENTAL", year: "2024", color: "bg-red-900", img: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2670&auto=format&fit=crop" },
];

function WorkHero() {
  return (
    <section className="pt-48 pb-20 px-4 md:px-10 bg-black text-white">
      <h1 className="text-[15vw] font-black tracking-tighter leading-none uppercase mix-blend-difference relative z-10">
        THE <span className="font-serif italic text-stroke-2 text-transparent">ARCHIVE</span>
      </h1>
      <p className="font-mono uppercase tracking-widest opacity-50 mt-8 max-w-md">
        A curated selection of digital anomalies, brutalist interfaces, and high-performance web applications.
      </p>
    </section>
  );
}

function ProjectList() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Mouse position for the floating image
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring physics for the image follower
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const imageX = useSpring(mouseX, springConfig);
  const imageY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="pb-40 bg-black text-white relative">
      {/* Floating Image Reveal */}
      <motion.div 
        className="fixed top-0 left-0 w-[400px] h-[300px] pointer-events-none z-50 overflow-hidden rounded-2xl shadow-2xl"
        style={{ 
          x: imageX, 
          y: imageY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: hoveredIndex !== null ? 1 : 0,
          scale: hoveredIndex !== null ? 1 : 0.5,
        }}
        transition={{ opacity: { duration: 0.2 }, scale: { duration: 0.4, type: "spring" } }}
      >
        {projects.map((project, i) => (
          <div 
            key={i} 
            className={`absolute inset-0 transition-opacity duration-500 ${hoveredIndex === i ? 'opacity-100' : 'opacity-0'}`}
          >
            <img src={project.img} alt={project.title} className="w-full h-full object-cover" />
            <div className={`absolute inset-0 ${project.color} mix-blend-overlay opacity-50`} />
          </div>
        ))}
      </motion.div>

      {/* Project Rows */}
      <div className="border-b border-white/20">
        {projects.map((project, i) => (
          <div 
            key={i}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="border-t border-white/20 px-4 md:px-10 py-12 flex flex-col md:flex-row items-start md:items-center justify-between group hover:bg-white hover:text-black transition-colors duration-500 cursor-none relative z-10"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-20">
              <span className="font-mono text-xl opacity-50 group-hover:opacity-100 transition-opacity">0{i + 1}</span>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase group-hover:translate-x-4 transition-transform duration-500">
                {project.title}
              </h2>
            </div>
            
            <div className="flex items-center gap-10 mt-8 md:mt-0 opacity-50 group-hover:opacity-100 transition-opacity">
              <span className="font-mono uppercase tracking-widest">{project.category}</span>
              <span className="font-mono">{project.year}</span>
              <ArrowUpRight className="w-10 h-10 group-hover:rotate-45 transition-transform duration-500" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Work() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -40, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="bg-black text-slate-300 font-sans relative min-h-screen"
    >
      <main className="relative z-10">
        <WorkHero />
        <ProjectList />
      </main>
    </motion.div>
  );
}
