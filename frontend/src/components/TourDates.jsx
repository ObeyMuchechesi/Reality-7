import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Ticket } from 'lucide-react';

const tourDates = [
  {
    date: '20 Sep 2025',
    event: '11th Anniversary Heritage Sabbath',
    venue: 'City Life Church, Lone Hill',
    location: 'Sandton, South Africa',
    status: 'Tickets Available',
  },
  {
    date: '31 Oct 2026',
    event: 'Mountain Top Experience',
    venue: 'The Guy Butler Theatre',
    location: 'Makhanda, South Africa',
    status: 'Tickets Available',
  },
  {
    date: '30 May 2026',
    event: 'Firm Faith 20th Anniversary',
    venue: 'Hippodrome, Braeside',
    location: 'Harare, Zimbabwe',
    status: 'Sold Out',
  },
];

const TourDates = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="tour" className="relative bg-midnight px-4 py-24 sm:py-28" ref={ref}>
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="mb-14 text-center"
        >
          <span className="eyebrow justify-center">
            <span className="eyebrow-rule rotate-180" />
            On the road
            <span className="eyebrow-rule" />
          </span>
          <h2 className="section-title mt-5">Performances</h2>
        </motion.div>

        <div className="space-y-3.5">
          {tourDates.map((show, idx) => {
            const soldOut = show.status === 'Sold Out';
            const [day, month, year] = show.date.split(' ');

            return (
              <motion.div
                key={`${show.event}-${show.date}`}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 transition-all duration-300 hover:border-gold/30 hover:bg-white/[0.04] sm:p-6"
              >
                <span
                  className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-gold-light via-gold to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                />

                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-5">
                    <div className="w-16 shrink-0 border-r border-white/10 pr-5 text-center">
                      <p className="font-heading text-3xl font-bold leading-none text-gold-light">{day}</p>
                      <p className="mt-1.5 text-[9px] uppercase tracking-[0.18em] text-cream/55">
                        {month} {year}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold leading-snug text-cream transition-colors group-hover:text-gold-light sm:text-xl">
                        {show.event}
                      </h3>
                      <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-cream/60">
                        <span className="flex items-center gap-1.5">
                          <MapPin size={13} aria-hidden="true" /> {show.venue}
                        </span>
                        <span>{show.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 sm:shrink-0">
                    <span
                      className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                        soldOut
                          ? 'border-red-400/25 bg-red-400/[0.08] text-red-300'
                          : 'border-sage/40 bg-sage/[0.12] text-cream/75'
                      }`}
                    >
                      {show.status}
                    </span>
                    {!soldOut && (
                      <a
                        href="#booking"
                        className="btn-gold px-5 py-2.5 text-[10px] tracking-[0.16em]"
                      >
                        <Ticket size={13} aria-hidden="true" /> Tickets
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TourDates;
