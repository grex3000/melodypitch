'use client';

import { motion } from 'framer-motion';
import { CheckCircle, XCircle, MusicNote, Users, Headphones } from '@phosphor-icons/react';

const audiences = [
  {
    id: 'labels',
    title: 'For Labels & A&R',
    icon: MusicNote,
    color: 'from-accent-gold to-accent-teal',
    painPoints: [
      {
        problem: '💌 Drowning in unsolicited demos',
        description: 'Hundreds of unvetted submissions clogging your inbox every day',
      },
      {
        problem: '⏰ Months to find one good track',
        description: 'Sifting through poor quality submissions wastes time and resources',
      },
      {
        problem: '🔄 Chaotic submission process',
        description: 'No standardized way to receive, organize, or track submissions',
      },
      {
        problem: '📊 Can\'t identify emerging trends',
        description: 'Missing signals about what new artists are making waves',
      },
    ],
    solutions: [
      {
        benefit: '✨ Curated submission portal',
        description: 'Control exactly what you receive with custom briefs and requirements',
      },
      {
        benefit: '🎯 Pre-filtered quality tracks',
        description: 'Only receive submissions that match your label aesthetic and needs',
      },
      {
        benefit: '📈 Real-time analytics dashboard',
        description: 'Track submission metrics and discover emerging talent early',
      },
      {
        benefit: '⚡ Instant artist communication',
        description: 'Built-in messaging for A&R feedback without leaving the platform',
      },
    ],
  },
  {
    id: 'songwriters',
    title: 'For Songwriters & Producers',
    icon: Headphones,
    color: 'from-accent-teal to-accent-gold',
    painPoints: [
      {
        problem: '🚪 Gatekeepers blocking the door',
        description: 'Labels only accept submissions through official channels you can\'t access',
      },
      {
        problem: '❓ No feedback on rejections',
        description: 'Submit to labels and get silence—no idea why it didn\'t work',
      },
      {
        problem: '🎯 Wasting time on wrong targets',
        description: 'Manually researching which labels might want your style takes forever',
      },
      {
        problem: '📧 Cold emails getting ignored',
        description: 'Your carefully crafted pitches disappear into spam folders',
      },
    ],
    solutions: [
      {
        benefit: '🔓 Direct access to labels',
        description: 'Submit to curated opportunities without needing connections or agents',
      },
      {
        benefit: '💬 Get actual feedback',
        description: 'Labels share thoughts on your track—finally know what to improve',
      },
      {
        benefit: '🎯 Smart matching',
        description: 'Find labels that actually want your style of music automatically',
      },
      {
        benefit: '📊 Track your pitch success',
        description: 'See exactly how many labels viewed your submission and their responses',
      },
    ],
  },
  {
    id: 'artists',
    title: 'For Artists & Management',
    icon: Users,
    color: 'from-accent-gold via-accent-teal to-accent-gold',
    painPoints: [
      {
        problem: '🤝 Complex label deals are hard to navigate',
        description: 'Understanding contracts and distribution options without expertise is risky',
      },
      {
        problem: '🎵 Your music gets lost in the crowd',
        description: 'Independent artists have no way to stand out to major players',
      },
      {
        problem: '📱 No centralized artist platform',
        description: 'Managing demos, metadata, and versions across different tools is chaos',
      },
      {
        problem: '🚫 Limited distribution options',
        description: 'Choosing between labels, DIY releases, or distributors is overwhelming',
      },
    ],
    solutions: [
      {
        benefit: '📋 Organized demo hub',
        description: 'Store all versions, stems, and metadata in one place&mdash;always ready',
      },
      {
        benefit: '🏆 Build your artist profile',
        description: 'Create a professional presence that labels can discover and explore',
      },
      {
        benefit: '🎁 Multiple release paths',
        description: 'Choose between label deals, distribution, or collaboration opportunities',
      },
      {
        benefit: '👥 Direct label relationships',
        description: 'Communicate directly with A&R to understand opportunities and negotiate',
      },
    ],
  },
];

export default function AudienceSections() {
  return (
    <section className="py-24 md:py-40 bg-gradient-to-b from-bg-base via-bg-surface-1 to-bg-base relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 right-0 w-96 h-96 rounded-full bg-accent-gold/5 blur-3xl" />
        <div className="absolute bottom-40 left-0 w-96 h-96 rounded-full bg-accent-teal/5 blur-3xl" />
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
              <span className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-pulse" />
              <span>Built for everyone in music</span>
            </div>

            <h2 className="type-h2 text-fg-1 mb-4">
              Solutions for every role in music
            </h2>

            <p className="type-body-lg text-fg-2 max-w-[700px] mx-auto leading-relaxed">
              Whether you&apos;re a label searching for talent, a songwriter seeking opportunities, or an artist building your career&mdash;MelodyPitch solves your biggest pain points.
            </p>
          </motion.div>
        </div>

        {/* Audience sections */}
        <div className="space-y-16">
          {audiences.map((audience, index) => {
            const Icon = audience.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={audience.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
              >
                {/* Audience header */}
                <div className="flex items-center gap-4 mb-12">
                  <motion.div
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${audience.color} flex items-center justify-center shadow-lg`}
                  >
                    <Icon size={32} weight="fill" className="text-white" />
                  </motion.div>
                  <div>
                    <h3 className="type-h4 text-fg-1">{audience.title}</h3>
                    <p className="type-body-sm text-fg-3">Both problems and solutions</p>
                  </div>
                </div>

                {/* Pain points and solutions grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Pain points - left side */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 0 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="space-y-4"
                  >
                    <h4 className="type-h5 text-fg-1 flex items-center gap-2 mb-6">
                      <XCircle size={20} className="text-error" weight="fill" />
                      The Problem
                    </h4>

                    {audience.painPoints.map((point, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                        className="p-4 rounded-lg bg-error-muted border border-error/20 hover:border-error/40 transition-colors"
                      >
                        <p className="type-h6 text-error font-semibold mb-1">
                          {point.problem}
                        </p>
                        <p className="type-body-sm text-fg-2">
                          {point.description}
                        </p>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Solutions - right side */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 0 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="space-y-4"
                  >
                    <h4 className="type-h5 text-fg-1 flex items-center gap-2 mb-6">
                      <CheckCircle size={20} className="text-success" weight="fill" />
                      The Solution
                    </h4>

                    {audience.solutions.map((solution, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                        className="p-4 rounded-lg bg-success-muted border border-success/20 hover:border-success/40 transition-colors"
                      >
                        <p className="type-h6 text-success font-semibold mb-1">
                          {solution.benefit}
                        </p>
                        <p className="type-body-sm text-fg-2">
                          {solution.description}
                        </p>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* Divider between sections */}
                {index < audiences.length - 1 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="h-px bg-gradient-to-r from-transparent via-border-default to-transparent mt-16 origin-left"
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* CTA section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-20 text-center"
        >
          <p className="type-body-lg text-fg-2 mb-6">
            No matter your role in music, MelodyPitch has the tools you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="inline-flex items-center justify-center px-8 py-4 bg-accent-gold text-fg-inverse font-medium rounded-lg hover:bg-accent-gold/90 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent-gold/30 active:scale-[0.98]"
            >
              Start your journey free
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center px-8 py-4 border border-border-default text-fg-2 font-medium rounded-lg hover:bg-bg-surface-1 hover:text-fg-1 transition-colors"
            >
              See how it works
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
