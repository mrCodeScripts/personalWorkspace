import { NextResponse } from "next/server";

// CORE STATUS CODES THAT I NEED:
// 100 -> Continue  -- Server received the request headers, client should proceed.
// 200 -> OK        -- Request succeeded, response contains the requested data.
// 201 -> Created   -- Request succeeded, and a new resource was created.
// 204 -> No Content -- Request succeeded, but no content to return (e.g. after a DELETE).
// 301 -> Moved Permanently -- Resource has been moved to a new URL permanently.
// 302 -> Found (Temporary Redirect) -- Resource has been moved to a new URL temporarily.
// 304 -> Not Modified -- Resource has not been modified since last request, client can use cached version.
// 400 -> Bad Request -- The request was invalid or cannot be served.
// 401 -> Unauthorized -- The request requires user authentication.
// 403 -> Forbidden -- The server understood the request, but is refusing to fulfill it.
// 404 -> Not Found -- The requested resource could not be found.
// 405 -> Method not allowed  -- HTTP method not supported on that route.
// 409 -> Conflict  -- Request conflics with current state (e.g. duplicate).
// 422 -> Unprocessable Entity  -- Validation errors (common in APIs).
// 429 -> Too Many Requests   -- Rate limit exceeded.
// 500 -> Internal Server Error -- The server encountered an unexpected condition that prevented it from fulfilling the request.
// 502 -> Bad Gateway   -- Server got an invalid response from upstream.
// 503 -> Service Unavailable   -- Server is down or overloaded.
// 504 -> Gateway Timout    -- Upstream server timed out.


export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  // in Next.js dynamic params are always a Promise, so we await them
  // even if Next.js says not, we have to await them to get the actual params object
  // const { id } = await params;

  // This is how you get the query parameter:
  // const message = new URL(req.url).searchParams.get("message");

  // This is how you return a response
  // return NextResponse.json({ message: `You requested the ID: ${id} with message: ${message}` });

  try {
    const { id } = await params;
    const message = new URL(req.url).searchParams.get("message");

    if (!message) {
      throw new Error("No message received!");
    }

    return NextResponse.json(
      { message: `You requested the ID: ${id} with message: ${message}` },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const body = await req.json();
  try {
    if (!body.message) {
      return NextResponse.json(
        { error: "No message in request body!" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { 
        message: `You posted to body: ${JSON.stringify(body)}`,
        users: body.data
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    );
  }
}
