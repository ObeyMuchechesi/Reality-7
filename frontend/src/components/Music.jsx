import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Disc3, ExternalLink, Play } from 'lucide-react';

import mangingasukiCover from '../assets/images/album-mangingasuki.jpg';

const albums = [
  {
    id: 'mangingasuki',
    title: 'Mangingasuki (Baba)',
    year: '',
    description: 'The newest release — six voices carrying the message forward.',
    accent: '#EFBC4C',
    glow: 'from-gold/20 to-transparent',
    cover: mangingasukiCover,
  },
  {
    id: 'amen',
    title: 'Amen',
    year: '2008',
    description: 'The debut album that introduced the Reality 7 sound to the world.',
    accent: '#8B5E3C',
    glow: 'from-earth/30 to-transparent',
  },
  {
    id: 'ngeke-sguqe',
    title: "Ngeke S'guqe",
    year: '2014',
    description: 'A powerful declaration of faith that earned a Crown Gospel Award nomination.',
    accent: '#5A7D7C',
    glow: 'from-sage/30 to-transparent',
  },
  {
    id: 'dilik-emthini',
    title: "Dilik' Emthini",
    year: '2017',
    description: 'A mature, soul-stirring collection of a cappella worship.',
    accent: '#EFBC4C',
    glow: 'from-gold/20 to-transparent',
  },
  {
    id: 'ivangeli',
    title: 'Ivangeli',
    year: '2016',
    description: 'The gospel message carried through intricate six-part harmonies.',
    accent: '#A9744F',
    glow: 'from-earth/25 to-transparent',
  },
];

const platforms = [
  {
    name: 'Spotify',
    search: (album) => `https://open.spotify.com/search/${encodeURIComponent(`Reality 7 ${album.title}`)}`,
  },
  {
    name: 'Apple Music',
    search: (album) => `https://music.apple.com/search?term=${encodeURIComponent(`Reality 7 ${album.title}`)}`,
  },
  {
    name: 'YouTube',
    search: (album) => `https://www.youtube.com/results?search_query=${encodeURIComponent(`Reality 7 ${album.title}`)}`,
  },
];

