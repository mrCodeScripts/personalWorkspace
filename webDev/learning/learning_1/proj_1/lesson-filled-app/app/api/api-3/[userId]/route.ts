import { User } from "@/types";
import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import path from "path";

const usersJsonFilePath = path.join(process.cwd(), "app/api/api-3/users.json");

async function fetchUserData(id: string): Promise<User | undefined> {
  // This function must only fetch and return the user data, no need to throw errors since we can handle them in the API route function.
  const fileData = await fs.readFile(usersJsonFilePath);
  const users = JSON.parse(fileData.toString()) as User[];
  const user = users.find((u) => u.name === id);
  return user;
};

export async function GET(
  req: Request,
  { params }: { params: Promise<{ userId: string }> },
) {
  const { userId } = await params;

  try {
    const user = await fetchUserData(userId);
    if (user) {
      // Directly reuturn user data if found, no need to throw an error since this is a valid case of "user found"
      return NextResponse.json({ user }, { status: 200 });
    } else {
      // Directly return error message without throwing an error, since this is a valid case of "user not found"
      return NextResponse.json({ errorMsg: `User with name ${userId} not found` }, { status: 404 });
    }
  } catch (error) {
    // Pure error handling, no need to throw since we're already in an API route and can directly return a response
    return NextResponse.json({ errorMsg: error instanceof Error ? error.message : "Unknown error" }, { status: 400 });
  }
};

export async function POST() {};

export async function PATCH() {};
