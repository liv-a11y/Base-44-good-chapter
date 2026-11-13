import { useState } from "react";
import ReplyComposer from "@/components/desk/ReplyComposer";

const on = (value) =>
  value
    ? new Date(value).toLocaleDateString("en-US", {
        timeZone: "America/Indianapolis",
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

const receipt = (request) => {
  if (request.acknowledged_on) return `Receipt sent ${on(request.acknowledged_on)}`;
  return "Receipt not sent";
};

export default function RequestList({ requests }) {
  const [openId, setOpenId] = useState("");

  if (!requests.length) {
    return (
      <p className="max-w-[52ch] py-10 text-[19px] leading-[1.38] text-ink/75">
        No requests yet. The first one appears here the moment someone asks to hear from us.
      </p>
    );
  }

  return (
    <ul className="mt-2">
      {requests.map((request) => {
        const open = openId === request.id;
        return (
          <li key={request.id} className="border-b border-ink/25">
            <div className="grid gap-3 py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_auto] md:items-start md:gap-6">
              <div className="min-w-0">
                <p className="break-words font-heading text-[21px] leading-tight">{request.email}</p>
                <p className="gc-label mt-2 text-ink/55">{request.interest}</p>
              </div>

              <div className="min-w-0">
                <p className="text-[17px] leading-[1.45] text-ink/80">
                  {request.comments || "No note left."}
                </p>
                <p className="gc-spec mt-2 text-ink/50">Asked {on(request.submitted)}</p>
              </div>

              <div className="md:text-right">
                <p className="gc-label text-ink/60">{receipt(request)}</p>
                <p className="gc-label mt-1 text-ink/60">
                  {request.replied_on ? `Replied ${on(request.replied_on)}` : "No reply yet"}
                </p>
                <button
                  type="button"
                  onClick={() => setOpenId(open ? "" : request.id)}
                  className="gc-label mt-3 border-b border-ink pb-0.5 text-ink"
                >
                  {open ? "Close" : request.replied_on ? "Write again" : "Write the reply"}
                </button>
              </div>
            </div>

            {open ? <ReplyComposer request={request} /> : null}
          </li>
        );
      })}
    </ul>
  );
}