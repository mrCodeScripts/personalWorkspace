'use client';

import { useActionState } from "react";

export default function LoginForm() {
  type UserForm = {
    username: string;
    password: string;
  };
  const [formState, formAction, isPending] = useActionState<UserForm, FormData>(async (state, formData) => {

    // async operation

    return state;
  }, {username: "", password: ""}, "/auth_login");

  return (
    <>
      <form action={formAction}>
        <input type="text" placeholder="Enter username..." />
        <input type="text" placeholder="Enter password..." />
        <button type="submit">Login</button>
      </form>
    </>
  );
}
