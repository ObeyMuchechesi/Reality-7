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
    <section id="gallery" className="py-24 px-4 bg-gradient-to-b from-midnight to-midnight/95" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-gold tracking-[0.25em] uppercase text-xs font-bold">Moments</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-cream mt-3">
            In His Presence
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, idx) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative aspect-square rounded-xl overflow-hidden border border-gold/10"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
