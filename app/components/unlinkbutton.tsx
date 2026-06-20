// components/unlinkbutton.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UnlinkButton({ route, platformName }: { route: string; platformName: string }) {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isUnlinking, setIsUnlinking] = useState(false);
  const router = useRouter();

  const handleUnlink = async () => {
    setIsUnlinking(true);
    try {
      // Calls your dynamic backend route, e.g., /auth/steam/unlink
      const res = await fetch(`http://localhost:8000/auth/${route}/unlink`, {
        method: 'POST',
        credentials: 'include',
      });
      
      if (res.ok) {
        // router.refresh() silently re-runs the Server Component, 
        // fetching the fresh user data and updating the UI without a full reload.
        router.refresh(); 
      } else {
        console.error(`Failed to unlink ${platformName}`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsUnlinking(false);
      setIsConfirming(false);
    }
  };

  // The "Are you sure?" Confirmation State
  if (isConfirming) {
    return (
      <div className="flex items-center gap-2 bg-red-950/30 p-1.5 rounded-md border border-red-900/50">
        <span className="text-xs text-red-400 font-medium ml-1">Unlink {platformName}?</span>
        <button
          onClick={handleUnlink}
          disabled={isUnlinking}
          className="text-xs bg-red-600 hover:bg-red-500 text-white font-bold py-1 px-3 rounded transition-colors shadow-md disabled:opacity-50"
        >
          {isUnlinking ? '...' : 'Yes'}
        </button>
        <button
          onClick={() => setIsConfirming(false)}
          disabled={isUnlinking}
          className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-200 font-bold py-1 px-3 rounded transition-colors shadow-md disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    );
  }

  // The Default State
  return (
    <button
      onClick={() => setIsConfirming(true)}
      className="text-xs border border-gray-600 text-gray-400 hover:text-red-400 hover:border-red-500/50 hover:bg-red-500/10 font-medium py-1 px-3 rounded transition-all duration-200"
    >
      Unlink
    </button>
  );
}