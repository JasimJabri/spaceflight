import { useRef } from 'react';
import SectionMeta from '../SectionMeta';

const DEFAULT_PARTNERS = [
  { name: 'amazon' },
  { name: 'Booking.com' },
  { name: 'Deloitte.' },
  { name: 'MERCK' },
];

export default function PartnersSection({ data }) {
  const partners = data?.partners?.length ? data.partners : DEFAULT_PARTNERS;
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 300, behavior: 'smooth' });
  };

  return (
    <section className="bg-gray-100 py-20 px-6 md:px-12">
      <SectionMeta label="Collaborators" count={partners.length} />
      <h2 className="text-5xl md:text-7xl font-black mb-12">Our Partners</h2>

      <div className="grid md:grid-cols-4 gap-8 items-start">
        <p className="text-xl font-bold leading-snug col-span-1">
          We are proud to collaborate with a diverse group of trusted partners who share our commitment to excellence and innovation.
        </p>

        <div className="col-span-3">
          <div ref={scrollRef} className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
            {partners.map((p, i) => (
              <div key={i} className="min-w-[200px] bg-white flex flex-col items-center justify-center p-8 relative">
                {p.logo?.sourceUrl ? (
                  <img src={p.logo.sourceUrl} alt={p.name} className="max-h-12 object-contain" />
                ) : (
                  <span className="font-bold text-lg">{p.name}</span>
                )}
                <span className="absolute bottom-2 left-2 w-5 h-5 rounded-full bg-[#E84B2F] text-white text-xs flex items-center justify-center">
                  {i + 1}
                </span>
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-6">
            <button onClick={() => scroll(-1)} className="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center hover:bg-gray-200 transition-colors">←</button>
            <button onClick={() => scroll(1)} className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors">→</button>
          </div>
        </div>
      </div>
    </section>
  );
}
