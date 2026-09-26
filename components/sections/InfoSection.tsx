import { BentoPanel } from "@/components/bento/BentoPanel";
import { UI_COPY } from "@/lib/copy/ui";

export function InfoSection() {
  return (
    <section id="info" className="scroll-anchor">
      <BentoPanel tone="blue" className="p-6 sm:p-8">
        <h2 className="bento-title text-2xl sm:text-3xl">
          {UI_COPY.sections.info}
        </h2>
        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[#222]/90">
          {UI_COPY.info.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </BentoPanel>
    </section>
  );
}
