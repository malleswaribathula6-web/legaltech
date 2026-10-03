"use client";

import React, { useState } from "react";
import { LandRecord } from "@/lib/mockData";
import { PETITION_TEMPLATES, PetitionTemplate } from "@/lib/petitionTemplates";
import { FileEdit, Copy, Check, Printer, FileText, Send, Sparkles, Scale, Download } from "lucide-react";

interface StatutoryNoticeGeneratorProps {
  record: LandRecord;
}

export default function StatutoryNoticeGenerator({ record }: StatutoryNoticeGeneratorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<PetitionTemplate>(PETITION_TEMPLATES[0]);
  const [customDraft, setCustomDraft] = useState<string>(PETITION_TEMPLATES[0].generateText(record));
  const [copied, setCopied] = useState(false);

  // Update text when template or record changes
  const handleSelectTemplate = (template: PetitionTemplate) => {
    setSelectedTemplate(template);
    setCustomDraft(template.generateText(record));
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(customDraft);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="glass-panel rounded-2xl border border-slate-800 p-6 space-y-6 shadow-2xl">
      {/* Generator Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 text-amber-400 border border-amber-500/30">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              Statutory Petitions & Legal Notice Drafter
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
                Auto-Filled with MeeBhoomi Data
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Generate ready-to-file statutory petitions before Tahsildar, RDO, District Collector, or Civil Court
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 no-print">
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 transition-all shadow-sm"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy Draft</span>
              </>
            )}
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all shadow-md shadow-amber-500/20"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Template Selection Pills */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 no-print">
        {PETITION_TEMPLATES.map((tmpl) => {
          const isSelected = selectedTemplate.id === tmpl.id;
          return (
            <button
              key={tmpl.id}
              onClick={() => handleSelectTemplate(tmpl)}
              className={`text-left p-3.5 rounded-xl border transition-all ${
                isSelected
                  ? "bg-amber-500/15 border-amber-500/50 text-amber-200 shadow-md ring-1 ring-amber-500/30"
                  : "bg-slate-900/60 hover:bg-slate-900 border-slate-800 text-slate-300"
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-xs font-bold truncate">{tmpl.title}</span>
                {isSelected && <span className="w-2 h-2 rounded-full bg-amber-400" />}
              </div>
              <p className="text-[10px] text-slate-400 truncate">{tmpl.actTitle}</p>
              <p className="text-[9px] text-amber-400/80 font-mono mt-1">To: {tmpl.targetAuthority}</p>
            </button>
          );
        })}
      </div>

      {/* Editable Document Preview Area */}
      <div className="relative">
        <div className="flex items-center justify-between px-4 py-2 bg-slate-900 rounded-t-xl border border-slate-800 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <FileEdit className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold text-slate-300">Live Statutory Draft Editor</span>
          </div>
          <span className="text-[11px] font-mono">Format: High Court & Revenue Bar Standard</span>
        </div>

        <textarea
          value={customDraft}
          onChange={(e) => setCustomDraft(e.target.value)}
          rows={16}
          className="w-full bg-slate-950/90 text-slate-200 font-mono text-xs p-4 rounded-b-xl border-x border-b border-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/30 leading-relaxed tracking-wide selection:bg-amber-500/30"
          spellCheck={false}
        />
      </div>

      {/* Statutory Guidance Note */}
      <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 flex items-start gap-3 text-xs text-slate-400">
        <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-200">Filing Instructions for {selectedTemplate.targetAuthority}:</strong>
          <p className="mt-0.5 text-[11px]">
            Print on green legal ledger paper or plain A4. Attach certified copies of 1-B Adangal, FMB Map, Registered Deeds, and fee challan before physical or MeeSeva online submission.
          </p>
        </div>
      </div>
    </div>
  );
}
