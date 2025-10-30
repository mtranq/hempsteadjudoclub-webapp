import { Hero } from '../components/hero';
import { CTA } from '../components/cta';
import { listPublicImages } from '../lib/images';
import Image from 'next/image';
import { CoachesGrid } from '../components/coaches-grid';
import { judoQuotes } from '../lib/quotes';

export default async function HomePage() {
  const heroImagesAll = listPublicImages('images', ['.jpg', '.jpeg']);
  const heroImages = heroImagesAll.filter(
    (src) => !src.startsWith('/images/team/') && !src.startsWith('/images/other/')
  );
  // Support both /public/team and /public/images/team
  const teamA = listPublicImages('team', ['.jpg', '.jpeg', '.png', '.webp']);
  const teamB = listPublicImages('images/team', ['.jpg', '.jpeg', '.png', '.webp']);
  const teamImages = Array.from(new Set([...teamA, ...teamB]));

  // Roles highlighting: detect roles from filename tokens and sort by importance
  type Role = 'President' | 'Head Coach' | 'Senior Coach' | 'Assistant Coach' | 'Coach';
  const rolePriority: Record<Role, number> = {
    'President': 0,
    'Head Coach': 1,
    'Senior Coach': 2,
    'Assistant Coach': 3,
    'Coach': 4,
  };
  const roleStyle: Record<Role, string> = {
    'President': 'bg-gold text-navy',
    'Head Coach': 'bg-gold/90 text-navy',
    'Senior Coach': 'bg-white/90 text-navy border border-navy/20',
    'Assistant Coach': 'bg-white/80 text-navy border border-navy/10',
    'Coach': 'bg-white/70 text-navy border border-navy/10',
  };

  const keyFromSrc = (src: string) => (src.split('/').pop() || '').toLowerCase().replace(/\.(jpg|jpeg|png|webp)$/i, '');
  const detectRole = (key: string): Role => {
    // Normalize separators
    const k = key.replace(/[^a-z]/g, '');
    if (k.includes('neville')) return 'President';
    if (k.includes('wood')) return 'Head Coach';
  if (k.includes('laurent')) return 'Senior Coach';
  if (k.includes('montrose') || k.includes('motrose') || k.includes('monrose')) return 'Senior Coach';
    if (k.includes('petitfrere') || k.includes('petit')) return 'Assistant Coach';
    if (k.includes('steven')) return 'Assistant Coach';
    if (k.includes('carly')) return 'Assistant Coach';
    if (k.includes('berthony')) return 'Assistant Coach';
    return 'Coach';
  };

  const toTitle = (s: string) => s.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  const nameFromSrc = (src: string) => {
    const file = src.split('/').pop() || '';
    const base = file.replace(/\.(jpg|jpeg|png|webp)$/i, '');
    return toTitle(base);
  };
  return (
    <>
      <Hero images={heroImages} />

      {/* About */}
      <section id="about" className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold">About Hempstead Judo Club</h2>
          <p className="mt-4 text-gray-700 max-w-3xl">
            We are a community-focused club offering Judo classes for kids and adults, from
            beginners to competitors, taught by qualified coaches in a safe and supportive
            environment.
          </p>
          <div className="grid gap-8 md:grid-cols-3 mt-8">
            {[
              {
                title: 'Our Mission',
                desc:
                  'We are committed to making the joy and power of Judo available to participants in their everyday life, at Judo practice, classes and competition. We want our students to be physically, morally and mentally in good shape and use their knowledge for the good of society.',
              },
              {
                title: 'Our Values',
                desc:
                  'In our classes, we always teach respect and discipline. We also teach self-confidence which is a major component of self-defense.',
              },
              {
                title: 'Our Solution',
                desc:
                  'Hempstead Judo Club is not a business. We want to make learning Judo available and affordable to every young man and woman who is interested in the sport. Our instructors are volunteers.',
              },
            ].map((v) => (
              <div key={v.title} className="border rounded-lg p-6">
                <div className="text-lg font-semibold">{v.title}</div>
                <p className="text-gray-600 mt-2">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Classes */}
      <section id="classes" className="py-16 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold">Class Schedules</h2>
          <p className="mt-4 text-gray-700 max-w-3xl">
            Our classes are held on Saturdays in our dojo located in the Kennedy park on Greenwich Street and Baldwin Road.
            Come and join us.
          </p>

          <div className="grid gap-6 md:grid-cols-2 mt-8">
            <div className="border rounded-lg p-6 bg-white">
              <div className="font-semibold">Beginners</div>
              <div className="text-gray-700">Saturdays 12:00 PM to 2:00 PM</div>
            </div>
            <div className="border rounded-lg p-6 bg-white">
              <div className="font-semibold">Intermediate &amp; Advanced</div>
              <div className="text-gray-700">Saturdays 1:00 PM to 3:00 PM</div>
            </div>
          </div>

          <div className="mt-10 border rounded-lg p-6 bg-white">
            <div className="font-semibold">Hempstead Judo Club</div>
            <div className="text-gray-700">Kennedy Memorial Park, 335 Greenwich Street Hempstead, NY 11550</div>
            <div className="text-gray-700">Tel.: 646 339-5395;  404 724-6768;    646 331-9736</div>
          </div>

          {/* Location Map */}
          <div className="mt-6 rounded-lg overflow-hidden ring-1 ring-black/10 bg-white">
            <div className="relative w-full aspect-[16/9]">
              <iframe
                title="Map of Hempstead Judo Club at Kennedy Memorial Park"
                className="absolute inset-0 h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                src={
                  'https://www.google.com/maps?q=' +
                  encodeURIComponent('Kennedy Memorial Park, 335 Greenwich Street Hempstead, NY 11550') +
                  '&output=embed'
                }
              />
            </div>
          </div>
        </div>
      </section>

      <CTA />

      {/* Coaches */}
      <section id="coaches" className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold">Coaches</h2>
          <p className="mt-2 text-gray-600">Click or tap a coach to view their bio and more information.</p>
          {teamImages.length > 0 ? (
            <CoachesGrid
              items={teamImages
                .map((src, i) => {
                  const name = nameFromSrc(src);
                  const q = judoQuotes[i % judoQuotes.length];
                  const key = keyFromSrc(src);
                  const role = detectRole(key);
                  return {
                    src,
                    name,
                    role,
                    badgeClass: roleStyle[role],
                    quote: q,
                    priority: rolePriority[role],
                  } as any;
                })
                .sort((a, b) => a.priority - b.priority || a.name.localeCompare(b.name))}
            />
          ) : (
            <p className="mt-4 text-gray-700 max-w-3xl">
              Our qualified coaching team is dedicated to safe, effective training for all levels. Profiles coming soon.
            </p>
          )}
        </div>
      </section>

      {/* Team / Staff */}
      <section id="team" className="py-12 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-bold">Club Staff & Volunteers</h2>
          <p className="mt-2 text-gray-700 max-w-3xl">Our volunteers help the club run smoothly on and off the mat.</p>

          <div className="grid gap-6 md:grid-cols-3 mt-6">
            {[ 
              { name: 'Gregory Lazarre', role: 'Public Relations' },
              { name: 'Berthony Juste', role: 'Email', link: { href: 'mailto:hempsteadjudoclub@gmail.com', label: 'hempsteadjudoclub@gmail.com' } },
              { name: 'Berthony Juste', role: 'Facebook', link: { href: 'https://www.facebook.com/HempsteadJudo/', label: 'Facebook Page' } },
              { name: 'Wildrid Juste', role: 'Administrative Assistant' },
              { name: 'Johnny Tranquille', role: 'Webmaster' },
            ].map((p) => (
              <div key={p.name} className="border rounded-lg bg-white p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-lg font-semibold">{p.name}</div>
                    <div className="text-sm text-gray-600">{p.role}</div>
                  </div>
                </div>
                {p.link ? (
                  <div className="mt-3">
                    <a
                      href={p.link.href}
                      target={p.link.href.startsWith('http') ? '_blank' : undefined}
                      rel={p.link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center gap-2 text-navy font-medium hover:underline"
                    >
                      {p.link.label}
                      <span aria-hidden>→</span>
                    </a>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership */}
      <section id="membership" className="py-16 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold">Membership</h2>
          <div className="mt-6 rounded-lg border border-gold/40 bg-white p-6">
            <h3 className="text-xl font-semibold">Membership Policy</h3>
            <p className="text-gray-700 mt-2">
              Hempstead Judo Club does not charge a fee to become a member. However, students will pay for their own
              uniform and other related materials. Certain additional activities may require a fee. Contact us for more information.
            </p>
            <div className="mt-4">
              <a
                href="mailto:hempsteadjudoclub@gmail.com?subject=Membership%20Inquiry"
                className="inline-flex items-center justify-center rounded-md bg-navy px-5 py-3 font-semibold text-white hover:bg-navy/90 focus:outline-none focus:ring-2 focus:ring-gold/50"
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* Donations */}
          <div className="mt-6 rounded-lg border border-gold/30 bg-white p-6">
            <h3 className="text-xl font-semibold">Donations</h3>
            <p className="text-gray-700 mt-2">
              As a volunteer‑run organization, donations help us keep classes affordable, maintain equipment, and
              offer need‑based support for students. If you’d like to make a donation or become a sponsor, please
              email us and we’ll follow up with next steps.
            </p>
            <div className="mt-4">
              <a
                href="mailto:hempsteadjudoclub@gmail.com?subject=Donation%20to%20Hempstead%20Judo%20Club"
                className="inline-flex items-center justify-center rounded-md bg-navy px-5 py-3 font-semibold text-white hover:bg-navy/90 focus:outline-none focus:ring-2 focus:ring-gold/50"
              >
                Email about Donations
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-3xl font-bold">Contact Us</h2>
          <p className="text-gray-700 mt-2">Email us and we’ll get back to you to confirm your first session.</p>
          <div className="mt-8">
            <a
              href="mailto:hempsteadjudoclub@gmail.com"
              className="inline-flex items-center justify-center rounded-md bg-navy px-6 py-3 font-semibold text-white hover:bg-navy/90 focus:outline-none focus:ring-2 focus:ring-gold/50"
            >
              Email hempsteadjudoclub@gmail.com
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
