interface PostSubmitPromptProps {
  portalName: string;
  trackCount: number;
}

export default function PostSubmitPrompt({ portalName, trackCount }: PostSubmitPromptProps) {
  return (
    <div className="w-full max-w-md">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-[1.25rem] p-8 text-center">
        {/* Checkmark */}
        <div className="w-14 h-14 rounded-full bg-[#6366f1]/20 border border-[#6366f1]/40 flex items-center justify-center mx-auto mb-5">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a5b4fc" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h2 className="text-white text-xl font-semibold mb-2">
          {trackCount === 1 ? "Track submitted" : `${trackCount} tracks submitted`}
        </h2>
        <p className="text-white/60 text-sm mb-6">
          Your demo{trackCount !== 1 ? "s are" : " is"} on the way to{" "}
          <span className="text-white/80">{portalName}</span>.
        </p>

        {/* Account CTA */}
        <div className="border border-white/20 rounded-[1rem] p-4 text-left">
          <p className="text-white text-sm font-medium mb-1">Track your submission</p>
          <p className="text-white/60 text-xs mb-4">
            Create a free account to see status updates and comments from the label.
          </p>
          <div className="flex gap-2">
            <a
              href="/register"
              className="flex-1 text-center bg-[#6366f1] hover:bg-[#4f46e5] text-white text-sm font-medium rounded-[0.625rem] py-2 transition-colors"
            >
              Create free account
            </a>
            <a
              href="/login"
              className="flex-1 text-center bg-white/10 hover:bg-white/20 text-white/80 text-sm font-medium rounded-[0.625rem] py-2 transition-colors"
            >
              Sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
