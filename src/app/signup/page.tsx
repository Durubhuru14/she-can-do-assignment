"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { signupUser } from "@/actions/signupUserAction";
import { useActionState, useEffect } from "react";

import { toast } from "sonner";
import { redirect } from "next/navigation";

const initialState = {
  success: false,
  error: "",
  user: null,
};

export default function SignupPage() {
  const [state, formAction] = useActionState(signupUser, initialState);
  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
    if (state.success) {
      toast.success(
        "Your account has been created. Please log in to continue."
      );
      redirect("/login");
    }
  }, [state]);
  return (
    <section className="flex flex-col p-12 justify-center items-center mx-auto h-screen w-full max-w-xl">
      <div className="mb-4 text-center">
        <Avatar className="size-16 mx-auto">
          <AvatarImage src={"/logo.avif"} fetchPriority="high" />
          <AvatarFallback>She Can Foundation</AvatarFallback>
        </Avatar>
        <h2 className="text-3xl font-semibold tracking-tight">
          Ready to Make a Difference,{" "}
          <span className="text-orange-600 underline">Intern</span> ?
        </h2>
      </div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Be a part of change!</CardDescription>
          <CardAction>
            <Link href={"/login"} className="underline text-sm">
              Already have a account?
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form action={formAction} id="signup-form">
            <div className="grid gap-4">
              <div className="flex gap-2 flex-col">
                <Label className="font-semibold" htmlFor="username">
                  Username
                </Label>
                <Input
                  type="text"
                  name="username"
                  id="username"
                  defaultValue={state.user?.username || ""}
                  required
                  placeholder="john doe"
                />
              </div>
              <div className="flex gap-2 flex-col">
                <Label className="font-semibold" htmlFor="email">
                  Email
                </Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  defaultValue={state.user?.email || ""}
                  required
                  placeholder="johndoe@gmail.com"
                />
              </div>
              <div className="flex gap-2 flex-col">
                <Label className="font-semibold" htmlFor="password">
                  Password
                </Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  required
                  placeholder="********"
                />
              </div>
              <div className="flex gap-2 flex-col">
                <Label className="font-semibold" htmlFor="confirm">
                  Confirm Password
                </Label>
                <Input
                  name="confirm"
                  id="confirm"
                  type="password"
                  required
                  placeholder="********"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            form="signup-form"
            variant={"CTA"}
            className="w-full"
          >
            Sign Up
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
