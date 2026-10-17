export default function CtaButton({ label, href = '#', dark = false, className = '' }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-between gap-4 px-6 py-3 text-sm font-medium transition-opacity hover:opacity-80 ${
        dark ? 'bg-black text-white' : 'bg-[#E84B2F] text-white'
      } ${className}`}
    >
      {label}
      <span className="text-xs">▶</span>
    </a>
  );
}
