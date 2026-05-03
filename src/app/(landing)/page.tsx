import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import HowItWorks from '@/components/landing/HowItWorks';

export default function Home() {
  return (
    <main className="bg-bg-base">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      
      {/* Final CTA Section */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-bg-base to-bg-surface-1 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-accent-gold/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-accent-teal/5 blur-3xl" />
        </div>
        
        <div className="max-w-[800px] mx-auto px-6 md:px-12 text-center relative z-10">
          <h2 className="type-h2 text-fg-1 mb-6">
            Ready to get your music heard?
          </h2>
          <p className="type-body-lg text-fg-2 mb-10 max-w-[500px] mx-auto">
            Join thousands of songwriters and artists who are building their careers with MelodyPitch.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="inline-flex items-center justify-center px-8 py-4 bg-accent-gold text-fg-inverse font-medium rounded-lg hover:bg-accent-gold/90 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent-gold/30 active:scale-[0.98]"
            >
              Create free account
            </a>
            <a
              href="/login"
              className="inline-flex items-center justify-center px-8 py-4 border border-border-default text-fg-2 font-medium rounded-lg hover:bg-bg-surface-1 hover:text-fg-1 transition-colors"
            >
              Sign in
            </a>
          </div>
          <p className="type-body-sm text-fg-3 mt-6">
            Free forever for songwriters and artists
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-bg-surface-1 border-t border-border-subtle">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-gold to-accent-teal flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-fg-2 font-medium">MelodyPitch</span>
            </div>
            <p className="type-body-sm text-fg-3">
              2026 MelodyPitch. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
