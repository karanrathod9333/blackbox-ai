import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="flex min-h-screen items-center justify-center px-6">
        <div className="max-w-5xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            GenAI • AI Agent • Agentic AI • AI/ML
          </p>

          <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
            Blackbox AI
          </h1>

          <p className="mt-6 text-xl text-slate-300">
            A full-scale Agentic AI RFP Builder that uses multiple AI agents
            like Research Agent, Legal Agent, Compliance Agent, Tender Analyzer,
            and Proposal Writer to generate professional RFP responses.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Link
              href="/dashboard"
              className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 hover:bg-cyan-400"
            >
              Open Dashboard
            </Link>

            <Link
              href="/agents"
              className="rounded-xl border border-slate-600 px-6 py-3 font-semibold text-white hover:bg-slate-800"
            >
              View AI Agents
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}