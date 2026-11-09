import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const images = [
  { src: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&q=80', alt: 'Choir singing together' },
  { src: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&q=80', alt: 'Concert stage' },
  { src: 'https://images.unsplash.com/photo-1524650359799-842906ca1c06?w=600&q=80', alt: 'Gospel singers' },
  { src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80', alt: 'Microphone' },
  { src: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=600&q=80', alt: 'Sheet music' },
  { src: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80', alt: 'Live performance' },
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
