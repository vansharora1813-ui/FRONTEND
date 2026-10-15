import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrialModal } from './components/TrialModal';
import { DemoModal } from './components/DemoModal';

export function App() {
  const [activeTab, setActiveTab] = useState('Product');
  const [isDark, setIsDark] = useState(false);
  const [trialOpen, setTrialOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);

  // Apply dark mode attribute to document
  useEffect(() => {
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-between selection:bg-[var(--accent)] selection:text-white transition-colors duration-300">
      {/* Top Neumorphic Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDark={isDark}
        toggleTheme={toggleTheme}
        onOpenTrial={() => setTrialOpen(true)}
      />

      {/* Main Focus: Hero matching reference layout with tactile elevation */}
      <div className="flex-1 flex flex-col justify-center">
        <Hero
          onOpenDemo={() => setDemoOpen(true)}
          onOpenTrial={() => setTrialOpen(true)}
        />
      </div>

      {/* Subtle Neumorphic Footer Status Bar */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--text-muted)] font-medium">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--success)] inline-block" />
          <span>Apex Design System v2.6 · Neumorphic Architecture</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Physical dual-shadow lighting</span>
          <span>•</span>
          <span>Inter Variable Typography</span>
        </div>
      </footer>

      {/* Interactive Modals */}
      <TrialModal isOpen={trialOpen} onClose={() => setTrialOpen(false)} />
      <DemoModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
    </div>
  );
}

export default App;
