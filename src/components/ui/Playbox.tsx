"use client";

import React, { useState, useEffect, useRef } from "react";
import BentoCard from "./BentoCard";

export default function Playbox() {
  const [pipelineState, setPipelineState] = useState<"IDLE" | "BUILDING" | "TESTING" | "DEPLOYED" | "FAILED">("IDLE");
  const [logs, setLogs] = useState<string[]>(["SYSTEM READY // STANDBY"]);
  const [voltage, setVoltage] = useState<number>(1.2);
  const [frequency, setFrequency] = useState<number>(4.8);
  const logEndRef = useRef<HTMLDivElement>(null);

  const addLog = (msg: string) => {
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const runPipeline = () => {
    if (pipelineState !== "IDLE" && pipelineState !== "DEPLOYED" && pipelineState !== "FAILED") return;
    
    setLogs([]);
    setPipelineState("BUILDING");
    addLog("INITIATING BUILD SEQUENCE...");
    
    setTimeout(() => {
      addLog("COMPILING SOURCE FILES (Next.js 16 / Turbopack)...");
      addLog("LINT CHECKS PASSED.");
    }, 800);

    setTimeout(() => {
      setPipelineState("TESTING");
      addLog("STARTING UNIT TESTS & E2E COVERAGE REPORT...");
      addLog("TEST SUITES EXECUTED: 42/42 PASSED.");
    }, 1800);

    setTimeout(() => {
      if (voltage > 1.45) {
        setPipelineState("FAILED");
        addLog("CRITICAL FAILURE: VOLTAGE OVERLOAD DETECTED.");
        addLog("SYSTEM CORE THERMAL PROTECTION ACTIVATED.");
      } else {
        setPipelineState("DEPLOYED");
        addLog("OPTIMIZING PAGE DATA STATIC HTML...");
        addLog("CDN SHARDS SYNCHRONIZED SUCCESSFULLY.");
        addLog("STATUS: 100% OPERATIONAL // PRODUCTION LIVE");
      }
    }, 2800);
  };

  const resetPipeline = () => {
    setPipelineState("IDLE");
    setLogs(["SYSTEM RESET // STANDBY"]);
  };

  return (
    <BentoCard className="flex h-full min-h-[400px] flex-col justify-between overflow-hidden">
      <div>
        <div className="flex items-center justify-between border-b border-black/10 pb-2">
          <span className="text-[10px] font-mono font-bold tracking-widest text-black/50 uppercase">
            Interactive Deck // Hardware & CI
          </span>
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full border border-black ${
              pipelineState === "IDLE" ? "bg-neutral-400" :
              pipelineState === "BUILDING" ? "bg-yellow-400 animate-pulse" :
              pipelineState === "TESTING" ? "bg-orange-400 animate-pulse" :
              pipelineState === "DEPLOYED" ? "bg-emerald-400" : "bg-red-500 animate-ping"
            }`} />
            <span className="text-[9px] font-mono font-bold text-black/60">{pipelineState}</span>
          </div>
        </div>
        <h3 className="mt-4 text-2xl font-black tracking-tight text-black uppercase">
          SANDBOX DECK
        </h3>
      </div>

      {/* Screen Monitor Area */}
      <div className="mt-4 flex-1 min-h-[160px] max-h-[160px] bg-black text-white p-3 font-mono text-[9px] border-[3px] border-black overflow-y-auto flex flex-col justify-between">
        <div className="space-y-1">
          {logs.map((log, idx) => (
            <p key={idx} className={
              log.includes("FAILURE") || log.includes("CRITICAL") ? "text-red-400 font-bold" :
              log.includes("SUCCESSFULLY") || log.includes("PASSED") || log.includes("LIVE") ? "text-emerald-400 font-bold" :
              log.includes("INITIATING") ? "text-accent-blue" : "text-neutral-300"
            }>
              {log}
            </p>
          ))}
          <div ref={logEndRef} />
        </div>
        <div className="border-t border-neutral-800 pt-2 flex justify-between text-neutral-500">
          <span>VOLT: {voltage.toFixed(2)}V</span>
          <span>FREQ: {frequency.toFixed(1)}GHz</span>
          <span>LOAD: {pipelineState === "IDLE" ? "2%" : pipelineState === "DEPLOYED" ? "1%" : "94%"}</span>
        </div>
      </div>

      {/* Hardware Dial Controls */}
      <div className="mt-4 grid grid-cols-2 gap-4 border-t border-black/10 pt-4">
        <div>
          <label className="block text-[9px] font-mono font-bold text-black/60 uppercase mb-1">
            Core Voltage ({voltage}V)
          </label>
          <input
            type="range"
            min="0.9"
            max="1.6"
            step="0.05"
            value={voltage}
            onChange={(e) => {
              const v = parseFloat(e.target.value);
              setVoltage(v);
              if (v > 1.45) {
                addLog(`WARN: VOLTAGE RAISED TO ${v}V (OVERCLOCK RISK)`);
              }
            }}
            className="w-full accent-black cursor-pointer h-1.5 bg-neutral-200 rounded-none border border-black appearance-none"
          />
        </div>
        <div>
          <label className="block text-[9px] font-mono font-bold text-black/60 uppercase mb-1">
            Core Freq ({frequency}GHz)
          </label>
          <input
            type="range"
            min="2.0"
            max="6.0"
            step="0.1"
            value={frequency}
            onChange={(e) => {
              const f = parseFloat(e.target.value);
              setFrequency(f);
            }}
            className="w-full accent-black cursor-pointer h-1.5 bg-neutral-200 rounded-none border border-black appearance-none"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex gap-2">
        <button
          onClick={runPipeline}
          disabled={pipelineState === "BUILDING" || pipelineState === "TESTING"}
          className="flex-1 bg-accent-blue text-white border-[3px] border-black py-2 text-xs font-mono font-bold uppercase transition-all duration-100 shadow-[3px_3px_0px_#000000] hover:-translate-y-[1px] hover:-translate-x-[1px] hover:shadow-[4px_4px_0px_#000000] active:translate-y-[1px] active:translate-x-[1px] active:shadow-[1px_1px_0px_#000000] disabled:opacity-50 disabled:pointer-events-none"
        >
          DEPLOY pipeline
        </button>
        <button
          onClick={resetPipeline}
          className="bg-white text-black border-[3px] border-black px-3 py-2 text-xs font-mono font-bold uppercase transition-all duration-100 shadow-[3px_3px_0px_#000000] hover:-translate-y-[1px] hover:-translate-x-[1px] hover:shadow-[4px_4px_0px_#000000] active:translate-y-[1px] active:translate-x-[1px] active:shadow-[1px_1px_0px_#000000]"
        >
          RESET
        </button>
      </div>
    </BentoCard>
  );
}
