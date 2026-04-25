"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import AppShell from "@/app/components/AppShell";

export default function ProposalLibraryPage() {
  const [proposals, setProposals] = useState<any[]>([]);

  useEffect(() => {
    fetchProposals();
  }, []);

  const fetchProposals = async () => {
    // 👉 Get logged-in user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    // 👉 Fetch only this user's proposals
    const { data, error } = await supabase
      .from("proposals")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setProposals(data);
    }
  };

  return (
    <AppShell>
      <div className="max-w-6xl">
        <h1 className="text-4xl font-bold">Proposal Library</h1>

        <p className="mt-2 text-slate-400">
          View only your generated proposals.
        </p>

        {proposals.length === 0 ? (
          <p className="mt-8 text-slate-400">
            No proposals found for this user.
          </p>
        ) : (
          <div className="mt-8 space-y-6">
            {proposals.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
              >
                <h2 className="text-2xl font-bold text-cyan-400">
                  {item.tenderTitle}
                </h2>

                <p className="mt-2 text-sm text-slate-400">
                  {item.organization}
                </p>

                <pre className="mt-4 whitespace-pre-wrap text-sm text-slate-300">
                  {item.proposal}
                </pre>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}