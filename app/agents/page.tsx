import Link from "next/link";

const agents = [
  {
    name: "Research Agent",
    role: "Researches client organization, industry background, competitors, and market insights.",
  },
  {
    name: "Tender Analyzer Agent",
    role: "Reads tender/RFP requirements and extracts scope, eligibility, deadline, and submission rules.",
  },
  {
    name: "Legal Agent",
    role: "Reviews contract clauses, legal risks, penalties, terms, and compliance obligations.",
  },
  {
    name: "Compliance Agent",
    role: "Checks whether our organization meets eligibility and mandatory tender conditions.",
  },
  {
    name: "Proposal Writer Agent",
    role: "Generates professional RFP response sections like executive summary, scope, approach, and timeline.",
  },
  {
    name: "Review Agent",
    role: "Improves grammar, tone, structure, clarity, and professional quality of the proposal.",
  },
  {
    name: "Strategy Agent",
    role: "Suggests win strategy, differentiators, pricing positioning, and proposal improvements.",
  },
];

export default function AgentsPage() {
  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <div className="mx-auto max-w-7xl">
        <Link href="/dashboard" className="text-cyan-400 hover:underline">
          ← Back to Dashboard
        </Link>

        <h1 className="mt-6 text-4xl font-bold">Blackbox AI Agents</h1>
        <p className="mt-2 text-slate-400">
          Multi-agent architecture for intelligent RFP analysis and proposal generation.
        </p>

        <section className="mt-8 grid gap-6 md:grid-cols-2">
          {agents.map((agent) => (
            <div
              key={agent.name}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >
              <h2 className="text-2xl font-bold text-cyan-400">
                {agent.name}
              </h2>
              <p className="mt-3 text-slate-300">{agent.role}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}