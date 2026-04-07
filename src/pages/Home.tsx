import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { ArrowUpRight, Terminal, Figma, Cpu, Globe, Triangle, Circle, Square, Code2, Layers, Zap } from 'lucide-react';
import { useRef } from 'react';
import { Magnetic } from '../components/Navigation';

// --- 1. THE RGB GLITCH HERO ---
function RGBHero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    mouseX.set(e.clientX / innerWidth - 0.5);
    mouseY.set(e.clientY / innerHeight - 0.5);
  };

  const springConfigR = { stiffness: 100, damping: 10 };
  const springConfigG = { stiffness: 50, damping: 20 };
  const springConfigB = { stiffness: 200, damping: 15 };

  const xR = useSpring(useTransform(mouseX, [-0.5, 0.5], [-50, 50]), springConfigR);
  const yR = useSpring(useTransform(mouseY, [-0.5, 0.5], [-50, 50]), springConfigR);
  
  const xG = useSpring(useTransform(mouseX, [-0.5, 0.5], [30, -30]), springConfigG);
  const yG = useSpring(useTransform(mouseY, [-0.5, 0.5], [30, -30]), springConfigG);
  
  const xB = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), springConfigB);
  const yB = useSpring(useTransform(mouseY, [-0.5, 0.5], [20, -20]), springConfigB);

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-[#020202] cursor-crosshair"
    >
      <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay pointer-events-none z-50" />
      
      <div className="relative z-10 w-full flex items-center justify-center">
        <motion.h1 style={{ x: xR, y: yR }} className="absolute text-[22vw] font-black tracking-tighter leading-none text-red-600 mix-blend-screen opacity-80 pointer-events-none">ANOMALY</motion.h1>
        <motion.h1 style={{ x: xG, y: yG }} className="absolute text-[22vw] font-black tracking-tighter leading-none text-green-500 mix-blend-screen opacity-80 pointer-events-none">ANOMALY</motion.h1>
        <motion.h1 style={{ x: xB, y: yB }} className="absolute text-[22vw] font-black tracking-tighter leading-none text-blue-600 mix-blend-screen opacity-80 pointer-events-none">ANOMALY</motion.h1>
        <h1 className="relative text-[22vw] font-black tracking-tighter leading-none text-white mix-blend-difference hover-trigger" data-cursor-text="DESTROY">ANOMALY</h1>
      </div>

      <div className="absolute bottom-10 left-10 text-xs font-mono text-white/40 uppercase tracking-widest max-w-xs">
        <p>Warning: System parameters exceeded. Reality distortion field active.</p>
      </div>
    </section>
  );
}

// --- 2. THE MANIFESTO ---
function Manifesto() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start 80%", "end 40%"] });

  const text = "I DO NOT WRITE CODE. I BEND REALITY. THE BROWSER IS MY CANVAS. THE DOM IS MY PLAYGROUND. RULES ARE MEANT TO BE BROKEN. GRIDS ARE MEANT TO BE SHATTERED.";
  const words = text.split(" ");

  return (
    <section ref={containerRef} className="py-40 px-4 md:px-10 min-h-screen flex items-center bg-white text-black relative overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay pointer-events-none" />
      <p className="text-[8vw] md:text-[6vw] font-black leading-[0.85] tracking-tighter uppercase flex flex-wrap gap-x-4 md:gap-x-8 gap-y-2">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + (1 / words.length);
          const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);
          const y = useTransform(scrollYProgress, [start, end], [50, 0]);
          
          return (
            <motion.span key={i} style={{ opacity, y }} className="inline-block hover-trigger" data-cursor-text="READ">
              {word}
            </motion.span>
          );
        })}
      </p>
    </section>
  );
}

