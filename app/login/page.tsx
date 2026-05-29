// app/login/page.tsx
export default function Login() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Rocket League Telemetry Hub</h1>
      
      {/* Point this locally to your Next.js backend instead of Epic directly */}
      <a 
        href="/api/auth/epic" 
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
      >
        Login with Epic Games
      </a>
    </main>
  );
}