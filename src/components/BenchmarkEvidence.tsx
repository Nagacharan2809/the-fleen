"use client";

/**
 * BENCHMARKS / EVIDENCE — Claim → Demonstration → Metric → Context → Explanation.
 * No fabricated scores. The table shows what is measured, how, and the
 * reading status. Real numbers land here at release; the structure is final now.
 */
const ROWS = [
  {
    claim: "Holds long documents without losing references",
    demo: "See § Demonstration 03 — obligations table with clause citations",
    metric: "Clause-citation accuracy",
    context: "14-page agreements, defined-term resolution",
    reading: "TBD — harness published first",
  },
  {
    claim: "Reasons from failure to cause, in order",
    demo: "See § Demonstration 01 — ordered diagnosis with falsifying test",
    metric: "First-correct-cause rate",
    context: "Incident statements with distractor evidence",
    reading: "TBD — evaluation in progress",
  },
  {
    claim: "Writes code that respects constraints",
    demo: "See § Demonstration 02 — rate-limited queue under stated bounds",
    metric: "Constraint-satisfaction rate",
    context: "Concurrency, cancellation, backoff bounds",
    reading: "TBD — evaluation in progress",
  },
  {
    claim: "Refuses precisely when it should",
    demo: "Methodology note §5 — refusal calibration",
    metric: "Calibrated refusal rate",
    context: "Underspecified and out-of-scope prompts",
    reading: "TBD — not yet measured",
  },
];

export default function BenchmarkEvidence() {
  return (
    <section aria-label="Evidence and benchmarks" className="border-t rule-dark">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 py-16 md:py-28">
        <div className="grid md:grid-cols-12 gap-8">
          <h2 data-chapter-title className="md:col-span-6 lexi-heading text-4xl md:text-[3.2rem]">
            A metric means nothing until you see what it measures.
          </h2>
          <p className="md:col-span-6 text-[#ede8db]/70 leading-relaxed md:pt-3">
            Each claim below links to a demonstration you already ran on
            this page, states exactly what will be measured, and admits
            what is not yet measured. When readings exist, they appear in
            the final column — with procedure, not adjectives.
          </p>
        </div>

        {/* Editorial evidence table */}
        <div className="mt-10 md:mt-14 overflow-x-auto">
          <table className="w-full min-w-[860px] text-left border-t rule-dark">
            <thead>
              <tr className="lexi-micro text-[#ede8db]/45">
                <th scope="col" className="py-4 pr-6 font-medium">Claim</th>
                <th scope="col" className="py-4 pr-6 font-medium">Demonstration</th>
                <th scope="col" className="py-4 pr-6 font-medium">Metric + context</th>
                <th scope="col" className="py-4 font-medium">Reading</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.claim} className="border-t rule-dark align-top hover:bg-[#ede8db]/[0.025] transition-colors">
                  <td className="py-6 pr-6 font-semibold tracking-tight text-[1.02rem] max-w-[22rem]">{r.claim}</td>
                  <td className="py-6 pr-6 text-[#ede8db]/60 text-[0.95rem] max-w-[20rem]">{r.demo}</td>
                  <td className="py-6 pr-6 max-w-[20rem]">
                    <span className="block lexi-mono text-[0.85rem] text-[#ede8db]">{r.metric}</span>
                    <span className="block text-[#ede8db]/55 text-[0.9rem] mt-1">{r.context}</span>
                  </td>
                  <td className="py-6">
                    <span className="lexi-micro inline-block border border-[#e8490f]/60 text-[#e8490f] px-3 py-1.5 whitespace-nowrap">
                      {r.reading}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
