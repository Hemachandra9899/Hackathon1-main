import React, { useState, useRef } from "react";

export default function InjectDocsPage() {
  const [tenantId, setTenantId] = useState("skyscale-prod");
  const [serviceName, setServiceName] = useState("search");
  const [region, setRegion] = useState("us-east-1");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const textareaRef = useRef(null);

  const autoResizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  };

  const autoResize = (e) => {
    setContent(e.target.value);
    autoResizeTextarea();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFileName(file.name);

    // If no title yet, use filename (without extension) as default title
    if (!title) {
      const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
      setTitle(nameWithoutExt);
    }

    // Read as text in the browser
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text =
        typeof ev.target?.result === "string" ? ev.target.result : "";
      setContent(text);
      setTimeout(autoResizeTextarea, 0);
    };
    reader.readAsText(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    setError("");

    try {
      const payload = {
        tenant_id: tenantId,
        service_name: serviceName,
        region,
        document: {
          title: title || "Untitled document",
          tags: tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
          content,
          original_filename: uploadedFileName || undefined,
        },
      };

      const res = await fetch("https://planrag-backend.onrender.com/ingest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "prg_live_skyscale_demo",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
      }

      const data = await res.json();
      setStatus("Document injected successfully into PlanRAG.");
      console.log("Ingest response:", data);
    } catch (err) {
      console.error(err);
      setError("Failed to inject document. Check console & backend logs.");
    } finally {
      setLoading(false);
    }
  };

  const disabled =
    loading || !tenantId.trim() || !serviceName.trim() || !content.trim();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      <div className="mx-auto min-h-screen border-8 border-slate-900/80">
        {/* Header */}
        <header className="relative z-10">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 lg:px-8">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-slate-900/80 px-3.5 py-1 text-[11px] font-semibold tracking-[0.18em] text-slate-200 ring-1 ring-slate-700/80">
                SKY SCALE CLOUD
              </span>
              <span className="hidden text-[11px] uppercase tracking-[0.22em] text-slate-500 sm:inline-block">
                PLANRAG · DOC INGEST
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>Backend: http://localhost:3000/ingest</span>
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="mx-auto flex max-w-6xl flex-col gap-8 px-6 pb-16 pt-2 lg:flex-row lg:px-8 lg:pt-4">
          {/* Left: description / explainer */}
          <section className="flex flex-col justify-center space-y-6 lg:w-5/12">
            <div>
              <h1 className="text-[28px] font-semibold tracking-tight text-slate-50 sm:text-[32px] lg:text-[34px]">
                Inject documentation into PlanRAG.
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                Paste runbooks, postmortems, dashboard notes, or upload
                text-based files and inject them into the{" "}
                <span className="font-semibold text-slate-50">
                  skyscale-prod
                </span>{" "}
                tenant. PlanRAG will chunk, vectorize, and make them available
                to the SkyScale On-Call Copilot.
              </p>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-sky-400" />
                <p>
                  <span className="font-semibold text-slate-100">
                    Scoped ingest
                  </span>{" "}
                  by tenant, service, and region so answers stay relevant.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <p>
                  <span className="font-semibold text-slate-100">
                    Paste or upload
                  </span>{" "}
                  — text files are read in the browser and sent as JSON.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-amber-400" />
                <p>
                  <span className="font-semibold text-slate-100">
                    Tag it for later
                  </span>{" "}
                  using comma-separated tags like{" "}
                  <code className="rounded bg-slate-900/80 px-1">
                    p1, search, us-east-1
                  </code>
                  .
                </p>
              </div>
            </div>
          </section>

          {/* Right: form */}
          <section className="flex flex-1 lg:w-7/12">
            <form
              onSubmit={handleSubmit}
              className="flex w-full flex-col gap-4 rounded-3xl bg-slate-950/80 p-5 shadow-[0_18px_70px_rgba(0,0,0,0.75)] ring-1 ring-slate-800/80"
            >
              {/* Row: tenant, service, region */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
                    Tenant
                  </label>
                  <input
                    type="text"
                    value={tenantId}
                    onChange={(e) => setTenantId(e.target.value)}
                    className="h-9 rounded-full bg-slate-900/80 px-3 text-xs text-slate-100 outline-none ring-1 ring-slate-700/80 placeholder:text-slate-500 focus:ring-sky-500/70"
                    placeholder="skyscale-prod"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
                    Service
                  </label>
                  <select
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    className="h-9 rounded-full bg-slate-900/80 px-3 text-xs text-slate-100 outline-none ring-1 ring-slate-700/80 focus:ring-sky-500/70"
                  >
                    <option value="search">search</option>
                    <option value="checkout">checkout</option>
                    <option value="payments">payments</option>
                    <option value="notifications">notifications</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
                    Region
                  </label>
                  <input
                    type="text"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="h-9 rounded-full bg-slate-900/80 px-3 text-xs text-slate-100 outline-none ring-1 ring-slate-700/80 placeholder:text-slate-500 focus:ring-sky-500/70"
                    placeholder="us-east-1"
                  />
                </div>
              </div>

              {/* Title + tags */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
                    Document title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="h-9 rounded-full bg-slate-900/80 px-3 text-xs text-slate-100 outline-none ring-1 ring-slate-700/80 placeholder:text-slate-500 focus:ring-sky-500/70"
                    placeholder="P1 search relevance runbook"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
                    Tags
                  </label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="h-9 rounded-full bg-slate-900/80 px-3 text-xs text-slate-100 outline-none ring-1 ring-slate-700/80 placeholder:text-slate-500 focus:ring-sky-500/70"
                    placeholder="p1, search, us-east-1, runbook"
                  />
                </div>
              </div>

              {/* Upload + content */}
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
                  Upload document (optional)
                </label>
                <div className="flex flex-wrap items-center gap-3">
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-slate-900/80 px-3 py-1.5 text-[11px] text-slate-200 ring-1 ring-slate-700/80 hover:bg-slate-800">
                    <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-slate-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-100" />
                    </span>
                    <span>Choose file (.txt, .md, .log, .json)</span>
                    <input
                      type="file"
                      className="hidden"
                      accept=".txt,.md,.log,.json"
                      onChange={handleFileUpload}
                    />
                  </label>
                  {uploadedFileName && (
                    <span className="text-[11px] text-slate-400">
                      Loaded:{" "}
                      <span className="font-medium text-slate-100">
                        {uploadedFileName}
                      </span>
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-slate-500">
                  File content is read in the browser and placed into the
                  document content below. For PDFs/Office docs, convert to text
                  first.
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
                  Document content
                </label>
                <div className="rounded-2xl bg-slate-950/90 ring-1 ring-slate-800/90">
                  <textarea
                    ref={textareaRef}
                    rows={10}
                    value={content}
                    onChange={autoResize}
                    placeholder={`Paste your runbook, postmortem, or notes here, or upload a text file above...\n\nExample:\n\n# P1 – Search results not relevant in us-east-1\n\n1. Check recent deploys to search-api in us-east-1\n2. Compare feature flags between us-east-1 and eu-central-1\n3. Validate index freshness on the product-catalog index\n…`}
                    className="max-h-72 w-full resize-none bg-transparent px-3.5 py-3 text-[12px] leading-relaxed text-slate-100 outline-none placeholder:text-slate-500"
                  />
                </div>
              </div>

              {/* Status */}
              {(status || error) && (
                <div className="text-[11px]">
                  {status && (
                    <p className="rounded-full bg-emerald-500/10 px-3 py-1 text-emerald-300 ring-1 ring-emerald-500/40">
                      {status}
                    </p>
                  )}
                  {error && (
                    <p className="mt-1 rounded-full bg-rose-500/10 px-3 py-1 text-rose-300 ring-1 ring-rose-500/40">
                      {error}
                    </p>
                  )}
                </div>
              )}

              {/* Submit button */}
              <div className="mt-1 flex items-center justify-between">
                <p className="hidden text-[11px] text-slate-500 sm:block">
                  Ingested docs become available to the{" "}
                  <span className="text-slate-100">
                    SkyScale On-Call Copilot
                  </span>{" "}
                  within seconds.
                </p>
                <button
                  type="submit"
                  disabled={disabled}
                  className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white shadow-[0_12px_40px_rgba(56,189,248,0.5)] ring-1 ring-sky-300/70 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-sky-600">
                        <span className="h-2 w-2 animate-ping rounded-full bg-white" />
                      </span>
                      Injecting…
                    </>
                  ) : (
                    <>
                      <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-sky-600">
                        <span className="h-2 w-2 rounded-full bg-white" />
                      </span>
                      Inject document
                    </>
                  )}
                </button>
              </div>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}
