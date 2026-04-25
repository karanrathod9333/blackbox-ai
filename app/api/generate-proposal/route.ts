import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";

import {
  tenderAnalyzerAgent,
  researchAgent,
  legalAgent,
  complianceAgent,
  proposalWriterAgent,
} from "@/app/lib/agents";

export async function POST(req: Request) {
  const data = await req.json();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const analysis = tenderAnalyzerAgent(data);
  const research = researchAgent(data);
  const legal = legalAgent(data);
  const compliance = complianceAgent(data);

  const proposal = await proposalWriterAgent(data);

  const { error } = await supabase.from("proposals").insert([
    {
      tenderTitle: data.tenderTitle,
      organization: data.organization,
      proposal: proposal,
      user_id: user?.id,
    },
  ]);

  if (error) {
    return NextResponse.json({
      proposal: "Supabase save error: " + error.message,
    });
  }

  return NextResponse.json({
    agents: {
      tenderAnalyzer: analysis,
      research,
      legal,
      compliance,
    },
    proposal,
  });
}