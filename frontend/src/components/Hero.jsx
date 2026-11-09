import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

import hero1 from '../assets/images/hero-1.jpg';
import hero2 from '../assets/images/hero-2.jpg';
import hero3 from '../assets/images/hero-3.jpg';
import hero4 from '../assets/images/hero-4.jpg';

const slides = [
  {
    src: hero1,
    alt: 'Reality 7 singing from the stage beneath a Happy Homes banner',
  },
  {
    src: hero2,
    alt: 'Reality 7 performing in suits before a seated congregation',
  },
  {
    src: hero3,
    alt: 'Members of Reality 7 singing into microphones during a service',
  },
  {
    src: hero4,
    alt: 'The six members of Reality 7 lined up with microphones in hand',
  },
];

const AUTOPLAY_MS = 6000;

const Hero = () => {
  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(query.matches);

    update();
    if (query.addEventListener) {
      query.addEventListener('change', update);
      return () => query.removeEventListener('change', update);
    }
    query.addListener(update);
    return () => query.removeListener(update);
  }, []);

  useEffect(() => {
    if (userPaused || hovered || reduceMotion) return undefined;

    const id = window.setInterval(
      () => setIndex((current) => (current + 1) % slides.length),
      AUTOPLAY_MS
    );

    return () => window.clearInterval(id);
  }, [userPaused, hovered, reduceMotion, index]);

  const goTo = useCallback((next) => {
    setIndex(((next % slides.length) + slides.length) % slides.length);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-midnight"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Photo slideshow */}
      <div className="absolute inset-0">
        {slides.map((slide, idx) => {
          const isActive = idx === index;
          const zoom = reduceMotion ? '' : isActive ? 'scale-110' : 'scale-100';

          return (
            <div
              key={slide.src}
              className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out motion-reduce:transition-none ${
                isActive ? 'opacity-100' : 'opacity-0'
              }`}
              aria-hidden={isActive ? undefined : 'true'}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                loading={idx === 0 ? 'eager' : 'lazy'}
                decoding="async"
                className={`h-full w-full object-cover object-center ${zoom} ${
                  isActive ? 'duration-[9000ms] ease-linear' : 'duration-[1200ms] ease-out'
                } transition-transform motion-reduce:transition-none`}
              />
            </div>
          );
        })}
      </div>

      {/* Legibility + brand overlays */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-midnight/95 via-midnight/70 to-midnight"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-midnight/25" aria-hidden="true" />
      <div className="absolute inset-0 hero-aurora opacity-70" aria-hidden="true" />
      <div className="absolute inset-0 opacity-[0.05] zulu-pattern" aria-hidden="true" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-24 pb-36">
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
          className="text-xl md:text-2xl text-cream/80 font-light max-w-2xl mx-auto mb-4"
        >
          Six voices. One Spirit. The definitive sound of a grand new dawn.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-sm text-cream/50 mb-12 italic"
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
            className="px-8 py-4 border-2 border-cream/40 text-cream font-semibold rounded-full hover:border-gold hover:text-gold transition-all duration-300"
          >
            Book a Performance
          </a>
        </motion.div>
      </div>

      {/* Slideshow controls */}
      <button
        type="button"
        onClick={() => goTo(index - 1)}
        aria-label="Previous photo"
        className="hidden sm:grid place-items-center absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 h-11 w-11 rounded-full border border-cream/25 bg-midnight/40 text-cream/80 backdrop-blur-sm hover:text-gold hover:border-gold/60 transition-colors"
      >
        <ChevronLeft size={22} aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => goTo(index + 1)}
        aria-label="Next photo"
        className="hidden sm:grid place-items-center absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 h-11 w-11 rounded-full border border-cream/25 bg-midnight/40 text-cream/80 backdrop-blur-sm hover:text-gold hover:border-gold/60 transition-colors"
      >
        <ChevronRight size={22} aria-hidden="true" />
      </button>

      <div className="absolute inset-x-0 bottom-16 z-20 flex items-center justify-center gap-4">
        <div className="flex items-center gap-2" role="tablist" aria-label="Hero photos">
          {slides.map((slide, idx) => (
            <button
              key={slide.src}
              type="button"
              role="tab"
              aria-selected={idx === index}
              aria-label={`Show photo ${idx + 1} of ${slides.length}`}
              onClick={() => goTo(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === index ? 'w-8 bg-gold' : 'w-2 bg-cream/40 hover:bg-cream/70'
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => setUserPaused((current) => !current)}
          aria-pressed={userPaused}
          aria-label={userPaused ? 'Play slideshow' : 'Pause slideshow'}
          className="grid place-items-center h-8 w-8 rounded-full border border-cream/25 text-cream/70 hover:text-gold hover:border-gold/60 transition-colors"
        >
          {userPaused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}
        </button>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 text-cream/50 hover:text-gold transition-colors animate-bounce"
        aria-label="Scroll to the About section"
      >
        <ChevronDown size={26} />
      </motion.a>
    </section>
  );
};

export default Hero;
