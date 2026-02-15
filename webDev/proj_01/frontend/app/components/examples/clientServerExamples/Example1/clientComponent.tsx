"use client";

import { useActionState, useState } from "react";

export default function ClientSideComp() {
  type FormType = {
    name: string;
    age?: number;
  };

  type ServerMsg = {
    status: string;
    message: string;
  };

  const [serverMsg, newServerMsg] = useState<ServerMsg>({
    status: "",
    message: "",
  });

  const [formState, formAction, isPending] = useActionState<FormType, FormData>(
    async (prev, formData) => {
      const name = String(formData.get("name"));
      const age = Number(formData.get("age"));

      const path = "http://localhost:3001/api/userSubmit";
      const payload: FormType = { name: name, age: age };

      const req = await fetch(path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const res = await req.json();

      newServerMsg({ status: res.status, message: res.message });

      return { name: name, age: age };
    },
    { name: "", age: undefined },
  );

  let messageElement;
  if (isPending) {
    messageElement = (
      <p style={{ color: "green" }}>Loading Server Message...</p>
    );
  } else if (serverMsg.status === "success") {
    messageElement = (
      <p style={{ color: "green", fontWeight: "bold" }}>
        SUCCESS: {serverMsg.message}
      </p>
    );
  } else if (serverMsg.status) {
    messageElement = (
      <p style={{ color: "red", fontWeight: "bold" }}>
        FAILED: {serverMsg.message}
      </p>
    );
  } else {
    messageElement = null;
  }

  return (
    <>
      <div>
        {messageElement}
        <form action={formAction}>
          <input
            type="text"
            name="name"
            placeholder="Enter username..."
            disabled={isPending}
          />
          <input
            type="number"
            name="age"
            placeholder="Enter age..."
            disabled={isPending}
          />
          <button type="submit" disabled={isPending}>
            {isPending ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
}
