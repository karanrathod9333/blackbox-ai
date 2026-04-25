"use client";

import { useState } from "react";
import AppShell from "@/app/components/AppShell";
import jsPDF from "jspdf";

export default function RfpBuilderPage() {
  const [formData, setFormData] = useState({
    tenderTitle: "",
    organization: "",
    contractValue: "",
    deadline: "",
    scope: "",
    eligibility: "",
    technical: "",
    commercial: "",
    legal: "",
  });

  const [proposal, setProposal] = useState("");
  const [loading, setLoading] = useState(false);
  const [agents, setAgents] = useState<any>(null);
  const [fileText, setFileText] = useState("");

  const extractFieldsFromText = (text: string) => {
    const lowerText = text.toLowerCase();

    const findSection = (keywords: string[]) => {
      const sentences = text.split(/[\n.]/);

      const matched = sentences.filter((sentence) =>
        keywords.some((keyword) =>
          sentence.toLowerCase().includes(keyword)
        )
      );

      return matched.slice(0, 5).join(". ");
    };

    const title =
      findSection(["tender", "rfp", "request for proposal"]).slice(0, 150) ||
      "Uploaded RFP Document";

    const organization =
      findSection(["organization", "company", "department", "authority"]).slice(
        0,
        150
      ) || "Issuing Organization";

    const contractValueMatch = text.match(
      /(₹|rs\.?|inr|\$)\s?[0-9,]+(\s?(crore|lakh|million|billion))?/i
    );

    const deadlineMatch = text.match(
      /\b(20[0-9]{2}-[0-9]{2}-[0-9]{2}|[0-9]{1,2}[/-][0-9]{1,2}[/-][0-9]{2,4})\b/
    );

    setFormData({
      tenderTitle: title,
      organization: organization,
      contractValue: contractValueMatch ? contractValueMatch[0] : "",
      deadline: "",
      scope:
        findSection(["scope", "work", "services", "deliverables"]).slice(
          0,
          1000
        ) || text.slice(0, 700),
      eligibility: findSection([
        "eligibility",
        "qualified",
        "experience",
        "criteria",
        "certification",
      ]),
      technical: findSection([
        "technical",
        "system",
        "software",
        "platform",
        "integration",
        "security",
      ]),
      commercial: findSection([
        "commercial",
        "payment",
        "pricing",
        "cost",
        "financial",
        "invoice",
      ]),
      legal: findSection([
        "legal",
        "contract",
        "penalty",
        "nda",
        "confidential",
        "liability",
      ]),
    });
  };

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileUpload = async (e: any) => {
    const file = e.target.files[0];

    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append("file", file);

    const res = await fetch("/api/upload-rfp", {
      method: "POST",
      body: formDataUpload,
    });

    const data = await res.json();
    const extractedText = data.text || "";

    setFileText(extractedText);
    extractFieldsFromText(extractedText);
  };

  const generateProposal = async (e: any) => {
    e.preventDefault();

    setLoading(true);
    setProposal("");

    const res = await fetch("/api/generate-proposal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    setProposal(data.proposal || "No proposal generated.");
    setAgents(data.agents || null);

    setLoading(false);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const lines = doc.splitTextToSize(proposal, 180);
    doc.text(lines, 10, 10);
    doc.save("blackbox-proposal.pdf");
  };

  return (
    <AppShell>
      <div className="max-w-6xl">
        <h1 className="text-4xl font-bold">RFP Builder</h1>

        <p className="mt-2 text-slate-400">
          Upload an RFP document or enter tender details manually.
        </p>

        <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <label className="mb-2 block text-sm text-slate-400">
            Upload RFP File
          </label>

          <input
            type="file"
            accept=".pdf,.txt,.doc,.docx"
            onChange={handleFileUpload}
            className="w-full rounded-xl bg-slate-800 p-3"
          />

          {fileText && (
            <p className="mt-3 text-sm text-green-400">
              File uploaded and fields auto-filled successfully.
            </p>
          )}
        </div>

        <form
          onSubmit={generateProposal}
          className="mt-8 grid gap-6 rounded-3xl border border-slate-800 bg-slate-900 p-6"
        >
          <input
            name="tenderTitle"
            value={formData.tenderTitle}
            placeholder="Tender Title"
            onChange={handleChange}
            className="rounded-xl bg-slate-800 p-3"
          />

          <input
            name="organization"
            value={formData.organization}
            placeholder="Issuing Organization"
            onChange={handleChange}
            className="rounded-xl bg-slate-800 p-3"
          />

          <input
            name="contractValue"
            value={formData.contractValue}
            placeholder="Contract Value"
            onChange={handleChange}
            className="rounded-xl bg-slate-800 p-3"
          />

          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="rounded-xl bg-slate-800 p-3"
          />

          <textarea
            name="scope"
            value={formData.scope}
            onChange={handleChange}
            placeholder="Scope of Work"
            className="min-h-28 rounded-xl bg-slate-800 p-3"
          />

          <textarea
            name="eligibility"
            value={formData.eligibility}
            onChange={handleChange}
            placeholder="Eligibility Criteria"
            className="min-h-28 rounded-xl bg-slate-800 p-3"
          />

          <textarea
            name="technical"
            value={formData.technical}
            onChange={handleChange}
            placeholder="Technical Requirements"
            className="min-h-28 rounded-xl bg-slate-800 p-3"
          />

          <textarea
            name="commercial"
            value={formData.commercial}
            onChange={handleChange}
            placeholder="Commercial Requirements"
            className="min-h-28 rounded-xl bg-slate-800 p-3"
          />

          <textarea
            name="legal"
            value={formData.legal}
            onChange={handleChange}
            placeholder="Legal Terms"
            className="min-h-28 rounded-xl bg-slate-800 p-3"
          />

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-cyan-500 py-3 font-bold text-black"
          >
            {loading ? "Generating..." : "Generate AI Proposal"}
          </button>
        </form>

        {agents && (
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {Object.entries(agents).map(([key, value]) => (
              <div
                key={key}
                className="rounded-2xl border border-cyan-500/40 bg-slate-900 p-6"
              >
                <h2 className="text-xl font-bold text-cyan-400 capitalize">
                  {key} Agent
                </h2>

                <pre className="mt-4 whitespace-pre-wrap text-sm text-slate-300">
                  {JSON.stringify(value, null, 2)}
                </pre>
              </div>
            ))}
          </div>
        )}

        {proposal && (
          <div className="mt-10 rounded-3xl border border-green-500/40 bg-slate-900 p-6">
            <h2 className="text-2xl font-bold text-green-400">
              Final Proposal
            </h2>

            <button
              onClick={downloadPDF}
              className="mt-4 mb-4 rounded-lg bg-green-500 px-4 py-2 font-bold text-black"
            >
              Download PDF
            </button>

            <pre className="whitespace-pre-wrap text-sm text-slate-300">
              {proposal}
            </pre>
          </div>
        )}
      </div>
    </AppShell>
  );
}