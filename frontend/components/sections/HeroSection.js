import { motion } from 'framer-motion';
import CtaButton from '../CtaButton';
import Image from 'next/image';

export default function HeroSection({ data }) {
  return (
    <section className="pt-16 min-h-screen flex flex-col overflow-x-hidden">
      {/* Top bar */}
      <div className="grid grid-cols-2 border-b border-gray-200">
        <div className="px-6 py-4 text-xs text-gray-500 border-r border-gray-200">{data?.heroTagline || 'Since 1986'}</div>
        <div className="px-6 py-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-2xl font-semibold leading-tight"
          >
            {data?.heroHeading || 'Re-imagined Your Workplace'}
          </motion.h1>
          <div className="mt-6">
            <CtaButton label="Inquire Now" />
          </div>
        </div>
      </div>

      {/* Big brand name */}
      <div className="overflow-hidden w-full">
        <motion.div
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="flex items-center px-4"
        >
          <span className="text-[18vw] font-black leading-none tracking-tight">FDI</span>
          <span className="text-[10vw] font-black leading-none mx-2">®</span>
          <span className="text-[18vw] font-black leading-none tracking-tight">RI</span>
        </motion.div>
      </div>

      {/* Hero image */}
      <div className="relative flex-1 min-h-[50vh]">
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80"
          alt="FDI Workplace"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute bottom-6 left-6 text-xs text-white flex items-center gap-1 cursor-pointer">
          Scroll down <span>↓</span>
        </div>
      </div>
    </section>
  );
}
