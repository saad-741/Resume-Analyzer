export default function ScoreCard({ title, value, subtitle }) {
  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl shadow-black/20 p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />

      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 relative">
        {title}
      </p>

      <p className="text-3xl font-black text-white mt-2 relative">
        {value}
      </p>

      <p className="text-sm text-slate-500 mt-1 relative">
        {subtitle}
      </p>
    </div>
  );
}