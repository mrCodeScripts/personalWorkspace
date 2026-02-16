import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import bcrypt from 'bcryptjs';

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
      status: "failed",
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
      status: "failed",
      message: "Failed Fetch Users!",
      users: users,
    });
  }
}

/*
export async function RouteExample3(req: Request, res: Response) {
  const data = req.body;
  let users: User[] = [];

  if (!data?.name || !data?.age || data.userIndex === undefined) {
    return res.status(400).json({
      status: "failed",
      message: "Name, age, and userIndex are required!",
    });
  }

  const filePath: string = path.join(
    __dirname,
    "../NodeJSLearning/userTxtDb/users_db.txt",
  );

  try {
    const readFile = await fs.promises.readFile(filePath, "utf-8");

    if (readFile.trim() !== "") {
      users = JSON.parse(readFile);
      if (!Array.isArray(users)) throw new Error("INVALID DB");
    }

    // Make sure the index exists
    if (data.userIndex < 0 || data.userIndex >= users.length) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid userIndex!",
        users,
      });
    }

    // Update the user
    users[data.userIndex].name = data.name;
    users[data.userIndex].age = data.age;

    // Save back to file
    await fs.promises.writeFile(filePath, JSON.stringify(users));

    // simulate loading
    await new Promise((r) => setTimeout(r, 2000));

    res.status(200).json({
      status: "success",
      message: "Successfully Updated User!",
      users,
    });
  } catch (err) {
    console.log(`ERROR: ${err}`);
    res.status(500).json({
      status: "failed",
      message: "Failed To Update User!",
      users,
    });
  }
}
*/

export async function RouteExample3(req: Request, res: Response) {
  const data = req.body;
  let users: User[] = [];

  if (!data?.name || !data?.age || data?.userIndex == undefined) {
    return res.status(400).json({
      status: "failed",
      message: "Name, age, and userIndex are required!",
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
        users = JSON.parse(readFile);

      if (!Array.isArray(users)) throw new Error("INVALID DB");
    } catch (err) {
      console.log(err);
      users = [];
    }

    if (data.userIndex < 0 || data.userIndex >= users.length) {
      res.status(400).json({
        status: 'failed',
        message: "Invalid userIndex!",
        users: users
      })
    }

    users[data.userIndex].name = data.name;
    users[data.userIndex].age = data.age;

    await fs.promises.writeFile(filePath, JSON.stringify(users));
    // simulate loading
    await new Promise(res => setTimeout(res, 2000));

    res.status(200).json({
      status: "success",
      message: "Succesfuly Updated User!",
      users: users
    });
  } catch (err) {
    users = [];
    console.log(`ERROR: ${err}`);
    res.status(500).json({
      status: "failed",
      message: "Failed To Update User!",
      users: users,
    });
  }
}

export async function RouteExample4 (req: Request, res: Response) { };
