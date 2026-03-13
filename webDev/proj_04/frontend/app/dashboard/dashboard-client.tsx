// app/dashboard/page.tsx
import { auth } from "../lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import LogoutButton from "../component/logoutButton";

export default async function DashboardPageComponent() {
    // // 1. Get the session on the server
    // const session = await auth.api.getSession({
    //     headers: await headers()
    // });

    // // 2. If no session, redirect to login
    // if (!session) {
    //     redirect("/login");
    // }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="mt-4 p-4 border rounded">
                {/* <p><strong>Name:</strong> {session.user.name}</p>
                <p><strong>Email:</strong> {session.user.email}</p>
                {session.user.image && (
                    <img 
                        src={session.user.image} 
                        alt="Profile" 
                        className="w-12 h-12 rounded-full mt-2" 
                    />
                )} */}
            </div>
            
            <div className="mt-6">
                <LogoutButton />
            </div>
        </div>
    );
}
