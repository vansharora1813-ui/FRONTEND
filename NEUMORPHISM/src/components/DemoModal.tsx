import React, { useState } from 'react';
import { X, Play, Pause, Maximize2 } from 'lucide-react';
import { sound } from '../utils/sound';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeSegment, setActiveSegment] = useState(0);

  if (!isOpen) return null;

  const segments = [
    { title: 'Physical Molding', time: '0:45', desc: 'Light casting & dual shadow geometry' },
    { title: 'Interactive Surfaces', time: '1:30', desc: 'Tactile press depths & micro-springs' },
    { title: 'SaaS Architecture', time: '2:15', desc: 'Sub-millisecond state synchronizations' },
  ];

  const handlePlayToggle = () => {
    sound.playClick();
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div
        className="w-full max-w-3xl p-6 sm:p-8 rounded-[32px] nm-raised-xl relative text-[var(--text-primary)] border border-white/40 dark:border-white/5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl nm-inset-sm flex items-center justify-center text-[var(--accent)]">
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Apex Platform Walkthrough</h3>
              <p className="text-xs text-[var(--text-secondary)]">2026 Tactile Product Overview</p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            aria-label="Close dialog"
            className="w-9 h-9 rounded-full nm-raised-sm flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all cursor-pointer active:scale-95"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Screen Simulation */}
        <div className="w-full aspect-video rounded-[24px] nm-inset-md overflow-hidden relative flex flex-col justify-between p-5 mb-5 bg-[#0e1117] text-white">
          <div className="flex items-center justify-between text-xs opacity-75">
            <span className="font-mono bg-white/10 px-2.5 py-1 rounded-md">4K UHD · 60 FPS</span>
            <span className="flex items-center gap-1.5 font-medium">
              <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-red-500 animate-pulse' : 'bg-amber-400'}`} />
              {isPlaying ? 'STREAMING' : 'PAUSED'}
            </span>
          </div>

          {/* Central Animated Graphic */}
          <div className="flex flex-col items-center justify-center text-center">
            <div
              onClick={handlePlayToggle}
              className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-lg mb-3"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
            </div>
            <div className="text-sm font-semibold tracking-wide">
              {segments[activeSegment].title}
            </div>
            <div className="text-xs text-white/70 mt-1 max-w-sm">
              {segments[activeSegment].desc}
            </div>
          </div>

          {/* Bottom Scrub Bar */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono">01:14</span>
            <div className="flex-1 h-2 rounded-full bg-white/20 overflow-hidden cursor-pointer">
              <div
                className={`h-full bg-[var(--accent)] rounded-full transition-all duration-300 ${isPlaying ? 'w-3/5' : 'w-2/5'}`}
              />
            </div>
            <span className="text-xs font-mono">03:20</span>
            <Maximize2 className="w-3.5 h-3.5 opacity-60 hover:opacity-100 cursor-pointer" />
          </div>
        </div>

        {/* Segment Selector */}
        <div className="grid grid-cols-3 gap-3">
          {segments.map((seg, idx) => (
            <button
              key={seg.title}
              onClick={() => {
                sound.playClick();
                setActiveSegment(idx);
              }}
              className={`p-3 rounded-2xl text-left transition-all cursor-pointer ${
                activeSegment === idx
                  ? 'nm-inset-sm border border-[var(--accent)]/30 text-[var(--accent)]'
                  : 'nm-raised-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <div className="text-xs font-bold truncate">{seg.title}</div>
              <div className="text-[11px] text-[var(--text-muted)] mt-0.5">{seg.time}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
