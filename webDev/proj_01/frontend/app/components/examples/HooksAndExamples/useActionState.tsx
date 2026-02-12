"use client";

import { useActionState } from "react";

function UseActionStateExample1() {
  type FormStateType = { name: string; age: number };

  const [formState, formAction, isLoading] = useActionState<
    FormStateType,
    FormData
  >(
    async (state: FormStateType, formData: FormData) => {
      await new Promise((res) => setTimeout(res, 3000));
      const username: string = formData.get("user-name") as string;
      const password: number = Number(formData.get("user-pwd"));

      return { username, password };
    },
    { username: "", password: "" },
    "shit/",
  );

  return <></>;
}

export default function UseActionStateExamples() {
  return (
    <>
      <div></div>
    </>
  );
}
