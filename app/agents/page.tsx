import AppShell from "@/app/components/AppShell";

const agents = [
  {
    name: "Research Agent",
    status: "Active",
    role: "Researches client background, industry trends, competitors, and market insights.",
    output:
      "Provides business context, market positioning, and proposal improvement suggestions.",
  },
  {
    name: "Tender Analyzer Agent",
    status: "Active",
    role: "Reads tender/RFP requirements and extracts scope, eligibility, deadlines, and rules.",
    output:
      "Creates structured tender analysis with key requirements and submission expectations.",
  },
  {
    name: "Legal Agent",
    status: "Active",
    role: "Reviews legal clauses, contract risks, penalties, NDA terms, and compliance obligations.",
    output:
      "Flags legal risks and highlights clauses requiring review before proposal submission.",
  },
  {
    name: "Compliance Agent",
    status: "Active",
    role: "Checks eligibility, mandatory requirements, and organizational fit.",
    output:
      "Generates compliance score, gaps, and eligibility observations.",
  },
  {
    name: "Proposal Writer Agent",
    status: "Active",
    role: "Creates the final professional proposal response.",
    output:
      "Generates executive summary, technical approach, timeline, risk plan, and conclusion.",
  },
  {
    name: "Review Agent",
    status: "Planned",
    role: "Improves grammar, formatting, tone, and proposal quality.",
    output:
      "Will polish proposal language and make it submission-ready.",
  },
  {
    name: "Strategy Agent",
    status: "Planned",
    role: "Suggests winning strategy, differentiators, pricing position, and improvement areas.",
    output:
      "Will recommend how to make the proposal stronger than competitors.",
  },
];

export default function AgentsPage() {
  return (
    <AppShell>
      <div className="max-w-7xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
          Multi-Agent Architecture
        </p>

        <h1 className="mt-4 text-5xl font-bold">Blackbox AI Agents</h1>

        <p className="mt-3 max-w-3xl text-slate-400">
          Blackbox AI uses multiple specialized agents to analyze tenders,
          review compliance, identify legal risks, research market context, and
          generate professional RFP proposals.
        </p>

        <section className="mt-10 grid gap-6 md:grid-cols-2">
          {agents.map((agent) => (
            <div
              key={agent.name}
              className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl hover:border-cyan-500/60"
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-2xl font-bold text-cyan-400">
                  {agent.name}
                </h2>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    agent.status === "Active"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {agent.status}
                </span>
              </div>

              <div className="mt-5 rounded-2xl bg-slate-800 p-4">
                <p className="text-sm font-semibold text-slate-300">Role</p>
                <p className="mt-2 text-slate-400">{agent.role}</p>
              </div>

              <div className="mt-4 rounded-2xl bg-slate-800 p-4">
                <p className="text-sm font-semibold text-slate-300">
                  Expected Output
                </p>
                <p className="mt-2 text-slate-400">{agent.output}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="mt-10 rounded-3xl border border-cyan-500/40 bg-gradient-to-br from-slate-900 to-slate-800 p-8">
          <h2 className="text-3xl font-bold">Agent Workflow</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-5">
            {[
              "Tender Analyzer",
              "Research",
              "Legal",
              "Compliance",
              "Proposal Writer",
            ].map((step, index) => (
              <div
                key={step}
                className="rounded-2xl border border-slate-700 bg-slate-950 p-5 text-center"
              >
                <p className="text-sm text-slate-500">Step {index + 1}</p>
                <p className="mt-2 font-bold text-cyan-400">{step}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}