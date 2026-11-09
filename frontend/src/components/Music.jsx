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
    accent: '#D4AF37',
    glow: 'from-gold/20 to-midnight',
    cover: mangingasukiCover,
  },
  {
    id: 'amen',
    title: 'Amen',
    year: '2008',
    description: 'The debut album that introduced the Reality 7 sound to the world.',
    accent: '#8B5E3C',
    glow: 'from-earth/40 to-midnight',
  },
  {
    id: 'ngeke-sguqe',
    title: "Ngeke S'guqe",
    year: '2014',
    description: 'A powerful declaration of faith that earned a Crown Gospel Award nomination.',
    accent: '#5A7D7C',
    glow: 'from-sage/40 to-midnight',
  },
  {
    id: 'dilik-emthini',
    title: "Dilik' Emthini",
    year: '2017',
    description: 'A mature, soul-stirring collection of a cappella worship.',
    accent: '#D4AF37',
    glow: 'from-gold/20 to-midnight',
  },
  {
    id: 'ivangeli',
    title: 'Ivangeli',
    year: '2016',
    description: 'The gospel message carried through intricate six-part harmonies.',
    accent: '#A9744F',
    glow: 'from-earth/30 to-sage/20',
  },
];

const platforms = [
  {
    name: 'Spotify',
    search: (album) => `https://open.spotify.com/search/${encodeURIComponent(`Reality 7 ${album.title}`)}`,
    className: 'bg-[#1DB954] text-black',
  },
  {
    name: 'Apple Music',
    search: (album) => `https://music.apple.com/search?term=${encodeURIComponent(`Reality 7 ${album.title}`)}`,
    className: 'bg-[#FA243C] text-white',
  },
  {
    name: 'YouTube',
    search: (album) => `https://www.youtube.com/results?search_query=${encodeURIComponent(`Reality 7 ${album.title}`)}`,
    className: 'bg-[#FF0000] text-white',
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
      className="py-24 px-4 bg-gradient-to-b from-midnight to-midnight/95 relative"
      ref={ref}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-gold tracking-[0.25em] uppercase text-xs font-bold">Discography</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-cream mt-3">Hear the Harmony</h2>
          <p className="text-cream/50 mt-4 max-w-xl mx-auto">
            Five records, one message. Stream the music on all major platforms.
          </p>
        </motion.div>

        {/* Vinyl-style record player */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative overflow-hidden rounded-3xl border border-gold/15 bg-cream/[0.04] p-6 sm:p-10 mb-12"
        >
          <div
            className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full blur-[100px] opacity-40 transition-colors duration-700"
            style={{ backgroundColor: selected.accent }}
            aria-hidden="true"
          />

          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            {/* Turntable */}
            <div className="relative mx-auto w-full max-w-xs sm:max-w-sm">
              <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-[#141a2f] to-[#080d1c] border border-gold/10 p-4 shadow-2xl">
                <div className="vinyl-disc relative h-full w-full rounded-full vinyl-spin">
                  {/* rotating sheen so the motion reads on the dark grooves */}
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        'conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.10) 28deg, transparent 62deg, transparent 200deg, rgba(255,255,255,0.05) 232deg, transparent 268deg)',
                    }}
                    aria-hidden="true"
                  />
                  {/* centre label */}
                  <div
                    className="absolute inset-[31%] rounded-full overflow-hidden flex flex-col items-center justify-center text-center px-4 border border-black/40"
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
                        <Disc3 className="w-4 h-4 text-cream/70 mb-1" aria-hidden="true" />
                        <p className="font-heading font-bold text-cream text-[10px] sm:text-xs leading-tight">
                          {selected.title}
                        </p>
                        <p className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em] text-cream/60 mt-1">
                          {selected.year}
                        </p>
                      </>
                    )}
                  </div>
                  {/* spindle hole */}
                  <div className="absolute inset-[47.5%] rounded-full bg-midnight border border-gold/40" />
                </div>

                {/* tonearm */}
                <div className="absolute top-3 right-3 h-24 w-1.5 origin-top rotate-[24deg] rounded-full bg-gradient-to-b from-cream/70 to-cream/20 shadow-md" aria-hidden="true">
                  <div className="absolute -bottom-2 -left-[3px] h-4 w-3 rounded-sm bg-gold" />
                </div>
              </div>
              <p className="text-center text-[10px] uppercase tracking-[0.25em] text-cream/35 mt-4">
                Now in rotation
              </p>
            </div>

            {/* Album detail + links */}
            <div>
              {selected.year && (
                <p className="text-gold text-sm font-semibold mb-1">{selected.year}</p>
              )}
              <h3 className="text-3xl font-heading font-bold text-cream mb-3">{selected.title}</h3>
              <p className="text-cream/60 leading-relaxed mb-6">{selected.description}</p>

              <div className="flex flex-wrap gap-3">
                {platforms.map((platform) => (
                  <a
                    key={platform.name}
                    href={platform.search(selected)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-cream/5 text-cream border border-gold/20 hover:border-gold/60 hover:text-gold transition-colors"
                  >
                    <Play size={14} aria-hidden="true" /> {platform.name}
                  </a>
                ))}
              </div>

              <p className="text-xs text-cream/35 mt-4 flex items-center gap-1.5">
                <ExternalLink size={12} aria-hidden="true" /> Opens {selected.title} on the selected platform
              </p>
            </div>
          </div>
        </motion.div>

        {/* Album shelf */}
        <div className="grid sm:grid-cols-2 gap-4">
          {albums.map((album, idx) => {
            const isSelected = album.id === selectedId;
            return (
              <motion.button
                key={album.id}
                type="button"
                onClick={() => setSelectedId(album.id)}
                aria-pressed={isSelected}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`group relative text-left overflow-hidden rounded-2xl border transition-all duration-300 p-6 ${
                  isSelected
                    ? 'border-gold/60 bg-cream/[0.07] shadow-lg shadow-gold/10'
                    : 'border-gold/10 hover:border-gold/30 hover:bg-cream/[0.05]'
                }`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${album.glow} opacity-50 group-hover:opacity-70 transition-opacity duration-500`}
                  aria-hidden="true"
                />
                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    {album.year && (
                      <p className="text-gold text-sm font-semibold mb-1">{album.year}</p>
                    )}
                    <h3 className="text-xl sm:text-2xl font-heading font-bold text-cream mb-2">{album.title}</h3>
                    <p className="text-cream/60 text-sm max-w-xs">{album.description}</p>
                  </div>
                  {album.cover ? (
                    <img
                      src={album.cover}
                      alt=""
                      aria-hidden="true"
                      className={`shrink-0 w-12 h-12 rounded-lg object-cover border transition-all duration-300 ${
                        isSelected ? 'border-gold/70 shadow-lg shadow-gold/20' : 'border-gold/20'
                      }`}
                    />
                  ) : (
                    <span
                      className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isSelected ? 'bg-gold text-midnight' : 'bg-gold/10 text-gold group-hover:bg-gold/20'
                      }`}
                      aria-hidden="true"
                    >
                      <Disc3 size={22} className={isSelected ? 'vinyl-spin' : ''} />
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
