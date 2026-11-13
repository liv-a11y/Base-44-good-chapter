import ReactMarkdown from "react-markdown";
import SuggestionCards from "@/components/interview/SuggestionCards";
import { splitIdeas } from "@/lib/interview-ideas";

export default function MessageBubble({ message, onPick, pickedName }) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <p className="max-w-[85%] border border-ink bg-ink px-4 py-2.5 text-[17px] leading-[1.35] text-plaster">
          {message.content}
        </p>
      </div>
    );
  }

  const { text, ideas } = splitIdeas(message.content || "");

  return (
    <div className="max-w-[94%]">
      {text ? (
        <div className="gc-md border-l border-clay/60 pl-4 text-[17px] leading-[1.4]">
          <ReactMarkdown>{text}</ReactMarkdown>
        </div>
      ) : null}
      {ideas ? <SuggestionCards ideas={ideas} onPick={onPick} pickedName={pickedName} /> : null}
    </div>
  );
}