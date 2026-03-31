"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { setActiveSection, type SectionId } from "@/store/uiSlice";

type SectionScrollSpyProps = {
  sectionIds: SectionId[];
};

export function SectionScrollSpy({ sectionIds }: SectionScrollSpyProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        const id = (visible?.target as HTMLElement | undefined)?.id as
          | SectionId
          | undefined;
        if (id) dispatch(setActiveSection(id));
      },
      {
        root: null,
        // Favor the section near the top / center.
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0.05, 0.12, 0.2, 0.35, 0.5, 0.7],
      },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [dispatch, sectionIds]);

  return null;
}

