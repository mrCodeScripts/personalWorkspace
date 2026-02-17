import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	// Minimal handler to satisfy build - returns empty JSON by default.
	return NextResponse.json({});
}