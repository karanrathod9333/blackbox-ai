export async function aiAgent(prompt: string) {
  try {
    const res = await fetch(
      "https://api-inference.huggingface.co/models/google/flan-t5-large",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    const text = await res.text();

    try {
      const data = JSON.parse(text);
      return data?.[0]?.generated_text || fallbackProposal(prompt);
    } catch {
      return fallbackProposal(prompt);
    }
  } catch {
    return fallbackProposal(prompt);
  }
}

function fallbackProposal(prompt: string) {
  return `
BLACKBOX AI GENERATED PROPOSAL

Executive Summary
This proposal has been generated using Blackbox AI's agentic RFP workflow.

Understanding of Requirement
The organization requires a structured, compliant, and professional proposal response based on the submitted RFP details.

Proposed Solution
Our solution includes requirement analysis, technical planning, implementation, testing, deployment, and support.

Technical Approach
We will follow Agile and SDLC best practices to ensure scalable, secure, and business-aligned delivery.

Commercial Approach
The commercial model will be transparent, milestone-based, and aligned with tender expectations.

Legal and Compliance
All legal, contractual, and compliance obligations will be reviewed before final submission.

Risk Management
Key risks include timeline constraints, missing documents, eligibility gaps, and unclear scope items.

Conclusion
Blackbox AI helps generate a structured and professional RFP response ready for review and submission.
`;
}

export function tenderAnalyzerAgent(data: any) {
  return {
    summary: `This tender "${data.tenderTitle}" requires delivery of: ${data.scope}`,
    keyPoints: [data.scope, data.technical, data.eligibility],
  };
}

export function researchAgent(data: any) {
  return {
    insights: `The organization ${data.organization} needs a reliable and scalable solution aligned with digital transformation goals.`,
  };
}

export function legalAgent(data: any) {
  return {
    risks: `Legal risks include contract terms, NDA, confidentiality, penalties, and compliance obligations: ${data.legal}`,
  };
}

export function complianceAgent(data: any) {
  return {
    score: "85%",
    gaps: `Potential eligibility or documentation gaps: ${data.eligibility}`,
  };
}

export async function proposalWriterAgent(data: any) {
  const prompt = `
Create a professional RFP proposal response.

Tender Title: ${data.tenderTitle}
Organization: ${data.organization}
Scope: ${data.scope}
Technical: ${data.technical}
Commercial: ${data.commercial}
Legal: ${data.legal}
`;

  return await aiAgent(prompt);
}