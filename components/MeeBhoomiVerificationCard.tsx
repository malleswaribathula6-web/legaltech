"use client";

import React from "react";
import { LandRecord } from "@/lib/mockData";
import { ShieldCheck, ShieldAlert, FileText, CheckCircle2, XCircle, AlertTriangle, Building2, MapPin, User, Hash, Lock, Check } from "lucide-react";

interface MeeBhoomiVerificationCardProps {
  record: LandRecord;
}

export default function MeeBhoomiVerificationCard({ record }: MeeBhoomiVerificationCardProps) {
  const is22A = record.section22AFlag;
  const isMutationClean = record.mutationDetails.status.includes("Approved");
  const isECClean = record.encumbrance.status.includes("Nil");
  const isBoundaryClean = !record.boundaryAndPossession.disputeFlag;

  return (
    <div className="space-y-4">
      {/* 4 Pillars Header Banner */}
      <div className="flex items-center justify-between px-1">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          4-Pillar Statutory Verification Grid (AP Portals)
        </h3>
        <span className="text-xs font-mono text-slate-400">
          Sync Time: {new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })} IST
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pillar 1: MeeBhoomi 1-B & Adangal */}
        <div className={`glass-card p-5 rounded-2xl border transition-all ${
          isMutationClean ? "border-emerald-500/30 bg-emerald-950/10" : "border-amber-500/30 bg-amber-950/10"
        }`}>
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              <div className={`p-2 rounded-xl ${
                isMutationClean ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"
              }`}>
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-100 text-sm">1. MeeBhoomi 1-B Record of Rights</h4>
                <p className="text-[11px] text-slate-400">AP ROR Act 1971 Digital Registry</p>
              </div>
            </div>
            {isMutationClean ? (
              <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                <CheckCircle2 className="w-3.5 h-3.5" /> Approved
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
                <AlertTriangle className="w-3.5 h-3.5" /> Pending Scrutiny
              </span>
            )}
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-800/80">
              <span className="text-slate-400">Pattadar Name:</span>
              <span className="font-semibold text-slate-200 text-right">{record.ownerName}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/80">
              <span className="text-slate-400">Khata Number:</span>
              <span className="font-mono text-amber-300 font-semibold">{record.khataNumber}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/80">
              <span className="text-slate-400">e-Passbook No:</span>
              <span className="font-mono text-slate-200">{record.pattadarPassbookNo}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/80">
              <span className="text-slate-400">Land Classification:</span>
              <span className="font-medium text-blue-300">{record.landClassification}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400">Recorded Cultivator:</span>
              <span className="font-medium text-slate-300 text-right">{record.mutationDetails.cultivatorName}</span>
            </div>
          </div>

          <p className="mt-3 text-[11px] text-slate-400 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
            ℹ️ {record.mutationDetails.remarks}
          </p>
        </div>

        {/* Pillar 2: IGRS 30-Year Encumbrance */}
        <div className={`glass-card p-5 rounded-2xl border transition-all ${
          isECClean ? "border-emerald-500/30 bg-emerald-950/10" : "border-red-500/30 bg-red-950/10"
        }`}>
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              <div className={`p-2 rounded-xl ${
                isECClean ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
              }`}>
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-100 text-sm">2. IGRS AP 30-Year Encumbrance (EC)</h4>
                <p className="text-[11px] text-slate-400">Sub-Registrar Office Trace (1994 - 2026)</p>
              </div>
            </div>
            {isECClean ? (
              <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                <CheckCircle2 className="w-3.5 h-3.5" /> Clean (Nil EC)
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-red-500/20 text-red-300 font-semibold border border-red-500/30">
                <XCircle className="w-3.5 h-3.5" /> Encumbered
              </span>
            )}
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-800/80">
              <span className="text-slate-400">EC Search Period:</span>
              <span className="font-mono text-slate-200">{record.encumbrance.searchPeriod}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/80">
              <span className="text-slate-400">EC Certificate No:</span>
              <span className="font-mono text-amber-300">{record.encumbrance.certificateNo}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/80">
              <span className="text-slate-400">Registered Deeds Trace:</span>
              <span className="font-semibold text-slate-200">{record.encumbrance.registeredDeeds.length} Registered Doc(s)</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400">Court Attachment Status:</span>
              <span className={`font-semibold ${isECClean ? "text-emerald-400" : "text-red-400"}`}>
                {isECClean ? "Nil Attachment" : "Dispute / Attachment Found"}
              </span>
            </div>
          </div>

          <p className="mt-3 text-[11px] text-slate-400 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
            ℹ️ {record.encumbrance.details}
          </p>
        </div>

        {/* Pillar 3: Section 22-A Prohibited Properties Register */}
        <div className={`glass-card p-5 rounded-2xl border transition-all ${
          !is22A ? "border-emerald-500/30 bg-emerald-950/10" : "border-red-500/40 bg-red-950/20 crimson-glow"
        }`}>
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              <div className={`p-2 rounded-xl ${
                !is22A ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
              }`}>
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-100 text-sm">3. AP Registration Act Section 22-A</h4>
                <p className="text-[11px] text-slate-400">CARD AP Prohibited Register Status</p>
              </div>
            </div>
            {!is22A ? (
              <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                <CheckCircle2 className="w-3.5 h-3.5" /> Clear (Not Listed)
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-red-500 text-slate-950 font-extrabold animate-pulse">
                <AlertTriangle className="w-3.5 h-3.5" /> 22-A PROHIBITED
              </span>
            )}
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-800/80">
              <span className="text-slate-400">Prohibition Category:</span>
              <span className={`font-semibold ${!is22A ? "text-emerald-300" : "text-red-300"}`}>
                {is22A ? record.section22ACategory : "N/A (Clear Ryotwari)"}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/80">
              <span className="text-slate-400">Registration Bar:</span>
              <span className={`font-semibold ${!is22A ? "text-emerald-400" : "text-red-400"}`}>
                {!is22A ? "Unrestricted Registration" : "Strict Statutory Prohibition"}
              </span>
            </div>
            {record.deNotificationStatus && (
              <div className="py-1">
                <span className="text-slate-400 block mb-1">De-notification Status:</span>
                <span className="text-[11px] text-amber-300 font-medium">{record.deNotificationStatus}</span>
              </div>
            )}
          </div>

          <p className="mt-3 text-[11px] text-slate-400 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
            ℹ️ {record.section22AReason || "No statutory impediment recorded under Section 22-A(1)(a) through (e)."}
          </p>
        </div>

        {/* Pillar 4: F-Line Demarcation & Ground Boundary */}
        <div className={`glass-card p-5 rounded-2xl border transition-all ${
          isBoundaryClean ? "border-emerald-500/30 bg-emerald-950/10" : "border-amber-500/40 bg-amber-950/15"
        }`}>
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              <div className={`p-2 rounded-xl ${
                isBoundaryClean ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"
              }`}>
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-100 text-sm">4. F-Line Demarcation & Possession</h4>
                <p className="text-[11px] text-slate-400">AP Survey & Boundaries Act 1923</p>
              </div>
            </div>
            {isBoundaryClean ? (
              <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                <CheckCircle2 className="w-3.5 h-3.5" /> Stones Fixed
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
                <AlertTriangle className="w-3.5 h-3.5" /> Overlap Flagged
              </span>
            )}
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-800/80">
              <span className="text-slate-400">Survey Status:</span>
              <span className="font-medium text-slate-200">{record.boundaryAndPossession.fLineStatus}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/80">
              <span className="text-slate-400">Encroachment Deficit:</span>
              <span className={`font-semibold ${isBoundaryClean ? "text-emerald-400" : "text-red-400"}`}>
                {record.boundaryAndPossession.encroachmentExtent || "Nil Ground Deficit"}
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400">Adjacent Occupants:</span>
              <span className="font-medium text-slate-300 text-right">
                {isBoundaryClean ? "Undisputed Perimeters" : record.boundaryAndPossession.encroacherName}
              </span>
            </div>
          </div>

          <p className="mt-3 text-[11px] text-slate-400 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
            ℹ️ {record.boundaryAndPossession.details}
          </p>
        </div>
      </div>
    </div>
  );
}
