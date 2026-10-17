export default function SectionMeta({ label, count, light = false }) {
  const color = light ? 'text-white' : 'text-black';
  return (
    <div className={`flex items-start justify-between mb-4 ${color}`}>
      <span className="flex items-center gap-2 text-xs uppercase tracking-widest">
        <span className="w-2 h-2 rounded-full bg-[#E84B2F] inline-block" />
        {label}
      </span>
      {count !== undefined && (
        <span className="text-sm font-mono">[{count}]</span>
      )}
    </div>
  );
}
