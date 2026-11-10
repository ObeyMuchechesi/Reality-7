import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Users, BookOpen } from 'lucide-react';

import aboutGroup from '../assets/images/about-group.jpg';

const stats = [
  { icon: Users, value: '6', label: 'Voices' },
  { icon: Award, value: '2007', label: 'Crown Gospel Award' },
  { icon: BookOpen, value: '5', label: 'Albums Released' },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative overflow-hidden bg-midnight px-4 py-24 sm:py-28" ref={ref}>
      <div className="zulu-divider absolute left-0 right-0 top-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-gold/[0.07] blur-[130px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="mb-14 text-center"
        >
          <span className="eyebrow justify-center">
            <span className="eyebrow-rule rotate-180" />
            Our story
            <span className="eyebrow-rule" />
          </span>
          <h2 className="section-title mt-5">The Seventh Member</h2>
        </motion.div>

        <div className="grid items-center gap-14 md:grid-cols-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="relative md:col-span-5"
          >
            <div className="photo-frame aspect-[4/5]">
              <img
                src={aboutGroup}
                alt="The six members of Reality 7 in matching dark suits"
                loading="lazy"
                decoding="async"
                className="h-full w-full scale-[1.03] object-cover transition-transform duration-[1200ms] hover:scale-100"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-midnight/45 via-transparent to-transparent"
                aria-hidden="true"
              />
            </div>

            <div
              className="absolute -bottom-6 right-4 rounded-2xl px-6 py-4 text-midnight shadow-glow sm:-right-6"
              style={{ backgroundImage: 'linear-gradient(135deg, #FAC959 0%, #EFBC4C 48%, #C8952F 100%)' }}
            >
              <p className="font-heading text-3xl font-bold leading-none">1992</p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em]">Founded</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="space-y-6 md:col-span-7"
          >
            <p className="font-heading text-xl leading-[1.55] text-cream/90 sm:text-2xl">
              In the small village of{' '}
              <span className="text-gold-light">Matikwe, Inanda</span> in KwaZulu-Natal, six young men from
              the Seventh-day Adventist Church began singing together in 1992.
            </p>

            <p className="leading-[1.8] text-cream/65">
              They called themselves <span className="text-gold-light">Reality 7</span> — not because there
              were seven of them, but because they believed{' '}
              <em className="font-heading text-cream/90">Jesus Christ was the seventh member</em>, the one who
              balanced their voices into a melody that was uniquely their own.
            </p>

            <p className="leading-[1.8] text-cream/65">
              Fusing traditional <span className="text-gold-light">Is&apos;cathamiya</span> — the style made
              famous by Ladysmith Black Mambazo — with pristine a cappella harmonies, Reality 7 has taken the
              genre into the 21st century. From small churches around Durban to international stages, their
              mission remains the same: to preach the Word of God through music.
            </p>

            <div className="grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 pt-8">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + idx * 0.1 }}
                    className="px-3 text-center first:pl-0 last:pr-0 sm:px-5"
                  >
                    <Icon className="mx-auto mb-2 h-4 w-4 text-gold/70" aria-hidden="true" />
                    <p className="font-heading text-2xl font-bold text-gold-light sm:text-3xl">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-cream/45 sm:text-[10px]">
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
