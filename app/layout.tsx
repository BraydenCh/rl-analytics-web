import './globals.css'
import Navbar from "./components/navbar"

export const metadata = {
  title: 'Rocket League Telemetry',
  description: 'Collegiate esports roster management',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white antialiased min-h-screen flex flex-col">
        {/* The Global Navbar */}
        <Navbar />
        
        {/* The actual page content (Home, Profile, etc.) */}
        <main className="flex-grow flex flex-col">
          {children}
        </main>
      </body>
    </html>
  )
}