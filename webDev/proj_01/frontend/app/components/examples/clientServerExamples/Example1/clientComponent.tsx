"use client";

import { useActionState } from "react";

export default function ClientSideComp() {
  type FormType = {
    name: string;
    age?: number;
  };

  const [formState, formAction, isPending] = useActionState<FormType, FormData>(async (prev, formData) => {

    const name = String(formData.get("name"));
    const age = Number(formData.get("age"));

    const path = "http://localhost:3001/api/userSubmit";
    const payload: FormType = {name: name, age: age};

    const req = await fetch(path, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(payload)
    });

    const res = await req.json();

    return {name: "", age: 0};
  }, {name: "", age: undefined});

  return (
    <>
      <div>
        <form action={formAction}>
          <input type="text" name="name" placeholder="Enter username..." disabled={isPending} />
          <input type="number" name="age" placeholder="Enter age..." disabled={isPending}/>
          <button type="submit" disabled={isPending}>{isPending ? 'Submitting...' : 'Submit'}</button>
        </form>
      </div>
    </>
  );
}
