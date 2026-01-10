import { motion } from 'framer-motion';
import { BookOpen, Users, Code, Rocket, Lightbulb, Trophy } from 'lucide-react';

const activities = [
  {
    icon: BookOpen,
    title: 'Speaker Sessions',
    description: 'Learn from industry experts and Google Developer Experts in interactive sessions.',
    color: 'bg-google-blue',
    borderColor: 'border-google-blue',
  },
  {
    icon: Code,
    title: 'Workshops',
    description: 'Hands-on coding workshops on cutting-edge technologies like Flutter, Firebase, and ML.',
    color: 'bg-google-green',
    borderColor: 'border-google-green',
  },
  {
    icon: Users,
    title: 'Watch Parties',
    description: 'Join us for Google I/O, DevFest, and other major tech event watch parties.',
    color: 'bg-google-yellow',
    borderColor: 'border-google-yellow',
  },
  {
    icon: Rocket,
    title: 'Networking',
    description: 'Connect with like-minded developers and build lasting professional relationships.',
    color: 'bg-google-red',
    borderColor: 'border-google-red',
  },
  {
    icon: Trophy,
    title: 'Hackathons',
    description: 'Compete in exciting hackathons and build innovative solutions to real-world problems.',
    color: 'bg-google-blue',
    borderColor: 'border-google-blue',
  },
  {
    icon: Lightbulb,
    title: 'Open Source',
    description: 'Contribute to open-source projects and make an impact on the developer community.',
    color: 'bg-google-green',
    borderColor: 'border-google-green',
  },
];

export default function WhatWeDoSection() {
  return (
    <section id="what-we-do" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8"
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
              className="text-google-yellow text-3xl font-bold"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              //
            </motion.span>
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
              What We Do
            </motion.h2>
            <div className="flex gap-1">
              <motion.span className="w-3 h-3 rounded-full bg-google-yellow" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
              <motion.span className="w-3 h-3 rounded-full bg-google-yellow" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }} />
              <motion.span className="w-3 h-3 rounded-full bg-google-yellow" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.6 }} />
            </div>
            <motion.span
              className="text-3xl"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.div>
          <motion.p
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            We keep our community engaged through impactful initiatives, delivered{' '}
            <span className="text-google-yellow font-semibold">dil se</span> – just like
            a warm cup of chai on a chilly morning.
          </motion.p>
        </motion.div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.title}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <motion.div
                className={`relative h-full bg-card rounded-3xl p-8 border-2 ${activity.borderColor} shadow-card overflow-hidden`}
                whileHover={{
                  scale: 1.03,
                  y: -8,
                  boxShadow: 'var(--shadow-card-hover)',
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Corner decoration */}
                <div className="absolute top-0 right-0 w-24 h-24">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path
                      d="M100,0 L100,100 Q60,100 60,60 L60,0 Z"
                      className={`fill-current ${activity.color.replace('bg-', 'text-')}/10`}
                    />
                  </svg>
                </div>

                {/* Icon */}
                <motion.div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${activity.color} text-primary-foreground mb-6 shadow-lg`}
                  whileHover={{ rotate: 360, scale: 1.15, filter: 'drop-shadow(0 0 24px #4285F4aa)' }}
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
                  <activity.icon className="w-7 h-7" />
                </motion.div>

                {/* Title */}
                <h3 className="font-display text-xl font-bold mb-3">
                  {activity.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {activity.description}
                </p>

                {/* Bottom decoration */}
                <div className="absolute bottom-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity">
                  <span className={`text-4xl font-bold ${activity.color.replace('bg-', 'text-')}`}>
                    {'</>'}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
