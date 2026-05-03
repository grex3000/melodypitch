import LogoutButton from '@/components/auth/LogoutButton';

export default function ArtistDashboard() {
  return (
    <div className="min-h-[100dvh] bg-bg-base">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="type-h2 text-fg-1">Artist Dashboard</h1>
          <LogoutButton />
        </div>
        
        <div className="bg-bg-surface-1 border border-border-default rounded-lg p-8">
          <h2 className="type-h4 text-fg-1 mb-4">Pitch Management</h2>
          <p className="type-body-sm text-fg-2">Review and manage pitch packages from labels.</p>
        </div>
      </div>
    </div>
  );
}
