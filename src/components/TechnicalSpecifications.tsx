/**
 * MODEL SPECIFICATION — a technical artifact, not a pricing table.
 * Only confirmed values are shown; everything else reads TBD.
 * Unknown specs are visually quiet, never exaggerated.
 */
const KNOWN = [
  ["Designation", "FLEEN 1.0 — foundational revision"],
  ["Release status", "Research release"],
  ["Interface", "Text in → reasoned artifact out"],
  ["Demonstrated uses", "Technical reasoning · Constrained code · Document → table"],
];

const WITHHELD = [
  ["Parameters", "TBD"],
  ["Context length", "TBD — long-document behavior demonstrated, figure at release"],
  ["Training data scale", "TBD — composition publishes with model card"],
  ["Modalities", "TBD — text evaluated; others only if evaluated"],
  ["Languages", "TBD — per-language measurement in progress"],
  ["Inference characteristics", "TBD — measured on production hardware"],
  ["Quantization", "TBD"],
  ["Deployment", "API + private deployment — details § Infrastructure"],
  ["API availability", "TBD — versioned API at release"],
  ["License", "TBD — publishes with release"],
];

export default function TechnicalSpecifications() {
  return (
    <section aria-label="FLEEN 1.0 specification" className="bg-[#ede8db] text-[#0f110d]">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 py-16 md:py-28">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <h2 data-chapter-title className="lexi-heading text-4xl md:text-5xl">Spec sheet, honestly filled.</h2>
            <p className="mt-4 text-[#0f110d]/70 leading-relaxed">
              Four lines are confirmed today. The rest are reserved —
              each will carry a measured value or a documented reason,
              never a rounded-up implication.
            </p>
          </div>
          <div className="md:col-span-8">
            <dl className="border-t-2 border-[#0f110d]">
              {KNOWN.map(([k, v]) => (
                <div key={k} className="grid sm:grid-cols-[220px_1fr] gap-1 sm:gap-6 py-4 border-b rule-light">
                  <dt className="lexi-micro text-[#0f110d]/55 pt-1">{k}</dt>
                  <dd className="font-semibold tracking-tight text-[1.05rem]">{v}</dd>
                </div>
              ))}
              {WITHHELD.map(([k, v]) => (
                <div key={k} className="grid sm:grid-cols-[220px_1fr] gap-1 sm:gap-6 py-3.5 border-b border-[#0f110d]/10 opacity-70">
                  <dt className="lexi-micro text-[#0f110d]/45 pt-1">{k}</dt>
                  <dd className="lexi-mono text-[0.9rem] text-[#0f110d]/60">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
