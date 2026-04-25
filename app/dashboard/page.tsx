"use client";

import { useEffect, useState } from "react";
import AppShell from "@/app/components/AppShell";
import { supabase } from "@/app/lib/supabase";

export default function DashboardPage() {
  const [total, setTotal] = useState(0);
  const [recent, setRecent] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("proposals")
      .select("*")
      .eq("user_id", user.id);

    if (data) {
      setTotal(data.length);
      setRecent(data.slice(0, 3));
    }
  };

  return (
    <AppShell>
      <div className="max-w-6xl">
        <h1 className="text-4xl font-bold">Blackbox AI Dashboard</h1>

        <p className="mt-2 text-slate-400">
          Insights and analytics of your RFP proposals.
        </p>

        {/* Stats */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-slate-900 p-6">
            <p className="text-slate-400">Total Proposals</p>
            <h2 className="mt-2 text-4xl font-bold text-cyan-400">
              {total}
            </h2>
          </div>

          <div className="rounded-3xl bg-slate-900 p-6">
            <p className="text-slate-400">System Status</p>
            <h2 className="mt-2 text-2xl font-bold text-green-400">
              Active
            </h2>
          </div>
        </div>

        {/* Recent */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold">Recent Proposals</h2>

          {recent.length === 0 ? (
            <p className="mt-4 text-slate-400">
              No proposals generated yet.
            </p>
          ) : (
            <div className="mt-4 space-y-4">
              {recent.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl bg-slate-900 p-4"
                >
                  <h3 className="text-lg font-bold text-cyan-400">
                    {item.tenderTitle}
                  </h3>
                  <p className="text-sm text-slate-400">
                    {item.organization}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}