import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.redirect(
    "https://shattereddisk.github.io/rickroll/rickroll.mp4"
  );
};
