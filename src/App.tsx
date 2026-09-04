import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import Home from './components/Home';
import About from './components/About';
import VxSales from './components/VxSales';
import VxLeads from './components/VxLeads';
import VxVirtual from './components/VxVirtual';
import BackgroundEffects from './components/BackgroundEffects';
import { ViewState } from './types';

export default function App() {
  const [view, setView] = useState<ViewState>('home');

  useEffect(() => {
    // Always scroll window to absolute top when switching views
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [view]);

  useEffect(() => {
    // Background prefetch for instant loading when clicking "Quem sou eu"
    const img = new Image();
    img.src = 'https://i.ibb.co/dw6sPmpP/Guilhermep01.jpg';
  }, []);

  return (
    <div className="min-h-screen bg-[#09090b] text-white selection:bg-amber-500/30 selection:text-amber-200 font-sans overflow-x-hidden relative">
      <BackgroundEffects />
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {view === 'home' && <Home key="home" setView={setView} />}
          {view === 'about' && <About key="about" setView={setView} />}
          {view === 'vx-leads' && <VxLeads key="vx-leads" setView={setView} />}
          {view === 'vx-sales' && <VxSales key="vx-sales" setView={setView} />}
          {view === 'vx-virtual' && <VxVirtual key="vx-virtual" setView={setView} />}
        </AnimatePresence>
      </div>
    </div>
  );
}
