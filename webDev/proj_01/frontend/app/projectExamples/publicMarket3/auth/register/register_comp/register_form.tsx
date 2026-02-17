'use client';

import { useActionState } from "react";

export default function RegisterForm() {
  type UserForm = {
    username: string;
    createdPassword: string;
    confirmPassword: string;
  };
  const [formState, formAction, isPending] = useActionState<UserForm, FormData>(async (state, formData) => {

    // async operation

    return state;
  }, {username: "", createdPassword: "", confirmPassword: ""}, "/auth_login");

  return (
    <>
      <form action={formAction}>
        <input type="text" placeholder="Enter username..." />
        <input type="password" placeholder="Create password..." />
        <input type="password" placeholder="Confirm password..." />
        <button type="submit">Register</button>
      </form>
    </>
  );
}
