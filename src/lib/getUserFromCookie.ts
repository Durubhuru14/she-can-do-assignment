import { cookies } from "next/headers";
import { CookieUser } from "@/types/cookieUserType";

export async function getUserFromCookie(): Promise<CookieUser> {
  const userCookie = (await cookies()).get("user")?.value;

  if (!userCookie) return { username: "", pfp: "/default-avatar.svg" };

  try {
    const parsed = JSON.parse(userCookie);
    return {
      username: parsed.username || "",
      pfp: parsed.pfp || "/default-avatar.png",
    };
  } catch {
    return { username: "", pfp: "/default-avatar.png" };
  }
}
