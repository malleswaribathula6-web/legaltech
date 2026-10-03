"use client";

import React, { useState } from "react";
import { LandRecord } from "@/lib/mockData";
import { MapPin, Compass, Layers, AlertTriangle, CheckCircle, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";

interface FLineMapViewerProps {
  record: LandRecord;
}

export default function FLineMapViewer({ record }: FLineMapViewerProps) {
  const [mapMode, setMapMode] = useState<"cadastral" | "fmb" | "satellite">("cadastral");
  const [selectedStone, setSelectedStone] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const hasDispute = record.boundaryAndPossession.disputeFlag;
  const coords = record.boundaryAndPossession.gpsCoordinates;

  return (
    <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
      {/* Map Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 bg-slate-900/90 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              F-Line Cadastral Survey Demarcation Map (FMB)
              {hasDispute ? (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 font-semibold border border-red-500/30 animate-pulse">
                  Boundary Deficit Flagged
                </span>
              ) : (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                  Demarcated & Verified
                </span>
              )}
            </h3>
            <p className="text-[11px] text-slate-400">
              Survey No: <span className="font-mono text-amber-300">{record.surveyNumber}</span> | Village: {record.village} | Total Extent: {record.totalExtent}
            </p>
          </div>
        </div>

        {/* Map View Mode Switchers */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setMapMode("cadastral")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              mapMode === "cadastral"
                ? "bg-amber-500 text-slate-950 font-bold"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Cadastral FMB
          </button>
          <button
            onClick={() => setMapMode("fmb")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              mapMode === "fmb"
                ? "bg-amber-500 text-slate-950 font-bold"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Field Stones
          </button>
          <button
            onClick={() => setMapMode("satellite")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              mapMode === "satellite"
                ? "bg-amber-500 text-slate-950 font-bold"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Satellite View
          </button>
        </div>
      </div>

      {/* Interactive SVG Canvas Area */}
      <div className={`relative w-full h-80 md:h-96 flex items-center justify-center overflow-hidden transition-colors ${
        mapMode === "satellite" ? "bg-[#0c1829]" : "bg-[#060b13]"
      }`}>
        {/* Background Grid Lines (Cadastral Style) */}
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: "radial-gradient(circle, #38bdf8 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }}
        />

        {/* Satellite Imagery Simulation Gradient */}
        {mapMode === "satellite" && (
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/30 via-slate-900/60 to-amber-950/30 pointer-events-none" />
        )}

        {/* SVG Drawing of Parcel */}
        <svg 
          viewBox="0 0 600 360" 
          className="w-full h-full p-4 select-none"
          style={{ transform: `scale(${zoomLevel})`, transition: "transform 0.2s ease" }}
        >
          {/* North Direction Indicator */}
          <g transform="translate(540, 45)">
            <circle cx="0" cy="0" r="22" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
            <path d="M 0 -16 L 6 8 L 0 4 L -6 8 Z" fill="#f59e0b" />
            <path d="M 0 4 L 6 8 L 0 16 L -6 8 Z" fill="#475569" />
            <text x="0" y="-20" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="bold" fontFamily="monospace">N</text>
          </g>

          {/* Adjacent Boundaries Surrounding Text */}
          {/* North */}
          <text x="300" y="35" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="sans-serif">
            NORTH: {record.boundaryAndPossession.boundaries.north}
          </text>
          {/* South */}
          <text x="300" y="340" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="sans-serif">
            SOUTH: {record.boundaryAndPossession.boundaries.south}
          </text>
          {/* West */}
          <text x="50" y="180" textAnchor="middle" fill="#94a3b8" fontSize="10" transform="rotate(-90, 50, 180)">
            WEST: {record.boundaryAndPossession.boundaries.west}
          </text>
          {/* East */}
          <text x="550" y="180" textAnchor="middle" fill="#94a3b8" fontSize="10" transform="rotate(90, 550, 180)">
            EAST: {record.boundaryAndPossession.boundaries.east}
          </text>

          {/* Main Land Parcel Polygon */}
          <polygon
            points="140,80 460,95 430,270 160,260"
            fill={hasDispute ? "rgba(239, 68, 68, 0.12)" : "rgba(16, 185, 129, 0.12)"}
            stroke={hasDispute ? "#ef4444" : "#10b981"}
            strokeWidth="2.5"
            strokeDasharray={mapMode === "fmb" ? "4 4" : "none"}
            className="transition-all duration-300"
          />

          {/* F-Line Diagonal Demarcation Ties (Surveyor Triangulation) */}
          <line x1="140" y1="80" x2="430" y2="270" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
          <line x1="460" y1="95" x2="160" y2="260" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

          {/* Disputed Encroachment Polygon (If Applicable) */}
          {hasDispute && (
            <g>
              <polygon
                points="460,95 430,270 380,240 410,110"
                fill="rgba(239, 68, 68, 0.35)"
                stroke="#dc2626"
                strokeWidth="2"
                strokeDasharray="2 2"
              >
                <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite" />
              </polygon>
              <text x="420" y="175" fill="#fca5a5" fontSize="11" fontWeight="bold" textAnchor="middle">
                ⚠️ Encroached Area
              </text>
              <text x="420" y="190" fill="#fecaca" fontSize="9" textAnchor="middle">
                ({record.boundaryAndPossession.encroachmentExtent || "Disputed"})
              </text>
            </g>
          )}

          {/* Center Label */}
          <g transform="translate(290, 165)">
            <rect x="-85" y="-22" width="170" height="44" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1" />
            <text x="0" y="-4" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="bold">
              Sy. No. {record.surveyNumber}
            </text>
            <text x="0" y="13" textAnchor="middle" fill="#fbbf24" fontSize="10" fontFamily="monospace">
              {record.totalExtent}
            </text>
          </g>

          {/* Boundary Field Stones (Points A, B, C, D) */}
          {/* Point A (Top-Left) */}
          <g 
            transform="translate(140, 80)" 
            className="cursor-pointer group"
            onClick={() => setSelectedStone("Point A (North-West Stone)")}
          >
            <circle cx="0" cy="0" r="10" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
            <text x="0" y="4" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="bold">A</text>
            <text x="-12" y="-14" fill="#cbd5e1" fontSize="10" fontWeight="semibold">St-A</text>
          </g>

          {/* Point B (Top-Right) */}
          <g 
            transform="translate(460, 95)" 
            className="cursor-pointer group"
            onClick={() => setSelectedStone("Point B (North-East Stone)")}
          >
            <circle cx="0" cy="0" r="10" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
            <text x="0" y="4" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="bold">B</text>
            <text x="12" y="-14" fill="#cbd5e1" fontSize="10" fontWeight="semibold">St-B</text>
          </g>

          {/* Point C (Bottom-Right) */}
          <g 
            transform="translate(430, 270)" 
            className="cursor-pointer group"
            onClick={() => setSelectedStone("Point C (South-East Stone)")}
          >
            <circle cx="0" cy="0" r="10" fill={hasDispute ? "#ef4444" : "#f59e0b"} stroke="#ffffff" strokeWidth="2" />
            <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">C</text>
            <text x="14" y="18" fill="#cbd5e1" fontSize="10" fontWeight="semibold">St-C</text>
          </g>

          {/* Point D (Bottom-Left) */}
          <g 
            transform="translate(160, 260)" 
            className="cursor-pointer group"
            onClick={() => setSelectedStone("Point D (South-West Stone)")}
          >
            <circle cx="0" cy="0" r="10" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
            <text x="0" y="4" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="bold">D</text>
            <text x="-14" y="18" fill="#cbd5e1" fontSize="10" fontWeight="semibold">St-D</text>
          </g>

          {/* Distance Dimension Labels */}
          {/* Top (A -> B) */}
          <text x="300" y="78" textAnchor="middle" fill="#38bdf8" fontSize="10" fontFamily="monospace">
            320 Links (64.3 m)
          </text>
          {/* Bottom (D -> C) */}
          <text x="295" y="280" textAnchor="middle" fill="#38bdf8" fontSize="10" fontFamily="monospace">
            270 Links (54.2 m)
          </text>
          {/* Left (A -> D) */}
          <text x="120" y="175" textAnchor="middle" fill="#38bdf8" fontSize="10" fontFamily="monospace">
            180 Links
          </text>
          {/* Right (B -> C) */}
          <text x="475" y="185" textAnchor="middle" fill={hasDispute ? "#f87171" : "#38bdf8"} fontSize="10" fontFamily="monospace">
            175 Links
          </text>
        </svg>

        {/* Zoom & View Controls Overlay */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md p-1.5 rounded-xl border border-slate-700/80 shadow-lg">
          <button
            onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 1.8))}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.8))}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel(1)}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg"
            title="Reset View"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Selected Field Stone Inspector Toast */}
        {selectedStone && (
          <div className="absolute top-3 left-3 glass-panel px-3.5 py-2 rounded-xl border border-amber-500/40 text-xs shadow-xl animate-fade-in flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <div>
              <p className="font-bold text-slate-200">{selectedStone}</p>
              <p className="text-[10px] text-slate-400 font-mono">
                GPS: {coords.pointA[0].toFixed(4)}°N, {coords.pointA[1].toFixed(4)}°E
              </p>
            </div>
            <button 
              onClick={() => setSelectedStone(null)}
              className="text-slate-400 hover:text-slate-200 text-xs ml-2"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Map Footer Information */}
      <div className="px-5 py-3 bg-slate-900/60 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-4 text-slate-300">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500" />
            <span className="text-[11px]">Clean Field Boundary</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500" />
            <span className="text-[11px]">Survey Stones (A-D)</span>
          </div>
          {hasDispute && (
            <div className="flex items-center gap-1.5 text-red-400">
              <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500" />
              <span className="text-[11px] font-semibold">Encroachment Zone</span>
            </div>
          )}
        </div>

        <div className="text-[11px] text-slate-400 font-mono">
          FMB Scale: 1:1000 Metric | Revenue Datum: WGS-84
        </div>
      </div>
    </div>
  );
}
