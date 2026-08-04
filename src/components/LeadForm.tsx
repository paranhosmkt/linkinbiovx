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
      className="w-full max-w-md mx-auto min-h-screen bg-black px-6 py-8 flex flex-col"
    >
      <button
        onClick={() => setView('home')}
        className="flex items-center justify-center w-10 h-10 mb-8 rounded-full bg-zinc-900 hover:bg-zinc-800 transition-colors shrink-0"
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
            className="flex-1 flex flex-col"
          >
            <div className="mb-8">
              <div className="inline-flex p-3 bg-amber-500/10 text-amber-500 rounded-2xl mb-4">
                <FileText className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-white mb-3">
                Baixe o Checklist
              </h2>
              <p className="text-zinc-400 leading-relaxed text-sm">
                Preencha os dados abaixo para receber as <span className="text-white font-semibold">10 dicas essenciais</span> para sua equipe não perder nenhum lead qualificado.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 flex-1">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-1.5">
                  Seu nome
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-shadow"
                  placeholder="Ex: João Silva"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-1.5">
                  Seu melhor e-mail
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-shadow"
                  placeholder="joao@empresa.com.br"
                />
              </div>

              <div className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  id="optIn"
                  required
                  checked={formData.optIn}
                  onChange={(e) => setFormData({ ...formData, optIn: e.target.checked })}
                  className="mt-1 w-5 h-5 rounded border-zinc-700 bg-zinc-900 text-amber-500 focus:ring-amber-500 focus:ring-offset-black"
                />
                <label htmlFor="optIn" className="text-sm text-zinc-400 leading-tight">
                  Concordo em receber novidades, ofertas e comunicações. (Você pode cancelar a qualquer momento).
                </label>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={!formData.name || !formData.email || !formData.optIn || isSubmitting}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-4 rounded-xl transition-all disabled:opacity-50 disabled:hover:bg-amber-500 active:scale-[0.98] flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    "Liberar meu Download"
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col items-center justify-center text-center pb-20"
          >
            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10 text-emerald-500" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white mb-3">
              Tudo Certo!
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-8 max-w-[280px]">
              Seu checklist do vendedor no estande foi liberado e enviado para seu e-mail. Verifique a caixa de spam.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
