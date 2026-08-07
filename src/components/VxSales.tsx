import { motion } from 'motion/react';
import { ArrowLeft, Clock } from 'lucide-react';
import { ViewState } from '../types';

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
      className="w-full max-w-4xl mx-auto min-h-screen bg-black px-6 py-8 flex flex-col"
    >
      <button
        onClick={() => setView('home')}
        className="flex items-center justify-center w-10 h-10 mb-8 rounded-full bg-zinc-900 hover:bg-zinc-800 transition-colors shrink-0"
      >
        <ArrowLeft className="w-5 h-5 text-white" />
      </button>

      <div className="flex-1 flex flex-col">
        <div className="p-6 md:p-8 bg-zinc-900/50 rounded-3xl border border-zinc-800 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
            <div className="shrink-0 overflow-hidden rounded-xl border border-zinc-800 w-16 h-16 sm:w-20 sm:h-20">
              <img src="https://i.ibb.co/RkkMZg7R/3.jpg" alt="VX Sales" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white">
              O VX Sales
            </h2>
          </div>
          
          <div className="text-zinc-300 leading-relaxed space-y-4 mb-10 text-[15px] sm:text-base">
            <p className="font-bold text-white text-lg">
              Acelere o fundo do funil com abordagem humanizada pós-evento via WhatsApp.
            </p>
            <p>
              A ponte perfeita entre o contato do estande e o fechamento do contrato, garantindo velocidade no momento mais crítico da feira.
            </p>
            <div className="space-y-4 pt-6 mt-6 border-t border-zinc-800/50">
              <p><span className="font-semibold text-white">Triagem Inteligente:</span> Realiza o primeiro contato de forma humanizada e ágil via WhatsApp, utilizando gatilhos mentais de vendas.</p>
              <p><span className="font-semibold text-white">Escala Comercial:</span> Multiplica a capacidade de atendimento simultâneo do seu time.</p>
              <p><span className="font-semibold text-white">Repasse Aquecido:</span> Filtra o nível de interesse e entrega o lead pronto para o vendedor fechar o negócio.</p>
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center p-8 bg-zinc-950 rounded-2xl border border-dashed border-zinc-700 text-center">
            <div className="p-4 bg-zinc-900 rounded-full mb-4">
              <Clock className="w-8 h-8 text-zinc-400" />
            </div>
            <h3 className="text-white font-bold text-lg mb-1">Produto em desenvolvimento</h3>
            <p className="text-zinc-500">Previsão de lançamento: 15/09/2026</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
