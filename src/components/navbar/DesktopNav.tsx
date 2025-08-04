"use client";

import Image from "next/image";
import Link from "next/link";
import { LogIn, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { NavLink } from "@/types/navlinksType";
import { CookieUser } from "@/types/cookieUserType";
import { ThemeToggle } from "../ThemeToggle";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { userLogout } from "@/lib/userLogout";

export default function DesktopNav({
  isLoggedIn,
  navLinks,
  user,
}: {
  isLoggedIn: boolean;
  navLinks: NavLink[];
  user: CookieUser;
}) {
  const pathname = usePathname();
  return (
    <nav className="hidden lg:flex items-center justify-between w-full text-foreground mx-auto max-w-6xl bg-secondary/80 backdrop-blur-lg py-4 px-4 sm:px-8 rounded-3xl">
      {/* Logo */}
      <Link href={"/"}>
        <div className="flex items-center gap-2">
          <Image src="/logo.avif" height={25} width={25} priority alt="logo" />
          <span className="text-sm sm:text-lg font-bold font-serif self-end">
            She Can Foundation.
          </span>
        </div>
      </Link>
      {/* Nav Links */}
      <ul className="flex gap-2 sm:gap-4">
        {navLinks.map(({ id, href, name, label }) => {
          const isActive = pathname === href;

          return (
            <li key={id}>
              <Link
                href={href}
                aria-label={label}
                className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
                  isActive
                    ? "bg-orange-600 text-white"
                    : "hover:bg-foreground/20"
                }`}
              >
                {name}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Right Side: Dark mode toggle + CTA */}
      <div className="flex items-center gap-3">
        <ThemeToggle />

        {!isLoggedIn ? (
          <Link href={"/login"}>
            <Button variant={"CTA"}>
              <span className="flex justify-center items-center gap-1">
                Login <LogIn />
              </span>
            </Button>
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Image
                src={user?.pfp}
                unoptimized
                alt="Profile"
                height={32}
                width={32}
                className="rounded-full object-cover border-2 border-accent shadow cursor-pointer"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem className="flex items-center" onClick={() => userLogout()}>Logout<LogOut className="size-4 text-inherit self-end" /></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
}
