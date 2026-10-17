import { motion } from 'framer-motion';

const DEFAULT_STATS = [
  { value: '40+', label: 'Millions square meters of office space was built', position: 'center' },
  { value: '36', label: 'Partners & Collaborators', position: 'bottom-left' },
  { value: '1986', label: 'Established in 1986', position: 'bottom-right' },
];

export default function StatsSection({ data }) {
  const stats = data?.statsItems?.length ? data.statsItems : DEFAULT_STATS;

  return (
    <section
      id="approach"
      className="relative min-h-[70vh] flex flex-col justify-between p-12 overflow-hidden"
      style={{ background: '#C0392B' }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center mix-blend-multiply opacity-60"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&q=80')" }}
      />
      <div className="relative z-10 flex flex-col h-full justify-between min-h-[60vh]">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[18vw] font-black text-white leading-none text-center"
        >
          {stats[0]?.value || '40+'}
        </motion.p>
        <p className="text-white text-sm text-center -mt-4 mb-8">{stats[0]?.label}</p>
        <div className="flex justify-between items-end">
          <div>
            <p className="text-[10vw] font-black text-white leading-none">{stats[1]?.value || '36'}</p>
            <p className="text-white text-xs mt-1">{stats[1]?.label || 'Partners & Collaborators'}</p>
          </div>
          <div className="text-right">
            <p className="text-[10vw] font-black text-white leading-none">{stats[2]?.value || '1986'}</p>
            <p className="text-white text-xs mt-1">{stats[2]?.label || 'Established in 1986'}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
