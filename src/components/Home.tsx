import { motion } from 'motion/react';
import { User, Download, Instagram, ChevronRight, Sparkles, ExternalLink, Bot, Magnet, MessageSquareText } from 'lucide-react';
import { ViewState } from '../types';

interface HomeProps {
  setView: (view: ViewState) => void;
}

export default function Home({ setView }: HomeProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 320, damping: 24 } },
  };

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden flex flex-col items-center bg-[#0e0e0e]">
      {/* Background Video Layer - Shifted further up */}
      <div className="absolute -top-10 sm:-top-16 left-1/2 -translate-x-1/2 w-full max-w-md sm:max-w-lg flex justify-center pointer-events-none z-0">
        <div className="relative w-full">
          <video
            src="https://videovxleads.s3.us-east-1.amazonaws.com/video01.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto object-contain opacity-80"
          />
          {/* #0e0e0e soft vignette and edge blend */}
          <div className="absolute inset-0 shadow-[inset_0_0_50px_20px_#0e0e0e] sm:shadow-[inset_0_0_80px_35px_#0e0e0e]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,#0e0e0e_100%)] opacity-70" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/85 to-transparent" />
        </div>
      </div>

      {/* Main Content (Name & Buttons overlaying from lower half) */}
      <motion.div
        initial="hidden"
        animate="show"
        exit={{ opacity: 0, y: -20 }}
        variants={containerVariants}
        className="relative z-10 w-full max-w-md mx-auto min-h-screen px-5 pt-[360px] sm:pt-[440px] pb-16 flex flex-col items-center"
      >
        {/* Profile Header */}
        <motion.div variants={itemVariants} className="text-center mb-8 w-full">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2 drop-shadow-md">
            Guilherme R. Paranhos
          </h1>
          <p className="text-zinc-300 text-sm sm:text-[15px] font-medium leading-relaxed max-w-sm mx-auto drop-shadow">
            Ajudo empresas a aumentar o ROI em feiras e eventos empresariais
          </p>
        </motion.div>

        {/* Buttons List */}
        <div className="w-full flex flex-col gap-3.5">
          {/* Highlighted Checklist Button (Hero CTA) */}
          <motion.button
            variants={itemVariants}
            onClick={() => setView('form')}
            whileHover={{ scale: 1.015, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="relative flex flex-col w-full mb-1 p-[1.5px] rounded-2xl overflow-hidden group shadow-lg shadow-amber-500/10 cursor-pointer"
          >
            {/* Animated gradient border */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-400 to-amber-500 opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
            
            <div className="relative flex flex-col items-start w-full bg-zinc-950/90 backdrop-blur-xl p-5 rounded-[15px] z-10 transition-colors group-hover:bg-zinc-900/95">
              <div className="flex items-center justify-between w-full mb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-amber-500/15 border border-amber-500/30 text-amber-400 rounded-xl shadow-inner">
                    <Download className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-white text-left text-base sm:text-lg leading-tight">
                    Checklist do Vendedor
                  </h3>
                </div>
                <span className="text-[11px] font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Grátis
                </span>
              </div>
              
              <p className="text-xs sm:text-sm text-zinc-400 text-left leading-relaxed mb-4">
                10 dicas práticas para sua equipe de vendas não perder leads qualificados no estande.
              </p>
              
              <div className="w-full relative mt-auto">
                <div className="relative overflow-hidden w-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-sm py-3 rounded-xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.35)] transition-all">
                  {/* Subtle shine light sweep */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                  <Download className="w-4 h-4" />
                  <span>Baixar Checklist Gratuito</span>
                </div>
              </div>
            </div>
          </motion.button>

          {/* Quem sou eu */}
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.015, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setView('about')}
            className="relative flex items-center justify-between w-full p-4 bg-zinc-900/60 hover:bg-zinc-800/70 backdrop-blur-xl border border-white/[0.08] hover:border-white/20 rounded-2xl transition-all duration-300 group shadow-sm overflow-hidden text-left cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="p-2.5 bg-zinc-800/80 group-hover:bg-zinc-700/80 border border-zinc-700/50 rounded-xl transition-colors shrink-0">
                <User className="w-4 h-4 text-zinc-200 group-hover:text-white" />
              </div>
              <div className="min-w-0">
                <span className="font-semibold text-white text-sm sm:text-base block">Quem sou eu?</span>
                <span className="text-xs text-zinc-400 block truncate">Conheça minha trajetória e visão</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0 ml-2" />
          </motion.button>

          {/* VX Avatar */}
          <motion.a
            href="https://www.vxvirtual.com.br"
            target="_blank"
            rel="noopener noreferrer"
            variants={itemVariants}
            whileHover={{ scale: 1.015, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="relative flex items-center justify-between w-full p-4 bg-zinc-900/60 hover:bg-zinc-800/70 backdrop-blur-xl border border-white/[0.08] hover:border-white/20 rounded-2xl transition-all duration-300 group shadow-sm overflow-hidden cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="p-2 bg-zinc-800/80 group-hover:bg-zinc-700/80 border border-zinc-700/50 rounded-xl transition-colors overflow-hidden flex items-center justify-center shrink-0 w-9 h-9">
                <img
                  src="https://i.ibb.co/dwF2gW5k/1.jpg"
                  alt="VX Avatar"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white text-sm sm:text-base">VX Avatar</span>
                </div>
                <span className="text-xs text-zinc-400 block truncate">IA interativa para atrair visitantes no estande</span>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2" />
          </motion.a>

          {/* VX Leads */}
          <motion.a
            href="https://www.vxleads.com.br"
            target="_blank"
            rel="noopener noreferrer"
            variants={itemVariants}
            whileHover={{ scale: 1.015, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="relative flex items-center justify-between w-full p-4 bg-zinc-900/60 hover:bg-zinc-800/70 backdrop-blur-xl border border-white/[0.08] hover:border-white/20 rounded-2xl transition-all duration-300 group shadow-sm overflow-hidden cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="p-2 bg-zinc-800/80 group-hover:bg-zinc-700/80 border border-zinc-700/50 rounded-xl transition-colors overflow-hidden flex items-center justify-center shrink-0 w-9 h-9">
                <img
                  src="https://i.ibb.co/Z1H2NT7y/2.jpg"
                  alt="VX Leads"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white text-sm sm:text-base">VX Leads</span>
                </div>
                <span className="text-xs text-zinc-400 block truncate">Gamificação e totens para captura de dados</span>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2" />
          </motion.a>

          {/* VX Sales */}
          <motion.button
            onClick={() => setView('vx-sales')}
            variants={itemVariants}
            whileHover={{ scale: 1.015, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="relative flex items-center justify-between w-full p-4 bg-zinc-900/60 hover:bg-zinc-800/70 backdrop-blur-xl border border-white/[0.08] hover:border-white/20 rounded-2xl transition-all duration-300 group shadow-sm overflow-hidden text-left cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="p-2 bg-zinc-800/80 group-hover:bg-zinc-700/80 border border-zinc-700/50 rounded-xl transition-colors overflow-hidden flex items-center justify-center shrink-0 w-9 h-9">
                <img
                  src="https://i.ibb.co/RkkMZg7R/3.jpg"
                  alt="VX Sales"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white text-sm sm:text-base">VX Sales</span>
                  <span className="text-[10px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20 px-1.5 py-0.5 rounded">
                    Em breve
                  </span>
                </div>
                <span className="text-xs text-zinc-400 block truncate">Triagem e abordagem pós-evento via WhatsApp</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0 ml-2" />
          </motion.button>

          {/* Instagram: Me segue lá */}
          <motion.a
            href="https://instagram.com/paranhos.vx"
            target="_blank"
            rel="noopener noreferrer"
            variants={itemVariants}
            whileHover={{ scale: 1.015, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="relative flex items-center justify-between w-full p-4 bg-zinc-900/60 hover:bg-zinc-800/70 backdrop-blur-xl border border-white/[0.08] hover:border-white/20 rounded-2xl transition-all duration-300 group shadow-sm overflow-hidden cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="p-2 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-xl transition-transform group-hover:scale-105 overflow-hidden flex items-center justify-center shrink-0 w-9 h-9 shadow-md shadow-purple-900/30">
                <Instagram className="w-4 h-4 text-white" />
              </div>
              <div className="min-w-0">
                <span className="font-semibold text-white text-sm sm:text-base block">Me segue lá</span>
                <span className="text-xs text-zinc-400 block truncate">@paranhos.vx • Dicas e bastidores diários</span>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2" />
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
}
