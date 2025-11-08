import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

export default function SkyScaleCopilotPage() {
  const [askOpen, setAskOpen] = useState(true);
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [evidence, setEvidence] = useState("");
  const [showEvidence, setShowEvidence] = useState(false);
  const [loading, setLoading] = useState(false);

  const [serviceName, setServiceName] = useState("search");
  const [sources, setSources] = useState([]); // where the answer came from

  const textareaRef = useRef(null);

  const handleChange = (e) => {
    setQuery(e.target.value);

    // Auto-resize textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  };

  const handleAsk = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setAnswer("");
    setEvidence("");
    setShowEvidence(false);
    setSources([]);

    try {
      const payload = {
        tenant_id: "skyscale-prod",
        question: query,
        context: {
          service_name: serviceName, // 👈 dynamic service
          region: "us-east-1",
        },
      };

      const res = await fetch("http://localhost:3000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "prg_live_skyscale_demo",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Ask failed", text);
        setAnswer(`Backend error (${res.status}): ${text}`);
        setEvidence("");
        return;
      }

      const data = await res.json();

      // ------- MAIN ANSWER -------
      const primaryAnswer =
        data.answer ||
        data.response ||
        data.output ||
        data.message ||
        "No answer returned from the copilot.";

      setAnswer(
        typeof primaryAnswer === "string"
          ? primaryAnswer
          : JSON.stringify(primaryAnswer, null, 2)
      );

      // ------- EVIDENCE / PLAN -------
      const rawEvidence =
        data.evidence ||
        (data.source || data.plan_trace
          ? { source: data.source, plan_trace: data.plan_trace }
          : null) ||
        data.plan ||
        data.rationale ||
        data.debug ||
        data.context ||
        null;

      if (rawEvidence) {
        setEvidence(
          typeof rawEvidence === "string"
            ? rawEvidence
            : JSON.stringify(rawEvidence, null, 2)
        );
      } else {
        setEvidence("");
      }

      // ------- SOURCES / LINKS -------
      const rawSources =
        data.sources ||
        data.source_docs ||
        data.documents ||
        data.context_docs ||
        [];

      let normalized = [];
      if (Array.isArray(rawSources)) {
        normalized = rawSources.map((src) => {
          if (typeof src === "string") {
            return { title: src };
          }
          // object: try to pick useful fields
          return {
            title: src.title || src.name || src.id || "Untitled source",
            url: src.url || src.link || src.href || null,
            snippet: src.snippet || src.preview || src.summary || null,
          };
        });
      } else if (rawSources && typeof rawSources === "object") {
        normalized = [
          {
            title:
              rawSources.title ||
              rawSources.name ||
              rawSources.id ||
              "Source",
            url:
              rawSources.url ||
              rawSources.link ||
              rawSources.href ||
              null,
            snippet:
              rawSources.snippet ||
              rawSources.preview ||
              rawSources.summary ||
              null,
          },
        ];
      }

      setSources(normalized);
    } catch (err) {
      console.error(err);
      setAnswer("Something went wrong while talking to the copilot.");
      setEvidence("");
      setSources([]);
    } finally {
      setLoading(false);
    }
  };

  const disabled = !askOpen || query.trim() === "" || loading;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-6 py-6 lg:px-8 lg:py-10">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-slate-900/80 px-3.5 py-1 text-[11px] font-semibold tracking-wide text-slate-200 ring-1 ring-slate-700/70">
              <Link to="/">SKY SCALE CLOUD</Link>
            </div>
            <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
              On-Call Copilot
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Service selector */}
            <div className="flex items-center gap-2 text-[11px] text-slate-300">
              <span className="uppercase tracking-[0.16em] text-slate-500">
                Service
              </span>
              <select
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                className="h-8 rounded-full bg-slate-900/80 px-3 text-[11px] text-slate-100 outline-none ring-1 ring-slate-700/80 focus:ring-sky-500/80"
              >
                <option value="search">search</option>
                <option value="checkout">checkout</option>
                <option value="payments">payments</option>
                <option value="notifications">notifications</option>
              </select>
            </div>

            <button
              type="button"
              className="rounded-full bg-slate-900/80 px-4 py-1.5 text-xs font-semibold text-slate-100 shadow-sm ring-1 ring-slate-700/80"
            >
              MENU
            </button>
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-8 lg:flex-row">
          {/* LEFT: Hero / copy */}
          <section className="flex flex-col justify-center space-y-6 lg:w-5/12">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl lg:text-[40px]">
                SkyScale On-Call Copilot
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-300">
                Ask production questions in natural language. PlanRAG pulls the
                right runbooks, incident timelines, dashboards, and changes to
                give you a grounded, step-by-step response.
              </p>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <p>
                  <span className="font-semibold text-slate-100">
                    Incident-aware answers
                  </span>
                  <span className="ml-1">
                    scoped to tenant, region, and service context.
                  </span>
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-sky-400" />
                <p>
                  <span className="font-semibold text-slate-100">
                    Evidence included
                  </span>
                  <span className="ml-1">
                    open the{" "}
                    <span className="font-semibold text-slate-50">
                      Evidence
                    </span>{" "}
                    bar to see the plan behind every answer.
                  </span>
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-amber-400" />
                <p>
                  <span className="font-semibold text-slate-100">
                    Ready for P1s
                  </span>
                  <span className="ml-1">
                    tuned for fast triage in high-noise environments.
                  </span>
                </p>
              </div>
            </div>

            {/* Dot logo */}
            <div className="mt-6">
              <div className="inline-flex rounded-2xl bg-slate-900/70 p-4 ring-1 ring-slate-700/80">
                <svg viewBox="0 0 24 24" className="h-16 w-16 text-sky-400">
                  {Array.from({ length: 5 }).map((_, r) =>
                    Array.from({ length: 5 }).map((_, c) => (
                      <circle
                        key={`${r}-${c}`}
                        cx={3 + c * 4.5}
                        cy={3 + r * 4.5}
                        r={1.4}
                        fill="currentColor"
                      />
                    ))
                  )}
                </svg>
              </div>
            </div>
          </section>

          {/* RIGHT: Copilot panel */}
          <section className="flex flex-1 flex-col lg:w-7/12">
            <div className="flex h-full flex-col rounded-3xl bg-slate-900/80 p-4 pb-3 shadow-[0_18px_70px_rgba(0,0,0,0.7)] ring-1 ring-slate-700/80">
              {/* Top: question context */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 rounded-full bg-slate-800/90 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Live Copilot Session
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Tenant:{" "}
                    <span className="font-semibold text-slate-200">
                      skyscale-prod
                    </span>{" "}
                    · Region:{" "}
                    <span className="font-semibold text-slate-200">
                      us-east-1
                    </span>{" "}
                    · Service:{" "}
                    <span className="font-semibold text-slate-200">
                      {serviceName}
                    </span>
                  </p>
                </div>
              </div>

              {/* Middle: answer area */}
              <div className="mt-3 flex-1 overflow-hidden rounded-2xl bg-slate-950/60 ring-1 ring-slate-800/80">
                <div className="flex h-full flex-col">
                  {/* Main answer */}
                  <div className="flex-1 space-y-3 overflow-auto px-4 py-3">
                    <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
                      Copilot answer
                    </div>

                    {!answer && !loading && (
                      <div className="mt-1 text-sm leading-relaxed text-slate-400">
                        Ask a question like{" "}
                        <span className="font-medium text-slate-100">
                          “Users say {serviceName} is failing in us-east-1. What
                          should I check first?”
                        </span>{" "}
                        and the copilot will propose a triage plan.
                      </div>
                    )}

                    {loading && (
                      <div className="mt-2 flex items-center gap-2 text-sm text-slate-300">
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-800">
                          <span className="h-2.5 w-2.5 animate-ping rounded-full bg-sky-400" />
                        </span>
                        Thinking with PlanRAG…
                      </div>
                    )}

                    {answer && !loading && (
                      <div className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-slate-100">
                        {answer}
                      </div>
                    )}

                    {/* Sources section */}
                    {sources.length > 0 && (
                      <div className="mt-3 rounded-xl bg-slate-950/80 px-3 py-2.5 text-[11px] text-slate-300 ring-1 ring-slate-800/90">
                        <div className="mb-1 flex items-center justify-between">
                          <span className="font-semibold uppercase tracking-[0.16em] text-slate-400">
                            Answer sources
                          </span>
                          <span className="text-[10px] text-slate-500">
                            {sources.length} document
                            {sources.length > 1 ? "s" : ""}
                          </span>
                        </div>
                        <ul className="space-y-1.5">
                          {sources.map((src, idx) => (
                            <li
                              key={idx}
                              className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between"
                            >
                              <div className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                                {src.url ? (
                                  <a
                                    href={src.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-[11px] font-medium text-sky-300 hover:underline"
                                  >
                                    {src.title || src.url}
                                  </a>
                                ) : (
                                  <span className="text-[11px] font-medium text-slate-100">
                                    {src.title}
                                  </span>
                                )}
                              </div>
                              {src.snippet && (
                                <span className="ml-4 text-[10px] text-slate-500">
                                  {src.snippet}
                                </span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Evidence bar */}
                  {answer && (
                    <div className="border-t border-slate-800/80 bg-slate-950/80">
                      <button
                        type="button"
                        onClick={() => setShowEvidence((v) => !v)}
                        className="flex w-full items-center justify-between px-4 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-300 hover:bg-slate-900/90"
                      >
                        <div className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                          Evidence · Plan behind this answer
                        </div>
                        <span className="text-slate-400">
                          {showEvidence ? "−" : "+"}
                        </span>
                      </button>

                      {showEvidence && (
                        <div className="max-h-48 overflow-auto border-t border-slate-800/80 bg-slate-950/95 px-4 py-2.5 text-[12px] leading-relaxed text-slate-200">
                          {evidence ? (
                            <pre className="whitespace-pre-wrap text-[11px] leading-relaxed text-slate-200">
                              {evidence}
                            </pre>
                          ) : (
                            <p className="text-[11px] text-slate-400">
                              No explicit evidence was returned by the backend
                              for this answer.
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom: ask bar */}
              <div className="mt-3 flex items-end justify-between gap-3">
                {/* Left label */}
                <div className="hidden text-[11px] font-medium text-slate-400 sm:block">
                  On-call scope:{" "}
                  <span className="text-slate-200">
                    {serviceName} · us-east-1
                  </span>
                </div>

                {/* Input */}
                <div className="flex flex-1 items-center gap-2">
                  {!askOpen ? (
                    <button
                      onClick={() => setAskOpen(true)}
                      className="text-[11px] uppercase tracking-[0.16em] text-slate-400"
                    >
                      Ask something…
                    </button>
                  ) : (
                    <textarea
                      ref={textareaRef}
                      rows={1}
                      autoFocus
                      placeholder="Describe the issue you’re seeing in prod…"
                      value={query}
                      onChange={handleChange}
                      className="max-h-24 w-full resize-none rounded-full bg-slate-950/70 px-4 py-2 text-[12px] leading-snug text-slate-50 shadow-inner shadow-black/40 outline-none ring-1 ring-slate-700/80 placeholder:text-slate-500 focus:ring-sky-500/70"
                    />
                  )}

                  {/* Ask button */}
                  <button
                    type="button"
                    onClick={handleAsk}
                    className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-full bg-sky-500 text-white shadow-lg shadow-sky-500/30 ring-1 ring-sky-300/60 disabled:cursor-not-allowed disabled:opacity-60"
                    aria-label="Ask copilot"
                    disabled={disabled}
                  >
                    {loading ? (
                      <svg
                        className="h-4 w-4 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-20"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-80"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
                        <path
                          d="M10 15V5M10 5l-3 3M10 5l3 3"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
