import React, { useState } from 'react';
import { Volume2, VolumeX, Moon, Sun, Menu, X, ArrowUpRight } from 'lucide-react';
import { sound } from '../utils/sound';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDark: boolean;
  toggleTheme: () => void;
  onOpenTrial: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isDark,
  toggleTheme,
  onOpenTrial,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(true);

  const navLinks = ['Product', 'Solutions', 'Pricing', 'About'];

  const handleNavClick = (tab: string) => {
    sound.playClick();
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  const handleSoundToggle = () => {
    sound.enabled = !soundActive;
    if (!soundActive) sound.playPop();
    setSoundActive(!soundActive);
  };

  const handleThemeClick = () => {
    sound.playPop();
    toggleTheme();
  };

  return (
    <header className="w-full max-w-7xl mx-auto px-6 pt-6 sm:pt-8 pb-4 relative z-50">
      <nav
        aria-label="Main Navigation"
        className="flex items-center justify-between px-6 py-4 rounded-[24px] nm-raised-md transition-all duration-300"
      >
        {/* Brand Logo */}
        <div
          onClick={() => handleNavClick('Product')}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="w-9 h-9 rounded-xl nm-raised-sm flex items-center justify-center text-[var(--accent)] group-hover:scale-105 transition-transform duration-200">
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2L2 7L12 12L22 7L12 2Z" />
              <path d="M2 17L12 22L22 17L12 12L2 17Z" opacity="0.6" />
            </svg>
          </div>
          <span className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
            Apex<span className="text-[var(--accent)]">.</span>
          </span>
        </div>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-1.5 p-1.5 rounded-full nm-inset-sm">
          {navLinks.map((item) => {
            const isActive = activeTab === item;
            return (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-[var(--accent)] nm-raised-sm font-semibold'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Sound click toggle */}
          <button
            onClick={handleSoundToggle}
            title={soundActive ? 'Mute physical click sounds' : 'Enable tactile audio'}
            aria-label="Toggle sound feedback"
            className="w-10 h-10 rounded-full nm-raised-sm flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent)] transition-all cursor-pointer active:scale-95"
          >
            {soundActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 opacity-50" />}
          </button>

          {/* Theme Switcher */}
          <button
            onClick={handleThemeClick}
            title={isDark ? 'Switch to Light Neumorphic' : 'Switch to Dark Neumorphic'}
            aria-label="Toggle color mode"
            className="w-10 h-10 rounded-full nm-raised-sm flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent)] transition-all cursor-pointer active:scale-95"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
          </button>

          {/* Primary CTA */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenTrial();
            }}
            className="px-6 py-2.5 rounded-full text-sm font-semibold nm-raised-md text-[var(--accent)] hover:text-[var(--accent-hover)] transition-all duration-200 active:scale-98 cursor-pointer flex items-center gap-1.5"
          >
            <span>Get Started</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={handleThemeClick}
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-full nm-raised-sm flex items-center justify-center text-[var(--text-secondary)]"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => {
              sound.playPop();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            aria-label="Toggle Menu"
            className="w-10 h-10 rounded-xl nm-raised-sm flex items-center justify-center text-[var(--text-primary)] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 p-5 rounded-[24px] nm-raised-lg flex flex-col gap-3 animate-soft-pulse">
          {navLinks.map((item) => (
            <button
              key={item}
              onClick={() => handleNavClick(item)}
              className={`w-full py-3 px-4 rounded-xl text-left font-medium transition-all ${
                activeTab === item
                  ? 'nm-inset-sm text-[var(--accent)] font-semibold'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {item}
            </button>
          ))}
          <div className="pt-2 border-t border-black/5 dark:border-white/5 flex flex-col gap-3">
            <button
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(false);
                onOpenTrial();
              }}
              className="w-full py-3 rounded-xl nm-btn-primary"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
