/**
 * FUTURE OF FLEEN — temporal restraint. 1.0 → research → iteration →
 * stronger foundations. No fabricated models, no dates. The arrow is
 * the only promise.
 */
export default function FleenFuture() {
  return (
    <section aria-label="Future of FLEEN" className="border-t rule-dark">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 py-16 md:py-28">
        <div className="grid md:grid-cols-12 gap-8 items-end">
          <h2
            data-chapter-title
            className="md:col-span-8 lexi-heading text-4xl md:text-[3.4rem] leading-[1.05]"
          >
            FLEEN 1.0 is the first foundation, not the final one.
          </h2>
          <p className="md:col-span-4 text-[#ede8db]/65 leading-relaxed">
            What follows is research, iteration, and stronger foundations.
            We name nothing that does not yet exist.
          </p>
        </div>

        {/* Temporal line */}
        <div
          className="mt-12 md:mt-16"
          role="img"
          aria-label="Timeline: FLEEN 1.0, then research, iteration, and stronger foundations. No unreleased products named."
        >
          <div className="flex items-stretch" aria-hidden>
            <div className="flex-none w-[34%] md:w-[28%]">
              <div className="lexi-display text-3xl md:text-5xl">1.0</div>
              <p className="lexi-micro text-[#e8490f] mt-2">Present</p>
              <div className="h-[3px] bg-[#ede8db] mt-3" />
            </div>
            {["Research", "Iteration"].map((t) => (
              <div key={t} className="flex-1 px-3 md:px-6">
                <div className="lexi-micro text-[#ede8db]/60">{t}</div>
                <div className="h-px bg-[#ede8db]/25 mt-3" />
              </div>
            ))}
            <div className="flex-1 px-3 md:px-6">
              <div className="lexi-micro text-[#ede8db]/60">Stronger foundations</div>
              <div className="h-px bg-[#ede8db]/25 mt-3 relative">
                <span className="absolute right-0 -top-[5px] block h-[11px] w-[2px] bg-[#e8490f]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
