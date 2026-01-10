import { motion } from 'framer-motion';
import { Users, Code, Lightbulb, Calendar, Wrench, Globe } from 'lucide-react';
import FloatingParticles from './three/FloatingParticles';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const bentoItems = [
  {
    title: 'Community',
    description: 'Join a vibrant community of passionate developers who collaborate, learn, and grow together.',
    icon: Users,
    color: 'google-blue',
    className: 'md:col-span-1 md:row-span-1',
    iconBg: 'bg-google-blue/10',
  },
  {
    title: 'What We Do?',
    description: 'GDGC empowers students to explore cutting-edge technologies through workshops, sessions, and networking, fostering innovation and practical learning in a vibrant tech community.',
    icon: Lightbulb,
    color: 'google-yellow',
    className: 'md:col-span-1 md:row-span-2',
    iconBg: 'bg-google-yellow/10',
    featured: true,
  },
  {
    title: 'Open Source',
    description: 'Contribute to real-world open source projects and build your developer portfolio.',
    icon: Globe,
    color: 'google-green',
    className: 'md:col-span-1 md:row-span-1',
    iconBg: 'bg-google-green/10',
  },
  {
    title: 'Projects',
    description: 'We empower members to innovate through projects, from open-source to cutting-edge research, fostering growth and building strong portfolios.',
    icon: Code,
    color: 'google-blue',
    className: 'md:col-span-1 md:row-span-1',
    iconBg: 'bg-google-blue/10',
  },
  {
    title: 'Workshops',
    description: 'Students gain practical skills through expert-led workshops in various technical fields, building confidence to tackle real-world challenges.',
    icon: Wrench,
    color: 'google-red',
    className: 'md:col-span-1 md:row-span-1',
    iconBg: 'bg-google-red/10',
  },
  {
    title: 'Events',
    description: 'We foster a vibrant tech community with workshops and hackathons, empowering students to learn, grow, and showcase their talents.',
    icon: Calendar,
    color: 'google-yellow',
    className: 'md:col-span-1 md:row-span-1',
    iconBg: 'bg-google-yellow/10',
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-google-blue/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-google-yellow/5 rounded-full blur-3xl" />

      {/* Section particles (overlayed above backgrounds, underneath content) */}
      <FloatingParticles className="absolute inset-0 z-0 pointer-events-none" smallCount={700} bigCount={100} showModels={true} />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30, rotateX: 45 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span
            className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full text-sm font-medium text-foreground mb-6"
            initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            animate={{ boxShadow: [
              '0 0 16px #4285F4aa',
              '0 0 32px #34A853aa',
              '0 0 16px #FBBC05aa',
              '0 0 32px #EA4335aa',
              '0 0 16px #4285F4aa',
            ] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            <motion.span className="w-2 h-2 bg-google-green rounded-full animate-pulse" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
            About Us
          </motion.span>
          <motion.h2
            className="text-3xl md:text-5xl font-display font-bold mb-6"
            animate={{ textShadow: [
              '0 0 16px #4285F4aa',
              '0 0 32px #34A853aa',
              '0 0 16px #FBBC05aa',
              '0 0 32px #EA4335aa',
              '0 0 16px #4285F4aa',
            ] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            Who <span className="text-gradient-google">We Are</span>
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Google Developer Groups on Campus - VIT Bhopal is a community of student developers passionate about Google technologies and building the future.
          </motion.p>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {bentoItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                className={`group relative ${item.className}`}
                variants={itemVariants}
              >
                <motion.div
                  className={`h-full p-6 md:p-8 rounded-2xl bg-card border border-border/50 backdrop-blur-sm transition-all duration-300 hover:border-${item.color}/30 hover:shadow-card-hover overflow-hidden`}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                >
                  {/* Hover glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-${item.color}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  {/* Icon */}
                  <motion.div
                    className={`inline-flex p-3 rounded-xl ${item.iconBg} mb-4 relative z-10 shadow-lg`}
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.15, filter: 'drop-shadow(0 0 24px #4285F4aa)' }}
                    animate={{
                      y: [0, -10, 0],
                      boxShadow: [
                        '0 0 16px #4285F4aa',
                        '0 0 32px #34A853aa',
                        '0 0 16px #FBBC05aa',
                        '0 0 32px #EA4335aa',
                        '0 0 16px #4285F4aa',
                      ],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Icon className={`w-6 h-6 text-${item.color}`} />
                  </motion.div>

                  {/* Content */}
                  <h3 className={`text-xl md:text-2xl font-display font-bold mb-3 relative z-10 ${item.featured ? `text-${item.color}` : 'text-foreground'}`}>
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground relative z-10 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Decorative corner element */}
                  <div className={`absolute -bottom-2 -right-2 w-20 h-20 bg-${item.color}/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom stats */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {[
            { number: '100+', label: 'Active Members', color: 'google-blue' },
            { number: '10+', label: 'Events Hosted', color: 'google-red' },
            { number: '30+', label: 'Workshops', color: 'google-yellow' },
            { number: '10+', label: 'Projects Built', color: 'google-green' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 rounded-xl bg-card/50 border border-border/30"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <motion.p
                className={`text-3xl md:text-4xl font-display font-bold text-${stat.color}`}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1, type: 'spring' }}
              >
                {stat.number}
              </motion.p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
