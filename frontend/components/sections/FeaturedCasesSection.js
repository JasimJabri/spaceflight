import { useRef } from 'react';
import Image from 'next/image';
import SectionMeta from '../SectionMeta';
import CtaButton from '../CtaButton';

const DEFAULT_CASES = [
  { title: 'Amazon', size: '14,500 SQM', type: 'Design & Build, Detail & Build', location: 'CFC – Cairo, Egypt', image: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=800&q=80' },
  { title: 'Deloitte', size: '17,500 SQM', type: 'Design & Build', location: 'Zahran St – Amman, Jordan', image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80' },
  { title: 'Brouge', size: '17,500 SQM', type: 'Design & Build', location: 'Zahran St – Amman, Jordan', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80' },
  { title: 'Merck', size: '12,000 SQM', type: 'Fit-Out', location: 'Dubai, UAE', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80' },
  { title: 'Booking.com', size: '9,800 SQM', type: 'Interiors', location: 'Riyadh, KSA', image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80' },
  { title: 'Capital Bank', size: '11,200 SQM', type: 'Design & Build', location: 'Amman, Jordan', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80' },
];

export default function FeaturedCasesSection({ data }) {
  const cases = data?.featuredCases?.length ? data.featuredCases : DEFAULT_CASES;
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 420, behavior: 'smooth' });
  };

  return (
    <section id="projects" className="py-20 px-6 md:px-12">
      <SectionMeta label="Portfolio" count={cases.length} />
      <h2 className="text-5xl md:text-7xl font-black mb-4">Featured Cases</h2>
      <div className="border-t border-gray-200 mb-4" />

      <div className="flex justify-end gap-3 mb-6">
        <button onClick={() => scroll(-1)} className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors">←</button>
        <button onClick={() => scroll(1)} className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors">→</button>
      </div>

      <div ref={scrollRef} className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
        {cases.map((c, i) => (
          <div key={i} className="min-w-[360px] flex-shrink-0">
            <div className="relative h-64 mb-4">
              <Image
                src={c.image?.sourceUrl || c.image}
                alt={c.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-xs">+</span>
              <h3 className="text-2xl font-black">{c.title}</h3>
            </div>
            <div className="text-sm text-gray-500 space-y-0.5 border-b border-gray-200 pb-4">
              <p>Size: {c.size}</p>
              <p>Type: {c.type}</p>
              <p>Location: {c.location}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <CtaButton label="View All Case Studies" dark />
      </div>
    </section>
  );
}
