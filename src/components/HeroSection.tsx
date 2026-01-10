import { motion } from 'framer-motion';
import { ArrowDown, Code2, Sparkles, Zap } from 'lucide-react';
import FloatingParticles from './three/FloatingParticles';

const floatingElements = [
  { icon: '{', color: 'text-google-blue', x: '10%', y: '20%', delay: 0 },
  { icon: '}', color: 'text-google-red', x: '85%', y: '25%', delay: 0.2 },
  { icon: '< />', color: 'text-google-green', x: '15%', y: '70%', delay: 0.4 },
  { icon: '★', color: 'text-google-yellow', x: '80%', y: '65%', delay: 0.6 },
  { icon: '✨', color: 'text-google-blue', x: '25%', y: '45%', delay: 0.8 },
  { icon: '{ }', color: 'text-google-red', x: '70%', y: '40%', delay: 1 },
];

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero"
    >
      {/* 3D Floating Particles Background */}
      <FloatingParticles />

      {/* Floating Code Elements */}
      {floatingElements.map((el, index) => (
        <motion.div
          key={index}
          className={`absolute ${el.color} font-display font-bold text-2xl md:text-4xl opacity-20 select-none`}
          style={{ left: el.x, top: el.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{ delay: el.delay, duration: 0.6 }}
        >
          <motion.span
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4 + index,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="inline-block"
          >
            {el.icon}
          </motion.span>
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full mb-8"
          >
            <Sparkles className="w-4 h-4 text-google-yellow" />
            <span className="text-sm font-medium text-foreground">
              Google Developer Groups on Campus
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 30, rotateX: 45 }}
            animate={{ opacity: 1, y: 0, rotateX: 0, textShadow: [
              '0 0 16px #4285F4aa',
              '0 0 32px #34A853aa',
              '0 0 16px #FBBC05aa',
              '0 0 32px #EA4335aa',
              '0 0 16px #4285F4aa',
            ] }}
            transition={{ duration: 1.2, delay: 0.2, repeat: Infinity, repeatType: 'reverse' }}
          >
            <motion.span className="block" animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>Building.</motion.span>
            <motion.span className="block text-gradient-google" animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 0.5, ease: 'easeInOut' }}>Learning.</motion.span>
            <motion.span className="block" animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 1, ease: 'easeInOut' }}>Growing Together</motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Join the most vibrant developer community at{' '}
            <span className="font-semibold text-foreground">VIT Bhopal University</span>. 
            Learn, build, and connect with fellow tech enthusiasts.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.a
              href="#join"
              className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-semibold text-lg overflow-hidden shadow-glow-blue"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Join GDGC <Zap className="w-5 h-5" />
              </span>
              <motion.div
                className="absolute inset-0 bg-google-blue"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
            <motion.a
              href="#events"
              className="px-8 py-4 border-2 border-border rounded-2xl font-semibold text-lg hover:bg-secondary transition-colors flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Code2 className="w-5 h-5" />
              Explore Events
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {[
              { value: '500+', label: 'Members' },
              { value: '50+', label: 'Events' },
              { value: '20+', label: 'Workshops' },
              { value: '10+', label: 'Hackathons' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                whileHover={{ scale: 1.1 }}
              >
                <div className="text-3xl md:text-4xl font-display font-bold text-gradient-google">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-muted-foreground"
          >
            <span className="text-sm">Scroll to explore</span>
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
