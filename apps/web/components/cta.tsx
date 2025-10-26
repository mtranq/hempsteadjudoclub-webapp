import Link from 'next/link';

export function CTA() {
  return (
    <section className="bg-gold text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold">Ready to step onto the mat?</h2>
          <p className="text-white/90">Contact us and meet the team.</p>
        </div>
        <Link href="#membership" className="px-6 py-3 bg-navy text-white rounded-md font-semibold">Become a Member</Link>
      </div>
    </section>
  );
}
