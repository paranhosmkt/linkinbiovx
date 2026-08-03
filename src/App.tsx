import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import Home from './components/Home';
import About from './components/About';
import LeadForm from './components/LeadForm';
import { ViewState } from './types';

export default function App() {
  const [view, setView] = useState<ViewState>('home');

  return (
    <div className="min-h-screen bg-black text-white selection:bg-zinc-800 font-sans overflow-x-hidden relative">
      <AnimatePresence mode="wait">
        {view === 'home' && <Home key="home" setView={setView} />}
        {view === 'about' && <About key="about" setView={setView} />}
        {view === 'form' && <LeadForm key="form" setView={setView} />}
      </AnimatePresence>
    </div>
  );
}
