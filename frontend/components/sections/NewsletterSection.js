import { useState } from 'react';
import Image from 'next/image';

const IMAGES = [
  { src: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=80', style: 'top-0 left-1/2 -translate-x-1/2 w-36 h-36' },
  { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', style: 'top-1/4 left-0 w-32 h-52' },
  { src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80', style: 'top-1/4 right-0 w-32 h-52' },
  { src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80', style: 'bottom-0 left-1/4 w-44 h-36' },
  { src: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&q=80', style: 'bottom-0 right-1/4 w-36 h-36' },
];

export default function NewsletterSection({ data }) {
  const [email, setEmail] = useState('');

	return (
    <section id="newsletter" className="relative py-32 px-6 overflow-hidden min-h-[600px] flex items-center justify-center">
      {IMAGES.map((img, i) => (
        <div key={i} className={`absolute ${img.style} hidden md:block`}>
          <div className="relative w-full h-full">
            <Image src={img.src} alt="" fill className="object-cover" />
          </div>
        </div>
      ))}
      <div className="relative z-10 text-center max-w-lg w-full">
        <h2 className="text-5xl md:text-6xl font-black mb-4">
          {data?.newsletterHeading || 'Subscribe to our newsletter'}
        </h2>
        <p className="text-sm text-gray-500 mb-8">
          {data?.newsletterSubtext || 'To keep up to date and be the first to know about the news'}
        </p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full border border-gray-200 bg-gray-50 px-4 py-3 text-sm mb-3 outline-none focus:border-gray-400"
        />
        <button className="w-full bg-[#E84B2F] text-white px-6 py-3 text-sm font-medium flex items-center justify-between hover:opacity-90 transition-opacity">
          Subscribe <span>▶</span>
        </button>
      </div>
    </section>
  );
}
