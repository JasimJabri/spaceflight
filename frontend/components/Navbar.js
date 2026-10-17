import Link from 'next/link'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { label: 'About Us', href: '#about' },
    { label: 'Our Services', href: '#services' },
    { label: 'Our Approach', href: '#approach' },
    { label: 'Our Projects', href: '#projects' },
    { label: 'Contact Us', href: '#newsletter' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="text-[#E84B2F]">▲</span> TheWebGuys
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {links.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden bg-black text-white px-5 py-2 text-sm font-medium flex items-center gap-2"
        >
          {menuOpen ? 'Close' : 'Menu'} <span className="text-xs">✦</span>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden border-t border-gray-100 bg-white"
          >
            {links.map((l, i) => (
              <motion.div
                key={l.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-6 py-4 text-sm font-medium border-b border-gray-100 hover:text-[#E84B2F] transition-colors"
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
