import { useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import SectionMeta from '../SectionMeta'
import CtaButton from '../CtaButton'

// fallback articles for when the API hasn't been fetched yet
const placeholderArticles = [
  { title: 'SpaceX Launches New Starship Test Flight', url: '#', imageUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80', publishedAt: '2024-11-01', newsSite: 'SpaceflightNow' },
  { title: 'NASA Artemis Mission Update: Return to the Moon', url: '#', imageUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&q=80', publishedAt: '2024-10-28', newsSite: 'NASA' },
  { title: 'Blue Origin Completes Successful New Shepard Launch', url: '#', imageUrl: 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=800&q=80', publishedAt: '2024-10-20', newsSite: 'BlueOrigin' },
  { title: 'James Webb Telescope Reveals New Galaxy Discoveries', url: '#', imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80', publishedAt: '2024-10-15', newsSite: 'NASA' },
  { title: 'ESA Plans Next Mars Rover Mission for 2028', url: '#', imageUrl: 'https://images.unsplash.com/photo-1545156521-77bd85671d30?w=800&q=80', publishedAt: '2024-10-10', newsSite: 'ESA' },
  { title: 'Virgin Galactic Opens Commercial Space Tourism', url: '#', imageUrl: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=800&q=80', publishedAt: '2024-10-05', newsSite: 'SpaceNews' },
]

export default function LatestNewsSection({ articles = [] }) {
  let items = articles.length > 0 ? articles : placeholderArticles
	const scrollRef = useRef(null)

  const scroll = dir => {
    scrollRef.current?.scrollBy({ left: dir * 420, behavior: 'smooth' })
  }

  // TODO: add pagination later
  return (
    <section id="news" className="bg-[#1a1a1a] text-white py-20 px-6 md:px-12">
      <SectionMeta label="Blog" light />
      <h2 className="text-6xl md:text-8xl font-black mb-4">Latest News</h2>
      <div className="border-t border-gray-700 mb-8" />

      <div className="grid md:grid-cols-4 gap-8">
        <div className="flex flex-col justify-between">
          <div>
            <p className="text-xl font-bold leading-snug mb-4">
              Stay up-to-date with the latest developments and exciting announcements from our team.
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
              From groundbreaking project launches to new partnerships and industry insights, our Latest News section brings you the most recent updates on everything happening within our company.
            </p>
          </div>
          <CtaButton label="View All News" className="mt-8 self-start" />
        </div>

        <div className="col-span-3 relative">
          <div className="flex justify-end gap-3 mb-4">
            <button onClick={() => scroll(-1)} className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-gray-700 transition-colors">←</button>
            <button onClick={() => scroll(1)} className="w-10 h-10 rounded-full border border-white bg-white text-black flex items-center justify-center hover:bg-gray-200 transition-colors">→</button>
          </div>

          <div ref={scrollRef} className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
            {items.map((article, i) => (
              <motion.a
                key={i}
                href={article.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="min-w-[340px] flex-shrink-0 group"
              >
                <div className="relative h-52 mb-4 overflow-hidden">
                  <Image
                    src={article.imageUrl || 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80'}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-lg font-bold mb-2 leading-snug group-hover:text-gray-300 transition-colors">
                  {article.title}
                </h3>
                <p className="text-xs text-gray-400 mb-3">
                  {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                </p>
                {article.newsSite && (
                  <span className="text-xs bg-gray-700 text-gray-300 px-3 py-1 rounded-sm">
                    {article.newsSite}
                  </span>
                )}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
