import { Router, Request, Response } from "express";

const router = Router();

// Health check
router.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "API is healthy",
  });
});

// User endpoints
router.get("/users", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Get all users",
    data: [],
  });
});

router.post("/users", (req: Request, res: Response) => {
  res.status(201).json({
    message: "User created",
    data: req.body,
  });
});

// Product endpoints
router.get("/products", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Get all products",
    data: [],
  });
});

router.post("/products", (req: Request, res: Response) => {
  res.status(201).json({
    message: "Product created",
    data: req.body,
  });
});

// Auth endpoints
router.post("/auth/login", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Login successful",
    token: "jwt_token_here",
  });
});

router.post("/auth/register", (req: Request, res: Response) => {
  res.status(201).json({
    message: "User registered",
    data: req.body,
  });
});

export default router;
