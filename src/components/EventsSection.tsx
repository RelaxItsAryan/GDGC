import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import FloatingParticles from './three/FloatingParticles';

import eventDevfest from '@/assets/event-devfest.png';
import eventCloud from '@/assets/event-cloud.png';
import eventAi from '@/assets/event-ai.png';
import eventFlutter from '@/assets/event-flutter.png';

const events = [
  {
    id: 1,
    name: 'DevFest 2025',
    date: '12 Oct 2025',
    location: 'VIT Bhopal Campus',
    description: 'The biggest Google Developer event of the year!',
    color: 'border-google-blue',
    gradient: 'from-google-blue/10 to-transparent',
    image: eventDevfest,
  },
  {
    id: 2,
    name: 'Cloud Community Days',
    date: '14 Jun 2025',
    location: 'VIT Bhopal Campus',
    description: 'Dive deep into Google Cloud technologies.',
    color: 'border-google-green',
    gradient: 'from-google-green/10 to-transparent',
    image: eventCloud,
  },
  {
    id: 3,
    name: 'Build With AI',
    date: '13 Feb 2025',
    location: 'Online + Offline',
    description: 'Explore the world of AI/ML with hands-on workshops.',
    color: 'border-google-yellow',
    gradient: 'from-google-yellow/10 to-transparent',
    image: eventAi,
  },
  {
    id: 4,
    name: 'Flutter Forward',
    date: '20 Mar 2025',
    location: 'VIT Bhopal Campus',
    description: 'Build beautiful cross-platform apps with Flutter.',
    color: 'border-google-red',
    gradient: 'from-google-red/10 to-transparent',
    image: eventFlutter,
  },
];

export default function EventsSection() {
  return (
    <section id="events" className="py-24 bg-secondary/30 relative overflow-hidden">
      <FloatingParticles className="absolute inset-0 z-0 pointer-events-none" smallCount={900} bigCount={15} showModels={true} />
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30, rotateX: 45 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="flex items-center justify-center gap-4 mb-4"
            initial={{ scale: 0.95, rotateY: -20 }}
            whileInView={{ scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.span
              className="text-4xl"
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >✱</motion.span>
            <motion.h2
              className="font-display text-4xl md:text-5xl font-bold"
              animate={{ textShadow: [
                '0 0 16px #4285F4aa',
                '0 0 32px #34A853aa',
                '0 0 16px #FBBC05aa',
                '0 0 32px #EA4335aa',
                '0 0 16px #4285F4aa',
              ] }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              <span className="text-google-blue">[</span> Events{' '}
              <span className="text-google-blue">]</span>
            </motion.h2>
            <motion.span
              className="text-4xl"
              animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >✱</motion.span>
          </motion.div>
          <motion.p
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Join us for exciting events, workshops, and hackathons throughout the year!
          </motion.p>
        </motion.div>

        {/* Events Grid with scroll-based animation */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.2 }}
        >
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              variants={{
                offscreen: { opacity: 0, x: -60 },
                onscreen: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeInOut', delay: index * 0.15 } },
              }}
              className="group"
            >
              <motion.div
                className={`relative h-full bg-card rounded-2xl overflow-hidden border-2 ${event.color} shadow-card cursor-pointer`}
                whileHover={{
                  scale: 1.02,
                  rotateY: 5,
                  rotateX: 5,
                  boxShadow: 'var(--shadow-card-hover)',
                }}
                style={{ transformStyle: 'preserve-3d' }}
                transition={{ duration: 0.3 }}
              >
                {/* Event Image */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="relative z-10 p-5">
                  {/* Event Name */}
                  <h3 className="font-display text-xl font-bold mb-2 group-hover:text-gradient-google transition-all">
                    {event.name}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm mb-4">
                    {event.description}
                  </p>

                  {/* Date & Location */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4 text-google-blue" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4 text-google-red" />
                      {event.location}
                    </div>
                  </div>
                </div>

                {/* Hover Effect Decoration */}
                <motion.div
                  className="absolute -bottom-2 -right-2 w-20 h-20 rounded-full bg-google-yellow/20 blur-xl opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <motion.button
            className="px-8 py-3 bg-card border-2 border-google-yellow rounded-full font-semibold hover:bg-google-yellow/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Events →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
