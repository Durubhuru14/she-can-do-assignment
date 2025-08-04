"use server"

import { cookies } from "next/headers";

export async function getNavLinks() {
  const isLoggedIn = (await cookies()).get("isLoggedIn")?.value === "true";

  const commonLinks = [
    { id: 1, name: "Home", href: "/", label: "Go to homepage" },
    { id: 2, name: "About", href: "/about", label: "Learn more about us" },
    { id: 3, name: "Contact", href: "/contact", label: "Contact the team" },
    { id: 4, name: "Donate", href: "/donate", label: "Support our cause" },
  ];

  const loggedInLinks = [
    {
      id: 5,
      name: "Dashboard",
      href: "/dashboard",
      label: "Go to your dashboard",
    },
    {
      id: 6,
      name: "Leaderboard",
      href: "/leaderboard",
      label: "See the leaderboard",
    },
  ];

  return {
    isLoggedIn,
    navlinks: [...commonLinks, ...(isLoggedIn ? loggedInLinks : [])],
  };
}
