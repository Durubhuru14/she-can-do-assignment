"use client";

import { Button } from "../ui/button";
import { AlignLeft, LogOut,LogIn } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NavLink } from "@/types/navlinksType";
import { CookieUser } from "@/types/cookieUserType";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { userLogout } from "@/lib/userLogout";
import { ThemeToggle } from "../ThemeToggle";

export default function MobileNav({
  isLoggedIn,
  navLinks,
  user,
}: {
  isLoggedIn: boolean;
  navLinks: NavLink[];
  user: CookieUser;
}) {
  const pathname = usePathname();
  const [isNavlinksCollapsed, setIsNavlinksCollapsed] = useState(true);
  return (
    <nav className="flex lg:hidden relative items-center justify-between w-full text-foreground mx-auto max-w-6xl bg-secondary/80 backdrop-blur-lg py-4 px-4 sm:px-8 rounded-3xl">
      <Button
        variant={"ghost"}
        className="cursor-pointer"
        onClick={() => setIsNavlinksCollapsed(!isNavlinksCollapsed)}
      >
        <AlignLeft size={16} />
      </Button>
      <Link href={"/"}>
        <Image src={"/logo.avif"} width={30} priority height={30} alt="logo" />
      </Link>

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
              <DropdownMenuItem
                className="flex items-center"
                onClick={() => userLogout()}
              >
                Logout
                <LogOut className="size-4 text-inherit self-end" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <div
          className={`absolute top-full left-0 mt-2 w-full bg-primary-foreground rounded-md shadow-lg z-50 transform transition-all duration-200 ease-in-out ${
            isNavlinksCollapsed
              ? "opacity-0 scale-95 pointer-events-none"
              : "opacity-100 scale-100"
          }`}
        >
          <ul className="flex flex-col gap-2 p-4">
            {navLinks.map(({ id, href, name, label }) => {
              const isActive = pathname === href;

              return (
                <li key={id}>
                  <Link
                    href={href}
                    aria-label={label}
                    className={`block w-full px-3 py-2 rounded-md font-medium transition-colors ${
                      isActive ? "bg-orange-600 text-white" : "hover:bg-muted"
                    }`}
                  >
                    {name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
