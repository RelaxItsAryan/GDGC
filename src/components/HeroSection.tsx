import { motion } from 'framer-motion';
import { Code2, Sparkles, Zap } from 'lucide-react';
import FloatingParticles from './three/FloatingParticles';

const floatingElements = [
  // moved further to edges and vertically spaced to avoid overlapping the headline
  { icon: '{', color: 'text-google-blue', x: '6%', y: '18%', delay: 0 },
  { icon: '}', color: 'text-google-red', x: '92%', y: '18%', delay: 0.2 },
  { icon: '< />', color: 'text-google-green', x: '12%', y: '74%', delay: 0.4 },
  { icon: '★', color: 'text-google-yellow', x: '88%', y: '70%', delay: 0.6 },
  { icon: '✨', color: 'text-google-blue', x: '28%', y: '48%', delay: 0.8 },
  { icon: '{ }', color: 'text-google-red', x: '72%', y: '48%', delay: 1 },
];

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero"
    >
      {/* Section particles (Hero) */}
      <FloatingParticles className="absolute inset-0 z-0 pointer-events-none" smallCount={800} bigCount={15} showModels={true} />

      {/* Floating Code Elements */}
      {floatingElements.map((el, index) => (
        <motion.div
          key={index}
          className={`absolute ${el.color} font-display font-bold text-2xl md:text-4xl opacity-20 select-none hidden sm:block`}
          style={{ left: el.x, top: el.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{ delay: el.delay, duration: 0.6 }}
          aria-hidden
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

          {/* Landing Heading (GDG ON CAMPUS) */}
          <motion.div
            className="max-w-5xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1 className="font-display text-6xl md:text-[120px] lg:text-[140px] font-extrabold mb-4 leading-tight whitespace-nowrap tracking-tight">
              <span className="inline text-google-green">GDG</span>
              <span className="inline mx-6 text-google-yellow">ON</span>
              <span className="inline text-google-blue">CAMPUS</span>
            </motion.h1>

            <motion.div className="my-6 text-3xl md:text-5xl font-medium text-foreground tracking-wide" aria-hidden>
              VIT BHOPAL
            </motion.div>

            <motion.p
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto mt-0"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Join the most vibrant developer community at VIT Bhopal University. Learn, build, and connect with fellow tech enthusiasts.
            </motion.p>

            <motion.div className="flex items-center justify-center">
              <a href="#join" className="px-8 py-4 bg-google-blue text-white rounded-full text-lg shadow-glow-blue hover:scale-105 transition-transform inline-flex items-center gap-3">
                <span>Join us</span>
              </a>
            </motion.div>
          </motion.div>
        </div>


      </div>
    </section>
  );
}
