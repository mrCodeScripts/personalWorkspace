export async function GET() {
  const data = { message: 'Hello from Next.js server!' };
  return new Response(JSON.stringify(data), { status: 200 });
}
