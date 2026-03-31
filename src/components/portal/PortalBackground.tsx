interface PortalBackgroundProps {
  imageUrl?: string | null;
  blurPx?: number;
  children: React.ReactNode;
}

export default function PortalBackground({
  imageUrl,
  blurPx = 5,
  children,
}: PortalBackgroundProps) {
  return (
    <div className="relative min-h-[100dvh] flex flex-col">
      {/* Background layer */}
      <div
        className="absolute inset-0 bg-[#1c1917]"
        style={
          imageUrl
            ? {
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: `blur(${blurPx}px)`,
                transform: "scale(1.05)",
              }
            : undefined
        }
        aria-hidden="true"
      />

      {/* Darkening scrim */}
      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />

      {/* Content on top */}
      <div className="relative z-10 flex flex-col min-h-[100dvh]">
        {children}
      </div>
    </div>
  );
}
