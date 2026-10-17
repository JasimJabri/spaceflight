import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import SectionMeta from '../SectionMeta';
import CtaButton from '../CtaButton';

const DEFAULT_SERVICES = [
  { name: 'Design & Build', description: 'From concept creation to project completion, our comprehensive design and build services cover every phase of your construction journey.', image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80' },
  { name: 'Interiors', description: 'Crafting inspiring interior environments tailored to your brand and culture.', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80' },
  { name: 'MEP/IT/AV/SEC', description: 'Full mechanical, electrical, plumbing, IT, AV and security integration.', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80' },
  { name: 'Fit-Out', description: 'Complete fit-out solutions from shell to fully operational workspace.', image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80' },
  { name: 'Joinery', description: 'Bespoke joinery crafted to the highest standards.', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80' },
  { name: 'MEP', description: 'Mechanical and electrical project delivery at scale.', image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80' },
  { name: 'Office Renovation', description: 'Transforming existing spaces into modern, productive environments.', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80' },
  { name: '3D Mapping', description: 'Advanced 3D spatial mapping and visualisation services.', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80' },
  { name: 'Procurement & Trade', description: 'Strategic procurement and trade management for complex projects.', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80' },
  { name: 'EV Charging Installation', description: 'Future-ready EV charging infrastructure for commercial spaces.', image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80' },
  { name: 'Facility Management', description: 'Ongoing facility management to keep your workspace performing at its best.', image: 'https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=800&q=80' },
];

export default function ServicesSection({ data }) {
  const services = data?.services?.length ? data.services : DEFAULT_SERVICES;
	const [active, setActive] = useState(0);

  return (
    <section id="services" className="bg-black text-white py-20 px-6 md:px-12">
      <SectionMeta label="Expertise" count={services.length} light />
      <h2 className="text-5xl md:text-7xl font-black mb-16">What Do We Do</h2>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Left copy */}
        <div>
          <p className="text-xl font-bold leading-snug mb-4">
            {data?.servicesHeading || 'At the heart of our business is the ability to provide comprehensive, end-to-end solutions tailored to meet the unique needs of every client.'}
          </p>
          <p className="text-sm text-gray-400 mb-8 leading-relaxed">
            {data?.servicesBody || 'Our diverse range of services ensures that we can manage all aspects of a project, from initial design concepts to final execution and ongoing support.'}
          </p>
          <CtaButton label="Learn More" />
        </div>

        {/* Service list */}
        <div className="border-t border-gray-700">
          <p className="text-xs text-gray-500 py-3">Services:</p>
          {services.map((s, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-full text-left py-3 px-2 border-b border-gray-700 text-sm transition-colors ${
                i === active ? 'text-white font-semibold bg-white/10' : 'text-gray-400 hover:text-white'
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>

        {/* Service detail card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-white text-black p-0 overflow-hidden"
          >
            <div className="relative h-48">
              <Image
                src={services[active]?.image?.sourceUrl || services[active]?.image || ''}
                alt={services[active]?.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold mb-1">{services[active]?.name}</h3>
              <p className="text-xs text-gray-500 mb-3">Service</p>
              <p className="text-sm text-gray-600 leading-relaxed">{services[active]?.description}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
