import { motion } from 'framer-motion'
import Image from 'next/image'
import SectionMeta from '../SectionMeta'
import CtaButton from '../CtaButton'

const defaultHeading = '(FDI) stands as one of the largest Workplace Fit-out contractors across New Zealand, delivering inspiring offices since 1997.'
const defaultBody = "Through our customer obsession, we've cultivated enduring client relationships by meeting project deadlines, pioneering cutting-edge construction solutions, delivering optimal value, and unwaveringly upholding our exceptional workmanship standards."

export default function AboutSection({ data }) {
  return (
    <section id="about" className="py-20 px-6 md:px-12">
      <SectionMeta label="Meet the FDI" />
      <h2 className="text-5xl md:text-7xl font-black mb-16">About Us</h2>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
	        viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xl md:text-2xl font-bold leading-snug mb-6">
            {data?.aboutHeading || defaultHeading}
          </p>
          <p className="text-sm text-gray-500 mb-8 leading-relaxed">
            {data?.aboutBody || defaultBody}
          </p>
          <CtaButton label="About FDI Build" dark />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative h-[480px]"
        >
          <Image
            src={data?.aboutImage?.sourceUrl || 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80'}
            alt={data?.aboutImage?.altText || 'About FDI'}
            fill
            className="object-cover"
          />
        </motion.div>
      </div>
    </section>
  )
}
