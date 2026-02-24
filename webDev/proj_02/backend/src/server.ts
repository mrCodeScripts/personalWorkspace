import express, { Express, Request, Response } from "express";
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





// PUBMARKET REGISTER AUTHENTICATION
app.post("/pubMarket/auth/register", RegisterNewAccount);





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
