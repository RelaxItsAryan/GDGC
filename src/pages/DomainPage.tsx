import { useParams } from 'react-router-dom';
import { domains } from '@/data/domains';

export default function DomainPage() {
  const { slug } = useParams();
  const domain = domains.find((d) => d.slug === slug);

  if (!domain) return <div className="py-20 container mx-auto px-4">Domain not found</div>;

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-display font-bold mb-4">{domain.name}</h1>
        <p className="text-muted-foreground mb-6">{domain.description}</p>

        <h3 className="text-2xl font-semibold mb-3">Skills you'll learn</h3>
        <ul className="list-disc pl-6 text-muted-foreground">
          {domain.skills.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>

        <h3 className="text-2xl font-semibold mt-6 mb-3">Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {domain.projects.map((p) => (
            <div key={p.title} className="p-4 bg-card border border-border rounded-lg">
              <h4 className="font-medium">{p.title}</h4>
              <p className="text-sm text-muted-foreground">{p.description}</p>
              <div className="mt-2 flex gap-2">
                {p.github && (
                  <a href={p.github} className="text-google-blue underline text-sm">GitHub</a>
                )}
                {p.demo && (
                  <a href={p.demo} className="text-google-green underline text-sm">Live Demo</a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
