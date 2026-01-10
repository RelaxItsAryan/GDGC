import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import FloatingParticles from './three/FloatingParticles';

const faqs = [
  {
    question: 'What is GDG On Campus, and how is it different?',
    answer:
      'GDG On Campus is a student-led tech community backed by Google Developers. It\'s focused on peer-to-peer learning, building tech skills, and community projects. Unlike typical tech clubs, GDG is recognized globally and provides direct opportunities to engage with Google technologies and experts.',
  },
  {
    question: 'Who can join GDG On Campus?',
    answer:
      'Any student currently enrolled at VIT Bhopal University can join GDGC! Whether you\'re a beginner or an experienced developer, everyone is welcome. We believe in inclusive learning and growing together as a community.',
  },
  {
    question: 'How do I get started with GDG On Campus?',
    answer:
      'Getting started is easy! Simply fill out our registration form, join our Discord/WhatsApp community, and start attending our events. You\'ll receive updates about upcoming workshops, hackathons, and networking opportunities.',
  },
  {
    question: 'What kind of events does GDG On Campus host?',
    answer:
      'We host a variety of events including DevFest (our flagship annual event), Cloud Community Days, Flutter workshops, AI/ML sessions, hackathons, speaker sessions with industry experts, and watch parties for Google I/O and other tech events.',
  },
  {
    question: 'How does GDG On Campus help in career growth?',
    answer:
      'GDGC provides hands-on learning experiences, networking opportunities with industry professionals, resume-building projects, and exposure to Google technologies. Many of our alumni have secured positions at top tech companies and startups.',
  },
  {
    question: 'Is GDG On Campus officially supported by Google?',
    answer:
      'Yes! GDG On Campus is an official Google Developers program. We receive support from Google in the form of resources, swag, and access to Google Developer Experts and Googlers for our events.',
  },
];

export default function FAQSection() {
  return (
    <section id="faq" className="py-24 bg-background relative overflow-hidden">
      <FloatingParticles className="absolute inset-0 z-0 pointer-events-none" smallCount={900} bigCount={10} showModels={false} />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Title */}
          <motion.div
            initial={{ opacity: 0, x: -30, rotateX: 45 }}
            whileInView={{ opacity: 1, x: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="sticky top-32"
          >
            <motion.h2
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              animate={{ textShadow: [
                '0 0 16px #4285F4aa',
                '0 0 32px #34A853aa',
                '0 0 16px #FBBC05aa',
                '0 0 32px #EA4335aa',
                '0 0 16px #4285F4aa',
              ] }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              <motion.span animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
                Frequently
              </motion.span>
              <br />
              <motion.span animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 0.5, ease: 'easeInOut' }}>
                asked
              </motion.span>
              <br />
              <motion.span animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 1, ease: 'easeInOut' }}>
                questions
              </motion.span>
            </motion.h2>
            <motion.p
              className="mt-6 text-muted-foreground text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Have more questions? Feel free to reach out to us on our social
              media channels or drop us an email!
            </motion.p>
            <motion.a
              href="#join"
              className="inline-flex items-center gap-2 mt-6 text-google-blue font-semibold hover:underline"
              whileHover={{ x: 5 }}
            >
              Contact Us →
            </motion.a>
          </motion.div>

          {/* Right Column - Accordion */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <AccordionItem
                    value={`item-${index}`}
                    className="border border-border rounded-2xl px-6 data-[state=open]:bg-google-blue/5 data-[state=open]:border-google-blue/30 transition-all"
                  >
                    <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline py-5 [&[data-state=open]]:text-google-blue">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
