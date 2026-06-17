import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const session = cookieStore.get('epic_session');

  if (!session) {
    redirect('/');
  }

  const res = await fetch('http://localhost:8000/user_info', {
    headers: {
      Cookie: `epic_session=${session.value}`,
    },
  });

  if (!res.ok) {
    redirect('/');
  }

  const user = await res.json();
  console.log("Fetched user data:", user);

  // 1. Map Epic's platform IDs to your website's database fields and URLs
  const PLATFORM_MAP: Record<string, { dbField: string; name: string; loginRoute: string; color: string }> = {
    steam: { dbField: 'steam_id', name: 'Steam', loginRoute: 'steam', color: 'text-gray-300' },
    xbl: { dbField: 'dingo_id', name: 'Xbox Live', loginRoute: 'xbox', color: 'text-green-400' },
    psn: { dbField: 'psn_id', name: 'PlayStation Network', loginRoute: 'playstation', color: 'text-blue-400' },
    nintendo: { dbField: 'nintendo_id', name: 'Nintendo Switch', loginRoute: 'nintendo', color: 'text-red-400' },
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        
        <div>
          <h1 className="text-3xl font-bold">Player Profile</h1>
          <p className="text-gray-400">Manage your connected accounts and roster details.</p>
        </div>

        {/* Primary Identity Section */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Primary Account (Epic Games)</h2>
          <div className="space-y-2">
            <p>
              <span className="text-gray-400">Display Name: </span> 
              <span className="font-medium text-lg">{user.displayName}</span>
            </p>
            <p>
              <span className="text-gray-400">Epic ID: </span> 
              <span className="font-mono text-sm text-gray-500">{user.accountId}</span>
            </p>
          </div>
        </div>

        {/* Identity Linking Section */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Detected Platforms</h2>
          <p className="text-gray-400 mb-6 text-sm">
            We found these accounts connected to your Epic profile. Link them to RL Telemetry to sync your match data.
          </p>

          <div className="space-y-3">
            {/* 2. Only map over the accounts that Epic actually found */}
            {user.linkedAccounts?.map((epicAccount: any) => {
              const platformInfo = PLATFORM_MAP[epicAccount.identityProviderId];
              
              // If it's a platform we don't track (like Github or Twitch), ignore it
              if (!platformInfo) return null;

              // 3. Check if your backend says this platform is linked to your website
              const isLinkedToWebsite = !!user[platformInfo.dbField];

              return (
                <div key={epicAccount.identityProviderId}>
                  {isLinkedToWebsite ? (
                    // IF CONNECTED TO YOUR SITE: Show success state
                    <div className="flex justify-between items-center bg-gray-900 p-4 rounded border border-green-900/50">
                      <div>
                        <span className="font-medium block">{platformInfo.name}</span>
                        <span className="text-xs text-gray-500">Linked as {epicAccount.displayName}</span>
                      </div>
                      <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded">
                        ✓ Synced
                      </span>
                    </div>
                  ) : (
                    // IF NOT CONNECTED TO YOUR SITE: Show the prompt to link
                    <div className="flex justify-between items-center bg-gray-900/40 p-4 rounded border border-gray-700">
                      <div>
                        <span className="font-medium block text-gray-300">{platformInfo.name}</span>
                        <span className={`text-xs ${platformInfo.color}`}>
                          Found: {epicAccount.displayName}
                        </span>
                      </div>
                      <a
                        href={`http://localhost:8000/auth/login/${platformInfo.loginRoute}`}
                        className="text-sm bg-blue-600 hover:bg-blue-500 text-white font-bold py-1.5 px-4 rounded transition-colors shadow-md"
                      >
                        Link to Site
                      </a>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Fallback if they have NO Rocket League platforms linked to Epic */}
            {(!user.linkedAccounts || user.linkedAccounts.length === 0) && (
              <div className="p-4 bg-gray-900/50 rounded border border-gray-700/50 text-center text-sm text-gray-500">
                No external platforms (Steam, Xbox, PlayStation) found on your Epic Games account.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}