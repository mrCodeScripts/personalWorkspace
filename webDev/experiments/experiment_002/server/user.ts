"use server";

import { auth } from "@/lib/auth";

export const signIn: (user: {
  email: string;
  password: string;
}) => void = async (user: { email: string; password: string }) => {
  await auth.api.signInEmail({
    body: {
      email: user.email,
      password: user.password,
    },
  });
};

export const signUp: (user: {
  email: string;
  password: string;
  name: string;
}) => void = async (user: {
  email: string;
  password: string;
  name: string;
}) => {
  await auth.api.signUpEmail({
    body: {
      email: user.email,
      password: user.password,
      name: user.name,
    },
  });
};
