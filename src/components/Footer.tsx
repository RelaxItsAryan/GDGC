import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Instagram, Mail, Heart } from 'lucide-react';
import gdgcLogo from '@/assets/gdgc-logo.png';

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Mail, href: '#', label: 'Email' },
];

const footerLinks = [
  {
    title: 'Quick Links',
    links: [
      { name: 'Events', href: '#events' },
      { name: 'What We Do', href: '#what-we-do' },
      { name: 'Gallery', href: '#gallery' },
      { name: 'FAQ', href: '#faq' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Google Developers', href: 'https://developers.google.com' },
      { name: 'GDG Community', href: 'https://gdg.community.dev' },
      { name: 'VIT Bhopal', href: 'https://vitbhopal.ac.in' },
      { name: 'Code of Conduct', href: '#' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20, rotateX: 45 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <a href="#home" className="flex items-center gap-3 mb-6">
              <img
                src={gdgcLogo}
                alt="GDGC Logo"
                className="h-10 w-auto brightness-0 invert"
              />
              <motion.span
                className="font-display font-bold text-lg"
                animate={{ textShadow: [
                  '0 0 16px #4285F4aa',
                  '0 0 32px #34A853aa',
                  '0 0 16px #FBBC05aa',
                  '0 0 32px #EA4335aa',
                  '0 0 16px #4285F4aa',
                ] }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                GDGC VIT Bhopal
              </motion.span>
            </a>
            <p className="text-background/70 text-sm leading-relaxed mb-6">
              Building the next generation of developers at VIT Bhopal University.
              Learn, build, and grow together with us!
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
                  whileHover={{ scale: 1.2, y: -6, rotate: [0, 10, -10, 0] }}
                  animate={{ y: [0, -6, 0], boxShadow: [
                    '0 0 16px #4285F4aa',
                    '0 0 32px #34A853aa',
                    '0 0 16px #FBBC05aa',
                    '0 0 32px #EA4335aa',
                    '0 0 16px #4285F4aa',
                  ] }}
                  transition={{ duration: 4 + idx, repeat: Infinity, ease: 'easeInOut' }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Link Columns */}
          {footerLinks.map((column, index) => (
            <motion.div
              key={column.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
            >
              <h3 className="font-display font-bold text-lg mb-4">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <motion.a
                      href={link.href}
                      className="text-background/70 hover:text-background transition-colors text-sm"
                      whileHover={{ x: 5 }}
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Newsletter Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="font-display font-bold text-lg mb-4">
              Stay Updated
            </h3>
            <p className="text-background/70 text-sm mb-4">
              Get the latest updates on events and workshops.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2.5 rounded-lg bg-background/10 border border-background/20 text-sm placeholder:text-background/50 focus:outline-none focus:border-background/40"
              />
              <motion.button
                className="px-4 py-2.5 bg-google-blue rounded-lg font-medium text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="mt-16 pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-background/60 text-sm text-center md:text-left">
            © 2025 GDGC VIT Bhopal. Made with{' '}
            <Heart className="w-4 h-4 inline-block text-google-red fill-google-red" />{' '}
            by the GDGC Team.
          </p>
          <div className="flex gap-6 text-sm text-background/60">
            <a href="#" className="hover:text-background transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-background transition-colors">
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
