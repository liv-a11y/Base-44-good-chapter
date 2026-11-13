import { useState } from "react";
import { ArrowUp } from "lucide-react";

export default function InterviewComposer({ disabled, onSend }) {
  const [text, setText] = useState("");

  const send = () => {
    const value = text.trim();
    if (!value || disabled) return;
    setText("");
    onSend(value);
  };

  return (
    <div className="flex items-end gap-2 border-t border-ink/30 pt-3">
      <textarea
        className="gc-input min-h-[56px] flex-1 resize-none py-3 text-[17px]"
        rows={2}
        maxLength={600}
        placeholder="Type your answer"
        aria-label="Your answer"
        value={text}
        disabled={disabled}
        onChange={(event) => setText(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            send();
          }
        }}
      />
      <button
        type="button"
        onClick={send}
        disabled={disabled || !text.trim()}
        aria-label="Send"
        className="gc-label flex h-[56px] w-[56px] shrink-0 items-center justify-center border border-ink text-ink transition-colors hover:bg-ink hover:text-plaster disabled:opacity-35"
      >
        <ArrowUp size={18} strokeWidth={1.8} />
      </button>
    </div>
  );
}