import { Request, Response } from "express";
import fs from "fs";
import path from "path";

type User = { name: string; age: number };
export async function RouteExample1(req: Request, res: Response) {
  const data = req.body;
  let users: User[] = [];

  if (!data?.name || !data?.age) {
    return res.status(400).json({
      status: "failed",
      message: "Name and age required!",
    });
  }

  const filePath: string = path.join(
    __dirname,
    "../NodeJSLearning/userTxtDb/users_db.txt",
  );

  try {
    const readFile = await fs.promises.readFile(filePath, "utf-8");

    try {
      if (readFile.trim() != "")
        users = [...JSON.parse(readFile), { name: data.name, age: data.age }];

      if (!Array.isArray(users)) throw new Error("INVALID DB");
    } catch (err) {
      console.log(err);
      users = [];
    }

    await fs.promises.writeFile(filePath, JSON.stringify(users));

    // simulate loading
    await new Promise(res => setTimeout(res, 2000));

    res.status(200).json({
      status: "success",
      message: "Succesfuly Added User!",
      users: users,
    });
  } catch (err) {
    users = [];
    console.log(`ERROR: ${err}`);
    res.status(500).json({
      status: "success",
      message: "Failed To Add User!",
      users: users,
    });
  }
}

export async function RouteExample2(req: Request, res: Response) {
  let users: User[] = [];
  const filePath: string = path.join(
    __dirname,
    "../NodeJSLearning/userTxtDb/users_db.txt",
  );

  try {
    const readFile = await fs.promises.readFile(filePath, "utf-8");
    try {
      if (readFile.trim() != "")
        users = [...JSON.parse(readFile)];
      if (!Array.isArray(users)) throw new Error("INVALID DB");
    } catch (err) {
      console.log(err);
      users = [];
    }

    // simulate loading
    await new Promise(res => setTimeout(res, 2000));

    res.status(200).json({
      status: "success",
      message: "Succesfuly Fetched Users!",
      users: users,
    });
  } catch (err) {
    users = [];
    console.log(`ERROR: ${err}`);
    res.status(500).json({
      status: "success",
      message: "Failed Fetch Users!",
      users: users,
    });
  }
}
