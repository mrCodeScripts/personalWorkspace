import Link from 'next/link'

export default function Home() {
  return (
    // <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-secondary">
    //   <div className="text-center">
    //     <h1 className="text-5xl font-bold text-white mb-4">Welcome to proj_02</h1>
    //     <p className="text-xl text-gray-200 mb-8">Your Next.js frontend is ready!</p>
    //     <button className="btn btn-lg">Get Started</button>
    //   </div>
    // </main>
    <>
      <nav>
        <Link href="/auth/login">LOGIN</Link>
        <Link href="/auth/signup">SIGNUP</Link>
      </nav>
    </>
  );
}
