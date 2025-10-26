// Central place to curate human-friendly captions for hero slideshow images.
// Keys should match the URL path used by the <Image> component, e.g. '/images/dojo.jpg'.
// You can also provide a basename-only key like 'dojo.jpg' as a fallback.

const captionsMap: Record<string, string> = {
	// Examples (replace or extend as needed):
	'/images/family.jpg': 'Family training session at Hempstead Judo Club',
	'/images/Fight.jpg': 'Tournament action shot',
	'/images/Fight2.jpg': 'Competition team in action',
    '/images/girls1.jpg': 'The next generation of judoka',
    '/images/Group2-2.jpg': 'The Legends',
    '/images/Group2.jpg': 'Hempstead Judo Club members',
    '/images/Group3 (1).jpg': 'Judo for all ages',
    '/images/group3.jpg': 'Community spirit at Hempstead Judo Club',
    '/images/Intro.jpg': 'Loving Judo at Hempstead Judo Club',
    '/images/Mission.jpg': 'Our mission is your growth',
    '/images/Practice.jpg': 'Sparring session in the dojo',
    '/images/Practice2.jpg': 'Practice makes perfect',
    '/images/slideshowpic.jpg': 'Session in the dojo',
    '/images/studentsandcoaches.jpg': 'Hempstead Judo Club team photo',
    '/images/studentsandcoaches2.jpg': 'Coaches and students',
    '/images/Studentsandcoaches3.jpg': 'Hempstead Judo Club family',
    '/images/Studentsatcompetition.jpg': 'Judo Club competition team',
    '/images/Totoswithsutdents (1).jpg': 'Coach with students',
    '/images/Trophy2.jpg': 'Celebrating our achievements',
    '/images/Values.jpg': 'Sparring with respect and discipline',
};

function humanizeFilename(src: string): string {
	try {
		let name = (src.split('/').pop() || '').replace(/\.[^/.]+$/, '');
		name = name.replace(/^[0-9]+[-_ ]*/, '');
		name = name.replace(/[-_]+/g, ' ').trim();
		if (!name) return 'Hempstead Judo Club';
		return name.replace(/\b\w/g, (c) => c.toUpperCase());
	} catch {
		return 'Hempstead Judo Club';
	}
}

export function getCaption(src: string): string {
	// Try exact URL path
	if (src in captionsMap) return captionsMap[src];
	// Try basename fallback
	const base = src.split('/').pop() || src;
	if (base in captionsMap) return captionsMap[base];
	// Fallback to humanized filename
	return humanizeFilename(src);
}

export default captionsMap;

