"use server";

import { z } from "zod";
import { User } from "@/types/user";

const signupSchema = z
  .object({
    username: z
      .string()
      .min(2, "Username too short (should be 2 characters or more)"),
    email: z.email("Invalid email"),
    password: z
      .string()
      .min(6, "Password too short (should be 6 characters or more)"),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  });

interface FormState {
  success: boolean;
  error?: string;
  user?: { username: string; email: string } | null;
}

export async function signupUser(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const rawData = Object.fromEntries(formData);
  const parsed = signupSchema.safeParse(rawData);

  if (!parsed.success) {
    const parsedMessage: [{ message: string }] = JSON.parse(
      parsed.error.message
    );
    const message = parsedMessage[0].message || "Invalid form data";
    return {
      success: false,
      error: message,
      user: {
        username: rawData.username as string,
        email: rawData.email as string,
      },
    };
  }

  const newUser: User = {
    id: 0,
    username: parsed.data.username,
    email: parsed.data.email,
    password: parsed.data.password,
    pfp: `https://api.dicebear.com/9.x/pixel-art/svg?seed=${parsed.data.username}&backgroundType=gradientLinear&backgroundColor=ffd5dc,c0aede`,
  };

  try {
    const res = await fetch(`${process.env.BASE_URL}/api/users`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: { "Content-Type": "application/json" },
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: result.error || "Server error",
        user: { username: newUser.username, email: newUser.email },
      };
    }

    return { success: true };
  } catch (err) {
    console.warn(err);
    return {
      success: false,
      error: "Something went wrong",
      user: { username: newUser.username, email: newUser.email },
    };
  }
}
