import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <div className="mx-auto max-w-7xl">
        <Link href="/" className="text-cyan-400 hover:underline">
          ← Back to Home
        </Link>

        <h1 className="mt-6 text-4xl font-bold">Blackbox AI Dashboard</h1>
        <p className="mt-2 text-slate-400">
          Manage tenders, proposals, AI agents, compliance checks, and generated RFP responses.
        </p>

        <section className="mt-8 grid gap-6 md:grid-cols-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Total RFPs</p>
            <h2 className="mt-3 text-3xl font-bold">0</h2>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Generated Proposals</p>
            <h2 className="mt-3 text-3xl font-bold">0</h2>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">AI Agents</p>
            <h2 className="mt-3 text-3xl font-bold">7</h2>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Compliance Score</p>
            <h2 className="mt-3 text-3xl font-bold">--</h2>
          </div>
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-3">
          <Link
            href="/rfp-builder"
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6 hover:border-cyan-400"
          >
            <h3 className="text-xl font-bold">RFP Builder</h3>
            <p className="mt-2 text-slate-400">
              Create a new RFP response using AI-powered proposal generation.
            </p>
          </Link>

          <Link
            href="/agents"
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6 hover:border-cyan-400"
          >
            <h3 className="text-xl font-bold">AI Agents</h3>
            <p className="mt-2 text-slate-400">
              View research, legal, compliance, review, and strategy agents.
            </p>
          </Link>

          <Link
            href="/proposal-library"
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6 hover:border-cyan-400"
          >
            <h3 className="text-xl font-bold">Proposal Library</h3>
            <p className="mt-2 text-slate-400">
              Store and manage all generated proposal drafts.
            </p>
          </Link>
        </section>
      </div>
    </main>
  );
}