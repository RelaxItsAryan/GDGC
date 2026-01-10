import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { domains } from '@/data/domains';

export default function DomainsPage() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-display font-bold">Domains</h2>
          <p className="text-muted-foreground mt-2">Explore our Tech and Non-Tech domains</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {domains.map((d) => (
            <Link key={d.slug} to={`/domains/${d.slug}`} className="block">
              <motion.div className="p-6 bg-card border border-border rounded-2xl hover:shadow-card-hover transition-transform" whileHover={{ scale: 1.02 }}>
                <h3 className="font-display text-xl font-bold mb-2">{d.name}</h3>
                <p className="text-muted-foreground">{d.description}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
