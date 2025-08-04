import DesktopNav from "./navbar/DesktopNav";
import MobileNav from "./navbar/MobileNav";
import { getNavLinks } from "@/lib/navlinks";
import { getUserFromCookie } from "@/lib/getUserFromCookie";

export default async function Navbar() {
  const { isLoggedIn, navlinks } = await getNavLinks();
  const user = await getUserFromCookie();
  return (
    <header className="px-2 py-4 sticky top-0 z-1">
      <DesktopNav isLoggedIn={isLoggedIn} navLinks={navlinks} user={user} />
      <MobileNav isLoggedIn={isLoggedIn} navLinks={navlinks} user={user} />
    </header>
  );
}
