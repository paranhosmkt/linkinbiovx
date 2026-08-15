import { motion } from 'motion/react';

export default function BackgroundEffects() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Subtle modern dot grid with radial fade mask */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(#ffffff0d_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_75%_60%_at_50%_15%,#000_60%,transparent_100%)] opacity-80" 
      />

      {/* Floating ambient glowing orbs */}
      <motion.div
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.15, 0.95, 1],
          opacity: [0.15, 0.25, 0.18, 0.15],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-32 -left-20 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-amber-500/20 via-orange-500/15 to-transparent blur-[120px]"
      />

      <motion.div
        animate={{
          x: [0, -35, 25, 0],
          y: [0, 40, -30, 0],
          scale: [1, 1.2, 0.9, 1],
          opacity: [0.12, 0.22, 0.15, 0.12],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute top-1/3 -right-28 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-purple-600/20 via-pink-600/10 to-transparent blur-[140px]"
      />

      <motion.div
        animate={{
          x: [0, 25, -30, 0],
          y: [0, -25, 35, 0],
          scale: [0.95, 1.1, 1, 0.95],
          opacity: [0.08, 0.16, 0.1, 0.08],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 4,
        }}
        className="absolute -bottom-24 left-1/4 w-[420px] h-[420px] rounded-full bg-gradient-to-t from-amber-600/15 via-zinc-800/20 to-transparent blur-[130px]"
      />

      {/* Top subtle spotlight beam */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-gradient-to-b from-white/[0.04] to-transparent blur-2xl" />
    </div>
  );
}
