const features = [
  {
    title: "Portal Submission",
    description: "Labels create branded portals for songwriters to submit demos directly with metadata, genres, and moods.",
    icon: "📤",
  },
  {
    title: "Pitch Management",
    description: "Labels curate pitch packages and send tracks to artists with notes and rating systems.",
    icon: "🎵",
  },
  {
    title: "Analytics Dashboard",
    description: "Track submission trends, acceptance rates, and top genres across all your portals.",
    icon: "📊",
  },
  {
    title: "Real-Time Feedback",
    description: "Songwriters track their demo status from submission to shortlist to pitch.",
    icon: "⚡",
  },
];

export default function Features() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Everything you need to manage music submissions
        </h2>
        <p className="text-lg text-[#78716c] text-center mb-12 max-w-2xl mx-auto">
          From demo drops to artist pitches, MelodyPitch streamlines your entire A&R workflow.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="p-6 bg-[#fafaf9] rounded-xl">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-[#78716c]">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
