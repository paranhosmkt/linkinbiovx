import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Instagram,
  ChevronDown,
  Bot,
  Gamepad2,
  Send,
  Sparkles,
  BarChart3,
  Users,
  Database,
  ShieldCheck,
  Flame,
  Zap,
  CheckCircle2,
  Clock,
  ExternalLink,
  Glasses,
  Layers,
  GraduationCap,
  Trophy,
} from 'lucide-react';
import { ViewState } from '../types';
import WaitlistForm from './WaitlistForm';
import { VxAvatarIcon, VxLeadsIcon, VxSalesIcon, VxVirtualIcon } from './VxIcons';

interface AboutProps {
  setView: (view: ViewState) => void;
}

interface SolutionPoint {
  title: string;
  desc: string;
  icon: typeof Bot;
  badge?: string;
}

interface Solution {
  id: string;
  name: string;
  badge: string;
  color: string;
  accentBg: string;
  borderColor: string;
  image: string;
  tagline: string;
  description: string;
  mainIcon: typeof Bot;
  highlights: SolutionPoint[];
}

const solutions: Solution[] = [
  {
    id: 'avatar',
    name: 'O VX Avatar',
    badge: 'Inteligência Artificial',
    color: 'from-amber-500 to-orange-500',
    accentBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    borderColor: 'border-amber-500/30',
    image: 'https://i.ibb.co/dwF2gW5k/1.jpg',
    mainIcon: Bot,
    tagline: 'A atração do seu estande impulsionada por Inteligência Artificial em tempo real.',
    description: 'Um personagem com IA interativa que chama a atenção do público no corredor e conduz conversas personalizadas e naturais com os visitantes.',
    highlights: [
      {
        title: 'Interação Humanizada & Atração',
        desc: 'Tira dúvidas técnicas, apresenta soluções para diferentes contextos e retém a atenção de quem passa pelo corredor.',
        icon: Sparkles,
        badge: 'Ao Vivo',
      },
      {
        title: 'Inteligência de Mercado & Dados',
        desc: 'Mapeia as dores e dúvidas mais frequentes dos visitantes, entregando relatórios táticos para afiar o discurso dos seus vendedores.',
        icon: BarChart3,
        badge: 'Insights',
      },
    ],
  },
  {
    id: 'leads',
    name: 'O VX Leads',
    badge: 'Em breve • 15/09',
    color: 'from-blue-500 to-cyan-500',
    accentBg: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    borderColor: 'border-blue-500/30',
    image: 'https://i.ibb.co/Z1H2NT7y/2.jpg',
    mainIcon: Gamepad2,
    tagline: 'Gamificação inteligente para capturar, qualificar e organizar leads em totens.',
    description: 'Transforme a distribuição de brindes em um ativo comercial de alto impacto. O visitante joga, se diverte e a sua empresa recebe cadastros qualificados.',
    highlights: [
      {
        title: 'Produto em Desenvolvimento',
        desc: 'Previsão para entrar em operação no dia 15 de setembro.',
        icon: Clock,
        badge: '15/09',
      },
      {
        title: 'Engajamento & Qualificação Interativa',
        desc: 'O usuário assiste a um mini pitch da sua solução, responde perguntas rápidas de perfil e concorre a prêmios em roletas ou quizzes dinâmicos.',
        icon: Users,
        badge: 'Interativo',
      },
      {
        title: 'Integração Imediata com CRM',
        desc: 'Dados estruturados sincronizados em tempo real para o time de pré-vendas (SDRs) agir com máxima velocidade.',
        icon: Database,
        badge: 'Real-time',
      },
      {
        title: 'Zero Desperdício de Oportunidades',
        desc: 'Reduz em até 85% o risco de perda de contatos no estande por falta de braço ou anotações manuais.',
        icon: ShieldCheck,
        badge: '-85% perdas',
      },
    ],
  },
  {
    id: 'sales',
    name: 'O VX Sales',
    badge: 'Em breve • 15/10',
    color: 'from-emerald-500 to-green-500',
    accentBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    borderColor: 'border-emerald-500/30',
    image: 'https://i.ibb.co/RkkMZg7R/3.jpg',
    mainIcon: Send,
    tagline: 'Acelere o fundo do funil com abordagem humanizada pós-evento via WhatsApp.',
    description: 'A ponte definitiva entre a conversa no estande e o fechamento do contrato, garantindo velocidade imediata no pós-evento.',
    highlights: [
      {
        title: 'Produto em Desenvolvimento',
        desc: 'Previsão para entrar em operação no dia 15 de outubro.',
        icon: Clock,
        badge: '15/10',
      },
      {
        title: 'Triagem Ágil via WhatsApp',
        desc: 'Primeiro contato caloroso e contextualizado com gatilhos de vendas para reaquecer a lembrança da feira.',
        icon: Zap,
        badge: 'Rápido',
      },
      {
        title: 'Escala Comercial Instantânea',
        desc: 'Atenda centenas de visitantes simultaneamente sem sobrecarregar sua equipe interna.',
        icon: Users,
        badge: 'Escala',
      },
      {
        title: 'Repasse Aquecido para Fechamento',
        desc: 'Filtra o real momento de compra e entrega a oportunidade pronta para o closer assinar o contrato.',
        icon: Flame,
        badge: 'Alta Conversão',
      },
    ],
  },
  {
    id: 'virtual',
    name: 'O VX Virtual',
    badge: 'Realidade Virtual',
    color: 'from-purple-500 to-indigo-500',
    accentBg: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
    borderColor: 'border-purple-500/30',
    image: 'https://i.ibb.co/dwF2gW5k/1.jpg',
    mainIcon: Glasses,
    tagline: 'Realidade virtual para criar experiências únicas e personalizadas para treinamentos e apresentação de produtos.',
    description: 'Ambientes imersivos em realidade virtual com trilhas de aprendizado estruturadas e gamificação para revolucionar a capacitação de equipes e apresentação de produtos em escala real.',
    highlights: [
      {
        title: 'Treinamentos Imersivos & Simulações',
        desc: 'Simule procedimentos operacionais, manutenções e protocolos de segurança em ambientes virtuais ultrarrealistas sem riscos operacionais.',
        icon: GraduationCap,
        badge: 'Capacitação 3D',
      },
      {
        title: 'Apresentação de Produtos em Escala Real',
        desc: 'Exiba maquinários pesados, protótipos complexos e lançamentos em estandes e reuniões sem necessidade de transporte físico.',
        icon: Layers,
        badge: 'Showroom Virtual',
      },
      {
        title: 'Trilhas de Aprendizado & Gamificação',
        desc: 'Jornadas pedagógicas estruturadas passo a passo com pontuação, desafios práticos e feedbacks imediatos que multiplicam a retenção.',
        icon: Trophy,
        badge: 'Gamificado',
      },
      {
        title: 'Métricas & Análise de Desempenho',
        desc: 'Mapeamento preciso de decisões, tempo de execução e relatórios detalhados para mensurar a evolução e o ROI das equipes.',
        icon: BarChart3,
        badge: 'Analytics',
      },
    ],
  },
];

