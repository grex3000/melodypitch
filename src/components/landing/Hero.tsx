export default function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] text-white px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Connect Songwriters with Labels & Artists
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          The modern platform for demo submissions, pitch management, and music discovery.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/register"
            className="px-8 py-3 bg-white text-[#6366f1] font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Start Free Beta
          </a>
          <a
            href="#how-it-works"
            className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
          >
            Learn More
          </a>
        </div>
        <p className="mt-6 text-sm opacity-75">
          Free for songwriters and artists. Labels get 14-day free trial.
        </p>
      </div>
    </section>
  );
}
