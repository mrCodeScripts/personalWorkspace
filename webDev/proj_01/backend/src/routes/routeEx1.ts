import { Request, Response } from "express";
import fs from "fs";
import path from "path";

export async function RouteExample1(req: Request, res: Response) {
  const userDBPath: string = path.join(
    __dirname,
    "../NodeJSLearning/userTxtDb/users_db.txt",
  );
  try {
    // const { name, age }: { name: string; age: number } = await req.body;

    const data = await req.body;
    const name = data.name;
    const age = data.age;
    console.log(name, age);

    // let users: { name: string; age: number }[] = [];

    // try {
    //   const userDB = await fs.promises.stat(userDBPath);
    //   if (userDB.size === 0) throw new Error("File is empty!");
    //   const getUserDB = await fs.promises.readFile(userDBPath, "utf-8");
    //   const userData = JSON.parse(getUserDB);
    //   users = userData;
    //   users = [...users, { name: name, age: age }];
    // } catch (err) {
    //   users = [];
    //   throw new Error("FAILED TO FETCH DATA FROM DB.");
    // }

    // try {
    //   const stringifyUsers = JSON.stringify(users);
    //   await fs.promises.writeFile(userDBPath, stringifyUsers);
    // } catch (err) {
    //   res
    //     .status(400)
    //     .json({
    //       status: "failed",
    //       message: "Failed To Register User!",
    //       dbUsers: JSON.stringify(users),
    //     });
    //   throw new Error("FAILED TO INSERT DATA FROM DB");
    // }

    res.json({
      status: "success",
      message: "Successfuly accepted data!",
      // dbUsers: JSON.stringify(users),
    });
  } catch (err) {
    console.log(err);
  }
}
