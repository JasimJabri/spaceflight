import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionMeta from '../SectionMeta';

const DEFAULT_TESTIMONIALS = [
  { name: "Elias Ma'ayeh", role: 'Partner', company: 'Deloitte', quote: "A huge thank you to ADH for their success, with each project completed we find that you continuously push the envelope. You have proved time and time again to be our trusted partner in the Middle East. Looking forward to our next project together" },
  { name: 'Niranjan Chitre', role: 'Program Manager-mena', company: 'Amazon', quote: '' },
  { name: 'Amal Al-Khreisat', role: 'Facility Lead', company: 'Merck', quote: '' },
  { name: 'Scott Abercrombie', role: 'Program Manager', company: 'Capital', quote: '' },
  { name: 'Alex Roffey', role: 'Program Manager Mena', company: 'Capital', quote: '' },
  { name: 'Dr. Mazin Al Saidi', role: 'Chief Medical Officer', company: 'Ruwais Hospital Division', quote: '' },
  { name: 'Eng. Mohammed Hassan Al Zaahi', role: 'Chief Operations Officer', company: 'Group', quote: '' },
  { name: 'Hamad Khoory', role: 'Architect / Partner', company: '', quote: '' },
  { name: 'Saood Al Mehairi', role: 'Project Manager', company: '', quote: '' },
];

export default function TestimonialsSection({ data }) {
  const testimonials = data?.testimonials?.length ? data.testimonials : DEFAULT_TESTIMONIALS;
  const [open, setOpen] = useState(0);

  return (
    <section className="py-20 px-6 md:px-12">
      <SectionMeta label="Testimonials:" count={testimonials.length} />
      <h2 className="text-5xl md:text-7xl font-black mb-16">Our clients<br />say it best</h2>

      <div className="max-w-4xl ml-auto">
        {testimonials.map((t, i) => (
          <div key={i} className="border-b border-gray-200">
            <button
              onClick={() => setOpen(open === i ? -1 : i)}
              className="w-full flex items-center justify-between py-5 text-left"
            >
              <div className="flex items-center gap-8 flex-1">
                <span className="font-bold text-base w-48 shrink-0">{t.name}</span>
                <span className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-[#E84B2F] inline-block" />
                  {t.role}{t.company ? ` – ${t.company}` : ''}
                </span>
              </div>
              <span className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-lg shrink-0">
                {open === i ? '−' : '+'}
              </span>
            </button>
            <AnimatePresence>
              {open === i && t.quote && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="bg-gray-100 p-6 mb-4 text-sm text-gray-600 leading-relaxed">
                    {t.quote}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
