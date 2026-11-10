import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

import gallery1 from '../assets/images/gallery-1.jpg';
import gallery2 from '../assets/images/gallery-2.jpg';
import gallery3 from '../assets/images/gallery-3.jpg';
import gallery4 from '../assets/images/gallery-4.jpg';
import stageWide from '../assets/images/hero-1.jpg';
import stageLineup from '../assets/images/hero-4.jpg';

const images = [
  { src: gallery1, alt: 'Two members of Reality 7 sharing a microphone mid-song' },
  { src: gallery2, alt: 'Reality 7 singing in close harmony on stage' },
  { src: gallery3, alt: 'The full lineup holding microphones in a row' },
  { src: gallery4, alt: 'Reality 7 singing beside the lectern at a church service' },
  { src: stageWide, alt: 'Reality 7 on stage beneath an event banner' },
  { src: stageLineup, alt: 'The group in suits during an evening programme' },
];

const Gallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="gallery"
      className="relative bg-gradient-to-b from-midnight to-midnight-deep px-4 py-24 sm:py-28"
      ref={ref}
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="mb-14 text-center"
        >
          <span className="eyebrow justify-center">
            <span className="eyebrow-rule rotate-180" />
            Moments
            <span className="eyebrow-rule" />
          </span>
          <h2 className="section-title mt-5">In His Presence</h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-3.5 md:grid-cols-3 md:gap-4">
          {images.map((img, idx) => (
            <motion.figure
              key={img.src}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className="group relative aspect-square overflow-hidden rounded-xl border border-white/[0.08] transition-colors duration-500 hover:border-gold/40"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.08]"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-midnight/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                aria-hidden="true"
              />
              <span
                className="pointer-events-none absolute inset-2 rounded-lg border border-gold/0 transition-colors duration-500 group-hover:border-gold/30"
                aria-hidden="true"
              />
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
