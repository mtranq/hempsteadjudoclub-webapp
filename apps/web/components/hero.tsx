"use client";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getCaption } from '../lib/captions';

export function Hero({ images = [] as string[] }: { images?: string[] }) {
  const [index, setIndex] = useState(0);
  const hasSlides = images.length > 0;

  useEffect(() => {
    if (!hasSlides) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 5000);
    return () => clearInterval(id);
  }, [hasSlides, images.length]);

  function prev() {
    if (!hasSlides) return;
    setIndex((i) => (i - 1 + images.length) % images.length);
  }
  function next() {
    if (!hasSlides) return;
    setIndex((i) => (i + 1) % images.length);
  }

  return (
    <section className="relative text-white bg-navy">
      {/* 16:9 slideshow container to ensure full ratio visibility on all screens */}
      <div className="relative w-full aspect-[16/9]">
        {/* Slides */}
        <div className="absolute inset-0 overflow-hidden">
          {hasSlides ? (
            images.map((src, i) => (
              <div
                key={src}
                className={`absolute inset-0 transition-opacity duration-700 ${i === index ? 'opacity-100' : 'opacity-0'}`}
              >
                <Image
                  src={src}
                  alt={getCaption(src)}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            ))
          ) : (
            <div className="absolute inset-0 grid place-items-center text-white/70">Add images to <code>/public/images</code></div>
          )}
          {/* Readability gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>

        {/* Prev/Next controls within the frame */}
        {hasSlides && (
          <div className="absolute inset-y-0 left-0 right-0 z-10 flex items-center justify-between px-2">
            <button
              aria-label="Previous"
              onClick={prev}
              className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-black/30 hover:bg-black/40 text-white grid place-items-center"
            >
              ‹
            </button>
            <button
              aria-label="Next"
              onClick={next}
              className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-black/30 hover:bg-black/40 text-white grid place-items-center"
            >
              ›
            </button>
          </div>
        )}

        {/* Bottom-center image description */}
        {hasSlides && (
          <div className="pointer-events-none absolute bottom-3 sm:bottom-5 left-1/2 z-10 -translate-x-1/2">
            <div className="pointer-events-auto rounded-full bg-black/45 px-4 py-1.5 sm:px-5 sm:py-2 text-sm sm:text-base text-white shadow-md shadow-black/30 font-body" aria-live="polite">
              {getCaption(images[index])}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
