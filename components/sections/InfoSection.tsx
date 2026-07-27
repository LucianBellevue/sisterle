import { BentoPanel } from "@/components/bento/BentoPanel";
import { UI_COPY } from "@/lib/copy/ui";

export function InfoSection() {
  return (
    <section id="info" className="scroll-anchor">
      <BentoPanel tone="blue" className="p-6 sm:p-8">
        <h2 className="bento-title text-2xl sm:text-3xl">
          {UI_COPY.sections.info}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#222]/90">
          Vintage clothing, accessories, soft antiques, and honest one-of-one
          listings with clear photos.
        </p>
      </BentoPanel>
    </section>
  );
}
