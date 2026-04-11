import { NextResponse } from "next/server";
import {promises as fs} from 'fs';
import path from 'path';

// 1. Define the correct, absolute path to your JSON file.
const jsonFilePath = path.join(process.cwd(), "app/api/api-2/products/products.json");

// --- HOW TO GET (READ) DATA ---
export async function GET (req: Request) {
  try {
    // Read the file as a string
    const fileData = await fs.readFile(jsonFilePath, "utf-8");

    // Parse the JSON data
    const products = JSON.parse(fileData);

    // Simulate loading state
    await new Promise(res => setTimeout(res, 3000));

    // Return the products as a JSON response
    return NextResponse.json({message: "Products retrieved successfully!", products: products}, { status: 200 });
  } catch (error) {
    // Handle errors (e.g., file not found, JSON parsing error)
    return NextResponse.json({message: "Error reading products data", error: (error as Error).message}, { status: 500 });
  }
}

