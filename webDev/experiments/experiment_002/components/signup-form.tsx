"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signUp } from "@/server/user";
import { useActionState } from "react";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  type userType = {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  const [formState, formAction, isPending] = useActionState<userType, FormData>(
    async (prevState, formData) => {
      const name = formData.get("name");
      const email = formData.get("email");
      const password = formData.get("password");
      const confirmPassword = formData.get("confirm-password");

      try {
        // First, run signUp with the provided values.
        await signUp({
          email: typeof email === "string" ? email : "",
          password: typeof password === "string" ? password : "",
          name: typeof name === "string" ? name : "",
        });

        // // Then, sign in with email and password via the client SDK.
        // await authClient.signIn.email({
        //   email: typeof email === "string" ? email : "",
        //   password: typeof password === "string" ? password : "",
        // });
      } catch (error) {
        return prevState;
      }


      // await new Promise(res => setTimeout(res, 3000));

      return prevState;
    },
    { fullName: "", email: "", password: "", confirmPassword: "" },
    "/signup-form",
  );

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                name="name"
                type="text"
                disabled={isPending}
                placeholder="John Doe"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                disabled={isPending}
              />
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                disabled={isPending}
                type="password"
                required
              />
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input
                id="confirm-password"
                disabled={isPending}
                type="password"
                required
              />
              <FieldDescription>Please confirm your password.</FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit" disabled={isPending}>
                  Create Account
                </Button>
                <Button variant="outline" disabled={isPending} type="button">
                  Sign up with Google
                </Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <a href="#">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
