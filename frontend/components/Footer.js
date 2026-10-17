import { useState } from 'react';

const NAV_LINKS = [
  { label: 'About Us', href: '#about' },
  { label: 'Our Services', href: '#services' },
  { label: 'Our Approach', href: '#approach' },
  { label: 'Our Projects', href: '#projects' },
  { label: 'Contact Us', href: '#newsletter' },
  { label: 'News Blog', href: '#news' },
  { label: 'FAQs', href: '#' },
];

export default function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Contact / newsletter bar */}
      <div className="grid md:grid-cols-3 gap-8 px-6 md:px-12 py-16 border-b border-gray-200">
        <nav className="space-y-2">
          {NAV_LINKS.map((l) => (
	          <a key={l.label} href={l.href} className="block text-xl font-black hover:text-[#E84B2F] transition-colors">{l.label}</a>
          ))}
        </nav>

        <div>
          <h3 className="text-4xl font-black mb-6">Let's get<br />in touch</h3>
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-gray-400"
            />
            <button className="bg-[#E84B2F] text-white px-6 py-3 text-sm font-medium flex items-center gap-2 hover:opacity-90 transition-opacity whitespace-nowrap">
              Subscribe <span>▶</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col items-end justify-start">
          <span className="flex items-center gap-2 text-sm">
            <span className="w-2 h-2 rounded-full bg-[#E84B2F] inline-block" /> FDI Newsletter
          </span>
        </div>
      </div>

      {/* Social + address */}
      <div className="grid md:grid-cols-3 gap-8 px-6 md:px-12 py-10 border-b border-gray-200">
        <div className="space-y-1">
          <a href="#" className="block text-xl font-black hover:text-[#E84B2F] transition-colors">Instagram</a>
          <a href="#" className="block text-xl font-black hover:text-[#E84B2F] transition-colors">LinkedIn</a>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-1">FDI Head Office</p>
          <p className="text-sm">00962795568202</p>
          <p className="text-sm">King Al Hussein Street, Complex<br />No.159, Amman, 11190, JO</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex items-center justify-between px-6 md:px-12 py-4 text-xs text-gray-400">
        <span>Copyright © 3056 FDI</span>
        <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
        <span>All rights reserved</span>
      </div>
    </footer>
  );
}
