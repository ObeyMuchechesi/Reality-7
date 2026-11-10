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
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-midnight"
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
        className="absolute inset-0 bg-gradient-to-b from-midnight/90 via-midnight/55 to-midnight"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-midnight/20" aria-hidden="true" />
      <div className="absolute inset-0 hero-aurora opacity-60" aria-hidden="true" />
      <div className="absolute inset-0 zulu-pattern opacity-[0.04]" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-4xl px-5 pb-36 pt-32 text-center">
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="eyebrow justify-center"
        >
          <span className="eyebrow-rule rotate-180" />
          Est. 1992 · KwaZulu-Natal
          <span className="eyebrow-rule" />
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15 }}
          className="mt-7 font-heading text-[clamp(3.6rem,13vw,8.5rem)] font-bold leading-[0.95] tracking-[-0.01em] text-cream"
        >
          Reality <span className="gold-text">7</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0.4 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.35 }}
          className="mx-auto mt-8 flex max-w-xs items-center gap-3"
          aria-hidden="true"
        >
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/50" />
          <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/50" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="mx-auto mt-7 max-w-2xl text-balance text-base font-light leading-relaxed text-cream/70 sm:text-lg"
        >
          Six voices. One Spirit.{' '}
          <span className="text-cream">The definitive sound of a grand new dawn.</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.65 }}
          className="mx-auto mt-5 max-w-xl font-heading text-sm italic text-cream/55 sm:text-base"
        >
          &ldquo;Where two or three are gathered... there am I in the midst.&rdquo; — Matthew 18:20
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8 }}
          className="mt-11 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <a href="#music" className="btn-gold w-full sm:w-auto">
            Listen to our music
          </a>
          <a href="#booking" className="btn-ghost w-full sm:w-auto">
            Book a performance
          </a>
        </motion.div>
      </div>

      {/* Slideshow controls */}
      <button
        type="button"
        onClick={() => goTo(index - 1)}
        aria-label="Previous photo"
        className="absolute left-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-cream/20 bg-midnight/40 text-cream/70 backdrop-blur-sm transition-colors hover:border-gold/60 hover:text-gold sm:grid md:left-8"
      >
        <ChevronLeft size={20} aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => goTo(index + 1)}
        aria-label="Next photo"
        className="absolute right-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-cream/20 bg-midnight/40 text-cream/70 backdrop-blur-sm transition-colors hover:border-gold/60 hover:text-gold sm:grid md:right-8"
      >
        <ChevronRight size={20} aria-hidden="true" />
      </button>

      <div className="absolute inset-x-0 bottom-14 z-20 flex items-center justify-center gap-5">
        <div className="flex items-center gap-2" role="tablist" aria-label="Hero photos">
          {slides.map((slide, idx) => (
            <button
              key={slide.src}
              type="button"
              role="tab"
              aria-selected={idx === index}
              aria-label={`Show photo ${idx + 1} of ${slides.length}`}
              onClick={() => goTo(idx)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                idx === index ? 'w-9 bg-gold' : 'w-1.5 bg-cream/35 hover:bg-cream/60'
              }`}
            />
          ))}
        </div>

        <span className="font-body text-[10px] uppercase tracking-[0.25em] text-cream/55 tabular-nums">
          {String(index + 1).padStart(2, '0')}
          <span className="mx-1 text-cream/35">/</span>
          {String(slides.length).padStart(2, '0')}
        </span>

        <button
          type="button"
          onClick={() => setUserPaused((current) => !current)}
          aria-pressed={userPaused}
          aria-label={userPaused ? 'Play slideshow' : 'Pause slideshow'}
          className="grid h-8 w-8 place-items-center rounded-full border border-cream/20 text-cream/60 transition-colors hover:border-gold/60 hover:text-gold"
        >
          {userPaused ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}
        </button>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 text-cream/40 transition-colors hover:text-gold-light"
        aria-label="Scroll to the About section"
      >
        <ChevronDown size={22} className="animate-bounce" />
      </motion.a>
    </section>
  );
};

export default Hero;
