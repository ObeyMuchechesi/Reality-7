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
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-midnight/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
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
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-cream/80 hover:text-gold transition-colors duration-200 text-sm font-medium tracking-wide uppercase"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#booking"
              className="bg-gold text-midnight px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-gold/90 transition-all duration-200 shadow-lg shadow-gold/20"
            >
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
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-midnight/95 backdrop-blur-lg border-t border-gold/20"
        >
          <div className="px-4 pt-2 pb-6 space-y-2">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-cream/80 hover:text-gold hover:bg-gold/5 rounded-lg transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
