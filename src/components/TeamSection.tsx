import { motion } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';
import { team } from '@/data/team';

function ProfileCard({ member }: { member: any }) {
  return (
    <motion.div
      className="bg-card border border-border rounded-2xl p-6 text-center"
      whileHover={{ scale: 1.03 }}
    >
      <div className="mx-auto mb-4 w-28 h-28 rounded-full bg-muted flex items-center justify-center overflow-hidden">
        {/* Use img if available otherwise placeholder initials */}
        <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
      </div>
      <h4 className="font-display font-semibold text-lg mb-1">{member.name}</h4>
      <p className="text-sm text-muted-foreground mb-3">{member.role}</p>
      <div className="flex items-center justify-center gap-3">
        <a href={member.linkedin} aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:scale-110 transition-transform">
          <Linkedin className="w-4 h-4" />
        </a>
        <a href={member.github} aria-label="GitHub" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:scale-110 transition-transform">
          <Github className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
}

export default function TeamSection() {
  return (
    <section id="team" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h3 className="text-3xl md:text-4xl font-display font-bold">Meet Our Panel Members</h3>
          <p className="text-muted-foreground mt-2">Core team behind GDGC VIT Bhopal</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {team.map((m) => (
            <ProfileCard key={m.id} member={m} />
          ))}
        </div>
      </div>
    </section>
  );
}
