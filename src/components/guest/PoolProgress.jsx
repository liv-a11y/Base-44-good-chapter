const money = (value) => `$${Number(value || 0).toLocaleString("en-US")}`;

/** How far a pooled item has come, in one line and one bar. */
export default function PoolProgress({ collected, target, givers }) {
  const percent = target > 0 ? Math.min(100, Math.round((collected / target) * 100)) : 0;
  const left = Math.max(0, target - collected);

  return (
    <div className="mt-4 border-t border-ink/25 pt-4">
      <div className="flex items-baseline justify-between gap-3">
        <span className="gc-label text-ink/55">Given together</span>
        <span className="gc-spec shrink-0 text-ink">
          {money(collected)} of {money(target)}
        </span>
      </div>

      <div className="mt-2 h-2 w-full border border-ink bg-plaster">
        <div className="h-full bg-cobalt" style={{ width: `${percent}%` }} />
      </div>

      <p className="gc-label mt-2 text-ink/45">
        {givers === 0 ? "Nobody in yet" : `${givers} ${givers === 1 ? "person" : "people"} in`}
        {left > 0 ? ` / ${money(left)} to go` : " / full"}
      </p>
    </div>
  );
}