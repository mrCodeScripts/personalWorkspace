import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import FileSystemLesson from "./NodeJSLearning/FileSystems/fsReadFile";
import { RouteExample1 } from "./routes/routeEx1";

dotenv.config(); // loads .env variables

const app = express(); // create Express app
const port = process.env.PORT || 3001; // get port from env or default

// START MIDDLEWARE SETUP
app.use(helmet()); // adds security headers
app.use(cors()); // allow requests from all origins
app.use(morgan("dev")); // logs requests to console
app.use(express.json()); // parses JSON bodies for POST requests
app.use(express.urlencoded({ extended: true })); // parses HTML form bodies
// END MIDDLEWARE SETUP


app.post("/route_ex_1", RouteExample1);
app.post("/shit", (res: Response, req: Request) => {
    res.json({message: "slkjsdlfkjsd"});
});
// FileSystemLesson();
