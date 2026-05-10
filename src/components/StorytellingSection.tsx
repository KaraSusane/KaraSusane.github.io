import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react';
import { FileText, Shield, FileSignature } from 'lucide-react';

const stages = [
  {
    title: "Profesjonalne pismo w Twojej sprawie",
    description: "Tworzymy dopracowane pisma, które porządkują argumenty, pokazują sedno sprawy i budują profesjonalny obraz klienta.",
    cta: "Rozpocznij sprawę"
  },
  {
    title: "Analiza, struktura, argumentacja",
    description: "Każde pismo powstaje w logicznym procesie. Najpierw porządkujemy informacje, następnie budujemy argumentację i nadajemy jej właściwą formę."
  },
  {
    title: "Bezpieczeństwo i poufność",
    description: "Twoja sprawa wymaga spokoju, precyzji i dyskrecji. Dbamy o przejrzystość, ochronę informacji i właściwe przedstawienie Twoich interesów."
  },
  {
    title: "Gotowe pismo, gotowe działanie",
    description: "Otrzymujesz profesjonalny dokument przygotowany do użycia w konkretnej sprawie. Jasny, elegancki i zgodny z celem, jaki chcesz osiągnąć.",
    cta: "Skonsultuj sprawę"
  }
];

type Stage = (typeof stages)[number];

type StageCopyProps = {
  progress: MotionValue<number>;
  stage: Stage;
  index: number;
};

const stageTimings = [
  {
    input: [0, 0.12, 0.27],
    opacity: [1, 1, 0],
    y: [0, 0, -36],
  },
  {
    input: [0.18, 0.31, 0.45, 0.58],
    opacity: [0, 1, 1, 0],
    y: [36, 0, 0, -36],
  },
  {
    input: [0.46, 0.59, 0.73, 0.86],
    opacity: [0, 1, 1, 0],
    y: [36, 0, 0, -36],
  },
  {
    input: [0.74, 0.88, 1],
    opacity: [0, 1, 1],
    y: [36, 0, 0],
  },
];

