export const siteConfig = {
  name: 'Hempstead Judo Club',
  description: 'Learn Judo. Build Confidence. Join Our Community.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  // Update this list to match files you place in public/images
  heroImages: [], // e.g., ['/images/your-1.jpg', '/images/your-2.jpg']
  nav: [
    { href: '#about', label: 'About' },
    { href: '#classes', label: 'Classes' },
    { href: '#coaches', label: 'Coaches' },
    { href: '#membership', label: 'Membership' },
    { href: '#contact', label: 'Contact' },
  ],
  // CTA in the navbar should go directly to Membership
  ctaHref: '/#membership',
};
