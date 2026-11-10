import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

import logo from '../assets/images/logo-reality7.png';

const links = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Music', href: '#music' },
  { name: 'Tour', href: '#tour' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Book Us', href: '#booking' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-midnight/85 backdrop-blur-xl border-b border-white/[0.07]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#home" className="flex items-center" aria-label="Reality 7 — back to top">
            <img
              src={logo}
              alt="Reality 7"
              width="900"
              height="292"
              className="h-10 sm:h-12 w-auto"
            />
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-9">
            {links.map((link) => (
              <a key={link.name} href={link.href} className="nav-link">
                {link.name}
              </a>
            ))}
            <a href="#booking" className="btn-gold px-6 py-2.5 text-[10px] tracking-[0.18em]">
              Book Now
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="md:hidden text-cream p-2 -mr-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-midnight/95 backdrop-blur-xl border-t border-gold/15"
        >
          <div className="px-5 pt-3 pb-7 space-y-1">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-3.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-cream/75 hover:text-gold-light transition-colors border-b border-white/[0.05] last:border-0"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#booking"
              onClick={() => setIsOpen(false)}
              className="btn-gold mt-5 w-full py-3 text-[11px] tracking-[0.18em]"
            >
              Book Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
