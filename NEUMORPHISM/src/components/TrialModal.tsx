import React, { useState } from 'react';
import { X, Check, Sparkles, Lock, ArrowRight } from 'lucide-react';
import { sound } from '../utils/sound';

interface TrialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrialModal: React.FC<TrialModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playPop();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div
        className="w-full max-w-md p-8 rounded-[32px] nm-raised-xl relative text-[var(--text-primary)] border border-white/40 dark:border-white/5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          aria-label="Close dialog"
          className="absolute top-6 right-6 w-9 h-9 rounded-full nm-raised-sm flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all cursor-pointer active:scale-95"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="py-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl nm-inset-sm flex items-center justify-center text-[var(--success)] mb-4">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Welcome to Apex</h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Your instant trial workspace is ready. Redirecting you...
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg nm-inset-sm flex items-center justify-center text-[var(--accent)]">
                <Sparkles className="w-3.5 h-3.5 fill-current" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
                14-Day Free Access
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
              Start Free Trial
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mb-6">
              Experience true physical depth and high-performance design. No credit card required.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-2 ml-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Sterling"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full nm-input text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-2 ml-1">
                  Work Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full nm-input text-sm"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl nm-btn-primary text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <span>Launch Workspace</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[var(--text-muted)] mt-2">
                <Lock className="w-3 h-3" />
                <span>Enterprise grade 256-bit encryption</span>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