const StageCopy: React.FC<StageCopyProps> = ({ progress, stage, index }) => {
  const timing = stageTimings[index];
  const opacity = useTransform(progress, timing.input, timing.opacity);
  const y = useTransform(progress, timing.input, timing.y);
  const pointerEvents = useTransform(opacity, (value) => value > 0.6 ? 'auto' : 'none');

  return (
    <motion.div
      className="absolute inset-0 flex flex-col justify-center"
      style={{ opacity, y, pointerEvents }}
    >
      <div className="max-w-md">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-[1px] bg-[#D4AF37]"></span>
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#86868B]">
            Etap 0{index + 1}
          </span>
        </div>
        <h2 className="text-5xl lg:text-5xl font-semibold leading-[1.1] text-[#1D1D1F] mb-6 tracking-tight">
          {stage.title}
        </h2>
        <p className="text-[#424245] leading-relaxed text-xl mb-8 font-light max-w-md">
          {stage.description}
        </p>
        {stage.cta && (
          <button className="px-8 py-4 bg-[#1D1D1F] text-white rounded-full text-sm font-medium hover:scale-105 transition-transform shadow-xl w-fit inline-flex">
            {stage.cta}
          </button>
        )}
      </div>
    </motion.div>
  );
};

const AnimatedVisual = ({ progress }: { progress: MotionValue<number> }) => {
  // Container 3D transformations
  const rotateX = useTransform(progress, [0, 0.3, 0.6, 0.9, 1], [15, 25, 5, 0, 0]);
  const rotateY = useTransform(progress, [0, 0.3, 0.6, 0.9, 1], [-15, -25, 0, 0, 0]);
  const scale = useTransform(progress, [0, 0.3, 0.6, 0.9, 1], [1, 0.9, 0.9, 1.05, 1.1]);

  // Stage 2: Layers splitting
  const bottomLayerY = useTransform(progress, [0, 0.15, 0.30, 0.45, 0.60, 1], [0, 0, 80, 80, 0, 0]);
  const bottomLayerX = useTransform(progress, [0, 0.15, 0.30, 0.45, 0.60, 1], [0, 0, 40, 40, 0, 0]);
  const bottomLayerOpacity = useTransform(progress, [0, 0.15, 0.30, 0.45, 0.60, 1], [0, 0, 0.7, 0.7, 0, 0]);

  const topLayerY = useTransform(progress, [0, 0.15, 0.30, 0.45, 0.60, 1], [0, 0, -80, -80, 0, 0]);
  const topLayerX = useTransform(progress, [0, 0.15, 0.30, 0.45, 0.60, 1], [0, 0, -40, -40, 0, 0]);
  const topLayerOpacity = useTransform(progress, [0, 0.15, 0.30, 0.45, 0.60, 1], [0, 0, 0.7, 0.7, 0, 0]);

  const middleLayerOpacity = useTransform(progress, [0, 0.15, 0.30, 0.45, 0.60, 1], [1, 1, 0.9, 0.9, 1, 1]);

  // Stage 2: Background Data elements
  const dataOpacity = useTransform(progress, [0, 0.15, 0.30, 0.45, 0.60, 1], [0, 0, 1, 1, 0, 0]);

  // Stage 3: Shield
  const shieldOpacity = useTransform(progress, [0, 0.45, 0.60, 0.75, 0.90, 1], [0, 0, 1, 1, 0, 0]);
  const shieldScale = useTransform(progress, [0, 0.45, 0.60, 0.75, 0.90, 1], [0.8, 0.8, 1, 1, 1.2, 1.2]);

  // Stage 4: Final Document Touches
  const finalOpacity = useTransform(progress, [0, 0.75, 0.90, 1], [0, 0, 1, 1]);
  const baseOpacity = useTransform(progress, [0, 0.75, 0.90, 1], [1, 1, 0, 0]);
  const sealScale = useTransform(progress, [0, 0.75, 0.90, 1], [0.5, 0.5, 1, 1]);

  return (
    <div className="relative w-full h-full flex items-center justify-center perspective-[1200px]">
      
      {/* Background soft glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div 
          className="w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#E8E8ED]/40 to-transparent blur-[80px]"
          style={{ scale: 1.2 }}
        />
      </div>

      <motion.div
        className="relative w-[280px] md:w-[380px] aspect-[1/1.37] flex items-center justify-center transform-style-preserve-3d"
        style={{
          rotateX,
          rotateY,
          scale,
        }}
      >
        {/* === BACKGROUND DATA (Stage 2) === */}
        <motion.div 
          className="absolute inset-0 -inset-x-20 pointer-events-none z-[-1] flex flex-col justify-around py-12"
          style={{ opacity: dataOpacity }}
        >
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 opacity-40">
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#1D1D1F] to-transparent"></div>
              <div className="h-2 w-2 rounded-full bg-[#1D1D1F]"></div>
            </div>
          ))}
        </motion.div>

        {/* === BOTTOM LAYER (Stage 2 split) === */}
        <motion.div
          className="absolute inset-0 bg-white/90 backdrop-blur-sm shadow-xl rounded-sm border border-gray-100 p-8 flex flex-col gap-4 overflow-hidden"
          style={{ x: bottomLayerX, y: bottomLayerY, opacity: bottomLayerOpacity }}
        >
          <div className="w-1/3 h-4 bg-[#F5F5F7] rounded"></div>
          <div className="flex flex-col gap-2 mt-4">
            <div className="w-full h-2 bg-[#F5F5F7] rounded"></div>
            <div className="w-full h-2 bg-[#F5F5F7] rounded"></div>
            <div className="w-5/6 h-2 bg-[#F5F5F7] rounded"></div>
          </div>
          <div className="absolute -right-4 top-12 opacity-[0.03]">
            <FileText size={120} className="text-[#1D1D1F]" />
          </div>
        </motion.div>

        {/* === MIDDLE LAYER (Main Document) === */}
        <motion.div
          className="absolute inset-0 bg-white shadow-2xl rounded-sm border border-gray-100 p-8 flex flex-col overflow-hidden z-10"
          style={{ opacity: middleLayerOpacity }}
        >
          {/* Document Header */}
          <div className="flex justify-between items-start mb-8">
            <div className="flex flex-col gap-2 w-1/2">
              <motion.div className="w-20 h-1 bg-[#D4AF37] rounded" style={{ opacity: baseOpacity, backgroundColor: "rgba(212, 175, 55, 0.6)" }}></motion.div>
              <div className="w-3/4 h-4 bg-[#F5F5F7] rounded mt-2"></div>
              <div className="w-1/2 h-4 bg-[#F5F5F7] rounded"></div>
            </div>
            {/* Stamp placeholder / Final Seal */}
            <div className="relative w-16 h-16 transform rotate-12">
               <motion.div 
                 className="absolute inset-0 bg-[#F5F5F7] rounded-full"
                 style={{ opacity: baseOpacity }}
               />
               <motion.div 
                 className="absolute inset-0 rounded-full bg-gradient-to-br from-[#D4AF37] via-[#F4D03F] to-[#B8860B] shadow-lg flex items-center justify-center"
                 style={{ opacity: finalOpacity, scale: sealScale }}
               >
                 <div className="w-12 h-12 border-2 border-white/30 rounded-full flex items-center justify-center">
                   <Shield size={16} className="text-white" />
                 </div>
               </motion.div>
            </div>
          </div>

          {/* Document Body Lines (Base) */}
          <motion.div className="flex flex-col gap-3 flex-grow pt-4" style={{ opacity: baseOpacity }}>
            <div className="w-full h-2 bg-[#F5F5F7] rounded"></div>
            <div className="w-full h-2 bg-[#F5F5F7] rounded"></div>
            <div className="w-full h-2 bg-[#F5F5F7] rounded"></div>
            <div className="w-5/6 h-2 bg-[#F5F5F7] rounded"></div>
            <div className="w-full h-2 bg-[#F5F5F7] rounded"></div>
            <div className="w-2/3 h-2 bg-[#F5F5F7] rounded"></div>
          </motion.div>

          {/* Document Body Lines (Final Details) */}
          <motion.div className="absolute top-[140px] left-8 right-8 flex flex-col gap-4 z-20" style={{ opacity: finalOpacity }}>
            <div className="font-serif text-lg text-[#1D1D1F] font-semibold tracking-tight border-b border-gray-100 pb-2">
              PISMO OSTATECZNE
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <div className="h-2 w-full bg-gray-800 rounded"></div>
              <div className="h-2 w-11/12 bg-gray-600 rounded"></div>
              <div className="h-2 w-full bg-gray-800 rounded"></div>
              <div className="h-2 w-4/5 bg-gray-600 rounded"></div>
              <div className="h-2 w-full bg-gray-800 rounded"></div>
              <div className="h-2 w-2/3 bg-gray-600 rounded"></div>
            </div>
          </motion.div>

          {/* Document Signature Area */}
          <div className="mt-auto pt-10 flex justify-between items-end border-t border-gray-50">
            <motion.div style={{ opacity: finalOpacity }} className="space-y-2">
              <div className="text-[8px] uppercase tracking-[0.3em] font-bold text-[#86868B]">Podpis Pełnomocnika</div>
              <div className="italic font-serif text-lg text-gray-700 opacity-80">PODPIS</div>
            </motion.div>
            <motion.div style={{ opacity: finalOpacity }} className="flex flex-col items-center gap-2">
              <FileSignature size={32} className="text-[#1D1D1F]" strokeWidth={1} />
            </motion.div>
          </div>
        </motion.div>

        {/* === TOP LAYER (Stage 2 split) === */}
        <motion.div
          className="absolute inset-0 bg-white/40 backdrop-blur-md shadow-lg rounded-sm border border-gray-100 p-8 flex flex-col overflow-hidden z-20"
          style={{ x: topLayerX, y: topLayerY, opacity: topLayerOpacity }}
        >
          <div className="border border-[#1D1D1F]/10 p-4 h-full rounded flex flex-col gap-3 stroke-dasharray">
             <div className="w-full h-1 bg-[#1D1D1F]/10 rounded"></div>
             <div className="w-2/3 h-1 bg-[#1D1D1F]/10 rounded"></div>
          </div>
        </motion.div>

        {/* === SHIELD OVERLAY (Stage 3) === */}
        <motion.div
          className="absolute inset-[-48px] pointer-events-none z-30 flex items-center justify-center font-sans"
          style={{ opacity: shieldOpacity, scale: shieldScale }}
        >
          <div className="w-full h-full rounded-[40px] border border-white/40 shadow-[0_0_80px_rgba(0,0,0,0.05)] bg-white/10 backdrop-blur-xl flex items-center justify-center relative overflow-hidden">
             {/* Suble glass reflection */}
             <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-white to-[#1D1D1F]/20"></div>
             
             <motion.div 
               className="w-24 h-24 rounded-full bg-white/5 backdrop-blur-xl border border-white/50 flex items-center justify-center shadow-inner relative z-10"
               initial={{ rotate: -10 }}
               animate={{ rotate: 10 }}
               transition={{ repeat: Infinity, duration: 4, repeatType: "reverse", ease: "easeInOut" }}
             >
               <Shield size={40} className="text-[#D4AF37]" strokeWidth={1.5} />
             </motion.div>

             <div className="absolute bottom-8 right-8 text-[#D4AF37] opacity-60">
               <Shield size={32} strokeWidth={1.5} />
             </div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
};

