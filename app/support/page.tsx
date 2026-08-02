import Link from 'next/link';

export const metadata = {
  title: 'Support | RL Telemetry',
  description: 'Contact RL Telemetry for support or data inquiries.',
};

export default function SupportPage() {
  return (
    <main className="flex-1 bg-gray-950 text-white">
      <div className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-8 lg:px-12">
        <div className="mb-10">
          <Link href="/" className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
            ← Back to Home
          </Link>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">Support</h1>
          <p className="mt-4 text-gray-300">
            Use this page to contact RL Telemetry for help, account questions, or data requests.
          </p>
        </div>

        <div className="space-y-6 rounded-2xl border border-gray-800 bg-gray-900/60 p-6 shadow-xl">
          <section>
            <h2 className="text-2xl font-bold text-white">Contact</h2>
            <p className="mt-3 text-gray-200">
              Email us at{' '}
              <a href="mailto:bboys3145@gmail.com" className="text-blue-400 hover:text-blue-300 transition-colors">
                bboys3145@gmail.com
              </a>{' '}
              for support, data deletion requests, or account linking questions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">What to include</h2>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-gray-200">
              <li>Your Epic display name or Epic account ID.</li>
              <li>The platform you are having trouble linking, if applicable.</li>
              <li>A short description of the issue and any error message you saw.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">Data requests</h2>
            <p className="mt-3 text-gray-200">
              If you want your account data deleted, send a message with the subject line <span className="font-semibold text-white">Data Deletion Request</span>. We will review and process requests as soon as reasonably possible.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
