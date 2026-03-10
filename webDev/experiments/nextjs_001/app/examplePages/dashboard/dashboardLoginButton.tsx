"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLogoutComp() {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status == "unauthenticated") {
      //   router.push("/");
      redirect("/");
    }
  }, [status, router]);

  return (
    <>
      <div>
        <div>
          <div className="flex flex-col gap-2">
            <span>
              Name: <span>{session?.user?.name}</span>{" "}
            </span>
            <span>
              Email: <span>{session?.user?.email}</span>{" "}
            </span>
            <span>
              Expires: <span>{session?.expires}</span>{" "}
            </span>
            <span>
              Google ID: <span>{session?.user?.id}</span>
            </span>
            <span>
              Given name: <span>{session?.user?.given_name}</span>
            </span>
            <span>
              Family Name: <span>{session?.user?.family_name}</span>
            </span>
            <span>
              Locale <span>{session?.user?.locale}</span>
            </span>
            <span>
              Verified:{" "}
              <span>
                {session?.user?.verified ? "Verified" : "Not Verified"}
              </span>
            </span>
            <span>
              HD: <span>{session?.user?.hd}</span>
            </span>
          </div>
          {session?.user?.image && (
            <Image
              src={session.user.image}
              alt="User image"
              width={100}
              height={100}
              className="rounded-full"
            />
          )}
        </div>
        <button
          type="button"
          className="p-3 bg-red-300 rounded-md text-white"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Logout
        </button>
      </div>
    </>
  );
}
