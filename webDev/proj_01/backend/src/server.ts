import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import FileSystemLesson from "./NodeJSLearning/FileSystems/fsReadFile";
import { RouteExample1, RouteExample2, RouteExample3, RouteExample4 } from "./routes/routeEx1";
import PasswordSecurityLessons from "./NodeJSLearning/security/passwordSecurity";

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
app.post("/fetch_users", RouteExample2);
app.post("/shit", (req: Request, res: Response) => {
    res.status(200).json({message: "slkjsdlfkjsd"});
});
app.post("/updateUser", RouteExample3);
app.post("/signup", RouteExample4);
// app.post("/signup", RouteExample4);

// FileSystemLesson();
PasswordSecurityLessons();
app.listen(port, () => {console.log(`Server: ${port}`)});


