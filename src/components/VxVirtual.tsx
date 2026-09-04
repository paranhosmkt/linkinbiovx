import { motion } from 'motion/react';
import { ArrowLeft, Glasses, Layers, GraduationCap, Trophy, BarChart3, MessageCircle, ExternalLink } from 'lucide-react';
import { ViewState } from '../types';
import { VxVirtualIcon } from './VxIcons';

interface VxVirtualProps {
  setView: (view: ViewState) => void;
}

export default function VxVirtual({ setView }: VxVirtualProps) {
  const highlights = [
    {
      icon: GraduationCap,
      title: 'Treinamentos Imersivos & Simulações',
      desc: 'Simule procedimentos operacionais, manutenções e protocolos de segurança em ambientes virtuais ultrarrealistas, sem riscos e com prática ilimitada.',
      badge: 'Capacitação 3D',
    },
    {
      icon: Layers,
      title: 'Apresentação de Produtos em Escala Real',
      desc: 'Apresente maquinários complexos, lançamentos imobiliários e produtos em grande escala em feiras e estandes, sem a necessidade de transporte físico.',
      badge: 'Showroom Virtual',
    },
    {
      icon: Trophy,
      title: 'Trilhas de Aprendizado & Gamificação',
      desc: 'Jornadas pedagógicas estruturadas passo a passo com pontuação, desafios práticos e feedbacks imediatos que multiplicam o engajamento e a retenção.',
      badge: 'Gamificado',
    },
    {
      icon: BarChart3,
      title: 'Métricas & Análise de Desempenho',
      desc: 'Mapeamento preciso de decisões, tempo de execução, taxas de erro e acerto para mensurar o ROI de capacitação e a evolução de cada equipe.',
      badge: 'Analytics',
    },
  ];

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
            <VxVirtualIcon size="lg" />
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-1.5">
                <Glasses className="w-3.5 h-3.5" />
                Realidade Virtual & Imersão
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-white">
                O VX Virtual
              </h2>
            </div>
          </div>
          
          <div className="text-zinc-300 leading-relaxed space-y-4 mb-8 text-[15px] sm:text-base">
            <p className="font-bold text-white text-lg sm:text-xl leading-snug">
              Realidade virtual para criar experiências únicas e personalizadas para treinamentos e apresentação de produtos com trilhas de aprendizado e gamificação.
            </p>
            <p className="text-zinc-400">
              Transforme a maneira como sua empresa capacita equipes e encanta clientes em feiras e eventos corporativos com tecnologias imersivas de ponta a ponta.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 mt-6 border-t border-white/10">
              {highlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-2xl bg-zinc-950/60 border border-white/10 hover:border-purple-500/30 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-300 border border-purple-500/20">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                          {item.badge}
                        </span>
                      </div>
                      <h4 className="font-bold text-white text-base mb-1.5">{item.title}</h4>
                      <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Links e Contato Direto */}
          <div className="space-y-4 pt-2">
            <div className="p-5 sm:p-6 bg-gradient-to-br from-purple-950/40 via-zinc-950 to-zinc-950 rounded-2xl border border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div>
                <h4 className="text-white font-bold text-base mb-1">Quer um projeto personalizado em Realidade Virtual?</h4>
                <p className="text-xs sm:text-sm text-zinc-400">Fale diretamente comigo para desenhar uma experiência sob medida para seu estande ou treinamento.</p>
              </div>
              <a
                href="https://wa.me/5511999999999?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20o%20VX%20Virtual%20para%20minha%20empresa"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Falar no WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
