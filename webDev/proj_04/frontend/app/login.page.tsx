"use client";
import { authClient } from "./lib/auth-client";

export default function LoginPage() {
    const login = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/dashboard", // Where to go after login
        });
    };

    return (
        <button onClick={login} className="p-2 bg-blue-500 text-white rounded">
            Sign in with Google
        </button>
    );
}