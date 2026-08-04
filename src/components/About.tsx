import { motion } from 'motion/react';
import { ArrowLeft, Instagram } from 'lucide-react';
import { ViewState } from '../types';

interface AboutProps {
  setView: (view: ViewState) => void;
}

export default function About({ setView }: AboutProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="w-full max-w-4xl mx-auto min-h-screen bg-black pb-8"
    >
      <div className="relative w-full h-[512px] sm:h-[640px] mb-6">
        <img
          src="https://i.ibb.co/yn15YXhc/Design-sem-nome-15.png"
          alt="Guilherme"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black pointer-events-none" />
        
        <button
          onClick={() => setView('home')}
          className="absolute top-6 left-4 flex items-center justify-center w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 hover:bg-black/70 transition-colors z-10"
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
            
            <a
              href="https://www.instagram.com/paranhos.vx"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 rounded-xl transition-all active:scale-[0.98] mt-4 mb-4"
            >
              <Instagram className="w-5 h-5" />
              Clique aqui e me siga
            </a>

            <p>
              Conte comigo!
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">
            As soluções da plataforma VX são:
          </h3>
          
          <div className="p-5 bg-zinc-900 rounded-2xl border border-zinc-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="shrink-0 overflow-hidden rounded-lg">
                <img src="https://i.ibb.co/dwF2gW5k/1.jpg" alt="VX Avatar" className="w-8 h-8 object-cover" />
              </div>
              <h4 className="text-white font-bold text-lg">O VX Avatar</h4>
            </div>
            <div className="text-sm text-zinc-400 leading-relaxed space-y-3">
              <p className="font-semibold text-white">A atração do seu estande impulsionada por Inteligência Artificial em tempo real.</p>
              <p>Um personagem com IA interativa que chama a atenção do público do evento e conversa em tempo real com os visitantes.</p>
              <p><span className="font-semibold text-zinc-300">Interação Humanizada:</span> Tira dúvidas técnicas, apresenta soluções para diferentes contextos de negócio e prende a atenção de quem passa pelo corredor.</p>
              <p><span className="font-semibold text-zinc-300">Inteligência de Mercado:</span> Coleta dados estratégicos sobre as principais dúvidas dos visitantes, entregando insights para ajustar e afiar a abordagem da sua equipe de vendas.</p>
            </div>
          </div>

          <div className="p-5 bg-zinc-900 rounded-2xl border border-zinc-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="shrink-0 overflow-hidden rounded-lg">
                <img src="https://i.ibb.co/Z1H2NT7y/2.jpg" alt="VX Leads" className="w-8 h-8 object-cover" />
              </div>
              <h4 className="text-white font-bold text-lg">O VX Leads</h4>
            </div>
            <div className="text-sm text-zinc-400 leading-relaxed space-y-3">
              <p className="font-semibold text-white">Gamificação inteligente para capturar, qualificar e organizar leads em totens.</p>
              <p>Transforme a distribuição de brindes em um ativo comercial. O visitante joga, se engaja e a sua empresa captura dados altamente qualificados.</p>
              <p><span className="font-semibold text-zinc-300">Engajamento Interativo:</span> O usuário assiste a um pitch curto da sua solução, responde a perguntas rápidas de qualificação e ganha brindes em jogos dinâmicos ou roletas.</p>
              <p><span className="font-semibold text-zinc-300">Integração Imediata:</span> Os dados vão direto para o CRM da sua empresa para que o time de SDRs/Vendas atue rápido.</p>
              <p><span className="font-semibold text-zinc-300">Zero Desperdício:</span> Reduz em até 85% o risco de perda de leads no estande.</p>
            </div>
          </div>

          <div className="p-5 bg-zinc-900 rounded-2xl border border-zinc-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="shrink-0 overflow-hidden rounded-lg">
                <img src="https://i.ibb.co/RkkMZg7R/3.jpg" alt="VX Sales" className="w-8 h-8 object-cover" />
              </div>
              <h4 className="text-white font-bold text-lg">O VX Sales</h4>
            </div>
            <div className="text-sm text-zinc-400 leading-relaxed space-y-3">
              <p className="font-semibold text-white">Acelere o fundo do funil com abordagem humanizada pós-evento via WhatsApp.</p>
              <p>A ponte perfeita entre o contato do estande e o fechamento do contrato, garantindo velocidade no momento mais crítico da feira.</p>
              <p><span className="font-semibold text-zinc-300">Triagem Inteligente:</span> Realiza o primeiro contato de forma humanizada e ágil via WhatsApp, utilizando gatilhos mentais de vendas.</p>
              <p><span className="font-semibold text-zinc-300">Escala Comercial:</span> Multiplica a capacidade de atendimento simultâneo do seu time.</p>
              <p><span className="font-semibold text-zinc-300">Repasse Aquecido:</span> Filtra o nível de interesse e entrega o lead pronto para o vendedor fechar o negócio.</p>
            </div>
          </div>
        </div>

        <div className="pb-8"></div>
      </div>
    </motion.div>
  );
}