// --- 3. DRAGGABLE CHAOS ---
function DraggableChaos() {
  const constraintsRef = useRef(null);

  const elements = [
    { text: "REACT", color: "bg-cyan-500 text-black", size: "text-4xl p-6", rotate: -10, x: 100, y: 50 },
    { text: "WEBGL", color: "bg-purple-500 text-white", size: "text-6xl p-8", rotate: 15, x: 300, y: 150 },
    { text: "MOTION", color: "bg-yellow-400 text-black", size: "text-5xl p-6", rotate: -5, x: 500, y: 80 },
    { text: "SHADERS", color: "bg-red-500 text-white", size: "text-3xl p-4", rotate: 20, x: 200, y: 300 },
    { text: "TYPESCRIPT", color: "bg-blue-600 text-white", size: "text-2xl p-4", rotate: -15, x: 600, y: 250 },
    { icon: <Triangle className="w-16 h-16" />, color: "bg-transparent border-2 border-white text-white", size: "p-8 rounded-full", rotate: 45, x: 150, y: 400 },
    { icon: <Circle className="w-20 h-20" />, color: "bg-white text-black", size: "p-4 rounded-full", rotate: 0, x: 700, y: 100 },
    { icon: <Square className="w-24 h-24" />, color: "bg-transparent border-4 border-emerald-500 text-emerald-500", size: "p-4", rotate: 12, x: 400, y: 350 },
  ];

  return (
    <section className="relative h-screen bg-[#0a0a0a] overflow-hidden flex flex-col items-center justify-center border-y border-white/10">
      <div className="absolute top-10 text-center z-0 pointer-events-none">
        <h2 className="text-[10vw] font-black text-white/5 tracking-tighter uppercase">SANDBOX</h2>
        <p className="text-white/30 font-mono uppercase tracking-widest mt-4">Drag elements to create chaos</p>
      </div>

      <motion.div ref={constraintsRef} className="absolute inset-0 z-10">
        {elements.map((el, i) => (
          <motion.div
            key={i}
            drag
            dragConstraints={constraintsRef}
            dragElastic={0.2}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
            initial={{ x: el.x, y: el.y, rotate: el.rotate, scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, type: "spring" }}
            whileHover={{ scale: 1.1, zIndex: 50 }}
            whileDrag={{ scale: 1.2, zIndex: 100, cursor: "grabbing" }}
            className={`absolute font-black tracking-tighter uppercase cursor-grab hover-trigger ${el.color} ${el.size} shadow-2xl`}
            data-cursor-text="DRAG"
          >
            {el.text || el.icon}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

// --- 4. CAPABILITIES (New Content) ---
function Capabilities() {
  const capabilities = [
    { title: "FRONTEND ARCHITECTURE", desc: "Building scalable, resilient systems that don't just work, but dominate.", icon: <Code2 className="w-12 h-12" /> },
    { title: "CREATIVE ENGINEERING", desc: "Fusing logic with art. WebGL, Shaders, and complex motion physics.", icon: <Globe className="w-12 h-12" /> },
    { title: "DESIGN SYSTEMS", desc: "Translating chaotic brand identities into strict, reusable component laws.", icon: <Layers className="w-12 h-12" /> },
    { title: "PERFORMANCE OBSESSION", desc: "Shaving milliseconds. Optimizing rendering pipelines. Zero compromise.", icon: <Zap className="w-12 h-12" /> },
  ];

  return (
    <section className="py-32 px-4 md:px-10 bg-black text-white border-b border-white/10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-20 uppercase">
          CORE <span className="text-transparent text-stroke-1 font-serif italic">CAPABILITIES</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {capabilities.map((cap, i) => (
            <div key={i} className="group border border-white/20 p-10 hover:bg-white hover:text-black transition-colors duration-500 hover-trigger" data-cursor-text="EXPLORE">
              <div className="mb-8 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 origin-left">
                {cap.icon}
              </div>
              <h3 className="text-3xl md:text-4xl font-black tracking-tighter mb-4 uppercase">{cap.title}</h3>
              <p className="font-mono text-sm opacity-60 group-hover:opacity-100 leading-relaxed uppercase tracking-widest">{cap.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- 5. HORIZONTAL ARCHIVE ---
function HorizontalScrollProjects() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  const projects = [
    { title: "Ethereal", type: "Web Desktop", img: "bg-zinc-900", text: "text-stroke-1" },
    { title: "Quantum", type: "Fintech App", img: "bg-blue-900", text: "text-white" },
    { title: "Nexus", type: "AI Interface", img: "bg-purple-900", text: "text-white" },
    { title: "Aura", type: "Generative Art", img: "bg-emerald-900", text: "text-stroke-1" },
  ];

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-black">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="absolute top-20 left-8 md:left-20 z-10 pointer-events-none">
          <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter mix-blend-difference">
            THE <span className="font-serif italic text-stroke-1 text-transparent">ARCHIVE</span>
          </h2>
        </div>
        
        <motion.div style={{ x }} className="flex gap-8 px-8 md:px-20 pt-20">
          {projects.map((project, index) => (
            <div key={index} className="w-[85vw] md:w-[60vw] h-[60vh] shrink-0 relative group hover-trigger" data-cursor-text="VIEW">
              <div className={`absolute inset-0 ${project.img} rounded-[3rem] overflow-hidden border border-white/10 transition-transform duration-700 group-hover:scale-[0.98]`}>
                <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay" />
                <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="w-64 h-64 border border-white/20 rounded-full animate-[spin_20s_linear_infinite] border-dashed" />
                  <div className="absolute w-48 h-48 border border-white/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                </div>
                <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
                  <div>
                    <p className="text-sm font-mono text-white/50 mb-2">{project.type}</p>
                    <h3 className={`text-6xl md:text-8xl font-black uppercase tracking-tighter ${project.text} ${project.text === 'text-stroke-1' ? 'text-transparent' : ''}`}>{project.title}</h3>
                  </div>
                  <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-500 bg-black/20 backdrop-blur-md">
                    <ArrowUpRight className="w-6 h-6 group-hover:rotate-45 transition-transform duration-500" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// --- 6. THE VOID FOOTER (FIXED TEXT VISIBILITY) ---
function VoidFooter() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], ["50%", "0%"]);

  return (
    <section ref={containerRef} className="h-screen bg-black flex items-center justify-center overflow-hidden p-4 md:p-10">
      <motion.div 
        style={{ scale, borderRadius }}
        className="w-full h-full bg-white flex flex-col items-center justify-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-noise opacity-50 mix-blend-overlay pointer-events-none" />
        
        {/* Removed mix-blend-difference so the black text is visible on the white background */}
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-[15vw] leading-[0.8] font-black tracking-tighter text-black hover-trigger"
          data-cursor-text="TALK"
        >
          INITIATE.
        </motion.h2>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 flex flex-col md:flex-row items-center justify-center gap-12 font-mono text-sm font-bold uppercase tracking-widest text-black"
        >
          <Magnetic><a href="mailto:hello@example.com" className="hover:text-cyan-600 transition-colors hover-trigger" data-cursor-text="SEND">Email</a></Magnetic>
          <div className="w-1.5 h-1.5 rounded-full bg-black/20" />
          <Magnetic><a href="#" className="hover:text-cyan-600 transition-colors hover-trigger" data-cursor-text="X">Twitter</a></Magnetic>
          <div className="w-1.5 h-1.5 rounded-full bg-black/20" />
          <Magnetic><a href="#" className="hover:text-cyan-600 transition-colors hover-trigger" data-cursor-text="CODE">Github</a></Magnetic>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default function Home() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -40, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="bg-black text-slate-300 font-sans relative"
    >
      <main className="relative z-10">
        <RGBHero />
        <Manifesto />
        <DraggableChaos />
        <Capabilities />
        <HorizontalScrollProjects />
        <VoidFooter />
      </main>
    </motion.div>
  );
}
