"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// Health check
router.get("/health", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "API is healthy",
    });
});
// User endpoints
router.get("/users", (req, res) => {
    res.status(200).json({
        message: "Get all users",
        data: [],
    });
});
router.post("/users", (req, res) => {
    res.status(201).json({
        message: "User created",
        data: req.body,
    });
});
// Product endpoints
router.get("/products", (req, res) => {
    res.status(200).json({
        message: "Get all products",
        data: [],
    });
});
router.post("/products", (req, res) => {
    res.status(201).json({
        message: "Product created",
        data: req.body,
    });
});
// Auth endpoints
router.post("/auth/login", (req, res) => {
    res.status(200).json({
        message: "Login successful",
        token: "jwt_token_here",
    });
});
router.post("/auth/register", (req, res) => {
    res.status(201).json({
        message: "User registered",
        data: req.body,
    });
});
exports.default = router;
//# sourceMappingURL=index.js.map