// src/app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { User } from "@/types/user";

const DATA_FILE = path.join(process.cwd(), "src", "data", "users.json");

async function GetUsers(DATA_FILE: string): Promise<User[]> {
  const file = await fs.readFile(DATA_FILE, "utf8");
  const users: User[] = JSON.parse(file);
  return users;
}

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const searchParams = Object.fromEntries(params);
  const users = await GetUsers(DATA_FILE);
  if (searchParams.username) {
    const user = users.find((u) => u.username === searchParams.username);
    return NextResponse.json(user);
  }
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  try {
    const newUser: User = await req.json();
    const users = await GetUsers(DATA_FILE);

    const exists = users.some(
      (u) => u.email === newUser.email || u.username === newUser.username
    );
    if (exists) {
      return NextResponse.json(
        { error: "Username/Email already exists" },
        { status: 400 }
      );
    }

    newUser.id = users.length + 1;
    users.push(newUser);

    await fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2), "utf-8");

    return NextResponse.json({ message: "User added" }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
