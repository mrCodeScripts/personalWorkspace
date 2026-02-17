import Link from "next/link";
// import { useRouter } from "next/router";

export default function PublicMarketMainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div style={{display: "flex", gap: "10px"}}>
        <p style={{ color: "red" }}>This is the main layout</p>
        <Link href="/projectExamples/publicMarket2/auth/login">Login</Link>
        <Link href="/projectExamples/publicMarket2/auth/register">Register</Link>
      </div>
      <div style={{color: "red"}}>{children}</div> {/* this is crucial */}
    </>
  );
}
