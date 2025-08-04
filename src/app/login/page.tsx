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

import { loginUser } from "@/actions/loginUserAction";
import { useActionState } from "react";
import { useEffect } from "react";

import { toast } from "sonner";
import { useFormStatus } from "react-dom";
import { redirect } from "next/navigation";

const initialState = {
  success: false,
  error: "",
  user: null,
};

export default function LoginPage() {
  const [state, formAction] = useActionState(loginUser, initialState);
  const formStatus = useFormStatus();

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
    if (state.success) {
      toast.success("Logged in successfully");
      redirect("/dashboard");
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
          Welcome Back,{" "}
          <span className="text-orange-600 underline">Intern</span> !
        </h2>
      </div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Log in to start contributing!</CardDescription>
          <CardAction>
            <Link href={"/signup"} className="underline text-sm">
              Don&#39;t have an account?
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form id="login-form" action={formAction}>
            <div className="grid gap-4">
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
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            form="login-form"
            variant={"CTA"}
            className="w-full"
            disabled={formStatus.pending}
          >
            Login
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
