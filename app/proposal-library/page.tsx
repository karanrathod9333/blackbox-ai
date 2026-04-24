import Link from "next/link";

export default function ProposalLibraryPage() {
  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <div className="mx-auto max-w-5xl">
        <Link href="/dashboard" className="text-cyan-400 hover:underline">
          ← Back to Dashboard
        </Link>

        <h1 className="mt-6 text-4xl font-bold">Proposal Library</h1>
        <p className="mt-2 text-slate-400">
          Generated proposals will be stored here in later phases.
        </p>

        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-slate-300">No proposals generated yet.</p>
        </div>
      </div>
    </main>
  );
}