"use client";

import { copyToClipboard } from "@/lib/copyTextToClipboard";
import { useEffect, useState } from "react";

export default function ReferralLink({
  referralCode,
}: {
  referralCode: string;
}) {
  const [origin, setOrigin] = useState("");
  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);
  const referralLink = origin
    ? `${origin}/api/ref/${referralCode}`
    : "Loading...";

  return (
    <code
      onClick={() =>
        copyToClipboard(referralLink)
      }
      className="bg-muted w-full inline-block mt-2 overflow-x-scroll cursor-pointer relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-nowrap"
    >
      {referralLink}
    </code>
  );
}
