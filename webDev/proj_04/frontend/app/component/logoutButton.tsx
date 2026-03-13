"use client";
import { authClient } from "../lib/auth-client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    // Redirect to login after successful sign-out
                    router.push("/login");
                    router.refresh(); // Refresh to clear server-side state
                },
            },
        });
    };

    return (
        <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
            Logout
        </button>
    );
}