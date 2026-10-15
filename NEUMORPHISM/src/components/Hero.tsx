import React, { useState, useEffect } from 'react';
import { Play, Sparkles, Diamond, ArrowRight, TrendingUp, Zap } from 'lucide-react';
import { sound } from '../utils/sound';

interface HeroProps {
  onOpenDemo: () => void;
  onOpenTrial: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDemo, onOpenTrial }) => {
  // Interactive state for the conversion card
  const [conversionRate, setConversionRate] = useState(47);
  const [isBoosting, setIsBoosting] = useState(false);
  const [systemLatency, setSystemLatency] = useState(14);
  const [activePipeline, setActivePipeline] = useState('Production');

  // Subtle live ping simulation for bottom card
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemLatency((prev) => (prev === 14 ? 12 : prev === 12 ? 15 : 14));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleBoostConversion = () => {
    sound.playPop();
    setIsBoosting(true);
    setConversionRate((prev) => (prev >= 85 ? 47 : prev + 12));
    setTimeout(() => setIsBoosting(false), 600);
  };

  const handlePipelineToggle = () => {
    sound.playClick();
    setActivePipeline((prev) => (prev === 'Production' ? 'Staging (v2.4)' : 'Production'));
  };

  return (
    <main className="w-full max-w-7xl mx-auto px-6 pt-10 sm:pt-14 pb-20 sm:pb-28">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
        
        {/* Left Column: Hero Content */}
        <section aria-label="Hero Introduction" className="lg:col-span-7 flex flex-col items-start">
          
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full nm-raised-sm text-xs sm:text-sm font-medium text-[var(--accent)] mb-8 transition-all hover:scale-102">
            <Sparkles className="w-4 h-4 fill-current animate-pulse" />
            <span className="text-[var(--text-secondary)] font-medium">Trusted by</span>
            <span className="font-semibold text-[var(--text-primary)]">2,000+ teams</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-[-0.035em] text-[var(--text-primary)] leading-[1.08] mb-6">
            Modern Design <br />
            <span className="relative">
              for Your Business
            </span>
          </h1>

          {/* Supporting Paragraph */}
          <p className="text-lg sm:text-xl text-[var(--text-secondary)] leading-relaxed max-w-xl mb-10 font-normal">
            Craft stunning digital experiences that convert visitors into customers.
            Built with precision, designed with purpose, delivered on time.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-5 mb-14 sm:mb-16">
            {/* Primary Button */}
            <button
              onClick={() => {
                sound.playClick();
                onOpenTrial();
              }}
              className="nm-btn-primary px-8 py-4 text-base rounded-[18px] group shadow-lg cursor-pointer"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>

            {/* Secondary Button */}
            <button
              onClick={() => {
                sound.playClick();
                onOpenDemo();
              }}
              className="nm-btn-secondary px-7 py-4 text-base rounded-[18px] group cursor-pointer flex items-center gap-2.5"
            >
              <span className="font-semibold">Watch Demo</span>
              <div className="w-5 h-5 rounded-full nm-inset-sm flex items-center justify-center text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors">
                <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
              </div>
            </button>
          </div>

          {/* Bottom Metric Stats Row */}
          <div className="w-full max-w-lg grid grid-cols-3 gap-6 sm:gap-8 pt-8 border-t border-black/5 dark:border-white/5">
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--accent)]">
                98%
              </div>
              <div className="text-xs sm:text-sm text-[var(--text-secondary)] font-medium mt-1">
                Client satisfaction
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--accent)]">
                150+
              </div>
              <div className="text-xs sm:text-sm text-[var(--text-secondary)] font-medium mt-1">
                Projects shipped
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--accent)]">
                5yr
              </div>
              <div className="text-xs sm:text-sm text-[var(--text-secondary)] font-medium mt-1">
                Industry experience
              </div>
            </div>
          </div>
        </section>

        {/* Right Column: Stacked Neumorphic Interactive Preview Cards */}
        <section aria-label="Interactive Product Preview" className="lg:col-span-5 flex flex-col gap-6 sm:gap-7 relative">
          
          {/* CARD 1: Top Feature / Diamond Card */}
          <div
            onClick={handlePipelineToggle}
            title="Click to toggle pipeline state"
            className="w-full p-6 sm:p-7 rounded-[28px] nm-raised-lg group cursor-pointer transition-all duration-300 hover:translate-y-[-3px]"
          >
            <div className="flex items-center gap-4 mb-5">
              {/* Diamond Icon Container */}
              <div className="w-12 h-12 rounded-2xl nm-inset-sm flex items-center justify-center text-[var(--accent)] transition-transform duration-300 group-hover:rotate-45">
                <Diamond className="w-5 h-5 fill-[var(--accent)]/15 stroke-[var(--accent)] stroke-[2.2]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                    System Node
                  </span>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full nm-raised-sm text-[var(--success)] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--success)] animate-ping" />
                    Online
                  </span>
                </div>
                <div className="text-sm font-bold text-[var(--text-primary)] mt-0.5">
                  {activePipeline}
                </div>
              </div>
            </div>

            {/* Skeleton Data Lines with Neumorphic Inset */}
            <div className="flex flex-col gap-2.5">
              <div className="h-2.5 w-full rounded-full nm-inset-pill relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent w-1/3 animate-[shimmer_2.5s_infinite]" />
              </div>
              <div className="h-2.5 w-3/5 rounded-full nm-inset-pill" />
            </div>
          </div>

          {/* CARD 2: Middle Conversion Card (Direct Match to reference photo + interactive depth) */}
          <div className="w-full p-6 sm:p-7 rounded-[28px] nm-raised-lg transition-all duration-300 hover:translate-y-[-3px] relative overflow-hidden">
            
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black tracking-tight text-[var(--text-primary)] transition-all">
                    +{conversionRate}%
                  </span>
                  {isBoosting && (
                    <span className="text-xs font-bold text-[var(--success)] animate-bounce flex items-center gap-0.5">
                      <TrendingUp className="w-3.5 h-3.5" /> Boosted!
                    </span>
                  )}
                </div>
                <span className="text-sm font-medium text-[var(--text-secondary)]">
                  Conversion rate
                </span>
              </div>

              {/* Interactive Boost Button */}
              <button
                onClick={handleBoostConversion}
                title="Simulate conversion increase"
                className="px-3.5 py-1.5 rounded-xl nm-raised-sm text-xs font-semibold text-[var(--accent)] hover:text-[var(--accent-hover)] active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Zap className="w-3 h-3 fill-current" />
                <span>Simulate</span>
              </button>
            </div>

            {/* Inset Progress Bar Track with Smooth Fill */}
            <div className="h-3.5 w-full rounded-full nm-progress-track p-0.5 mt-2">
              <div
                className="nm-progress-bar relative"
                style={{ width: `${Math.min(conversionRate * 1.05, 96)}%` }}
              >
                {/* Subtle light glint at tip */}
                <div className="absolute right-0 top-0 bottom-0 w-2 rounded-full bg-white/60 blur-[1px]" />
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] text-[var(--text-muted)] font-medium">
              <span>Benchmark: +24%</span>
              <span className="text-[var(--accent)] font-semibold">Real-time optimization active</span>
            </div>
          </div>

          {/* CARD 3: Bottom Dots & Telemetry Card (Direct Match to reference photo) */}
          <div className="w-full p-6 sm:p-7 rounded-[28px] nm-raised-lg transition-all duration-300 hover:translate-y-[-3px]">
            {/* Status Dots */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full nm-inset-sm bg-[var(--text-muted)]/20 inline-block transition-transform duration-200 hover:scale-125" />
                <span className="w-3 h-3 rounded-full nm-inset-sm bg-[var(--accent)]/40 inline-block transition-transform duration-200 hover:scale-125" />
                <span className="w-3 h-3 rounded-full nm-inset-sm bg-[var(--success)] inline-block transition-transform duration-200 hover:scale-125" />
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--text-secondary)]">
                <span className="w-2 h-2 rounded-full bg-[var(--success)] animate-pulse" />
                <span>{systemLatency}ms latency</span>
              </div>
            </div>

            {/* Recessed Data Placeholder Bars */}
            <div className="flex flex-col gap-2.5">
              <div className="h-2.5 w-4/5 rounded-full nm-inset-pill" />
              <div className="h-2.5 w-2/5 rounded-full nm-inset-pill" />
            </div>
          </div>

        </section>

      </div>
    </main>
  );
};
