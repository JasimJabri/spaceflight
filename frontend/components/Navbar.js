import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  // TODO: wire up mobile menu
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
      <Link href="/" className="flex items-center gap-2 font-bold text-lg">
        <span className="text-[#E84B2F]">▲</span> TheWebGuys
      </Link>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium">
        <Link href="#about">About Us</Link>
	      <Link href="#services">Our Services</Link>
        <Link href="#approach">Our Approach</Link>
        <Link href="#projects">Our Projects</Link>
        <Link href="#newsletter">Contact Us</Link>
      </div>

      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="bg-black text-white px-5 py-2 text-sm font-medium flex items-center gap-2"
      >
        Menu <span className="text-xs">✦</span>
      </button>
    </nav>
  )
}
