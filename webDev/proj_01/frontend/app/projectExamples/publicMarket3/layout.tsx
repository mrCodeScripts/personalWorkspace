import Link from "next/link";
import './global.css';

export default function PublicMarket({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>
    <nav>
      <Link href="/projectExamples/publicMarket3/auth/login">Login</Link>
      <Link href="/projectExamples/publicMarket3/auth/register">Register</Link>
    </nav>
    {children}
  </>;
}
