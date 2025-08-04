"use client"

import { Clipboard as ClipboardIcon } from "lucide-react";
import { copyToClipboard } from "@/lib/copyTextToClipboard";

export default function Clipboard({ referralCode }: { referralCode: string }) {
  return (
    <ClipboardIcon
      className="text-muted-foreground size-4 cursor-pointer select-none"
      onClick={() => copyToClipboard(referralCode)}
    />
  );
}
