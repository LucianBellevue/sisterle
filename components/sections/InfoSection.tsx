import { BentoPanel } from "@/components/bento/BentoPanel";
import { UI_COPY } from "@/lib/copy/ui";

export function InfoSection() {
  return (
    <section id="info" className="scroll-anchor">
      <BentoPanel tone="blue" className="p-5 sm:p-7">
        <h2 className="bento-title text-2xl sm:text-3xl">
          {UI_COPY.sections.info}
        </h2>
        <ul className="mt-3.5 space-y-2 text-sm leading-relaxed text-[#222]/88 sm:mt-4">
          {UI_COPY.info.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </BentoPanel>
    </section>
  );
}
