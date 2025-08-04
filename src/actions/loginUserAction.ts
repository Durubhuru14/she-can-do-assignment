"use server";

import { z } from "zod";
import { User } from "@/types/user";
import { cookies, headers } from "next/headers";

const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
});

interface LoginState {
  success: boolean;
  error?: string;
  user?: { email: string; password: string } | null;
}

export async function loginUser(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { success: false, error: "Invalid form input." };
  }

  const { email, password } = parsed.data;
  let users: User[] = [];

  try {
    const baseurl = (await headers()).get("host");
    console.log(baseurl);
    const response = await fetch(`http://${baseurl}/api/users`);
    if (!response.ok) {
      return {
        success: false,
        error: "failed to fetch credentials (404)",
      };
    }
    users = await response.json();
  } catch (err) {
    console.warn(err);
    return {
      success: false,
      error: "internal server please try again (500)",
    };
  }

  const matchedUser = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!matchedUser) {
    return {
      success: false,
      error: "Invalid email or password.",
      user: { email, password },
    };
  }

  (await cookies()).set("isLoggedIn", "true", {
    path: "/",
    httpOnly: false,
    sameSite: "lax",
  });

  (await cookies()).set(
    "user",
    JSON.stringify({
      username: matchedUser.username,
      pfp: matchedUser.pfp,
    }),
    {
      path: "/",
      httpOnly: false,
      sameSite: "lax",
    }
  );

  return {
    success: true,
  };
}