export default function About({ setView }: AboutProps) {
  const [expandedId, setExpandedId] = useState<string | null>('avatar');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleSolution = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="w-full max-w-3xl mx-auto min-h-screen bg-[#0e0e0e] pb-14"
    >
      {/* Top Banner / Background Image */}
      <div className="relative w-full h-[520px] sm:h-[620px] overflow-hidden bg-[#0e0e0e]">
        {!isLoaded && (
          <div className="absolute inset-0 bg-[#0e0e0e] animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-zinc-700 border-t-amber-500 animate-spin" />
          </div>
        )}
        <img
          src="https://i.ibb.co/dw6sPmpP/Guilhermep01.jpg"
          alt="Guilherme R. Paranhos"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          referrerPolicy="no-referrer"
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover object-top transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        
        {/* Soft Vignette and seamless bottom gradient blending to #0e0e0e */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#0e0e0e]" />
        <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/90 to-transparent pointer-events-none" />
        
        {/* Back Button */}
        <button
          onClick={() => setView('home')}
          className="absolute top-5 left-4 flex items-center justify-center w-10 h-10 rounded-full bg-[#0e0e0e]/80 backdrop-blur-md border border-white/15 hover:bg-zinc-800 transition-colors z-20 cursor-pointer shadow-lg active:scale-95"
          aria-label="Voltar para início"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Content positioned overlaying the bottom fade */}
      <div className="relative z-10 space-y-8 w-full px-5 sm:px-8 -mt-28 sm:-mt-36">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3 drop-shadow-lg">
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

        {/* VX Solutions Section */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Ecossistema de Soluções VX
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
                Projetado para acelerar cada fase da feira
              </p>
            </div>
            <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-medium bg-zinc-900/90 px-2.5 py-1 rounded-full border border-white/5">
              Interativo
            </span>
          </div>
          
          <div className="space-y-3.5">
            {solutions.map((sol) => {
              const isExpanded = expandedId === sol.id;
              const MainIcon = sol.mainIcon;

              return (
                <motion.div
                  key={sol.id}
                  layout
                  transition={{ layout: { duration: 0.3, type: 'spring', stiffness: 350, damping: 30 } }}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isExpanded
                      ? 'bg-zinc-900/90 border-zinc-700/90 shadow-2xl shadow-black/70 backdrop-blur-xl'
                      : 'bg-zinc-900/50 border-white/[0.08] hover:bg-zinc-900/80 hover:border-white/20 backdrop-blur-xl'
                  }`}
                >
                  <button
                    onClick={() => toggleSolution(sol.id)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between gap-3 text-left focus:outline-none transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      {sol.id === 'avatar' && <VxAvatarIcon size="md" />}
                      {sol.id === 'leads' && <VxLeadsIcon size="md" />}
                      {sol.id === 'sales' && <VxSalesIcon size="md" />}
                      {sol.id === 'virtual' && <VxVirtualIcon size="md" />}

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-white font-bold text-base sm:text-lg leading-tight truncate">
                            {sol.name}
                          </h4>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${sol.accentBg}`}>
                            {sol.badge}
                          </span>
                        </div>
                        {!isExpanded && (
                          <p className="text-xs sm:text-sm text-zinc-400 truncate mt-1 max-w-[220px] sm:max-w-md">
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
                        className={`p-2 rounded-xl border transition-colors ${
                          isExpanded
                            ? 'bg-zinc-800 text-white border-zinc-700'
                            : 'bg-zinc-800/60 text-zinc-400 border-white/5'
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
                        <div className="px-4 sm:px-5 pb-5 pt-2 border-t border-zinc-800/80 space-y-4">
                          {/* Tagline and Brief */}
                          <div className="space-y-1.5 pt-1">
                            <p className="font-semibold text-white text-[15px] leading-snug">
                              {sol.tagline}
                            </p>
                            <p className="text-sm text-zinc-400 leading-relaxed">
                              {sol.description}
                            </p>
                          </div>

                          {/* Subdivided Topic Cards */}
                          <div className="grid grid-cols-1 gap-2.5 pt-1">
                            {sol.highlights.map((point, index) => {
                              const PointIcon = point.icon;
                              return (
                                <div
                                  key={index}
                                  className="flex items-start gap-3 p-3 sm:p-3.5 rounded-xl bg-zinc-950/60 border border-white/[0.06] hover:border-white/10 transition-colors"
                                >
                                  <div className={`shrink-0 p-2 rounded-lg ${sol.accentBg} mt-0.5`}>
                                    <PointIcon className="w-4 h-4" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2 mb-1">
                                      <h5 className="text-sm font-semibold text-zinc-200">
                                        {point.title}
                                      </h5>
                                      {point.badge && (
                                        <span className="text-[10px] font-medium text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-white/5 shrink-0">
                                          {point.badge}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-xs sm:text-[13px] text-zinc-400 leading-relaxed">
                                      {point.desc}
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          {/* Link do site oficial */}
                          {sol.id === 'avatar' && (
                            <div className="pt-2">
                              <a
                                href="https://www.vxvirtual.com.br"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-semibold text-sm bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
                              >
                                <span>Acessar www.vxvirtual.com.br</span>
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </div>
                          )}

                          {sol.id === 'leads' && (
                            <div className="pt-2 space-y-3">
                              <a
                                href="https://www.vxleads.com.br"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-semibold text-sm bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-lg shadow-blue-500/20 transition-all cursor-pointer"
                              >
                                <span>Acessar www.vxleads.com.br</span>
                                <ExternalLink className="w-4 h-4" />
                              </a>
                              <WaitlistForm
                                productName="VX Leads"
                                productKey="vx-leads"
                                betaDate="01 de agosto"
                                accentColor="blue"
                              />
                            </div>
                          )}

                          {sol.id === 'sales' && (
                            <div className="pt-2">
                              <WaitlistForm
                                productName="VX Sales"
                                productKey="vx-sales"
                                betaDate="15 de outubro"
                                accentColor="emerald"
                              />
                            </div>
                          )}

                          {sol.id === 'virtual' && (
                            <div className="pt-2">
                              <button
                                onClick={() => setView('vx-virtual')}
                                className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-semibold text-sm bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-500/20 transition-all cursor-pointer"
                              >
                                <span>Ver detalhes do VX Virtual</span>
                              </button>
                            </div>
                          )}
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

