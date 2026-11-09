import React from 'react';
import { Music, Facebook, Instagram, Youtube, Mail } from 'lucide-react';

const socials = [
  { icon: Facebook, label: 'Facebook', href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
  { icon: Mail, label: 'Email bookings@reality7.com', href: 'mailto:bookings@reality7.com' },
];

const Footer = () => {
  return (
    <footer className="bg-midnight border-t border-gold/10 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <a href="#home" className="flex items-center gap-3">
            <Music className="text-gold w-7 h-7" aria-hidden="true" />
            <span className="text-xl font-heading font-bold text-gold tracking-wider">REALITY 7</span>
          </a>

          <div className="flex items-center gap-6">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-cream/40 hover:text-gold transition-colors"
              >
                <Icon size={22} aria-hidden="true" />
              </a>
            ))}
          </div>

          <p className="text-cream/30 text-sm text-center md:text-right">
            © {new Date().getFullYear()} Reality 7. All rights reserved. <br />
            <span className="italic">&ldquo;Six voices, one Spirit.&rdquo;</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
