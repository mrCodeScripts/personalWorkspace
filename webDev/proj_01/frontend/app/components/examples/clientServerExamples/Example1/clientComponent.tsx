"use client";

import { useActionState } from "react";

export default function ClientSideComp() {
  type FormType = {
    name: string;
    age?: number;
  };

  const [formState, formAction, isPending] = useActionState<FormType, FormData>(async (prev, formData) => {
    return {name: "", age: 0};
  }, {name: "", age: undefined});

  return (
    <>
      <div></div>
    </>
  );
}
