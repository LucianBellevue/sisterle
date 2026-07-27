import { BentoPanel } from "@/components/bento/BentoPanel";
import { UI_COPY } from "@/lib/copy/ui";

export function AboutSection() {
  return (
    <section id="about" className="scroll-anchor">
      <BentoPanel tone="cream" className="p-6 sm:p-8">
        <h2 className="bento-title text-2xl sm:text-3xl">
          {UI_COPY.sections.about}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#222]/90">
          Sisterle is a curated thrift and vintage shop with a soft spot for
          texture, shape, and one-of-one finds.
        </p>
      </BentoPanel>
    </section>
  );
}
