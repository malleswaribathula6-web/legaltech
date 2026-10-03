"use client";

import React, { useState, useRef, useEffect } from "react";
import { LandRecord } from "@/lib/mockData";
import { MessageSquare, Send, Bot, User, Sparkles, Scale, HelpCircle } from "lucide-react";

interface LegalAdvisorChatProps {
  record: LandRecord;
  district: string;
  language: "en" | "te" | "hi";
  customApiKey: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  time: string;
}

const QUICK_PROMPTS = [
  "Can I execute a registered sale deed for this land right now?",
  "How to remove Section 22-A prohibited flag through District Collector?",
  "What is the step-by-step procedure for F-Line Survey Demarcation in MeeSeva?",
  "What remedies exist under Section 5-B if the Tahsildar rejects 1-B mutation?",
  "Is assigned land eligible for sale after 20 years under the 2023 AP Amendment?"
];

export default function LegalAdvisorChat({
  record,
  district,
  language,
  customApiKey
}: LegalAdvisorChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Namaste. I am **LandNyaya**, your autonomous AP Land Revenue & LegalTech Advocate. I have loaded the title records for **Survey No. ${record.surveyNumber}** in **${record.village}, ${record.mandal}, ${record.district}**.\n\nAsk me any statutory questions about MeeBhoomi 1-B mutations, Section 22-A de-notification, F-Line boundaries, or High Court writ remedies.`,
      time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg: Message = {
      role: "user",
      content: query,
      time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(customApiKey ? { "x-openrouter-key": customApiKey } : {})
        },
        body: JSON.stringify({
          surveyNumber: record.surveyNumber,
          district: record.district,
          language,
          action: "chat",
          chatMessage: query,
          chatHistory: messages.map((m) => ({ role: m.role, content: m.content }))
        })
      });

      const data = await res.json();
      const botReply = data.reply || data.aiAnalysis || "Statutory analysis completed.";

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: botReply,
          time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "An error occurred while connecting to the legal reasoning engine. Please retry.",
          time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel rounded-2xl border border-slate-800 flex flex-col h-[520px] shadow-2xl overflow-hidden">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900/90 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 font-bold shadow">
            <Scale className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
              LandNyaya Autonomous Legal Counsel
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </h3>
            <p className="text-[10px] text-slate-400 font-mono">
              AP Land Laws Knowledge Base Active (Act 26/1971, Act 9/1977, Act 10/2017)
            </p>
          </div>
        </div>

        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-amber-300 font-mono border border-slate-700">
          Sy. No. {record.surveyNumber}
        </span>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2.5 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}
          >
            <div
              className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                m.role === "user"
                  ? "bg-amber-500 text-slate-950 font-bold"
                  : "bg-slate-800 text-amber-400 border border-slate-700"
              }`}
            >
              {m.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`max-w-[82%] p-3.5 rounded-2xl whitespace-pre-wrap leading-relaxed ${
                m.role === "user"
                  ? "bg-amber-500 text-slate-950 font-medium rounded-tr-none shadow-md"
                  : "glass-card text-slate-200 rounded-tl-none border border-slate-700/80 shadow"
              }`}
            >
              {m.content}
              <div
                className={`text-[9px] mt-1.5 text-right font-mono ${
                  m.role === "user" ? "text-slate-800" : "text-slate-500"
                }`}
              >
                {m.time}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-amber-400 p-2">
            <Sparkles className="w-4 h-4 animate-spin" />
            <span>Consulting Andhra Pradesh Land Revenue Acts & Judicial Citations...</span>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="px-4 py-2 bg-slate-950/60 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto text-[10px] no-scrollbar">
        <span className="text-slate-500 font-semibold shrink-0 flex items-center gap-1">
          <HelpCircle className="w-3 h-3" /> Quick:
        </span>
        {QUICK_PROMPTS.map((qp, i) => (
          <button
            key={i}
            onClick={() => handleSend(qp)}
            className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 shrink-0 transition-all truncate max-w-[220px]"
          >
            {qp}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder={`Ask legal questions regarding Sy. No. ${record.surveyNumber} or AP Land Laws...`}
          className="flex-1 bg-slate-950 text-slate-200 text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
        />
        <button
          onClick={() => handleSend()}
          disabled={loading || !input.trim()}
          className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold transition-all shadow-md shadow-amber-500/20"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
