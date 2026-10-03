"use client";

import React from "react";
import { LandRecord } from "@/lib/mockData";
import { StatutoryAuditResult } from "@/lib/aiReasoning";
import { Scale, ShieldCheck, AlertOctagon, AlertTriangle, CheckCircle, Clock, Award, Printer, BookOpen, ExternalLink } from "lucide-react";

interface AuditReportViewProps {
  record: LandRecord;
  auditResult: StatutoryAuditResult;
  aiRawAnalysis?: string;
}

export default function AuditReportView({ record, auditResult, aiRawAnalysis }: AuditReportViewProps) {
  const { verdict, statutoryRisks, roadmap } = auditResult;

  const getVerdictStyle = () => {
    switch (verdict.status) {
      case "CLEAR_TITLE":
        return {
          bg: "bg-emerald-950/20 border-emerald-500/40 emerald-glow",
          badge: "bg-emerald-500 text-slate-950",
          icon: ShieldCheck,
          text: "text-emerald-400"
        };
      case "CLOUDED_TITLE":
        return {
          bg: "bg-amber-950/20 border-amber-500/40 gold-glow",
          badge: "bg-amber-500 text-slate-950",
          icon: AlertTriangle,
          text: "text-amber-400"
        };
      case "VOID_TITLE":
      default:
        return {
          bg: "bg-red-950/30 border-red-500/50 crimson-glow",
          badge: "bg-red-600 text-white",
          icon: AlertOctagon,
          text: "text-red-400"
        };
    }
  };

  const style = getVerdictStyle();
  const IconComponent = style.icon;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Official Audit Dossier Header Banner */}
      <div className={`glass-panel p-6 rounded-2xl border ${style.bg} relative overflow-hidden transition-all shadow-2xl`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className={`p-3.5 rounded-2xl ${style.badge} font-black shadow-lg shrink-0`}>
              <IconComponent className="w-7 h-7" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className={`text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${style.badge}`}>
                  VERDICT: {verdict.status.replace("_", " ")}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-900/80 text-slate-300 font-mono border border-slate-700">
                  Marketability: {verdict.marketabilityRating}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-900/80 text-amber-300 font-mono border border-slate-700">
                  Confidence: {verdict.confidenceScore}%
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-slate-100 tracking-tight">
                {verdict.title}
              </h2>
              <p className="text-xs md:text-sm text-slate-300 mt-2 leading-relaxed max-w-3xl">
                {verdict.summary}
              </p>
            </div>
          </div>

          {/* Quick Print Button */}
          <div className="flex flex-col items-end gap-2 no-print shrink-0">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all shadow-lg shadow-amber-500/20"
            >
              <Printer className="w-4 h-4" />
              <span>Print Audit Dossier</span>
            </button>
            <span className="text-[10px] text-slate-400 font-mono">
              AP Stamp-Ready Certificate
            </span>
          </div>
        </div>
      </div>

      {/* Property Essential Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="glass-card p-3.5 rounded-xl border border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Survey & Sub-Div</span>
          <span className="text-sm font-extrabold text-amber-300 font-mono">{record.surveyNumber} ({record.subDivision || "Main"})</span>
        </div>
        <div className="glass-card p-3.5 rounded-xl border border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Mandal / Village</span>
          <span className="text-xs font-bold text-slate-200">{record.mandal}, {record.village}</span>
        </div>
        <div className="glass-card p-3.5 rounded-xl border border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Total Extent</span>
          <span className="text-xs font-bold text-slate-200">{record.totalExtent}</span>
        </div>
        <div className="glass-card p-3.5 rounded-xl border border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Est. Market Value</span>
          <span className="text-xs font-bold text-emerald-400">{record.totalEstimatedValue}</span>
        </div>
      </div>

      {/* Statutory Risk & Act Matrix */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-400" />
            Statutory Legal Provisions & Red Flag Analysis
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            {statutoryRisks.length} Statutes Evaluated
          </span>
        </div>

        <div className="space-y-3">
          {statutoryRisks.map((risk, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border transition-all ${
                risk.severity === "CRITICAL"
                  ? "bg-red-950/20 border-red-500/40"
                  : risk.severity === "HIGH"
                  ? "bg-amber-950/20 border-amber-500/40"
                  : "bg-slate-900/60 border-slate-800"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    risk.severity === "CRITICAL"
                      ? "bg-red-500 text-white"
                      : risk.severity === "HIGH"
                      ? "bg-amber-500 text-slate-950"
                      : "bg-blue-500/20 text-blue-300"
                  }`}>
                    {risk.severity}
                  </span>
                  <h4 className="text-xs font-bold text-slate-200">
                    {risk.act}
                  </h4>
                </div>
                <span className="text-[11px] font-mono text-amber-300 font-semibold">
                  {risk.section}
                </span>
              </div>

              <div className="space-y-1.5 text-xs">
                <p className="text-slate-300">
                  <strong className="text-slate-400">Statutory Finding:</strong> {risk.finding}
                </p>
                <p className="text-slate-300">
                  <strong className="text-slate-400">Legal Consequence:</strong> {risk.legalConsequence}
                </p>
                {risk.casePrecedent && (
                  <p className="text-[11px] text-amber-300/90 font-serif italic pt-1 border-t border-slate-800/80">
                    ⚖️ Judicial Landmark: {risk.casePrecedent}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3-Phase Immediate Action Roadmap */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" />
            3-Phase Strategic Title Perfection & Remedy Roadmap
          </h3>
          <span className="text-xs text-amber-400 font-semibold">
            Actionable Next Steps
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Phase 1 */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center">
                1
              </span>
              <div>
                <h4 className="text-xs font-bold text-slate-200">{roadmap.phase1.title}</h4>
                <p className="text-[10px] text-amber-400 font-mono">{roadmap.phase1.timeline}</p>
              </div>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              {roadmap.phase1.actions.map((act, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-amber-400 text-xs mt-0.5">•</span>
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Phase 2 */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-blue-500 text-slate-950 font-black text-xs flex items-center justify-center">
                2
              </span>
              <div>
                <h4 className="text-xs font-bold text-slate-200">{roadmap.phase2.title}</h4>
                <p className="text-[10px] text-blue-400 font-mono">{roadmap.phase2.timeline}</p>
              </div>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              {roadmap.phase2.actions.map((act, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-blue-400 text-xs mt-0.5">•</span>
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Phase 3 */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-500 text-slate-950 font-black text-xs flex items-center justify-center">
                3
              </span>
              <div>
                <h4 className="text-xs font-bold text-slate-200">{roadmap.phase3.title}</h4>
                <p className="text-[10px] text-emerald-400 font-mono">{roadmap.phase3.timeline}</p>
              </div>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              {roadmap.phase3.actions.map((act, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-emerald-400 text-xs mt-0.5">•</span>
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
