import { useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { sendPartnerReply } from "@/lib/requests-fns";

/** The curator writes the second reply by hand, here, and sends it once. */
export default function ReplyComposer({ request }) {
  const router = useRouter();
  const [note, setNote] = useState("");
  const [state, setState] = useState("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    if (!note.trim()) {
      setError("Write the reply first.");
      return;
    }
    setState("sending");
    setError("");
    try {
      const result = await sendPartnerReply({ data: { id: request.id, note: note.trim() } });
      if (!result.sent) {
        setState("idle");
        setError(result.message || "That reply did not send.");
        return;
      }
      setState("sent");
      setNote("");
      await router.invalidate();
    } catch (sendError) {
      setState("idle");
      setError(sendError?.message || "That reply did not send.");
    }
  }

  if (state === "sent") {
    return (
      <div className="mb-6 border-[1.5px] border-cobalt bg-paper px-5 py-5">
        <p className="font-heading text-[22px] leading-tight text-cobalt">Sent.</p>
        <p className="mt-2 text-[17px] leading-[1.45] text-ink/80">
          It went to {request.email}. Their request now shows the reply.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 border-[1.5px] border-ink bg-paper px-5 py-5">
      <label htmlFor={`reply-${request.id}`} className="gc-label block text-ink">
        The reply
      </label>
      <p className="mt-2 text-[15px] leading-[1.45] text-ink/60">
        Goes out as one paragraph, signed Good Chapter Co. Keep it to what you would say out loud.
      </p>
      <textarea
        id={`reply-${request.id}`}
        rows={6}
        maxLength={1500}
        value={note}
        onChange={(event) => setNote(event.target.value)}
        placeholder="Thanks for writing. Here is where we are with this."
        className="gc-input mt-3 text-[17px]"
      />
      {error ? <p className="mt-3 text-[15px] leading-[1.45] text-clay">{error}</p> : null}
      <button type="submit" className="gc-btn mt-4" disabled={state === "sending"}>
        <span className="gc-btn-label">
          {state === "sending" ? "Sending" : request.replied_on ? "Send again" : "Send the reply"}
        </span>
      </button>
    </form>
  );
}