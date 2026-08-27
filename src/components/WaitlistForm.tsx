import React, { useState } from 'react';
import { Mail, User, Briefcase, CheckCircle, Loader2, Sparkles, ArrowRight } from 'lucide-react';

interface WaitlistFormProps {
  productName: string;
  productKey: 'vx-leads' | 'vx-sales';
  betaDate: string;
  accentColor?: string; // 'blue' | 'emerald' | 'amber'
}

export default function WaitlistForm({
  productName,
  productKey,
  betaDate,
  accentColor = 'amber',
}: WaitlistFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [sector, setSector] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError('Por favor, preencha seu nome e e-mail.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          sector: sector.trim() || undefined,
          source: `waitlist_${productKey}`,
          productName,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Erro ao entrar na lista. Tente novamente.');
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error('Erro ao enviar:', err);
      setError(err.message || 'Ocorreu um erro ao enviar seus dados. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const getButtonBg = () => {
    if (accentColor === 'blue') {
      return 'from-blue-500 via-cyan-400 to-blue-500 text-black shadow-[0_0_25px_rgba(59,130,246,0.35)]';
    }
    if (accentColor === 'emerald') {
      return 'from-emerald-500 via-green-400 to-emerald-500 text-black shadow-[0_0_25px_rgba(16,185,129,0.35)]';
    }
    return 'from-amber-500 via-amber-400 to-amber-500 text-black shadow-[0_0_25px_rgba(245,158,11,0.35)]';
  };

  const getBadgeColor = () => {
    if (accentColor === 'blue') return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    if (accentColor === 'emerald') return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
  };

  if (submitted) {
    return (
      <div className="w-full p-6 sm:p-8 bg-zinc-950/90 backdrop-blur-xl rounded-2xl border border-emerald-500/30 text-center shadow-2xl my-4">
        <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-6 h-6" />
        </div>
        <h4 className="text-lg font-bold text-white mb-2">Você está na Lista de Espera VIP!</h4>
        <p className="text-zinc-300 text-sm max-w-md mx-auto leading-relaxed mb-3">
          Obrigado, <strong className="text-white">{name}</strong>! Salvaremos sua vaga prioritária para o lançamento Beta em <span className="font-semibold text-amber-400">{betaDate}</span>.
        </p>
        {sector && (
          <p className="text-xs text-zinc-400 mb-2">Setor cadastrado: <span className="text-zinc-200 font-medium">{sector}</span></p>
        )}
        <p className="text-zinc-500 text-xs">
          Enviamos uma confirmação para <span className="text-zinc-400">{email}</span> com os detalhes de acesso prioritário.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full p-6 sm:p-8 bg-zinc-950/90 backdrop-blur-xl rounded-2xl border border-white/15 shadow-2xl my-4 text-left">
      <div className="flex items-center gap-2 mb-2">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide uppercase border ${getBadgeColor()}`}>
          <Sparkles className="w-3 h-3" />
          Acesso Antecipado Beta
        </span>
      </div>

      <h4 className="text-lg sm:text-xl font-bold text-white mb-1.5">
        Entrar na Lista de Espera
      </h4>
      <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-5">
        Preencha seus dados para receber em primeira mão o convite de acesso para o lançamento Beta de <strong>{productName}</strong> no dia <strong>{betaDate}</strong>.
      </p>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div>
          <label className="block text-zinc-300 text-xs font-semibold uppercase tracking-wider mb-1.5 pl-1">
            Seu Nome *
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome completo"
              className="w-full pl-10 pr-4 py-2.5 bg-zinc-900/90 border border-zinc-800 focus:border-white/40 rounded-xl text-white placeholder-zinc-500 text-sm focus:outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-zinc-300 text-xs font-semibold uppercase tracking-wider mb-1.5 pl-1">
            E-mail Profissional *
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seuemail@empresa.com.br"
              className="w-full pl-10 pr-4 py-2.5 bg-zinc-900/90 border border-zinc-800 focus:border-white/40 rounded-xl text-white placeholder-zinc-500 text-sm focus:outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-zinc-300 text-xs font-semibold uppercase tracking-wider mb-1.5 pl-1">
            Setor / Segmento da sua empresa (Opcional)
          </label>
          <div className="relative">
            <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
            <input
              type="text"
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              placeholder="Ex: Tecnologia, Indústria, Saúde, Serviços..."
              className="w-full pl-10 pr-4 py-2.5 bg-zinc-900/90 border border-zinc-800 focus:border-white/40 rounded-xl text-white placeholder-zinc-500 text-sm focus:outline-none transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full mt-2 bg-gradient-to-r ${getButtonBg()} font-bold text-sm py-3.5 rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-black" />
              <span>Garantindo vaga...</span>
            </>
          ) : (
            <>
              <span>Garantir Vaga no Beta VIP</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
