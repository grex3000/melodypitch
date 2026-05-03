'use client';

import { FolderSimple, ChartLine, Envelope, UploadSimple, Guitar, Star } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: FolderSimple,
    title: 'Smart Portals',
    description: 'Labels create branded submission portals with custom briefs, deadlines, and genre requirements.',
    accent: 'gold',
    colSpan: 'col-span-1 md:col-span-2',
    animationType: 'float',
  },
  {
    icon: ChartLine,
    title: 'Real-time Analytics',
    description: 'Track submission performance, label engagement, and pitch conversion rates.',
    accent: 'default',
    colSpan: 'col-span-1',
    animationType: 'slide',
  },
  {
    icon: Envelope,
    title: 'Direct Communication',
    description: 'Built-in messaging between songwriters and A&R. No more lost emails.',
    accent: 'default',
    colSpan: 'col-span-1',
    animationType: 'pulse',
  },
  {
    icon: UploadSimple,
    title: 'One-Click Submissions',
    description: 'Upload once, pitch to multiple labels. Your metadata follows the track.',
    accent: 'gold',
    colSpan: 'col-span-1 md:col-span-2',
    animationType: 'float',
  },
  {
    icon: Guitar,
    title: 'Demo Management',
    description: 'Store all your versions, stems, and production notes in one place.',
    accent: 'default',
    colSpan: 'col-span-1 md:col-span-3',
    animationType: 'shimmer',
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const Icon = feature.icon;
  const isAccent = feature.accent === 'gold';

  // Animation configuration
  const getAnimationStyle = () => {
    const animationMap: Record<string, { name: string; duration: number }> = {
      float: { name: 'float', duration: 4 + index * 0.2 },
      slide: { name: 'slide', duration: 3.5 + index * 0.2 },
      pulse: { name: 'pulse', duration: 3 + index * 0.2 },
      shimmer: { name: 'shimmer', duration: 4 + index * 0.2 },
    };
    const anim = animationMap[feature.animationType] || animationMap.float;
    return {
      animation: `${anim.name} ${anim.duration}s ease-in-out infinite`,
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      style={getAnimationStyle()}
      className={`
        ${feature.colSpan}
        relative p-8 rounded-[1.75rem] border overflow-hidden group
        transition-all duration-300 cursor-default
        ${isAccent
          ? 'bg-gradient-to-br from-accent-gold-muted to-accent-gold-muted/50 border-accent-gold/30 hover:border-accent-gold/50'
          : 'bg-gradient-to-br from-bg-surface-1 to-bg-surface-2 border-border-default hover:border-border-strong'
        }
        hover:shadow-lg hover:shadow-black/5
      `}
    >
      {/* Animated gradient background on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className={`absolute inset-0 bg-gradient-to-br ${isAccent ? 'from-accent-gold/10 to-transparent' : 'from-accent-teal/5 to-transparent'}`} />
      </div>

      {/* Content container */}
      <div className="relative z-10">
        {/* Icon box with animated glow */}
        <div className="relative mb-6 inline-block">
          <motion.div
            animate={{
              boxShadow: [
                `0 0 0px ${isAccent ? 'rgba(208, 121, 0, 0)' : 'rgba(0, 0, 0, 0)'}`,
                `0 0 20px ${isAccent ? 'rgba(208, 121, 0, 0.3)' : 'rgba(0, 0, 0, 0)'}`,
                `0 0 0px ${isAccent ? 'rgba(208, 121, 0, 0)' : 'rgba(0, 0, 0, 0)'}`,
              ],
            }}
            transition={{
              duration: 2.5 + index * 0.1,
              repeat: Infinity,
            }}
            className={`
              w-14 h-14 rounded-xl flex items-center justify-center
              ${isAccent ? 'bg-accent-gold/20' : 'bg-bg-surface-2'}
            `}
          >
            <Icon size={28} weight="duotone" className={isAccent ? 'text-accent-gold' : 'text-fg-2'} />
          </motion.div>
        </div>

        {/* Title and description */}
        <h3 className="type-h5 text-fg-1 mb-3 transition-colors duration-300 group-hover:text-accent-gold">
          {feature.title}
        </h3>

        <p className="type-body-sm text-fg-2 leading-relaxed">
          {feature.description}
        </p>

        {/* Accent badge for premium features */}
        {isAccent && (
          <motion.div
            animate={{ rotate: [0, 10, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-6 right-6"
          >
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-accent-gold/20 border border-accent-gold/40">
              <Star size={14} weight="fill" className="text-accent-gold" />
              <span className="text-xs font-medium text-accent-gold">Featured</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom accent line (animated) */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: index * 0.1 }}
        className={`absolute bottom-0 left-0 h-1 origin-left ${isAccent ? 'bg-accent-gold' : 'bg-accent-teal'}`}
        style={{ width: '100%' }}
      />
    </motion.div>
  );
}

export default function Features() {
  return (
    <section id="features" className="relative py-24 md:py-40 bg-bg-base overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 rounded-full bg-accent-gold/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-accent-teal/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-gold-muted text-accent-gold text-xs font-medium mb-6">
              <Star size={14} weight="fill" />
              <span>Powerful features</span>
            </div>

            <h2 className="type-h2 text-fg-1 mb-4">
              Everything you need to pitch
            </h2>

            <p className="type-body-lg text-fg-2 max-w-[600px] mx-auto leading-relaxed">
              From submission to signed deal, MelodyPitch streamlines every step of the music discovery process with tools built for modern creators.
            </p>
          </motion.div>
        </div>

        {/* Bento grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>

      {/* Animation keyframes */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes slide {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(4px); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        @keyframes shimmer {
          0%, 100% { background-position: 0% 0%; }
          50% { background-position: 100% 0%; }
        }
      `}</style>
    </section>
  );
}