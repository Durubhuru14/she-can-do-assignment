"use client";

import { useEffect, useState } from "react";
import { getGreetingByHour } from "@/lib/getGreetingsByHour";

export default function Greeting({ username }: { username: string }) {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    setGreeting(getGreetingByHour());
  }, []);

  return (
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Hello {username} 👋, {greeting}
      </h2>
  );
}