import { motion } from 'motion/react';
import { User, Link as LinkIcon, Bot, Magnet, CheckSquare, Download } from 'lucide-react';
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
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, y: -20 }}
      variants={containerVariants}
      className="flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl mx-auto min-h-screen pt-2 px-5 pb-12 lg:py-12 lg:px-8 gap-8 lg:gap-16"
    >
      {/* Left Column: Video */}
      <motion.div variants={itemVariants} className="relative w-full max-w-full sm:max-w-[500px] md:max-w-[600px] lg:max-w-[600px] shrink-0">
        <div className="relative w-full rounded-[2rem] overflow-hidden bg-black">
          <video
            src="https://videovxleads.s3.us-east-1.amazonaws.com/expositor.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto max-h-[85vh] object-contain"
          />
          {/* Black gradient fade around the video */}
          <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,1)] pointer-events-none" />
          <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.8)] pointer-events-none" />
        </div>
      </motion.div>

      {/* Right Column: Content */}
      <div className="w-full max-w-md flex flex-col items-center lg:items-start z-10">
        <motion.div variants={itemVariants} className="text-center lg:text-left mb-10">
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-white mb-2">
            Guilherme R. Paranhos
          </h1>
          <p className="text-zinc-400 text-base lg:text-lg font-medium">
            Especialista em Marketing, Inteligência Artificial e vendas B2B em eventos.
          </p>
        </motion.div>

        <div className="w-full flex flex-col gap-4">
          <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setView('about')}
          className="flex items-center justify-between w-full p-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-2xl transition-colors group"
        >
          <div className="flex items-center gap-4">
            <div className="p-2 bg-zinc-800 group-hover:bg-zinc-700 rounded-xl transition-colors">
              <User className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-white">Quem sou eu?</span>
          </div>
        </motion.button>

        <motion.a
          href="https://www.vxvirtual.com.br"
          target="_blank"
          rel="noopener noreferrer"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-between w-full p-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-2xl transition-colors group"
        >
          <div className="flex items-center gap-4">
            <div className="p-2 bg-zinc-800 group-hover:bg-zinc-700 rounded-xl transition-colors overflow-hidden flex items-center justify-center">
              <img src="https://i.ibb.co/dwF2gW5k/1.jpg" alt="VX Avatar" className="w-5 h-5 object-cover rounded-sm" />
            </div>
            <span className="font-semibold text-white">VX Avatar</span>
          </div>
        </motion.a>

        <motion.a
          href="https://www.vxleads.com.br"
          target="_blank"
          rel="noopener noreferrer"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-between w-full p-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-2xl transition-colors group"
        >
          <div className="flex items-center gap-4">
            <div className="p-2 bg-zinc-800 group-hover:bg-zinc-700 rounded-xl transition-colors overflow-hidden flex items-center justify-center">
              <img src="https://i.ibb.co/Z1H2NT7y/2.jpg" alt="VX Leads" className="w-5 h-5 object-cover rounded-sm" />
            </div>
            <span className="font-semibold text-white">VX Leads</span>
          </div>
        </motion.a>

        {/* Highlighted Checklist Button */}
        <motion.button
          variants={itemVariants}
          onClick={() => setView('form')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          animate={{
            boxShadow: [
              '0 0 0 0 rgba(234, 179, 8, 0)',
              '0 0 0 10px rgba(234, 179, 8, 0.1)',
              '0 0 0 0 rgba(234, 179, 8, 0)',
            ],
          }}
          transition={{
            boxShadow: {
              duration: 2,
              repeat: Infinity,
            },
          }}
          className="relative flex flex-col w-full mt-4 p-[2px] rounded-2xl overflow-hidden group"
        >
          {/* Animated gradient border background */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 opacity-80" />
          
          <div className="relative flex flex-col items-start w-full bg-zinc-950 p-5 rounded-[14px] z-10 transition-colors group-hover:bg-zinc-900/90">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-1.5 bg-amber-500/20 text-amber-500 rounded-lg">
                <Download className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-left text-lg leading-tight">
                Checklist do Vendedor no Estande
              </h3>
            </div>
            <p className="text-sm text-zinc-400 text-left font-medium leading-relaxed mb-4">
              10 dicas para sua equipe de vendas não perder leads qualificados.
            </p>
            
            <div className="w-full relative mt-auto">
              <motion.div 
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-full bg-amber-500 text-black font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(245,158,11,0.5)]"
              >
                <Download className="w-4 h-4" />
                Clique aqui para baixar
              </motion.div>
            </div>
          </div>
        </motion.button>
      </div>
      </div>
    </motion.div>
  );
}
