import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="grid gap-10">
      <section className="grid items-center gap-6 rounded-2xl border bg-white p-8 sm:grid-cols-2">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold sm:text-4xl">
            Track every dollar. See every outcome.
          </h1>
          <p className="text-gray-600">
            The Orange Blossom Alliance Impact Tracker converts donations into clear, verifiable metrics like meals provided, shelter nights, counseling hours, and supply kits.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/impact" className="inline-flex items-center rounded-md bg-brand-600 px-4 py-2 font-medium text-white hover:bg-brand-700">
              Get started
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center rounded-md border px-4 py-2 font-medium hover:bg-gray-50"
            >
              How it works
            </a>
          </div>
        </div>
        <div className="">
          <div className="relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-xl border bg-gradient-to-br from-brand-100 to-white">
            <div className="absolute inset-0 grid place-items-center p-6">
              <div className="grid gap-3 text-center">
                <div className="text-sm text-gray-500">Live preview</div>
                <div className="rounded-lg border bg-white p-4 text-left shadow-sm">
                  <div className="text-xs font-medium text-gray-500">Donation</div>
                  <div className="mt-1 text-2xl font-bold">$250</div>
                  <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-md bg-brand-50 p-2">100 meals</div>
                    <div className="rounded-md bg-brand-50 p-2">7 shelter nights</div>
                    <div className="rounded-md bg-brand-50 p-2">3 counseling hrs</div>
                    <div className="rounded-md bg-brand-50 p-2">12 supply kits</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">Illustrative example</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="grid gap-4 rounded-2xl border bg-white p-8">
        <h2 className="text-2xl font-semibold">Transparent by design</h2>
        <ol className="grid gap-3 text-gray-700">
          <li><span className="font-medium">1. Add donations</span> ? log one-time or recurring gifts.</li>
          <li><span className="font-medium">2. Auto-convert to impact</span> ? see meals, shelter nights, hours, and kits.</li>
          <li><span className="font-medium">3. Share or export</span> ? generate a shareable link or CSV.</li>
        </ol>
        <p className="text-sm text-gray-500">
          No sign-in required. Data stays in your browser unless you choose to share it.
        </p>
      </section>
    </div>
  );
}
