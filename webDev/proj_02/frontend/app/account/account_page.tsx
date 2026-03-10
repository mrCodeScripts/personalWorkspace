"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AccountPageComponent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/");
    }
  }, [router, status]);

  return (
    <>
      <div>
        <button
          type="button"
          className="btn btn-neutral p-3"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Logout
        </button>
      </div>
    </>
  );
}
