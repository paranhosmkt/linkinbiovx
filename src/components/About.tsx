import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Instagram, ChevronDown } from 'lucide-react';
import { ViewState } from '../types';

interface AboutProps {
  setView: (view: ViewState) => void;
}

interface Solution {
  id: string;
  name: string;
  image: string;
  tagline: string;
  description: string;
  points: { label: string; text: string }[];
}

const solutions: Solution[] = [
  {
    id: 'avatar',
    name: 'O VX Avatar',
    image: 'https://i.ibb.co/dwF2gW5k/1.jpg',
    tagline: 'A atração do seu estande impulsionada por Inteligência Artificial em tempo real.',
    description: 'Um personagem com IA interativa que chama a atenção do público do evento e conversa em tempo real com os visitantes.',
    points: [
      {
        label: 'Interação Humanizada',
        text: 'Tira dúvidas técnicas, apresenta soluções para diferentes contextos de negócio e prende a atenção de quem passa pelo corredor.',
      },
      {
        label: 'Inteligência de Mercado',
        text: 'Coleta dados estratégicos sobre as principais dúvidas dos visitantes, entregando insights para ajustar e afiar a abordagem da sua equipe de vendas.',
      },
    ],
  },
  {
    id: 'leads',
    name: 'O VX Leads',
    image: 'https://i.ibb.co/Z1H2NT7y/2.jpg',
    tagline: 'Gamificação inteligente para capturar, qualificar e organizar leads em totens.',
    description: 'Transforme a distribuição de brindes em um ativo comercial. O visitante joga, se engaja e a sua empresa captura dados altamente qualificados.',
    points: [
      {
        label: 'Engajamento Interativo',
        text: 'O usuário assiste a um pitch curto da sua solução, responde a perguntas rápidas de qualificação e ganha brindes em jogos dinâmicos ou roletas.',
      },
      {
        label: 'Integração Imediata',
        text: 'Os dados vão direto para o CRM da sua empresa para que o time de SDRs/Vendas atue rápido.',
      },
      {
        label: 'Zero Desperdício',
        text: 'Reduz em até 85% o risco de perda de leads no estande.',
      },
    ],
  },
  {
    id: 'sales',
    name: 'O VX Sales',
    image: 'https://i.ibb.co/RkkMZg7R/3.jpg',
    tagline: 'Acelere o fundo do funil com abordagem humanizada pós-evento via WhatsApp.',
    description: 'A ponte perfeita entre o contato do estande e o fechamento do contrato, garantindo velocidade no momento mais crítico da feira.',
    points: [
      {
        label: 'Triagem Inteligente',
        text: 'Realiza o primeiro contato de forma humanizada e ágil via WhatsApp, utilizando gatilhos mentais de vendas.',
      },
      {
        label: 'Escala Comercial',
        text: 'Multiplica a capacidade de atendimento simultâneo do seu time.',
      },
      {
        label: 'Repasse Aquecido',
        text: 'Filtra o nível de interesse e entrega o lead pronto para o vendedor fechar o negócio.',
      },
    ],
  },
];

