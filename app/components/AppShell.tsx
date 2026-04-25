"use client";

import Link from "next/link";

export default function AppShell({ children }: any) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900 p-6">
        <h2 className="text-2xl font-bold text-cyan-400">
          Blackbox AI
        </h2>

        <nav className="mt-8 flex flex-col gap-4 text-sm">
          <Link href="/dashboard" className="hover:text-cyan-400">
            Dashboard
          </Link>

          <Link href="/rfp-builder" className="hover:text-cyan-400">
            RFP Builder
          </Link>

          <Link href="/proposal-library" className="hover:text-cyan-400">
            Proposal Library
          </Link>

          <Link href="/agents" className="hover:text-cyan-400">
            AI Agents
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}