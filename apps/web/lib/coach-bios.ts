// Curate coach bios here. Keys can be a cleaned name token (e.g., 'neville', 'wood')
// or the filename base (without extension). Update these strings with real bios.

const biosMap: Record<string, string> = {
  neville: 'Mr. Pierre-Louis is a 3rd Degree Black Belt. The journey started in the summer of 1973 when Neville Pierre-Louis (Pierrot) wore a Judo uniform for the first time when he started taking lessons from sensei Max Levi (Totos) .   Only 4 years later, he obtained a Brown Belt. In 1978, he collaborated with his mentorTotos and Ernst Laraque to open the Jose Marti Judo Club. In the early stage of his career, Pierrot gave judo demonstrations at various venues in Haiti from College Bird to the elite forces of the Haitian Army. Pierrot trained and became the champion in his category during the National judo Tournament of Haiti in 1980 in 1981. He then moved to the United states of America in 1982 to train New York students at the Kanagoki Judo club in Brooklyn and Oishi in Manhattan. He also taught at other reputable clubs before opening Hempstead Judo Club in 1995. ',
  wood: 'Head Coach focused on fundamentals, safety, and competitive development.He holds the rank of 3rd degree black belt. Sensei Wood started with Judo when he was about 15 years old.  Wood had the opportunity and privilege to work with and get tested by one of the best Judo Senseis in Haiti, Max Rock Levy (Totos).  He teaches various kata and he is a certified self-defense instructor.  His favorite throws are harai goshi and o uchi gari.',
  laurent: 'Senior Coach passionate about technical precision and character growth.He holds the rankof 3rd  degree  black belt.  He started practicing Judo since the age of 14. His favorite moves are uchi mata and Makikomi.',
  monrose: 'Senior Coach dedicated to building strong fundamentals and competitive skills. He earned and passed successfully his first black belt at the age of 18.  He now holds a 2nd degree black belt.  He teaches self-defense and is available for individual training for those who are interested in Judo competition.',
  petit: 'Assistant Coach who supports beginners with patience and energy.',
  steven: 'Assistant Coach enthusiastic about fostering a love for Judo in all students.',
  carly: 'Assistant Coach committed to creating a positive learning environment for young judoka.',
  berthony: 'Assistant Coach focused on technique and sportsmanship.',
  // steven: 'Assistant Coach enthusiastic about fostering a love for Judo in all students.',
  // carly: 'Assistant Coach committed to creating a positive learning environment for young judoka.',
  // petitfrere: 'Assistant Coach who supports beginners with patience and energy.',
};

function normalizeKey(s: string): string {
  return (s || '').toLowerCase().replace(/[^a-z]/g, '');
}

export function getCoachBio(nameOrKey: string, fallback?: string): string {
  const n = normalizeKey(nameOrKey);
  if (n in biosMap) return biosMap[n];
  // Try to split on spaces and look for any token in the map
  const token = (nameOrKey || '').split(/\s+/).map(normalizeKey).find((t) => t && biosMap[t]);
  if (token) return biosMap[token];
  return fallback || 'Bio coming soon.';
}

export default biosMap;
