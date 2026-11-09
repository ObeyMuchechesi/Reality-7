import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Users, BookOpen } from 'lucide-react';

import aboutGroup from '../assets/images/about-group.jpg';

const stats = [
  { icon: Users, value: '6', label: 'Voices' },
  { icon: Award, value: '2007', label: 'Crown Gospel Award' },
  { icon: BookOpen, value: '4+', label: 'Albums Released' },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-24 px-4 bg-midnight relative" ref={ref}>
      <div className="zulu-divider absolute top-0 left-0 right-0" aria-hidden="true" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-gold tracking-[0.25em] uppercase text-xs font-bold">
            Our Story
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-cream mt-3">
            The Seventh Member
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-gold/20 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 via-transparent to-transparent z-10" />
              <img
                src={aboutGroup}
                alt="The six members of Reality 7 in matching dark suits"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 scale-105 hover:scale-100"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-gold text-midnight p-6 rounded-2xl shadow-xl">
              <p className="font-heading font-bold text-3xl">1992</p>
              <p className="text-xs font-semibold uppercase tracking-wider">Founded</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <p className="text-cream/80 leading-relaxed text-lg">
              In the small village of <span className="text-gold font-semibold">Matikwe, Inanda</span> in
              KwaZulu-Natal, six young men from the Seventh-day Adventist Church began singing together in 1992.
            </p>
            <p className="text-cream/70 leading-relaxed">
              They called themselves <span className="text-gold font-semibold">Reality 7</span> — not because
              there were seven of them, but because they believed{' '}
              <span className="text-gold italic">Jesus Christ was the seventh member</span>, the one who
              balanced their voices into a melody that was uniquely their own.
            </p>
            <p className="text-cream/70 leading-relaxed">
              Fusing traditional <span className="text-gold font-semibold">Is&apos;cathamiya</span> — the style
              made famous by Ladysmith Black Mambazo — with pristine a cappella harmonies, Reality 7 has taken
              the genre into the 21st century. From small churches around Durban to international stages, their
              mission remains the same: to preach the Word of God through music.
            </p>

            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-6">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + idx * 0.1 }}
                    className="text-center p-4 bg-cream/5 rounded-xl border border-gold/10"
                  >
                    <div className="text-gold flex justify-center mb-2">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <p className="font-heading font-bold text-lg sm:text-xl text-cream">{stat.value}</p>
                    <p className="text-[10px] sm:text-xs text-cream/50 uppercase tracking-wider mt-1">
                      {stat.label}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
