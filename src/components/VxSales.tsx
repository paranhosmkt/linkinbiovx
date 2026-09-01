import { motion } from 'motion/react';
import { ArrowLeft, Clock } from 'lucide-react';
import { ViewState } from '../types';
import { VxSalesIcon } from './VxIcons';

interface VxSalesProps {
  setView: (view: ViewState) => void;
}

export default function VxSales({ setView }: VxSalesProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="w-full max-w-4xl mx-auto min-h-screen bg-transparent px-6 py-8 flex flex-col"
    >
      <button
        onClick={() => setView('home')}
        className="flex items-center justify-center w-10 h-10 mb-8 rounded-full bg-zinc-900/70 hover:bg-zinc-800/80 border border-white/10 backdrop-blur-md transition-colors shrink-0 cursor-pointer shadow-lg"
      >
        <ArrowLeft className="w-5 h-5 text-white" />
      </button>

      <div className="flex-1 flex flex-col">
        <div className="p-6 md:p-8 bg-zinc-900/50 backdrop-blur-xl rounded-3xl border border-white/[0.08] mb-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
            <VxSalesIcon size="lg" />
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-1.5">
                Em desenvolvimento
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-white">
                O VX Sales
              </h2>
            </div>
          </div>
          
          <div className="text-zinc-300 leading-relaxed space-y-4 mb-10 text-[15px] sm:text-base">
            <p className="font-bold text-white text-lg sm:text-xl leading-snug">
              Acelere o fundo do funil com abordagem humanizada pós-evento via WhatsApp.
            </p>
            <p className="text-zinc-400">
              A ponte perfeita entre o contato do estande e o fechamento do contrato, garantindo velocidade no momento mais crítico da feira.
            </p>
            <div className="space-y-3.5 pt-6 mt-6 border-t border-white/10">
              <p><span className="font-semibold text-white">Triagem Inteligente:</span> Realiza o primeiro contato de forma humanizada e ágil via WhatsApp, utilizando gatilhos mentais de vendas.</p>
              <p><span className="font-semibold text-white">Escala Comercial:</span> Multiplica a capacidade de atendimento simultâneo do seu time.</p>
              <p><span className="font-semibold text-white">Repasse Aquecido:</span> Filtra o nível de interesse e entrega o lead pronto para o vendedor fechar o negócio.</p>
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center p-8 bg-zinc-950/60 rounded-2xl border border-dashed border-white/15 text-center">
            <div className="p-3.5 bg-zinc-900/80 border border-white/10 rounded-2xl mb-4 shadow-inner">
              <Clock className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="text-white font-bold text-lg mb-1">Produto em desenvolvimento</h3>
            <p className="text-xs sm:text-sm text-zinc-400">Previsão para entrar em operação: <span className="text-white font-semibold">15 de outubro</span></p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