export default function About({ setView }: AboutProps) {
  const [expandedId, setExpandedId] = useState<string | null>('avatar');

  const toggleSolution = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="w-full max-w-4xl mx-auto min-h-screen bg-transparent pb-12"
    >
      <div className="relative w-full h-[512px] sm:h-[640px] mb-6">
        <img
          src="https://i.ibb.co/dw6sPmpP/Guilhermep01.jpg"
          alt="Guilherme"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#09090b] pointer-events-none" />
        
        <button
          onClick={() => setView('home')}
          className="absolute top-6 left-4 flex items-center justify-center w-10 h-10 rounded-full bg-zinc-900/70 backdrop-blur-md border border-white/10 hover:bg-zinc-800 transition-colors z-10 cursor-pointer shadow-lg"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
      </div>

      <div className="space-y-8 w-full px-5 sm:px-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-4">
            Quem sou eu?
          </h2>
          <div className="text-zinc-300 leading-relaxed space-y-4 text-[15px]">
            <p>
              Opa, tudo bem? Fico feliz que chegou por aqui!
            </p>
            <p>
              Participo de eventos B2B há mais de 10 anos, como visitante e expositor, e conheço muito bem a dúvida sobre o retorno do investimento, a dificuldade de se destacar no estande e a frustração de fechar 3 ou 4 dias de feira sem conseguir converter aqueles contatos que pareciam super qualificados.
            </p>
            <p>
              Eu senti isso na pele.
            </p>
            <p>
              Foi por isso que mudei minha abordagem e passei a desenvolver soluções focadas em resolver exatamente esses gargalos. Hoje, meu papel é ajudar expositores a maximizarem seus resultados, saindo da feira com a certeza de dever cumprido e com motivos de sobra para comemorar com a equipe.
            </p>
            <p>
              Para isso, crio conteúdos, materiais práticos e desenvolvi o ecossistema VX, soluções inteligentes desenhadas para otimizar cada etapa do seu funil de vendas.
            </p>
            <p>
              Te convido a me seguir no Instagram para acompanhar estratégias diárias e conhecer mais sobre esse projeto:
            </p>
            
            <div className="pt-1 pb-2">
              <a
                href="https://www.instagram.com/paranhos.vx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all hover:scale-105 active:scale-95 shadow-md shadow-purple-900/30"
              >
                <Instagram className="w-4 h-4" />
                Clique aqui e me siga
              </a>
            </div>

            <p>
              Conte comigo!
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">
              As soluções da plataforma VX são:
            </h3>
            <span className="text-xs text-zinc-400 font-medium">
              Clique para expandir
            </span>
          </div>
          
          <div className="space-y-3">
            {solutions.map((sol) => {
              const isExpanded = expandedId === sol.id;
              return (
                <motion.div
                  key={sol.id}
                  layout
                  transition={{ layout: { duration: 0.3, type: 'spring', stiffness: 350, damping: 30 } }}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isExpanded
                      ? 'bg-zinc-900/80 border-zinc-700/90 shadow-xl shadow-black/50 backdrop-blur-xl'
                      : 'bg-zinc-900/40 border-white/[0.08] hover:bg-zinc-900/70 hover:border-white/20 backdrop-blur-xl'
                  }`}
                >
                  <button
                    onClick={() => toggleSolution(sol.id)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between gap-3 text-left focus:outline-none transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="shrink-0 overflow-hidden rounded-xl border border-zinc-800 w-10 h-10 flex items-center justify-center bg-zinc-950">
                        <img
                          src={sol.image}
                          alt={sol.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-white font-bold text-base sm:text-lg leading-tight">
                          {sol.name}
                        </h4>
                        {!isExpanded && (
                          <p className="text-xs sm:text-sm text-zinc-400 truncate mt-0.5 max-w-[240px] sm:max-w-md">
                            {sol.tagline}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      <span className="hidden sm:inline-block text-xs font-medium text-zinc-400">
                        {isExpanded ? 'Recolher' : 'Ver detalhes'}
                      </span>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className={`p-1.5 rounded-lg ${
                          isExpanded ? 'bg-zinc-800 text-white' : 'bg-zinc-800/50 text-zinc-400'
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        key="content"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-zinc-800/80 text-sm text-zinc-400 leading-relaxed space-y-3.5">
                          <p className="font-semibold text-white pt-2 text-[15px]">
                            {sol.tagline}
                          </p>
                          <p>
                            {sol.description}
                          </p>
                          <div className="space-y-2.5 pt-1">
                            {sol.points.map((point, index) => (
                              <p key={index}>
                                <span className="font-semibold text-zinc-200">
                                  {point.label}:{' '}
                                </span>
                                {point.text}
                              </p>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="pb-8"></div>
      </div>
    </motion.div>
  );
}
