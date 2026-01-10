import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Star } from 'lucide-react';
import FloatingParticles from './three/FloatingParticles';

import gallery1 from '@/assets/gallery-1.png';
import gallery2 from '@/assets/gallery-2.png';
import gallery3 from '@/assets/gallery-3.png';
import gallery4 from '@/assets/gallery-4.png';

const filters = [
  { id: 'all', name: 'All' },
  { id: 'devfest', name: 'DevFest' },
  { id: 'flutter', name: 'Flutter Roadshow' },
  { id: 'cloud', name: 'Cloud Days' },
  { id: 'workshop', name: 'Workshops' },
];

const galleryItems = [
  { id: 1, category: 'workshop', rotation: -3, image: gallery1, title: 'Coding Workshop' },
  { id: 2, category: 'devfest', rotation: 2, image: gallery2, title: 'Hackathon Presentation' },
  { id: 3, category: 'cloud', rotation: -2, image: gallery3, title: 'Winners Celebration' },
  { id: 4, category: 'flutter', rotation: 4, image: gallery4, title: 'Speaker Session' },
  { id: 5, category: 'devfest', rotation: -1, image: gallery1, title: 'Team Collaboration' },
  { id: 6, category: 'flutter', rotation: 3, image: gallery2, title: 'Project Demo' },
  { id: 7, category: 'cloud', rotation: -4, image: gallery3, title: 'Award Ceremony' },
  { id: 8, category: 'workshop', rotation: 1, image: gallery4, title: 'Tech Talk' },
];

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredItems = galleryItems.filter(
    (item) => activeFilter === 'all' || item.category === activeFilter
  );

  return (
    <section id="gallery" className="py-24 bg-card/50 relative overflow-hidden">
      <FloatingParticles className="absolute inset-0 z-0 pointer-events-none" smallCount={500} bigCount={15} showModels={false} />
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30, rotateX: 45 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="flex items-center justify-center gap-3 mb-4"
            initial={{ scale: 0.95, rotateY: -20 }}
            whileInView={{ scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.h2
              className="font-display text-4xl md:text-5xl font-bold text-google-yellow"
              animate={{ textShadow: [
                '0 0 16px #FBBC05aa',
                '0 0 32px #34A853aa',
                '0 0 16px #4285F4aa',
                '0 0 32px #EA4335aa',
                '0 0 16px #FBBC05aa',
              ] }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              Moments
            </motion.h2>
            <motion.span
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Sparkles className="w-10 h-10 text-google-yellow" />
            </motion.span>
          </motion.div>
          <motion.p
            className="text-muted-foreground text-lg max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Capturing the magic of our community events and celebrations ✨
          </motion.p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-5 py-2.5 rounded-full font-medium text-sm border-2 transition-all ${
                activeFilter === filter.id
                  ? 'bg-foreground text-background border-foreground'
                  : 'bg-transparent text-foreground border-border hover:border-foreground'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery Grid - Polaroid Style with scroll-based animation */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.2 }}
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                variants={{
                  offscreen: { opacity: 0, x: -60, scale: 0.8, rotate: item.rotation },
                  onscreen: { opacity: 1, x: 0, scale: 1, rotate: item.rotation, transition: { duration: 0.8, ease: 'easeInOut', delay: index * 0.15 } },
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="group relative"
              >
                <motion.div
                  className="bg-background rounded-lg p-3 shadow-card border border-border"
                  whileHover={{
                    scale: 1.05,
                    rotate: 0,
                    y: -10,
                    boxShadow: 'var(--shadow-card-hover)',
                    zIndex: 10,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Image Container */}
                  <div className="aspect-square rounded-md overflow-hidden mb-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Caption */}
                  <div className="text-center pb-1">
                    <p className="text-sm font-medium text-foreground/70">
                      {item.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {filters.find((f) => f.id === item.category)?.name || 'Event'}
                    </p>
                  </div>
                </motion.div>

                {/* Decorative Star */}
                <motion.div
                  className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                >
                  <Star className="w-5 h-5 text-google-yellow fill-google-yellow" />
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Floating Decorations */}
        <div className="relative mt-12 flex justify-center gap-8">
          <motion.span
            className="text-4xl"
            animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            📸
          </motion.span>
          <motion.span
            className="text-4xl"
            animate={{ y: [0, -15, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
          >
            ✨
          </motion.span>
          <motion.span
            className="text-4xl"
            animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
          >
            🦋
          </motion.span>
        </div>
      </div>
    </section>
  );
}
