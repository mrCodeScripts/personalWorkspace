import express, { Express, Request, Response } from "express";
import { testConnection } from "./config/db";
// import { PrismaClient } from "@prisma/client";
import prisma from "./lib/prisma";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import zxcvbn from "zxcvbn";
import { RegisterNewAccount } from "./middleware/auth/register";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/api/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "Backend is running",
    timestamp: new Date().toISOString(),
  });
});


app.get("/api", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to the API",
    version: "1.0.0",
  });
});






// ------------- ACTUAL ROUTES -------------
// PUBMARKET REGISTER AUTHENTICATION
app.post("/pubMarket/auth/register", RegisterNewAccount);

// INSERT USER (TEST ENDPOINT)
app.post("/api/users", async (req: Request, res: Response) => {
  try {
    const { username, email, phone, password, role, avatarUrl } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({
        status: "error",
        message: "username, email, and password are required",
      });
    }

    // Create user
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        phone: phone || null,
        password, // TODO: Hash password with bcrypt before saving!
        role: role || "user",
        avatarUrl: avatarUrl || null,
      },
    });

    res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: newUser,
    });
  } catch (error: any) {
    console.error("Error creating user:", error);
    res.status(500).json({
      status: "error",
      message: error.message || "Failed to create user",
    });
  }
});

// GET ALL USERS
app.get("/api/users", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      include: { socialAccounts: true },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({
      status: "success",
      data: users,
    });
  } catch (error: any) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      status: "error",
      message: error.message || "Failed to fetch users",
    });
  }
});

// GET USER BY ID
app.get("/api/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: { socialAccounts: true },
    });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error: any) {
    console.error("Error fetching user:", error);
    res.status(500).json({
      status: "error",
      message: error.message || "Failed to fetch user",
    });
  }
});

// DELETE USER
app.delete("/api/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({
      status: "success",
      message: "User deleted successfully",
      data: user,
    });
  } catch (error: any) {
    console.error("Error deleting user:", error);
    res.status(500).json({
      status: "error",
      message: error.message || "Failed to delete user",
    });
  }
});
// -----------------------------------------




// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    status: "error",
    message: "Route not found",
  });
});

// Error Handler
app.use((err: any, req: Request, res: Response) => {
  console.error(err);
  res.status(500).json({
    status: "error",
    message: err.message || "Internal server error",
  });
});


// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

(async () => {
  await testConnection();
})();
