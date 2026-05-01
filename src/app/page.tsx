import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <HowItWorks />
      
      {/* CTA Section */}
      <section className="py-20 px-4 bg-[#6366f1] text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Streamline Your Music Submissions?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join labels, songwriters, and artists already using MelodyPitch.
          </p>
          <a
            href="/register"
            className="inline-block px-8 py-3 bg-white text-[#6366f1] font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Get Started for Free
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-[#1c1917] text-[#a8a29e] text-center text-sm">
        <p>© 2026 MelodyPitch. All rights reserved.</p>
      </footer>
    </main>
  );
}
