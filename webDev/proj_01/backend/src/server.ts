import express, { Request, Response } from 'express';
import fs from 'fs';
import { promises as promiseFs } from 'fs';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from "path";

dotenv.config();

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 3001;

app.use(helmet());
app.use(morgan('combined'));
app.use(cors());
app.use(express.json());

app.get('/api/data', (_req: Request, res: Response) => {
//   res.send('Hello from Express backend!');
  res.json({message: 'Hello from Node API!'});
});

type responseType = {
  status: 'success' | 'failed';
  message: string;
};

app.post('/api/randomData', (_req: Request, res: Response) => {
  const data = _req.body;
  console.log(`Received from Next.js server: ${data.count}`);
  const response: responseType = {
    status: 'success', message: 'Successfully received data!'
  };
  res.json(response);
});

app.post('');

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});

// console.log("Shit");
// setTimeout(() => {console.log("timer");}, 300);
// console.log("Shit");

// console.log("File Opened");
// const pathfile = path.join(__dirname, 'text/ex.txt');

// this one outputed last
// fs.readFile(pathfile, 'utf-8', (err, data) => {
//     if(err) throw err;
//     console.log("Read File Data: ", data);
// });
// console.log("File Initiated");

// these ones are first
// const buf = Buffer.from('Hello Node');
// console.log(buf.toString('utf-8'));
// console.log(buf);

// async function readFile (path: string) {
//     try {
//         const data = await promiseFs.readFile(path, "utf-8");
//         console.log("DATA: ", data);
//     } catch (error: unknown) {
//         const e = error as NodeJS.ErrnoException;
//         if (e.code == "ENOENT") console.log("File missing!");
//         else console.error('UNKNOWN ERR: ', e);
//     }
// };

// readFile(path.join(__dirname, "text/ex.txt"));
