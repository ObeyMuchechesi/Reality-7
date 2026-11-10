import React from 'react';
import { Facebook, Instagram, Youtube, Mail } from 'lucide-react';

import logo from '../assets/images/logo-reality7.png';

const socials = [
  { icon: Facebook, label: 'Facebook', href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
  { icon: Mail, label: 'Email bookings@reality7.com', href: 'mailto:bookings@reality7.com' },
];

const links = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Music', href: '#music' },
  { name: 'Tour', href: '#tour' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Book Us', href: '#booking' },
];

const Footer = () => {
  return (
    <footer className="relative border-t border-white/[0.06] bg-midnight px-4 py-14">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-10 md:flex-row md:items-start md:justify-between">
          <div className="text-center md:text-left">
            <a href="#home" className="inline-flex" aria-label="Reality 7 — back to top">
              <img src={logo} alt="Reality 7" width="900" height="292" className="h-12 w-auto" />
            </a>
            <p className="mt-4 font-heading text-sm italic text-cream/45">
              &ldquo;Six voices, one Spirit.&rdquo;
            </p>
          </div>

          <nav aria-label="Footer" className="flex max-w-xs flex-wrap justify-center gap-x-6 gap-y-2.5">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cream/45 transition-colors hover:text-gold-light"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-cream/50 transition-all duration-300 hover:border-gold/50 hover:text-gold-light"
              >
                <Icon size={17} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <div className="hairline my-9" aria-hidden="true" />

        <div className="flex flex-col items-center justify-between gap-3 text-[10px] uppercase tracking-[0.18em] text-cream/25 sm:flex-row">
          <p>© {new Date().getFullYear()} Reality 7. All rights reserved.</p>
          <p>Is&apos;cathamiya · KwaZulu-Natal, South Africa</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
