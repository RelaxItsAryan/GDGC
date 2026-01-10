import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Check, Sparkles, Mail, User, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AnimatedDNA from './three/AnimatedDNA';
import FloatingParticles from './three/FloatingParticles';

export default function JoinSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    branch: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
    }, 500);
  };

  return (
    <section
      id="join"
      className="relative py-24 overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-google-blue/5 via-background to-google-yellow/5" />
      
      {/* Section particles (overlayed above background, underneath content) */}
      <FloatingParticles className="absolute inset-0 z-0 pointer-events-none" smallCount={800} bigCount={18} showModels={true} />

      {/* Floating Decorations */}
      <motion.div
        className="absolute top-20 left-10 text-6xl opacity-20"
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        {'{ }'}
      </motion.div>
      <motion.div
        className="absolute bottom-20 right-10 text-6xl opacity-20"
        animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
      >
        {'< />'}
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-google-yellow/10 rounded-full mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="w-5 h-5 text-google-yellow" />
              <span className="font-medium text-google-yellow">Join the Community</span>
            </motion.div>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Become a Part of
              <br />
              <span className="text-gradient-google">GDGC VIT Bhopal</span>
              <span className="ml-2">🚀</span>
            </h2>

            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Join 500+ developers learning, building, and growing together. 
              Your journey to becoming a better developer starts here!
            </p>
          </motion.div>

          {/* 3D DNA Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-8"
          >
            <AnimatedDNA />
          </motion.div>

          {/* Form Card */}
          <motion.div
            className="bg-card rounded-3xl p-8 md:p-10 shadow-card border border-border"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <User className="w-4 h-4 text-google-blue" />
                        Full Name
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter your name"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="h-12 rounded-xl border-2 focus:border-google-blue"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Mail className="w-4 h-4 text-google-red" />
                        Email Address
                      </label>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="h-12 rounded-xl border-2 focus:border-google-red"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-google-green" />
                      Branch / Year
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g., CSE - 2nd Year"
                      required
                      value={formData.branch}
                      onChange={(e) =>
                        setFormData({ ...formData, branch: e.target.value })
                      }
                      className="h-12 rounded-xl border-2 focus:border-google-green"
                    />
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      className="w-full h-14 rounded-xl bg-primary text-primary-foreground font-semibold text-lg shadow-glow-blue hover:shadow-card-hover transition-all"
                    >
                      <span className="flex items-center gap-2">
                        Join GDGC Now
                        <Rocket className="w-5 h-5" />
                      </span>
                    </Button>
                  </motion.div>

                  <p className="text-center text-sm text-muted-foreground">
                    By joining, you agree to our community guidelines and code of conduct.
                  </p>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  className="text-center py-8"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Confetti Animation */}
                  <motion.div
                    className="relative mx-auto w-24 h-24 mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                  >
                    <div className="absolute inset-0 bg-google-green rounded-full flex items-center justify-center">
                      <Check className="w-12 h-12 text-primary-foreground" />
                    </div>
                    
                    {/* Confetti particles */}
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-3 h-3 rounded-full"
                        style={{
                          background: ['#4285F4', '#EA4335', '#FBBC04', '#34A853'][i % 4],
                          left: '50%',
                          top: '50%',
                        }}
                        initial={{ x: 0, y: 0, scale: 0 }}
                        animate={{
                          x: Math.cos((i / 12) * Math.PI * 2) * 80,
                          y: Math.sin((i / 12) * Math.PI * 2) * 80,
                          scale: [0, 1, 0],
                        }}
                        transition={{
                          duration: 1,
                          delay: 0.2,
                          ease: 'easeOut',
                        }}
                      />
                    ))}
                  </motion.div>

                  <h3 className="font-display text-2xl font-bold mb-3">
                    Welcome to GDGC! 🎉
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    You're now part of our amazing developer community.
                    <br />
                    Check your email for next steps!
                  </p>

                  <motion.button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', email: '', branch: '' });
                    }}
                    className="text-google-blue font-medium hover:underline"
                    whileHover={{ scale: 1.05 }}
                  >
                    Register another member →
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Benefits */}
          <motion.div
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {[
              { emoji: '🎓', text: 'Learn from Experts' },
              { emoji: '🤝', text: 'Network & Connect' },
              { emoji: '🏆', text: 'Win Swags' },
              { emoji: '💼', text: 'Career Opportunities' },
            ].map((benefit, index) => (
              <motion.div
                key={benefit.text}
                className="p-4 bg-card/50 rounded-2xl border border-border"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <span className="text-3xl block mb-2">{benefit.emoji}</span>
                <span className="text-sm font-medium">{benefit.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