export const StorytellingSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.18,
  });

  return (
    <section ref={containerRef} className="relative w-full bg-[#FBFBFD] text-[#1D1D1F] font-sans selection:bg-[#D4AF37] selection:text-white">
      {/* 
        ========================================
        MOBILE LAYOUT
        ========================================
      */}
      <div className="block md:hidden">
        <div className="sticky top-16 h-[50vh] w-full flex items-center justify-center bg-[#FBFBFD]/50 backdrop-blur-lg z-0 border-b border-gray-100">
          <AnimatedVisual progress={smoothProgress} />
        </div>
        <div className="relative z-10 px-4 -mt-6">
          {stages.map((stage, i) => (
            <div key={i} className="min-h-[80vh] flex flex-col justify-center mb-8">
              <motion.div 
                className="bg-white/90 backdrop-blur-xl p-8 rounded-[40px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-6 h-[1px] bg-[#D4AF37]"></span>
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#86868B]">
                    Etap 0{i + 1}
                  </span>
                </div>
                <h2 className="text-3xl font-semibold leading-[1.1] text-[#1D1D1F] mb-4 tracking-tight">
                  {stage.title}
                </h2>
                <p className="text-[#424245] leading-relaxed mb-6 text-base font-light">
                  {stage.description}
                </p>
                {stage.cta && (
                  <button className="px-6 py-3 bg-[#1D1D1F] text-white rounded-full text-sm font-medium hover:scale-105 transition-transform shadow-lg w-fit">
                    {stage.cta}
                  </button>
                )}
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* 
        ========================================
        DESKTOP LAYOUT (400vh for scroll)
        ========================================
      */}
      <div className="hidden md:block h-[500vh] w-full relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
          <div className="mx-auto max-w-7xl w-full px-8 grid grid-cols-2 gap-16 relative">
            
            {/* Left Column: Text Overlay */}
            <div className="relative h-screen flex flex-col justify-center z-10 pointer-events-none">
               {stages.map((stage, i) => (
                 <StageCopy key={stage.title} progress={smoothProgress} stage={stage} index={i} />
               ))}
            </div>

            {/* Right Column: Visual */}
            <div className="relative h-screen flex items-center justify-center pointer-events-none">
               <AnimatedVisual progress={smoothProgress} />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
