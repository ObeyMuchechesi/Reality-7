import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Calendar, Ticket } from 'lucide-react';

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
    <section id="tour" className="py-24 px-4 bg-midnight" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-gold tracking-[0.25em] uppercase text-xs font-bold">On the Road</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-cream mt-3">
            Upcoming Performances
          </h2>
        </motion.div>

        <div className="space-y-4">
          {tourDates.map((show, idx) => {
            const soldOut = show.status === 'Sold Out';
            return (
              <motion.div
                key={`${show.event}-${show.date}`}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="group flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-cream/5 rounded-2xl border border-gold/10 hover:border-gold/30 hover:bg-cream/[0.08] transition-all duration-300"
              >
                <div className="flex items-start sm:items-center gap-5">
                  <div className="text-center shrink-0">
                    <Calendar className="w-5 h-5 text-gold mx-auto mb-1" aria-hidden="true" />
                    <p className="text-cream font-semibold text-sm whitespace-nowrap">{show.date}</p>
                  </div>
                  <div>
                    <h3 className="text-cream font-heading font-bold text-lg group-hover:text-gold transition-colors">
                      {show.event}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-cream/50">
                      <span className="flex items-center gap-1">
                        <MapPin size={14} aria-hidden="true" /> {show.venue}
                      </span>
                      <span>{show.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      soldOut ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'
                    }`}
                  >
                    {show.status}
                  </span>
                  {!soldOut && (
                    <a
                      href="#booking"
                      className="flex items-center gap-2 px-5 py-2.5 bg-gold text-midnight text-sm font-bold rounded-full hover:bg-gold/90 transition-colors"
                    >
                      <Ticket size={16} aria-hidden="true" /> Get Tickets
                    </a>
                  )}
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
