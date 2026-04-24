import Link from "next/link";

export default function RfpBuilderPage() {
  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <div className="mx-auto max-w-5xl">
        <Link href="/dashboard" className="text-cyan-400 hover:underline">
          ← Back to Dashboard
        </Link>

        <h1 className="mt-6 text-4xl font-bold">RFP Builder</h1>
        <p className="mt-2 text-slate-400">
          In Phase 2, we will add the full tender/RFP input form here.
        </p>

        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Coming in Phase 2</h2>

          <ul className="mt-4 space-y-3 text-slate-300">
            <li>✔ Tender title</li>
            <li>✔ Issuing organization</li>
            <li>✔ Contract value</li>
            <li>✔ Submission deadline</li>
            <li>✔ Scope of work</li>
            <li>✔ Eligibility criteria</li>
            <li>✔ Legal terms</li>
            <li>✔ Technical requirements</li>
            <li>✔ Commercial requirements</li>
          </ul>
        </div>
      </div>
    </main>
  );
}