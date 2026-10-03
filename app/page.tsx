"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import MeeBhoomiVerificationCard from "@/components/MeeBhoomiVerificationCard";
import FLineMapViewer from "@/components/FLineMapViewer";
import AuditReportView from "@/components/AuditReportView";
import StatutoryNoticeGenerator from "@/components/StatutoryNoticeGenerator";
import LegalAdvisorChat from "@/components/LegalAdvisorChat";
import { fetchAPLandRecord, LandRecord, PRESET_LAND_RECORDS } from "@/lib/mockData";
import { performStatutoryAudit, StatutoryAuditResult } from "@/lib/aiReasoning";
import { 
  Search, 
  Scale, 
  ShieldCheck, 
  MapPin, 
  FileText, 
  AlertOctagon, 
  Compass, 
  MessageSquare, 
  CheckCircle2, 
  Sparkles, 
  Printer, 
  Layers, 
  Building2, 
  UserCheck, 
  FileCheck2,
  HelpCircle
} from "lucide-react";

export default function Home() {
  const [district, setDistrict] = useState("NTR (Vijayawada)");
  const [language, setLanguage] = useState<"en" | "te" | "hi">("en");
  const [customApiKey, setCustomApiKey] = useState("");

  const [searchQuery, setSearchQuery] = useState("104/2");
  const [currentSurvey, setCurrentSurvey] = useState("104/2");
  
  const [record, setRecord] = useState<LandRecord>(() => fetchAPLandRecord("104/2", "NTR (Vijayawada)"));
  const [auditResult, setAuditResult] = useState<StatutoryAuditResult>(() => performStatutoryAudit(record, "en"));
  const [activeTab, setActiveTab] = useState<"audit" | "meebhoomi" | "map" | "petitions" | "chat">("audit");
  const [isLoading, setIsLoading] = useState(false);

  // Trigger search / survey lookup
  const handleSearch = (surveyToSearch?: string) => {
    const target = (surveyToSearch || searchQuery).trim();
    if (!target) return;

    setIsLoading(true);
    setCurrentSurvey(target);

    try {
      const fetched = fetchAPLandRecord(target, district);
      const audit = performStatutoryAudit(fetched, language);
      setRecord(fetched);
      setAuditResult(audit);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPreset = (survey: string) => {
    setSearchQuery(survey);
    handleSearch(survey);
  };

  useEffect(() => {
    // Re-run audit when language changes
    setAuditResult(performStatutoryAudit(record, language));
  }, [language]);

  return (
    <div className="min-h-screen bg-[#060b13] text-slate-100 flex flex-col">
      {/* Top Navigation */}
      <Navbar
        district={district}
        setDistrict={setDistrict}
        language={language}
        setLanguage={setLanguage}
        customApiKey={customApiKey}
        setCustomApiKey={setCustomApiKey}
      />

      {/* Hero & Search Banner */}
      <section className="relative px-4 lg:px-8 pt-8 pb-6 border-b border-slate-800/80 bg-gradient-to-b from-slate-900/60 via-slate-950 to-[#060b13]">
        <div className="max-w-7xl mx-auto space-y-5">
          {/* Main Title Banner */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Andhra Pradesh Autonomous Statutory Title & Dispute Prevention AI</span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-black text-slate-100 tracking-tight">
                AP Land Revenue Law & Statutory Title Due Diligence
              </h2>
              <p className="text-xs lg:text-sm text-slate-400 mt-1 max-w-3xl">
                Comprehensive statutory reasoning under the <span className="text-slate-200 font-medium">AP Pattadar Pass Books Act 1971</span>, <span className="text-slate-200 font-medium">Section 22-A Prohibitions</span>, <span className="text-slate-200 font-medium">F-Line Survey Demarcation</span>, and <span className="text-slate-200 font-medium">AP Assigned Lands (POT) Act 1977</span>.
              </p>
            </div>

            {/* Quick Risk Gauge Pill */}
            <div className="glass-card p-3.5 rounded-2xl border border-slate-800 flex items-center gap-4 shrink-0">
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Title Risk Index</span>
                <span className="text-xs font-semibold text-slate-200">{auditResult.verdict.marketabilityRating}</span>
              </div>
              <div className={`relative w-14 h-14 rounded-full flex items-center justify-center font-black text-sm border-2 ${
                record.riskScore > 80 
                  ? "border-red-500 text-red-400 bg-red-950/40 crimson-glow" 
                  : record.riskScore > 40 
                  ? "border-amber-500 text-amber-400 bg-amber-950/40 gold-glow" 
                  : "border-emerald-500 text-emerald-400 bg-emerald-950/40 emerald-glow"
              }`}>
                {record.riskScore}%
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative flex flex-col sm:flex-row items-center gap-2.5">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Enter AP Survey Number / Sub-Division (e.g., 104/2, 88/4A, 45/1, 112/B, 210/3)..."
                className="w-full bg-slate-900/90 text-slate-100 text-sm font-medium pl-12 pr-4 py-3.5 rounded-2xl border border-slate-700/80 focus:outline-none focus:ring-2 focus:ring-amber-500/50 shadow-inner"
              />
            </div>
            <button
              onClick={() => handleSearch()}
              disabled={isLoading}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 shrink-0"
            >
              {isLoading ? (
                <Sparkles className="w-4 h-4 animate-spin" />
              ) : (
                <Scale className="w-4 h-4" />
              )}
              <span>Audit Title</span>
            </button>
          </div>

          {/* Preset Scenario Quick Selectors */}
          <div className="space-y-2">
            <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-amber-400" /> Quick-Test High Court & Revenue Edge Cases:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              <button
                onClick={() => handleSelectPreset("104/2")}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  currentSurvey === "104/2"
                    ? "bg-emerald-950/40 border-emerald-500/60 ring-1 ring-emerald-500/30"
                    : "bg-slate-900/60 hover:bg-slate-900 border-slate-800"
                }`}
              >
                <span className="text-[11px] font-bold text-emerald-400 block truncate">🟢 Sy. 104/2</span>
                <span className="text-[9px] text-slate-400 block truncate">Clear Marketable Title</span>
              </button>

              <button
                onClick={() => handleSelectPreset("88/4A")}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  currentSurvey === "88/4A"
                    ? "bg-red-950/40 border-red-500/60 ring-1 ring-red-500/30"
                    : "bg-slate-900/60 hover:bg-slate-900 border-slate-800"
                }`}
              >
                <span className="text-[11px] font-bold text-red-400 block truncate">🔴 Sy. 88/4A</span>
                <span className="text-[9px] text-slate-400 block truncate">22-A Simhachalam Inam</span>
              </button>

              <button
                onClick={() => handleSelectPreset("45/1")}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  currentSurvey === "45/1"
                    ? "bg-amber-950/40 border-amber-500/60 ring-1 ring-amber-500/30"
                    : "bg-slate-900/60 hover:bg-slate-900 border-slate-800"
                }`}
              >
                <span className="text-[11px] font-bold text-amber-400 block truncate">🟡 Sy. 45/1</span>
                <span className="text-[9px] text-slate-400 block truncate">Boundary 28 Cts Deficit</span>
              </button>

              <button
                onClick={() => handleSelectPreset("112/B")}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  currentSurvey === "112/B"
                    ? "bg-red-950/40 border-red-500/60 ring-1 ring-red-500/30"
                    : "bg-slate-900/60 hover:bg-slate-900 border-slate-800"
                }`}
              >
                <span className="text-[11px] font-bold text-red-400 block truncate">🔴 Sy. 112/B</span>
                <span className="text-[9px] text-slate-400 block truncate">Assigned POT Act Void</span>
              </button>

              <button
                onClick={() => handleSelectPreset("210/3")}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  currentSurvey === "210/3"
                    ? "bg-amber-950/40 border-amber-500/60 ring-1 ring-amber-500/30"
                    : "bg-slate-900/60 hover:bg-slate-900 border-slate-800"
                }`}
              >
                <span className="text-[11px] font-bold text-amber-400 block truncate">🟡 Sy. 210/3</span>
                <span className="text-[9px] text-slate-400 block truncate">Dotted Land (చుక్కల)</span>
              </button>

              <button
                onClick={() => handleSelectPreset("34/1C")}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  currentSurvey === "34/1C"
                    ? "bg-amber-950/40 border-amber-500/60 ring-1 ring-amber-500/30"
                    : "bg-slate-900/60 hover:bg-slate-900 border-slate-800"
                }`}
              >
                <span className="text-[11px] font-bold text-amber-400 block truncate">🟠 Sy. 34/1C</span>
                <span className="text-[9px] text-slate-400 block truncate">Adverse Possession Art 65</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Workspace Navigation Tabs */}
      <div className="sticky top-[69px] z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 px-4 lg:px-8 py-2 no-print">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab("audit")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === "audit"
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>Statutory Title Audit</span>
          </button>

          <button
            onClick={() => setActiveTab("meebhoomi")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === "meebhoomi"
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>MeeBhoomi & 22-A Grid</span>
          </button>

          <button
            onClick={() => setActiveTab("map")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === "map"
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>F-Line Cadastral Map (FMB)</span>
          </button>

          <button
            onClick={() => setActiveTab("petitions")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === "petitions"
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Petitions & Notices</span>
          </button>

          <button
            onClick={() => setActiveTab("chat")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === "chat"
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>AI Legal Advocate Chat</span>
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <main className="max-w-7xl mx-auto w-full p-4 lg:p-8 flex-1">
        {activeTab === "audit" && (
          <AuditReportView
            record={record}
            auditResult={auditResult}
          />
        )}

        {activeTab === "meebhoomi" && (
          <div className="space-y-6">
            <MeeBhoomiVerificationCard record={record} />
          </div>
        )}

        {activeTab === "map" && (
          <div className="space-y-6">
            <FLineMapViewer record={record} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-slate-200 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  Statutory Boundary Coordinates (WGS-84)
                </h4>
                <div className="space-y-1.5 font-mono text-xs text-slate-300">
                  <p>Point A (NW): {record.boundaryAndPossession.gpsCoordinates.pointA.join(", ")}</p>
                  <p>Point B (NE): {record.boundaryAndPossession.gpsCoordinates.pointB.join(", ")}</p>
                  <p>Point C (SE): {record.boundaryAndPossession.gpsCoordinates.pointC.join(", ")}</p>
                  <p>Point D (SW): {record.boundaryAndPossession.gpsCoordinates.pointD.join(", ")}</p>
                </div>
              </div>
              <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-slate-200 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-amber-400" />
                  Adjacent Survey Holders
                </h4>
                <div className="space-y-1 text-xs text-slate-300">
                  <p><strong className="text-slate-400">North:</strong> {record.boundaryAndPossession.boundaries.north}</p>
                  <p><strong className="text-slate-400">South:</strong> {record.boundaryAndPossession.boundaries.south}</p>
                  <p><strong className="text-slate-400">East:</strong> {record.boundaryAndPossession.boundaries.east}</p>
                  <p><strong className="text-slate-400">West:</strong> {record.boundaryAndPossession.boundaries.west}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "petitions" && (
          <StatutoryNoticeGenerator record={record} />
        )}

        {activeTab === "chat" && (
          <LegalAdvisorChat
            record={record}
            district={district}
            language={language}
            customApiKey={customApiKey}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="glass-panel border-t border-slate-800/80 px-4 lg:px-8 py-5 mt-auto no-print">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-amber-400" />
            <span>LandNyaya (ల్యాండ్ న్యాయ) — Built for Andhra Pradesh Land Revenue & Judicial Due Diligence</span>
          </div>
          <div className="text-[11px] font-mono text-slate-400">
            Compliant with AP ROR Act 1971 • AP Survey Act 1923 • CARD AP 22-A
          </div>
        </div>
      </footer>
    </div>
  );
}
