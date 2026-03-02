"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./config/db");
// import { PrismaClient } from "@prisma/client";
const prisma_1 = __importDefault(require("./lib/prisma"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const register_1 = require("./middleware/auth/register");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Backend is running",
        timestamp: new Date().toISOString(),
    });
});
app.get("/api", (req, res) => {
    res.status(200).json({
        message: "Welcome to the API",
        version: "1.0.0",
    });
});
// ------------- ACTUAL ROUTES -------------
// PUBMARKET REGISTER AUTHENTICATION
app.post("/pubMarket/auth/register", register_1.RegisterNewAccount);
// INSERT USER (TEST ENDPOINT)
app.post("/api/users", async (req, res) => {
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
        const newUser = await prisma_1.default.user.create({
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
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({
            status: "error",
            message: error.message || "Failed to create user",
        });
    }
});
// GET ALL USERS
app.get("/api/users", async (req, res) => {
    try {
        const users = await prisma_1.default.user.findMany({
            include: { socialAccounts: true },
            orderBy: { createdAt: "desc" },
        });
        res.status(200).json({
            status: "success",
            data: users,
        });
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({
            status: "error",
            message: error.message || "Failed to fetch users",
        });
    }
});
// GET USER BY ID
app.get("/api/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await prisma_1.default.user.findUnique({
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
    }
    catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({
            status: "error",
            message: error.message || "Failed to fetch user",
        });
    }
});
// DELETE USER
app.delete("/api/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await prisma_1.default.user.delete({
            where: { id: parseInt(id) },
        });
        res.status(200).json({
            status: "success",
            message: "User deleted successfully",
            data: user,
        });
    }
    catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({
            status: "error",
            message: error.message || "Failed to delete user",
        });
    }
});
// -----------------------------------------
// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        status: "error",
        message: "Route not found",
    });
});
// Error Handler
app.use((err, req, res) => {
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
    await (0, db_1.testConnection)();
})();
//# sourceMappingURL=server.js.map