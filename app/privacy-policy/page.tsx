import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | RL Telemetry',
  description: 'How RL Telemetry collects, uses, shares, and deletes user data.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="flex-1 bg-gray-950 text-white">
      <div className="mx-auto w-full max-w-4xl px-6 py-16 sm:px-8 lg:px-12">
        <div className="mb-10">
          <Link href="/" className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
            ← Back to Home
          </Link>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">Privacy Policy</h1>
          <p className="mt-4 text-gray-300">
            Effective date: August 1, 2026
          </p>
        </div>

        <div className="space-y-8 text-gray-200 leading-7">
          <section className="rounded-2xl border border-gray-800 bg-gray-900/60 p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-white">1. What we collect</h2>
            <p className="mt-3">
              RL Telemetry collects information needed to provide match tracking and account linking features. This may include:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Epic Games account details returned during sign in, such as your Epic account ID and display name.</li>
              <li>Linked platform identifiers and display names for accounts you connect, such as Steam, Xbox, PlayStation, or Nintendo accounts.</li>
              <li>Uploaded replay metadata, parsed match data, and player statistics generated from those replays.</li>
              <li>Basic request and authentication data needed to operate the service securely.</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-gray-800 bg-gray-900/60 p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-white">2. How we use data</h2>
            <p className="mt-3">
              We use this information to authenticate you, link external gaming accounts, show your match history, generate statistics, and operate the replay upload features.
            </p>
            <p className="mt-3">
              We do not use your data to sell advertising, and we do not claim any affiliation with or endorsement by Epic Games.
            </p>
          </section>

          <section className="rounded-2xl border border-gray-800 bg-gray-900/60 p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-white">3. What we share</h2>
            <p className="mt-3">
              We only share data with service providers required to run the application, such as hosting, database, and API infrastructure providers. We do not sell personal data.
            </p>
            <p className="mt-3">
              Data may also be processed by Epic Games during authentication and by your connected platform providers during account linking, according to their own terms and policies.
            </p>
          </section>

          <section className="rounded-2xl border border-gray-800 bg-gray-900/60 p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-white">4. Data retention and deletion</h2>
            <p className="mt-3">
              You can request deletion of your account data, linked platform data, and replay history by contacting support. You can also remove linked platforms through the profile page when that option is available.
            </p>
            <p className="mt-3">
              To request deletion, email <a href="mailto:bboys3145@gmail.com" className="text-blue-400 hover:text-blue-300 transition-colors">bboys3145@gmail.com</a> with the subject line <span className="font-semibold text-white">Data Deletion Request</span>.
            </p>
          </section>

          <section className="rounded-2xl border border-gray-800 bg-gray-900/60 p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-white">5. Changes to this policy</h2>
            <p className="mt-3">
              We may update this policy as the service changes. The latest version will always be posted on this page.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
