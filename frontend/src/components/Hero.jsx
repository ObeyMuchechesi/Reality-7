import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient + drifting light */}
      <div className="absolute inset-0 bg-gradient-to-br from-midnight via-midnight/90 to-earth/40" />
      <div className="absolute inset-0 hero-aurora" aria-hidden="true" />
      <div
        className="absolute inset-0 opacity-[0.06] zulu-pattern"
        aria-hidden="true"
      />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-24 pb-28">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-gold tracking-[0.3em] uppercase text-xs sm:text-sm mb-6 font-semibold"
        >
          Est. 1992 · KwaZulu-Natal, South Africa
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-8xl font-heading font-black text-cream mb-6 leading-tight"
        >
          REALITY <span className="text-gold">7</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-cream/70 font-light max-w-2xl mx-auto mb-4"
        >
          Six voices. One Spirit. The definitive sound of a grand new dawn.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-sm text-cream/40 mb-12 italic"
        >
          &ldquo;Where two or three are gathered... there am I in the midst.&rdquo; — Matthew 18:20
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#music"
            className="px-8 py-4 bg-gold text-midnight font-bold rounded-full hover:bg-gold/90 transition-all duration-300 shadow-xl shadow-gold/25 hover:shadow-gold/40 hover:-translate-y-0.5"
          >
            Listen to Our Music
          </a>
          <a
            href="#booking"
            className="px-8 py-4 border-2 border-cream/30 text-cream font-semibold rounded-full hover:border-gold hover:text-gold transition-all duration-300"
          >
            Book a Performance
          </a>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/50 hover:text-gold transition-colors animate-bounce"
        aria-label="Scroll to the About section"
      >
        <ChevronDown size={32} />
      </motion.a>
    </section>
  );
};

export default Hero;
