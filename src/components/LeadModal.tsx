import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, Mail, User, ArrowRight, ExternalLink, Loader2, Sparkles, ShieldCheck, WifiOff, Briefcase, ChevronDown } from 'lucide-react';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CHECKLIST_APP_URL = 'https://checklistvendedor.vercel.app';

const MARKET_OPTIONS = [
  'Tecnologia, Software & TI',
  'Indústria, Máquinas & Automação',
  'Construção Civil & Arquitetura',
  'Saúde, Medicina & Farmacêutica',
  'Agronegócio, Alimentos & Bebidas',
  'Comércio, Varejo & Franquias',
  'Logística, Transporte & Comex',
  'Energia, Solar & Sustentabilidade',
  'Educação, Treinamentos & Consultoria',
  'Serviços B2B & Financeiro',
  'Eventos, Marketing & Comunicação',
  'Outro segmento',
];

export default function LeadModal({ isOpen, onClose }: LeadModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [sector, setSector] = useState('');
  const [customSector, setCustomSector] = useState('');
  const [optIn, setOptIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [accessUrl, setAccessUrl] = useState(CHECKLIST_APP_URL);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const finalSector = sector === 'Outro segmento' && customSector.trim() ? customSector.trim() : sector;

    if (!trimmedName) {
      setError('Por favor, informe seu nome.');
      return;
    }

    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError('Por favor, informe um e-mail válido.');
      return;
    }

    if (!sector) {
      setError('Por favor, selecione seu mercado de atuação.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          sector: finalSector,
          optIn,
          source: 'checklist_vendedor',
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao processar o formulário. Tente novamente.');
      }

      if (data.accessUrl || data.downloadUrl) {
        setAccessUrl(data.accessUrl || data.downloadUrl);
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error('Lead submission error:', err);
      setError(err.message || 'Ocorreu um erro ao enviar seus dados. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setSector('');
    setCustomSector('');
    setError(null);
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleReset}
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-zinc-950 border border-zinc-800/80 rounded-3xl p-6 sm:p-7 shadow-2xl shadow-amber-500/10 z-10 overflow-hidden"
          >
            {/* Ambient amber glow behind */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

            {/* Close button */}
            <button
              onClick={handleReset}
              className="absolute top-5 right-5 p-2 text-zinc-400 hover:text-white bg-zinc-900/60 hover:bg-zinc-800 rounded-full transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-4 h-4" />
            </button>

            {!submitted ? (
              <div>
                {/* Header */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <Sparkles className="w-3 h-3" />
                    App Gratuito
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
                  App Checklist do Vendedor
                </h2>

                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-4">
                  Preencha seus dados abaixo para liberar o acesso imediato ao aplicativo web e receber o link direto no seu e-mail.
                </p>

                {/* Offline & Local Privacy notice */}
                <div className="p-3 bg-zinc-900/80 border border-white/10 rounded-xl mb-5 flex items-start gap-2.5">
                  <WifiOff className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-zinc-300 leading-snug">
                    <strong className="text-white">100% Offline & Seguro:</strong> O app funciona mesmo sem internet no pavilhão e todas as anotações ficam gravadas <u>exclusivamente no seu dispositivo</u>.
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                      Nome completo
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Seu nome ou como prefere ser chamado"
                        className="w-full pl-10 pr-4 py-3 bg-zinc-900/90 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                      Seu melhor e-mail *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="exemplo@empresa.com.br"
                        className="w-full pl-10 pr-4 py-3 bg-zinc-900/90 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Market / Sector Dropdown */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                      Mercado de atuação da sua empresa *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <select
                        required
                        value={sector}
                        onChange={(e) => setSector(e.target.value)}
                        className="w-full pl-10 pr-10 py-3 bg-zinc-900/90 border border-zinc-800 rounded-xl text-white text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all appearance-none cursor-pointer"
                      >
                        <option value="" disabled className="bg-zinc-950 text-zinc-500">
                          Selecione o segmento / mercado...
                        </option>
                        {MARKET_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="bg-zinc-950 text-zinc-200">
                            {opt}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-zinc-500">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>

                    {sector === 'Outro segmento' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-2"
                      >
                        <input
                          type="text"
                          value={customSector}
                          onChange={(e) => setCustomSector(e.target.value)}
                          placeholder="Especifique qual o seu segmento..."
                          className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-amber-500 transition-all"
                        />
                      </motion.div>
                    )}
                  </div>

                  {/* Opt-in Checkbox */}
                  <label className="flex items-start gap-2.5 pt-1 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={optIn}
                      onChange={(e) => setOptIn(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-amber-500 focus:ring-amber-500 focus:ring-offset-0 focus:ring-1 accent-amber-500 cursor-pointer"
                    />
                    <span className="text-[12px] text-zinc-400 leading-snug">
                      Concordo em receber conteúdos e novidades sobre estratégias de vendas em feiras e eventos.
                    </span>
                  </label>

                  {/* Error Alert */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs leading-relaxed"
                    >
                      {error}
                    </motion.div>
                  )}

                  {/* Submit CTA */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="relative overflow-hidden w-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-sm sm:text-base py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.45)] active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-black" />
                          <span>Liberando acesso...</span>
                        </>
                      ) : (
                        <>
                          <span>Acessar App Agora</span>
                          <ArrowRight className="w-4 h-4 text-black" />
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-500 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Seus dados estão 100% seguros. Não enviamos spam.</span>
                  </div>
                </form>
              </div>
            ) : (
              /* Success State */
              <div className="text-center py-4">
                <div className="w-14 h-14 bg-amber-500/15 border border-amber-500/30 text-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/10">
                  <CheckCircle className="w-7 h-7" />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  Acesso Liberado!
                </h3>

                <p className="text-zinc-300 text-sm leading-relaxed mb-3">
                  Pronto, <span className="font-semibold text-amber-400">{name}</span>!
                </p>

                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-xs mx-auto mb-4">
                  Seu acesso ao aplicativo web já está disponível. Enviamos também o link direto para <strong className="text-zinc-300">{email}</strong>.
                </p>

                <div className="p-2.5 bg-zinc-900 border border-white/10 rounded-xl mb-5 text-[11px] text-zinc-400 flex items-center justify-center gap-2">
                  <WifiOff className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Funciona offline • Dados salvos apenas no seu dispositivo</span>
                </div>

                <div className="space-y-3">
                  <a
                    href={accessUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative overflow-hidden w-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-sm sm:text-base py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(245,158,11,0.35)] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <span>Acessar App Checklist</span>
                    <ExternalLink className="w-4 h-4 text-black" />
                  </a>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="w-full py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white text-xs sm:text-sm font-medium rounded-xl transition-colors cursor-pointer"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
