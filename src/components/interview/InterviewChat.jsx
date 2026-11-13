import { useEffect, useRef, useState } from "react";
import { base44 } from "@/api/base44Client";
import MessageBubble from "@/components/interview/MessageBubble";
import InterviewComposer from "@/components/interview/InterviewComposer";

/**
 * One conversation with the interview agent, scoped to this setup session.
 * If it cannot open, the step still lets the starter continue.
 */
export default function InterviewChat({ agentName, seedMessage, onPick, pickedName }) {
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const [starting, setStarting] = useState(true);
  const endRef = useRef(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const created = await base44.agents.createConversation({
          agent_name: agentName,
          metadata: {
            name: "Chapter interview",
            description: "Ideas for one chapter. Not the list.",
          },
        });
        if (!alive) return;
        setConversation(created);
        await base44.agents.addMessage(created, { role: "user", content: seedMessage });
      } catch {
        if (alive) {
          setError("The interview will not open right now. You can keep going and still start the chapter.");
        }
      } finally {
        if (alive) setStarting(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [agentName, seedMessage]);

  useEffect(() => {
    if (!conversation?.id) return;
    const unsubscribe = base44.agents.subscribeToConversation(conversation.id, (data) => {
      setMessages(data.messages ?? []);
    });
    return () => unsubscribe();
  }, [conversation?.id]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "nearest" });
  }, [messages.length]);

  const send = async (text) => {
    if (!conversation) return;
    setError("");
    try {
      await base44.agents.addMessage(conversation, { role: "user", content: text });
    } catch {
      setError("That did not send. Try once more.");
    }
  };

  const thinking = messages.length > 0 && messages[messages.length - 1].role === "user";

  return (
    <div>
      <div className="max-h-[46vh] min-h-[220px] space-y-5 overflow-y-auto pr-1 sm:max-h-[380px]">
        {messages.map((message, index) => (
          <MessageBubble
            key={message.id ?? index}
            message={message}
            onPick={onPick}
            pickedName={pickedName}
          />
        ))}
        {starting || thinking ? (
          <p className="gc-label text-ink/45">{starting ? "Opening" : "Thinking"}</p>
        ) : null}
        <div ref={endRef} />
      </div>

      {error ? (
        <p className="mt-3 border-l border-clay pl-3 text-[15px] leading-[1.4] text-clay">{error}</p>
      ) : null}

      <div className="mt-4">
        <InterviewComposer disabled={!conversation || starting || thinking} onSend={send} />
      </div>
    </div>
  );
}