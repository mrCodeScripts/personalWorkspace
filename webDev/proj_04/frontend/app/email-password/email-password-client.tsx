"use client";

import { getSupabaseBrowserClient } from "../lib/supabase/browser-client";
import { User } from "@supabase/supabase-js";
import { useState } from "react";

type EmailPasswordClientProps = {
  user: User | null;
};

type Mode = "signup" | "signin";

export default function EmailPasswordClient({user}: EmailPasswordClientProps) {
  const supabase = getSupabaseBrowserClient();
  const [mode, setMode] = useState<Mode>("signup");

  async function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (mode == "signin") {
      await supabase.auth.signInWithPassword({
        email: event.currentTarget.email.value,
        password: event.currentTarget.password.value,
      });
    }
  }

  return (
    <>
      <div></div>
    </>
  );
}
