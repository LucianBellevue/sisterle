"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const CYCLE_MS = 1400;

type ProductImageGalleryProps = {
  urls: string[];
  alt: string;
  sizes: string;
  priority?: boolean;
  /** Parent sets true on hover / touch / focus while browsing photos */
  live?: boolean;
  className?: string;
};

export function ProductImageGallery({
  urls,
  alt,
  sizes,
  priority = false,
  live = false,
  className = "",
}: ProductImageGalleryProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [urls.join("|")]);

  useEffect(() => {
    if (!live || urls.length <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % urls.length);
    }, CYCLE_MS);
    return () => window.clearInterval(timer);
  }, [live, urls.length]);

  useEffect(() => {
    if (!live) setIndex(0);
  }, [live]);

  if (urls.length === 0) {
    return (
      <div
        className={[
          "flex items-center justify-center bg-[#f3f3f3] text-xs uppercase tracking-[0.18em] text-[#666]",
          className,
        ].join(" ")}
      >
        Photo coming soon
      </div>
    );
  }

  return (
    <div
      className={["product-image-gallery relative overflow-hidden bg-[#f3f3f3]", className]
        .filter(Boolean)
        .join(" ")}
      aria-label={
        urls.length > 1
          ? `${alt}, photo ${index + 1} of ${urls.length}`
          : alt
      }
    >
      {urls.map((url, i) => {
        const active = i === index;
        return (
          <Image
            key={`${url}-${i}`}
            src={url}
            alt={i === 0 ? alt : ""}
            fill
            priority={priority && i === 0}
            sizes={sizes}
            className={[
              "product-image-gallery__slide object-cover",
              active ? "product-image-gallery__slide--active" : "",
            ].join(" ")}
            aria-hidden={!active}
          />
        );
      })}
      {urls.length > 1 ? (
        <div
          className="pointer-events-none absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1 rounded-full bg-black/35 px-2 py-1 backdrop-blur-sm"
          aria-hidden
        >
          {urls.map((_, i) => (
            <span
              key={i}
              className={[
                "h-1.5 w-1.5 rounded-full transition-all duration-300",
                i === index ? "scale-110 bg-white" : "bg-white/45",
              ].join(" ")}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
