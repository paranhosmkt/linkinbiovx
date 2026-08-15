import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import Home from './components/Home';
import About from './components/About';
import LeadForm from './components/LeadForm';
import VxSales from './components/VxSales';
import BackgroundEffects from './components/BackgroundEffects';
import { ViewState } from './types';

export default function App() {
  const [view, setView] = useState<ViewState>('home');

  return (
    <div className="min-h-screen bg-[#09090b] text-white selection:bg-amber-500/30 selection:text-amber-200 font-sans overflow-x-hidden relative">
      <BackgroundEffects />
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {view === 'home' && <Home key="home" setView={setView} />}
          {view === 'about' && <About key="about" setView={setView} />}
          {view === 'form' && <LeadForm key="form" setView={setView} />}
          {view === 'vx-sales' && <VxSales key="vx-sales" setView={setView} />}
        </AnimatePresence>
      </div>
    </div>
  );
}
