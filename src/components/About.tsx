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
              Foi por isso que mudei minha abordagem e passei a desenvolver soluções focadas em resolver exatamente esses gargalos. Hoje, meu papel é ajudar expositores a maximizarem seus resultados, saindo da feira com a certeza de dever cumprido, e com motivos de sobra para comemorar com a equipe.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">
            São 3 soluções que trabalham diferentes etapas do seu funil de vendas:
          </h3>
          
          <div className="p-5 bg-zinc-900 rounded-2xl border border-zinc-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="shrink-0 overflow-hidden rounded-lg">
                <img src="https://i.ibb.co/dwF2gW5k/1.jpg" alt="VX Avatar" className="w-8 h-8 object-cover" />
              </div>
              <h4 className="text-white font-bold text-lg">O VX Avatar</h4>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Um personagem com inteligência artificial que chama a atenção e conversa em tempo real com seu público, ele pode tirar dúvidas, falar sobre questões técnicas, explicar a solução para diferentes contextos e coletar dados importantes sobre dúvidas e ajustes que podem ser feitos na abordagem de vendas.
            </p>
          </div>

          <div className="p-5 bg-zinc-900 rounded-2xl border border-zinc-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="shrink-0 overflow-hidden rounded-lg">
                <img src="https://i.ibb.co/Z1H2NT7y/2.jpg" alt="VX Leads" className="w-8 h-8 object-cover" />
              </div>
              <h4 className="text-white font-bold text-lg">O VX Leads</h4>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Uma gamificação para totem que distribui brindes por cadastro através do smartphone ou tablet do visitante e que busca organizar a distribuição de brindes e otimizar a qualificação dos leads no estande. Funciona como um jogo, onde o usuário precisa assistir um pitch curto da empresa, responder algumas perguntas curtas de qualificação e girar a roleta ou participar de um jogo curto com um pequeno desafio, assim ele pode ganhar os brindes. Os cadastros feitos podem ser enviados diretamente para o CRM da empresa para que o time de SDR ou vendas entre em contato o quanto antes, essa abordagem ajuda a reduzir em até 85% o risco de perda do lead.
            </p>
          </div>

          <div className="p-5 bg-zinc-900 rounded-2xl border border-zinc-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="shrink-0 overflow-hidden rounded-lg">
                <img src="https://i.ibb.co/RkkMZg7R/3.jpg" alt="VX Sales" className="w-8 h-8 object-cover" />
              </div>
              <h4 className="text-white font-bold text-lg">VX Sales</h4>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Uma solução de transição para o fundo do funil de vendas, ela faz a primeira abordagem aos leads pós evento através do Whatsapp de forma humanizada, faz uma breve triagem usando gatilhos de venda e direciona para um vendedor do time, aumentando a capacidade de atendimento simultâneo e entregando um lead mais aquecido para facilitar a conversão.
            </p>
          </div>
        </div>

        <div className="pt-2 pb-6">
          <p className="text-center text-zinc-300 font-medium mb-4">
            Quer saber como melhorar as vendas no seu estande? Acompanha meu Instagram:
          </p>
          <a
            href="https://www.instagram.com/paranhos.vx"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 rounded-xl transition-all active:scale-[0.98]"
          >
            <Instagram className="w-5 h-5" />
            Clique aqui e me siga
          </a>
        </div>
      </div>
    </motion.div>
  );
}
