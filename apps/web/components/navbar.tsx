"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { siteConfig } from '../lib/site.config';

export function Navbar() {
  const sections = useMemo(() => siteConfig.nav.map((n) => n.href.replace('#', '')), []);
  const [active, setActive] = useState<string>('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoSrc, setLogoSrc] = useState<string>('/brand/logo2.svg');

  useEffect(() => {
    const ids = sections.filter(Boolean);
    if (ids.length === 0) return;

    const observers: IntersectionObserver[] = [];
    const callback: IntersectionObserverCallback = (entries) => {
      // Pick the section nearest the top of viewport for more stable highlighting on tall sections
      const visible = entries.filter((e) => e.isIntersecting);
      if (visible.length === 0) return;
      visible.sort(
        (a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top)
      );
      const id = visible[0]?.target?.id;
      if (id) setActive(id);
    };

    const options: IntersectionObserverInit = {
      root: null,
      // Offset for sticky header (~72px) and consider 70% of viewport for deactivation
      rootMargin: '-80px 0px -70% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1],
    };

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(callback, options);
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sections]);

  // Close mobile menu on ESC and on hash change
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    const onHash = () => setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('hashchange', onHash);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('hashchange', onHash);
    };
  }, []);

  // Header background/shadow when scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 transition-colors ${scrolled ? 'bg-white/80 border-b border-gray-200 shadow-sm' : 'bg-white/40 border-b border-transparent'}`}>
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/#about" className="flex items-center gap-2">
          <Image
            src={logoSrc}
            alt="Hempstead Judo Club logo"
            width={28}
            height={28}
            priority
            className="shrink-0"
            onError={() => setLogoSrc('/brand/logo.svg')}
          />
          <span className="font-heading font-semibold text-lg">Hempstead Judo Club</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          {siteConfig.nav.map((item) => {
            const id = item.href.replace('#', '');
            const isActive = id === active;
            const href = item.href.startsWith('#') ? `/${item.href}` : item.href;
            return (
              <Link
                key={item.href}
                href={href}
                className={`relative pb-1 text-sm transition-colors ${isActive ? 'text-gold' : 'text-gray-700 hover:text-gold'}`}
              >
                {item.label}
                <span
                  className={`pointer-events-none absolute -bottom-0.5 left-0 h-0.5 w-full origin-left transform bg-gold transition-transform ${isActive ? 'scale-x-100' : 'scale-x-0'}`}
                />
              </Link>
            );
          })}
        </nav>
        <div className="hidden md:block">
          <Link href={siteConfig.ctaHref} className="px-4 py-2 bg-gold text-white rounded-md font-medium">
            Become a Member
          </Link>
        </div>
        <div className="md:hidden">
          <button
            type="button"
            aria-label="Toggle menu"
            aria-controls="mobile-menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v: boolean) => !v)}
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:text-gold focus:outline-none focus:ring-2 focus:ring-gold/40"
          >
            {menuOpen ? (
              // X icon
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6"><path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 11-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" /></svg>
            ) : (
              // Hamburger icon
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6"><path d="M3.75 6.75A.75.75 0 014.5 6h15a.75.75 0 010 1.5H4.5a.75.75 0 01-.75-.75zM3.75 12a.75.75 0 01.75-.75h15a.75.75 0 010 1.5H4.5A.75.75 0 013.75 12zm0 5.25a.75.75 0 01.75-.75h15a.75.75 0 010 1.5H4.5a.75.75 0 01-.75-.75z" /></svg>
            )}
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      <div id="mobile-menu" className={`md:hidden border-t border-gray-200 ${menuOpen ? 'block' : 'hidden'}`}>
        <nav className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-3">
          {siteConfig.nav.map((item) => {
            const id = item.href.replace('#', '');
            const isActive = id === active;
            const href = item.href.startsWith('#') ? `/${item.href}` : item.href;
            return (
              <Link
                key={item.href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`text-base ${isActive ? 'text-gold' : 'text-gray-800 hover:text-gold'}`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href={siteConfig.ctaHref}
            onClick={() => setMenuOpen(false)}
            className="mt-1 inline-flex w-full items-center justify-center rounded-md bg-gold px-4 py-2 font-medium text-white"
          >
            Become a Member
          </Link>
        </nav>
      </div>
    </header>
  );
}
