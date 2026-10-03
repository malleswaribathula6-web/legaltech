"use client";

import React, { useState } from "react";
import { Scale, ShieldCheck, Globe, Key, Database, Sparkles, CheckCircle2 } from "lucide-react";

interface NavbarProps {
  district: string;
  setDistrict: (district: string) => void;
  language: "en" | "te" | "hi";
  setLanguage: (lang: "en" | "te" | "hi") => void;
  customApiKey: string;
  setCustomApiKey: (key: string) => void;
}

const AP_DISTRICTS = [
  "NTR (Vijayawada)",
  "Visakhapatnam",
  "Guntur",
  "Tirupati",
  "Krishna (Machilipatnam)",
  "East Godavari (Rajamahendravaram)",
  "West Godavari (Bhimavaram)",
  "Chittoor",
  "Kurnool",
  "Ananthapuramu",
  "SPSR Nellore",
  "YSR Kadapa",
  "Prakasam (Ongole)",
  "Kakinada",
  "Dr. B.R. Ambedkar Konaseema",
  "Eluru",
  "Palnadu (Narasaraopet)",
  "Bapatla",
  "Anakapalli",
  "Kakinada",
  "Vizianagaram",
  "Srikakulam",
  "Parvathipuram Manyam",
  "Alluri Sitharama Raju",
  "Sri Sathya Sai (Puttaparthi)",
  "Annamayya (Rayachoti)",
  "Nandyal"
];

export default function Navbar({
  district,
  setDistrict,
  language,
  setLanguage,
  customApiKey,
  setCustomApiKey,
}: NavbarProps) {
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [tempKey, setTempKey] = useState(customApiKey);

  const saveKey = () => {
    setCustomApiKey(tempKey);
    setShowKeyModal(false);
  };

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 px-4 lg:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand & Emblem */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 text-slate-950 font-bold shadow-lg shadow-amber-500/20 ring-2 ring-amber-400/40">
            <Scale className="w-6 h-6 stroke-[2.2]" />
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-slate-950 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-amber-200 via-white to-amber-400 bg-clip-text text-transparent">
                LandNyaya
              </h1>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 font-semibold border border-amber-500/30">
                ల్యాండ్ న్యాయ
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 font-mono font-medium">
                AP STATUTORY AGENT v2.5
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Andhra Pradesh Land Revenue & Title Due Diligence Intelligence Engine
            </p>
          </div>
        </div>

        {/* Live AP Portals Beacon & Selectors */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* AP Gateway Status */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <Database className="w-3.5 h-3.5" />
              <span className="text-[11px] font-medium">MeeBhoomi 1-B: <strong className="text-emerald-300">Live</strong></span>
            </div>
            <span className="text-slate-600">|</span>
            <div className="flex items-center gap-1.5 text-blue-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="text-[11px] font-medium">Sec 22-A CARD: <strong className="text-blue-300">Synced</strong></span>
            </div>
          </div>

          {/* District Selector */}
          <div className="relative">
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="bg-slate-900 text-slate-200 text-xs font-medium rounded-lg border border-slate-700/80 px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-amber-500/40 cursor-pointer appearance-none"
            >
              {AP_DISTRICTS.map((d) => (
                <option key={d} value={d} className="bg-slate-900 text-slate-200">
                  📍 {d}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-[10px]">
              ▼
            </div>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center bg-slate-900 rounded-lg p-0.5 border border-slate-700/80 text-xs">
            <button
              onClick={() => setLanguage("en")}
              className={`px-2.5 py-1 rounded-md transition-all ${
                language === "en"
                  ? "bg-amber-500 text-slate-950 font-bold shadow"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage("te")}
              className={`px-2.5 py-1 rounded-md transition-all ${
                language === "te"
                  ? "bg-amber-500 text-slate-950 font-bold shadow"
                  : "text-slate-400 hover:text-slate-200"
              }`}
              title="Telugu"
            >
              తెలుగు
            </button>
            <button
              onClick={() => setLanguage("hi")}
              className={`px-2.5 py-1 rounded-md transition-all ${
                language === "hi"
                  ? "bg-amber-500 text-slate-950 font-bold shadow"
                  : "text-slate-400 hover:text-slate-200"
              }`}
              title="Hindi"
            >
              हिन्दी
            </button>
          </div>

          {/* API Key Configure Button */}
          <button
            onClick={() => setShowKeyModal(true)}
            className={`flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg border transition-all ${
              customApiKey
                ? "bg-emerald-950/50 border-emerald-500/40 text-emerald-300"
                : "bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-300"
            }`}
            title="Configure OpenRouter / Gemini API Key"
          >
            <Key className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {customApiKey ? "Key Active" : "LLM API Key"}
            </span>
          </button>
        </div>
      </div>

      {/* API Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="glass-panel w-full max-w-md p-6 rounded-2xl border border-amber-500/30 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-100 text-lg">AI LLM Integration</h3>
                <p className="text-xs text-slate-400">Optional: Connect OpenRouter / Gemini key for live LLM streaming</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 mb-4 bg-slate-900/90 p-3 rounded-xl border border-slate-800">
              💡 <strong>Note:</strong> LandNyaya includes a built-in <strong>Autonomous Andhra Pradesh Statutory Reasoning AI</strong> that works 100% out of the box with zero setup. Adding an OpenRouter key connects external Gemini-2.5-Flash live models.
            </p>

            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              OpenRouter API Key (sk-or-...)
            </label>
            <input
              type="password"
              value={tempKey}
              onChange={(e) => setTempKey(e.target.value)}
              placeholder="sk-or-v1-..."
              className="w-full bg-slate-950 text-slate-200 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 mb-5 font-mono"
            />

            <div className="flex items-center justify-end gap-2.5">
              <button
                onClick={() => setShowKeyModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={saveKey}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all shadow-md shadow-amber-500/20"
              >
                <CheckCircle2 className="w-4 h-4" /> Save Configuration
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
