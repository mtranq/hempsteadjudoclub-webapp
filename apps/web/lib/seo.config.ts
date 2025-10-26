import { NextSeoProps } from 'next-seo';

export const defaultSEO: NextSeoProps = {
  titleTemplate: '%s | Hempstead Judo Club',
  defaultTitle: 'Hempstead Judo Club',
  description: 'Learn Judo. Build Confidence. Join Our Community.',
  openGraph: {
    type: 'website',
    site_name: 'Hempstead Judo Club',
  },
};
