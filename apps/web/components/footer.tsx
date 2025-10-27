import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-12">
  <div className="mx-auto max-w-6xl px-4 py-8 grid gap-6 md:grid-cols-4 text-sm">
        <div>
          <div className="font-semibold mb-2">Hempstead Judo Club</div>
          <p className="text-gray-600"> 335 Greenwich Street Hempstead, NY 11550</p>
          <p className="text-gray-600">Sat 12pm–3pm</p>
          <p className="text-gray-600">Phone: (646) 339-5395</p>
          <p className="text-gray-600">Email: hempsteadjudoclub@gmail.com</p>
        </div>
        <div>
          <div className="font-semibold mb-2">Links</div>
          <ul className="space-y-1">
            <li><Link href="/#about" className="hover:text-gold">About</Link></li>
            <li><Link href="/#classes" className="hover:text-gold">Classes</Link></li>
            <li><Link href="/#coaches" className="hover:text-gold">Coaches</Link></li>
            <li><Link href="/#membership" className="hover:text-gold">Membership</Link></li>
            <li><Link href="/#contact" className="hover:text-gold">Contact</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Follow</div>
          <ul className="space-y-1">
            <li>
              <a
                href="https://www.facebook.com/HempsteadJudo/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold"
              >
                Facebook
              </a>
            </li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Helpful</div>
          <ul className="space-y-1">
            <li>
              <a
                href="https://judoinfo.com/lessons/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold"
              >
                Learn More About Judo
              </a>
            </li>
            <li>
              <a
                href="https://www.usja.net/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold"
              >
                United States Judo Association
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center text-xs text-gray-500 py-4">© {new Date().getFullYear()} Hempstead Judo Club. All rights reserved.</div>
    </footer>
  )
}
