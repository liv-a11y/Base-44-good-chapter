import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { suggestGifts } from "@/lib/gift-fns";
import GiftCard from "@/components/start/GiftCard";
import GapQueue from "@/components/start/GapQueue";
import RecurringGaps from "@/components/start/RecurringGaps";

const EIGHT = 8;

const spoken = (answers) =>
  [answers.alwaysWears, answers.rewatches, answers.neverBuys, answers.anchorIdea]
    .filter(Boolean)
    .join(" ")
    .trim().length;

export default function GiftPanel({ answers, onChange, onBusy }) {
  const suggest = useServerFn(suggestGifts);
  const [items, setItems] = useState([]);
  const [gaps, setGaps] = useState([]);
  const [recurring, setRecurring] = useState([]);
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(true);

  // The step owns the draft; the panel only reports what came back.
  const report = useRef(onChange);
  report.current = onChange;
  const reportBusy = useRef(onBusy);
  reportBusy.current = onBusy;

  const key = JSON.stringify(answers);

  useEffect(() => {
    if (spoken(answers) < 4) {
      setItems([]);
      setGaps([]);
      setRecurring([]);
      report.current({ items: [], gaps: [] });
      reportBusy.current?.(false);
      return;
    }

    let live = true;
    const timer = setTimeout(async () => {
      setLoading(true);
      reportBusy.current?.(true);
      try {
        const result = await suggest({ data: answers });
        if (!live) return;
        setConnected(result.connected !== false);
        setItems(result.items || []);
        setGaps(result.gaps || []);
        setRecurring(result.recurring || []);
        report.current({ items: result.items || [], gaps: result.gaps || [] });
      } catch {
        if (live) setItems([]);
      } finally {
        if (live) {
          setLoading(false);
          reportBusy.current?.(false);
        }
      }
    }, 800);

    return () => {
      live = false;
      clearTimeout(timer);
      reportBusy.current?.(false);
    };
  }, [key]);

  let body = null;

  if (!connected) {
    body = (
      <p className="mt-5 border-l border-clay pl-3 text-[17px] leading-[1.35] text-ink/70">
        The shop is not connected yet. Once the store details are saved, things appear here as you
        answer.
      </p>
    );
  } else if (loading && !items.length) {
    body = (
      <div className="mt-5 grid grid-cols-2 gap-3" aria-hidden="true">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="border border-ink/20 bg-paper/60">
            <div className="aspect-square animate-pulse bg-linen" />
            <div className="space-y-2 p-2.5">
              <div className="h-2 w-10 animate-pulse bg-ink/15" />
              <div className="h-2 w-full animate-pulse bg-ink/15" />
            </div>
          </div>
        ))}
      </div>
    );
  } else if (!items.length) {
    body = (
      <p className="mt-5 border border-dashed border-ink/35 px-4 py-6 text-[17px] leading-[1.35] text-ink/60">
        Answer the first question and things start to appear here.
      </p>
    );
  } else {
    body = (
      <div className={`mt-5 grid grid-cols-2 gap-3 ${loading ? "opacity-50" : ""}`}>
        {items.map((item, index) => (
          <GiftCard key={`${item.id}-${index}`} item={item} index={index} />
        ))}
      </div>
    );
  }

  return (
    <div aria-live="polite">
      <div className="flex items-baseline justify-between gap-3">
        <span className="gc-label text-ink/55">From the shop</span>
        <span className="gc-spec text-ink/40">
          {String(items.length).padStart(2, "0")} of {String(EIGHT).padStart(2, "0")}
        </span>
      </div>

      <p className="mt-2 max-w-[46ch] text-[15px] leading-[1.4] text-ink/55">
        {loading && items.length
          ? "Refreshing as you answer."
          : "Suggestions only, and they change as you answer. The curator reads every one before the person sees anything."}
      </p>

      {body}

      <GapQueue gaps={gaps} />
      <RecurringGaps rows={recurring} />
    </div>
  );
}