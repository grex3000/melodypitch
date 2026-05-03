'use client';

import { ArrowRight, Waveform, Play } from '@phosphor-icons/react';
import { Button } from '../ui';

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden bg-bg-base">
      {/* Diffusion shadow background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-accent-gold/5 blur-3xl translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-border-subtle blur-3xl -translate-x-1/4 translate-y-1/4" />
      </div>

      {/* Split-screen asymmetric layout */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* LEFT: Content Column (60% width on desktop) */}
          <div className="flex flex-col justify-center max-w-xl">
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-gold-muted text-accent-gold text-xs font-medium mb-8 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-pulse" />
              <span className="tracking-label">Now in public beta</span>
            </div>
            
            {/* Primary headline - asymmetric, powerful */}
            <h1 className="type-h1 mb-6 text-fg-1 leading-tight">
              Where great songs
              <br />
              <span className="text-accent-gold">meet their audience</span>
            </h1>
            
            {/* Subheading */}
            <p className="type-body-lg text-fg-2 max-w-[90%] mb-8 leading-relaxed">
              MelodyPitch is the modern way for songwriters and labels to connect. Skip the gatekeepers. Skip the cold emails. Just pure music discovery, done right.
            </p>
            
            {/* CTA buttons - stacked on mobile, row on desktop */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button variant="primary" size="lg" asChild>
                <a href="/register" className="gap-2 flex items-center justify-center">
                  Get started free
                  <ArrowRight size={18} weight="bold" />
                </a>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <a href="#features" className="gap-2 flex items-center justify-center">
                  <Play size={16} weight="fill" />
                  See how it works
                </a>
              </Button>
            </div>

            {/* Social proof - compact, minimal */}
            <div className="flex items-center gap-6 type-body-sm text-fg-3">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent-gold to-accent-teal border border-bg-surface-1" />
                  <div className="w-7 h-7 rounded-full bg-accent-teal border border-bg-surface-1" />
                  <div className="w-7 h-7 rounded-full bg-border-strong border border-bg-surface-1" />
                </div>
                <span className="font-medium">2,400+ creators</span>
              </div>
              <div className="w-px h-4 bg-border-default" />
              <span>No credit card</span>
            </div>
          </div>

          {/* RIGHT: Visual Asset (40% width on desktop, hidden on mobile) */}
          <div className="hidden lg:block relative h-full min-h-[500px] lg:min-h-[600px]">
            {/* Premium glass card with music visualization */}
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] overflow-hidden">
              
              {/* Inner shadow for glass effect */}
              <div className="absolute inset-0 rounded-[2.5rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] pointer-events-none" />
              
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/10 via-transparent to-accent-teal/10 opacity-50" />
              
              {/* Content inside glass */}
              <div className="relative h-full flex flex-col justify-between p-8 text-white">
                
                {/* Header section */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center border border-white/30">
                      <Waveform size={24} weight="duotone" className="text-accent-gold" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-fg-inverse">Midnight Echoes</p>
                      <p className="text-xs text-white/60">Submitted 2h ago</p>
                    </div>
                  </div>
                  
                  {/* Visualizer bars */}
                  <div className="flex items-center gap-1.5 h-16 mb-6">
                    {[40, 60, 80, 65, 75, 90, 70, 85, 55, 70, 65, 80].map((height, i) => (
                      <div
                        key={i}
                        className="w-1.5 rounded-full bg-gradient-to-t from-accent-gold to-accent-teal"
                        style={{
                          height: `${height}%`,
                          animation: `pulse 1.2s ease-in-out infinite`,
                          animationDelay: `${i * 0.1}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Footer stats */}
                <div className="space-y-4 pt-6 border-t border-white/10">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white/70">Status</span>
                    <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-accent-gold/20 text-accent-gold text-xs font-medium border border-accent-gold/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-pulse" />
                      Under review
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-white/70">Views this week</span>
                    <span className="font-semibold text-fg-inverse">847</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating accent element - top right */}
            <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-accent-gold/20 blur-3xl pointer-events-none" />
            
            {/* Floating accent element - bottom left */}
            <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full bg-accent-teal/10 blur-3xl pointer-events-none" />
          </div>
        </div>
      </div>

      {/* CSS for animation */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scaleY(0.4); }
          50% { opacity: 1; transform: scaleY(1); }
        }
      `}</style>
    </section>
  );
}
