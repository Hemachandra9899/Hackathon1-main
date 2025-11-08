import React from "react";
import { Link } from "react-router-dom";

export default function SkyscaleLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      {/* Frame border */}
      <div className="mx-auto min-h-screen border-8 border-slate-900/80">
        {/* Header */}
        <header className="relative z-10">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 lg:px-8">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-slate-900/80 px-3.5 py-1 text-[11px] font-semibold tracking-[0.18em] text-slate-200 ring-1 ring-slate-700/80">
                SKY SCALE CLOUD
              </span>
              <span className="hidden text-[11px] uppercase tracking-[0.22em] text-slate-500 sm:inline-block">
                B2B SaaS PLATFORM
              </span>
            </div>
            <button
              type="button"
              className="rounded-full bg-slate-900/80 px-4 py-1.5 text-xs font-semibold text-slate-100 shadow-sm ring-1 ring-slate-700/80 hover:bg-slate-800"
            >
              MENU
            </button>
          </div>
        </header>

        {/* Main content */}
        <main>
          <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-20 pt-4 lg:flex-row lg:px-8 lg:pt-8">
            {/* Left: Hero copy */}
            <section className="flex flex-col justify-center space-y-6 lg:w-6/12">
              <div>
                <h1 className="text-[32px] font-semibold tracking-tight text-slate-50 sm:text-[40px] lg:text-[44px]">
                  Microservice-native platform <br /> for modern e-commerce.
                </h1>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-300">
                  SkyScale is a B2B SaaS platform that gives you production-ready
                  microservices for{" "}
                  <span className="font-semibold text-slate-50">
                    Checkout, Search, Payments, and Notifications
                  </span>
                  — wired for observability, scale, and AI copilots from day one.
                </p>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <p>
                    <span className="font-semibold text-slate-100">
                      Composable building blocks
                    </span>{" "}
                    for teams shipping features across multiple storefronts and
                    regions.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-sky-400" />
                  <p>
                    <span className="font-semibold text-slate-100">
                      Observability & on-call ready
                    </span>{" "}
                    with runbooks, metrics, and SkyScale On-Call Copilot built-in.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-amber-400" />
                  <p>
                    <span className="font-semibold text-slate-100">
                      Multi-tenant by default
                    </span>{" "}
                    so you can onboard new merchants without re-architecting.
                  </p>
                </div>
              </div>

              {/* Primary CTA */}
              <div className="pt-2">
                <a
                  href="#signup"
                  className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-slate-950 shadow-lg shadow-slate-900/40 ring-1 ring-slate-200 hover:bg-white"
                >
                  Get early access
                  <span className="text-[14px]">↗</span>
                </a>
              </div>
            </section>

            {/* Right: Microservice cards */}
            <section className="flex flex-1 items-stretch lg:w-6/12">
              <div className="flex w-full flex-col gap-3 rounded-3xl bg-slate-950/70 p-4 shadow-[0_18px_70px_rgba(0,0,0,0.75)] ring-1 ring-slate-800/80">
                {/* Top row */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {/* Checkout */}
                  <div className="flex flex-col rounded-2xl bg-slate-900/80 p-4 ring-1 ring-slate-800">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-100">
                        Checkout
                      </span>
                      <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-300">
                        LIVE
                      </span>
                    </div>
                    <p className="mt-2 text-[11px] leading-relaxed text-slate-400">
                      Drop-in checkout microservice with PCI-aware flows, session
                      management, and A/B-testable UI hooks.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      <span className="rounded-full bg-slate-800/80 px-2 py-0.5 text-[10px] text-slate-300">
                        PCI-ready
                      </span>
                      <span className="rounded-full bg-slate-800/80 px-2 py-0.5 text-[10px] text-slate-300">
                        Cart API
                      </span>
                    </div>
                  </div>

                  {/* Search */}
                  <div className="flex flex-col rounded-2xl bg-slate-900/80 p-4 ring-1 ring-slate-800">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-100">
                        Search
                      </span>
                      <span className="rounded-full bg-sky-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-sky-300">
                        AI-Boosted
                      </span>
                    </div>
                    <p className="mt-2 text-[11px] leading-relaxed text-slate-400">
                      Relevance-tuned search with synonyms, ranking signals, and
                      deep integrations with PlanRAG for support workflows.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      <span className="rounded-full bg-slate-800/80 px-2 py-0.5 text-[10px] text-slate-300">
                        Vector search
                      </span>
                      <span className="rounded-full bg-slate-800/80 px-2 py-0.5 text-[10px] text-slate-300">
                        Analytics
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom row */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {/* Payments */}
                  <div className="flex flex-col rounded-2xl bg-slate-900/80 p-4 ring-1 ring-slate-800">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-100">
                        Payments
                      </span>
                      <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-amber-300">
                        MULTI-PSP
                      </span>
                    </div>
                    <p className="mt-2 text-[11px] leading-relaxed text-slate-400">
                      Orchestrate multiple PSPs, failover rules, and currency
                      routing through a single programmable interface.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      <span className="rounded-full bg-slate-800/80 px-2 py-0.5 text-[10px] text-slate-300">
                        Routing rules
                      </span>
                      <span className="rounded-full bg-slate-800/80 px-2 py-0.5 text-[10px] text-slate-300">
                        FX support
                      </span>
                    </div>
                  </div>

                  {/* Notifications */}
                  <div className="flex flex-col rounded-2xl bg-slate-900/80 p-4 ring-1 ring-slate-800">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-100">
                        Notifications
                      </span>
                      <span className="rounded-full bg-fuchsia-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-fuchsia-300">
                        OMNI-CHANNEL
                      </span>
                    </div>
                    <p className="mt-2 text-[11px] leading-relaxed text-slate-400">
                      Unified notifications across email, SMS, and push with
                      templates, experiments, and delivery analytics.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      <span className="rounded-full bg-slate-800/80 px-2 py-0.5 text-[10px] text-slate-300">
                        Templates
                      </span>
                      <span className="rounded-full bg-slate-800/80 px-2 py-0.5 text-[10px] text-slate-300">
                        Event bus
                      </span>
                    </div>
                  </div>
                </div>

                {/* Small footer strip inside card */}
                <div className="mt-1 flex items-center justify-between rounded-2xl bg-slate-950/80 px-3 py-2 text-[11px] text-slate-400">
                  <span>
                    Built for teams running{" "}
                    <span className="text-slate-100">multi-region e-commerce</span>.
                  </span>
                  <span className="hidden text-[10px] uppercase tracking-[0.16em] text-sky-300 sm:inline">
                    Powering SkyScale On-Call Copilot
                  </span>
                </div>
              </div>
            </section>
          </div>

          {/* Signup section (anchor for #signup) */}
          <section
            id="signup"
            className="mx-auto max-w-3xl rounded-3xl bg-slate-950/80 px-6 py-6 text-sm text-slate-200 ring-1 ring-slate-800/80 lg:px-8 lg:py-7"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  Early access program
                </p>
                <p className="mt-1 text-sm text-slate-100">
                  Be one of the first teams to run SkyScale in a live environment.
                  We&apos;ll reach out with a short onboarding call.
                </p>
              </div>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-2 flex w-full max-w-sm flex-col gap-2 sm:mt-0 sm:flex-row"
              >
                <input
                  type="email"
                  required
                  placeholder="work-email@company.com"
                  className="h-9 flex-1 rounded-full bg-slate-900/80 px-3 text-xs text-slate-100 outline-none ring-1 ring-slate-700/80 placeholder:text-slate-500 focus:ring-sky-500/70"
                />
                <button
                  type="submit"
                  className="h-9 rounded-full bg-slate-50 px-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-950 shadow-sm hover:bg-white"
                >
                  Request access
                </button>
              </form>
            </div>
          </section>

          {/* Floating AI Assistant button */}
          <Link
            to="/aiassistant"
            aria-label="Open AI Assistant"
            className="fixed bottom-7 right-7 z-50 inline-flex items-center gap-2 rounded-full bg-sky-500 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white shadow-[0_12px_40px_rgba(56,189,248,0.5)] ring-1 ring-sky-300/70 hover:bg-sky-400"
          >
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-sky-600">
              <span className="h-2 w-2 rounded-full bg-white" />
            </span>
            AI Assistant
          </Link>
        </main>
      </div>
    </div>
  );
}
