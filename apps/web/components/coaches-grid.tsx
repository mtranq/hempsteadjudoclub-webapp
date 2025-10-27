"use client";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getCoachBio } from '../lib/coach-bios';

type CoachItem = {
  src: string;
  name: string;
  role: string;
  badgeClass: string;
  quote?: { text: string; author?: string } | null;
};

export function CoachesGrid({ items }: { items: CoachItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenIndex(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const open = (i: number) => setOpenIndex(i);
  const close = () => setOpenIndex(null);

  return (
    <>
      <div className="grid gap-6 md:grid-cols-3 mt-8">
        {items.map((c, i) => (
          <button
            key={c.src}
            type="button"
            onClick={() => open(i)}
            aria-label={`Open bio for ${c.name}`}
            className="group text-left border border-gray-200 rounded-lg overflow-hidden bg-white cursor-pointer transition duration-200 ease-out shadow-sm hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gold/50 hover:border-gold/40"
          >
            <div className="relative w-full aspect-[9/16]">
              <Image src={c.src} alt={c.name} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              <span className={`absolute top-2 left-2 px-2 py-1 text-xs font-semibold rounded ${c.badgeClass}`}>{c.role}</span>
              <span className="pointer-events-none absolute bottom-2 right-2 px-2 py-1 text-xs font-medium rounded bg-black/60 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                View bio →
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg">{c.name}</h3>
              {c.quote?.text && (
                <p className="text-gray-700 mt-2">“{c.quote.text}”{c.quote.author ? ` — ${c.quote.author}` : ''}</p>
              )}
            </div>
          </button>
        ))}
      </div>

      {openIndex !== null && items[openIndex] && (
        <div className="fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-black/50" onClick={close} />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="coach-modal-title"
            className="absolute left-1/2 top-1/2 w-[96vw] max-w-5xl -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white shadow-xl ring-1 ring-black/10 max-h-[90vh] overflow-y-auto md:overflow-hidden"
          >
            {/* Close button */}
            <button
              type="button"
              aria-label="Close"
              onClick={close}
              className="absolute top-3 right-3 h-9 w-9 grid place-items-center rounded-full bg-black/50 text-white hover:bg-black/60 z-10"
            >
              ✕
            </button>

            <div className="grid md:grid-cols-2">
              {/* Left: full image at 9:16 */}
              <div className="relative w-full aspect-[9/16]">
                <Image
                  src={items[openIndex].src}
                  alt={items[openIndex].name}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>

              {/* Right: bio/content */}
              <div className="p-5 md:p-6 md:max-h-[70vh] overflow-y-auto">
                <div className="flex items-center gap-2">
                  <h3 id="coach-modal-title" className="text-xl font-semibold">{items[openIndex].name}</h3>
                  <span className={`px-2 py-1 text-xs font-semibold rounded ${items[openIndex].badgeClass}`}>{items[openIndex].role}</span>
                </div>
                <p className="mt-3 text-gray-700 whitespace-pre-line">{getCoachBio(items[openIndex].name)}</p>
                {items[openIndex].quote?.text && (
                  <p className="mt-4 text-gray-700">“{items[openIndex].quote.text}”{items[openIndex].quote.author ? ` — ${items[openIndex].quote.author}` : ''}</p>
                )}

                {/* Mobile close button */}
                <div className="md:hidden sticky bottom-0 -mx-5 px-5 pt-4 pb-4 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-t border-gray-200 mt-6">
                  <button
                    type="button"
                    onClick={close}
                    className="w-full rounded-md bg-navy px-4 py-3 font-semibold text-white hover:bg-navy/90 focus:outline-none focus:ring-2 focus:ring-gold/50"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CoachesGrid;