const Music = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedId, setSelectedId] = useState(albums[0].id);

  const selected = albums.find((album) => album.id === selectedId) || albums[0];

  return (
    <section
      id="music"
      className="relative overflow-hidden bg-gradient-to-b from-midnight-deep via-midnight to-midnight px-4 py-24 sm:py-28"
      ref={ref}
    >
      <div
        className="pointer-events-none absolute -right-40 top-24 h-96 w-96 rounded-full bg-sage/[0.09] blur-[130px]"
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
            Discography
            <span className="eyebrow-rule" />
          </span>
          <h2 className="section-title mt-5">Hear the Harmony</h2>
          <p className="mx-auto mt-5 max-w-xl text-cream/55">
            Five records, one message. Stream the music on all major platforms.
          </p>
        </motion.div>

        {/* Vinyl-style record player */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="surface relative mb-12 overflow-hidden p-6 sm:p-10"
        >
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-40 blur-[100px] transition-colors duration-700"
            style={{ backgroundColor: selected.accent }}
            aria-hidden="true"
          />

          <div className="relative grid items-center gap-10 md:grid-cols-2">
            {/* Turntable */}
            <div className="relative mx-auto w-full max-w-xs sm:max-w-sm">
              <div className="relative aspect-square rounded-[1.25rem] border border-white/10 bg-gradient-to-br from-[#151d36] to-[#060b1a] p-4 shadow-2xl">
                <div className="vinyl-disc vinyl-spin relative h-full w-full rounded-full">
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        'conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.10) 28deg, transparent 62deg, transparent 200deg, rgba(255,255,255,0.05) 232deg, transparent 268deg)',
                    }}
                    aria-hidden="true"
                  />
                  <div
                    className="absolute inset-[31%] flex flex-col items-center justify-center overflow-hidden rounded-full border border-black/40 px-4 text-center"
                    style={
                      selected.cover
                        ? undefined
                        : {
                            background: `radial-gradient(circle at 30% 25%, ${selected.accent}, #0B132B 78%)`,
                          }
                    }
                  >
                    {selected.cover ? (
                      <img
                        src={selected.cover}
                        alt={`${selected.title} cover art`}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    ) : (
                      <>
                        <Disc3 className="mb-1 h-4 w-4 text-cream/70" aria-hidden="true" />
                        <p className="font-heading text-[10px] font-bold leading-tight text-cream sm:text-xs">
                          {selected.title}
                        </p>
                        <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-cream/60 sm:text-[10px]">
                          {selected.year}
                        </p>
                      </>
                    )}
                  </div>
                  <div className="absolute inset-[47.5%] rounded-full border border-gold/40 bg-midnight" />
                </div>

                <div
                  className="absolute right-3 top-3 h-24 w-1.5 origin-top rotate-[24deg] rounded-full bg-gradient-to-b from-cream/70 to-cream/20 shadow-md"
                  aria-hidden="true"
                >
                  <div className="absolute -bottom-2 -left-[3px] h-4 w-3 rounded-sm bg-gold" />
                </div>
              </div>
              <p className="mt-4 text-center text-[9px] uppercase tracking-[0.3em] text-cream/35">
                Now in rotation
              </p>
            </div>

            {/* Album detail + links */}
            <div>
              {selected.year && (
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-light">
                  {selected.year}
                </p>
              )}
              <h3 className="mb-3 font-heading text-3xl font-bold leading-tight text-cream sm:text-4xl">
                {selected.title}
              </h3>
              <div className="mb-6 h-px w-16 bg-gradient-to-r from-gold/70 to-transparent" aria-hidden="true" />
              <p className="mb-7 leading-[1.8] text-cream/60">{selected.description}</p>

              <div className="flex flex-wrap gap-2.5">
                {platforms.map((platform) => (
                  <a
                    key={platform.name}
                    href={platform.search(selected)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-cream/85 transition-colors hover:border-gold/50 hover:text-gold-light"
                  >
                    <Play size={12} aria-hidden="true" /> {platform.name}
                  </a>
                ))}
              </div>

              <p className="mt-4 flex items-center gap-1.5 text-[11px] text-cream/30">
                <ExternalLink size={11} aria-hidden="true" /> Opens {selected.title} on the selected platform
              </p>
            </div>
          </div>
        </motion.div>

        {/* Album shelf */}
        <div className="grid gap-4 sm:grid-cols-2">
          {albums.map((album, idx) => {
            const isSelected = album.id === selectedId;
            return (
              <motion.button
                key={album.id}
                type="button"
                onClick={() => setSelectedId(album.id)}
                aria-pressed={isSelected}
                initial={{ opacity: 0, y: 26 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className={`group relative overflow-hidden rounded-2xl border p-6 text-left transition-all duration-500 ${
                  isSelected
                    ? 'border-gold/45 bg-white/[0.06] shadow-[0_18px_50px_-30px_rgba(239,188,76,0.6)]'
                    : 'border-white/[0.07] bg-white/[0.02] hover:border-gold/25 hover:bg-white/[0.045]'
                }`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${album.glow} opacity-45 transition-opacity duration-500 group-hover:opacity-70`}
                  aria-hidden="true"
                />
                {isSelected && (
                  <span
                    className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-gold-light via-gold to-transparent"
                    aria-hidden="true"
                  />
                )}
                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    {album.year && (
                      <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-gold-light/90">
                        {album.year}
                      </p>
                    )}
                    <h3 className="mb-2 font-heading text-xl font-bold text-cream sm:text-2xl">
                      {album.title}
                    </h3>
                    <p className="max-w-xs text-sm leading-relaxed text-cream/55">{album.description}</p>
                  </div>
                  {album.cover ? (
                    <img
                      src={album.cover}
                      alt=""
                      aria-hidden="true"
                      className={`h-12 w-12 shrink-0 rounded-lg border object-cover transition-all duration-300 ${
                        isSelected ? 'border-gold/70 shadow-glow' : 'border-white/15'
                      }`}
                    />
                  ) : (
                    <span
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                        isSelected
                          ? 'bg-gold text-midnight'
                          : 'border border-gold/20 bg-gold/[0.08] text-gold/80 group-hover:bg-gold/15'
                      }`}
                      aria-hidden="true"
                    >
                      <Disc3 size={20} className={isSelected ? 'vinyl-spin' : ''} />
                    </span>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Music;
