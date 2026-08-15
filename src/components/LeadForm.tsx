import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, CheckCircle2, FileText } from 'lucide-react';
import { ViewState } from '../types';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getDb } from '../lib/firebase';

interface LeadFormProps {
  setView: (view: ViewState) => void;
}

export default function LeadForm({ setView }: LeadFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    optIn: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.optIn) return;
    
    setIsSubmitting(true);
    
    try {
      // 1. Save to Firestore directly from the client
      const db = await getDb();
      await addDoc(collection(db, 'leads'), {
        name: formData.name,
        email: formData.email,
        optIn: formData.optIn,
        createdAt: serverTimestamp()
      });

      // 2. Call our backend to send the Thank You email
      await fetch('/api/leads/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: formData.name, email: formData.email }),
      });
      
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting lead:", error);
      alert("Ocorreu um erro ao enviar seu cadastro. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="w-full max-w-md mx-auto min-h-screen bg-transparent px-6 py-8 flex flex-col justify-center"
    >
      <button
        onClick={() => setView('home')}
        className="flex items-center justify-center w-10 h-10 mb-8 rounded-full bg-zinc-900/70 hover:bg-zinc-800/80 border border-white/10 backdrop-blur-md transition-colors shrink-0 cursor-pointer shadow-lg"
      >
        <ArrowLeft className="w-5 h-5 text-white" />
      </button>

      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex-1 flex flex-col bg-zinc-900/50 backdrop-blur-xl border border-white/[0.08] p-6 sm:p-8 rounded-3xl shadow-2xl"
          >
            <div className="mb-6">
              <div className="inline-flex p-3 bg-amber-500/15 text-amber-400 border border-amber-500/30 rounded-2xl mb-4 shadow-inner">
                <FileText className="w-6 h-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
                Baixe o Checklist
              </h2>
              <p className="text-zinc-400 leading-relaxed text-sm">
                Preencha os dados abaixo para receber as <span className="text-white font-semibold">10 dicas essenciais</span> para sua equipe não perder nenhum lead qualificado.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 flex-1">
              <div>
                <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
                  Seu nome
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-zinc-950/70 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all text-sm"
                  placeholder="Ex: João Silva"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
                  Seu melhor e-mail
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-zinc-950/70 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all text-sm"
                  placeholder="joao@empresa.com.br"
                />
              </div>

              <div className="flex items-start gap-3 pt-1">
                <input
                  type="checkbox"
                  id="optIn"
                  required
                  checked={formData.optIn}
                  onChange={(e) => setFormData({ ...formData, optIn: e.target.checked })}
                  className="mt-0.5 w-4 h-4 rounded border-white/20 bg-zinc-950 text-amber-500 focus:ring-amber-500 focus:ring-offset-black cursor-pointer"
                />
                <label htmlFor="optIn" className="text-xs text-zinc-400 leading-snug cursor-pointer">
                  Concordo em receber novidades e comunicações. (Você pode cancelar a qualquer momento).
                </label>
              </div>

              <div className="pt-4">
                <motion.button
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={!formData.name || !formData.email || !formData.optIn || isSubmitting}
                  className="relative overflow-hidden w-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-black font-bold py-3.5 rounded-xl transition-all disabled:opacity-50 disabled:hover:bg-amber-500 active:scale-[0.98] flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.3)] cursor-pointer"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    "Liberar meu Download"
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-zinc-900/50 backdrop-blur-xl border border-white/[0.08] rounded-3xl shadow-2xl"
          >
            <div className="w-16 h-16 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
              Tudo Certo!
            </h2>
            <p className="text-zinc-400 leading-relaxed text-sm max-w-[280px]">
              Seu checklist do vendedor no estande foi liberado e enviado para seu e-mail. Verifique a caixa de spam.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
