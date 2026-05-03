const steps = [
  {
    step: 1,
    title: "Create a Portal",
    description: "Labels set up branded submission portals with custom briefs and deadlines.",
  },
  {
    step: 2,
    title: "Submit Demos",
    description: "Songwriters upload tracks with metadata, genres, and personal notes to label.",
  },
  {
    step: 3,
    title: "Pitch to Artists",
    description: "Labels curate pitch packages and send selected tracks directly to artists.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 bg-bg-surface-2">
      <div className="max-w-6xl mx-auto">
        <h2 className="type-h2 text-fg-1 text-center mb-12">
          How MelodyPitch Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.step} className="relative p-6 bg-bg-surface-1 rounded-lg border border-border-default">
              <div className="w-12 h-12 bg-accent-gold text-fg-inverse rounded-pill flex items-center justify-center text-lg font-extrabold mb-4">
                {step.step}
              </div>
              <h3 className="type-h5 text-fg-1 mb-2">{step.title}</h3>
              <p className="type-body-sm text-fg-2">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
