import fs from "fs/promises";
import path from "path";

declare global {
  var myVar: string;
}

function FileSystemLesson1() {
  console.log(`CURRENT DIRECTORY NAME: ${__dirname}`);

  // PROCESS -> info + control of your Node App
  console.log(`PROCESS PID: ${process.pid}`);
  console.log(`PROCESS ARGV: ${process.argv}`);
  console.log(`PROCESS ARGV0: ${process.argv0}`);
  console.log(`PROCESS EXECARGV: ${process.execArgv}`);
  console.log(
    `PROCESS ALLOWED NODE ENV FLAGS: ${process.allowedNodeEnvironmentFlags}`,
  );
  console.log(
    `PROCESS ENV (CAN ACCESS ANYTHING FROM THE ENV): ${process.env.port}`,
  );
  console.log(`PROCESS CURRENT WORKING DIRECTORY (CWD): ${process.cwd}`);
  // console.log(`PROCESS EXIT (KILLS APP [0 -> ERROR, 1 -> SUCCESS]) ${process.kill(1)}`);

  // --------------------------------------------------------------------------------------------

  // GLOBAL (Node's Global Scope)
  // in browser -> window
  // in Node -> global

  // this tells typescript 'shut up, i know what im doing'
  (global as any).myVar = "Hello"; // -> global.myVar = "Hello";

  // proper way:
  // 1. Declare global on the upper part of the file.
  // declare global { var myVar: string};
  globalThis.myVar = "Hello World";
  console.log(myVar);
  /**
    TYPE SAFE ✅
    NO ERROR ✅
    PROFESSIONAL ✅

    1. Why 'globalThis' Instead of 'global'?
      Modern Standard
      Old -> global
      New -> globalthis

    globalThis works in: Node, Browser, Deno, Workers
    so prefer: globalThis.myVar = "hello";

    ✅ REALITY CHECK: Should You Even Use Globals?
      In real projects?
        👉 Almost never.
      Globals cause:
        ❌ Bugs
        ❌ Memory leaks
        ❌ Hidden dependencies
        ❌ Hard debugging

      Example bad design:
        globalThis.user = currentUser;

    ✅ BETTER PATERN (What Pros Use)
    Instead of globals → use modules.

    'config.ts'
    export const config = {
      appName: "MyApp",
      version: "1.0"
    };

    'app.ts'
    import { config } from "./config";
    console.log(config.appName);

    ✔️ Predictable
    ✔️ Safe
    ✔️ Maintainable


    ✅ TL;DR (Memorize This)
    1. Quick hack:
    (globalThis as any).myVar = "Hello";

    2. Correct way:
    'global.d.ts'
    declare global {
      var myVar: string;
    }

    BEST WAY:
    👉 Don’t use globals. Use modules.
  */
}

function FileSystemLesson2() {
  // READ FILE
  // -> This means: Get content from disk into memory
  const thePath: string = path.join(__dirname, "test.txt");
  const fileSystemFetch1: (path: string) => void = async (path: string) => {
    const data1 = await fs.readFile(path, "utf-8");
    const data2 = await fs.readFile(path);

    // outputs the content of the file
    console.log(data1);
    // without the 'utf-8' it will output buffers something like <Buffer 48 5c...> (a binary)
    console.log(data2);
  };

  /**
   * Text use -> utf-u
   * Images/Videos -> no encoding
   */

  fileSystemFetch1(thePath);
}

function FileSystemLesson3() {
  // WRITE FILE
  // -> This means: Put data into disk
  // -> This will either CREATE or OVERWRITE
  // Always remember: writeFile = overwrite (Old content is deleted)
  const thePath: string = path.join(__dirname, "otherText1.txt");
  const fileSystemWrite: (path: string) => void = async (path: string) => {
    await fs.writeFile(path, "This content");
  };
  fileSystemWrite(thePath);
}

function FileSystemLesson4() {
  // MAKE DIRECTORY (FOLDER)
  const theFolderPath: string = path.join(__dirname, "other/");
  const fileSystemMkdir: (path: string) => void = async (path: string) => {
    await fs.mkdir(path, { recursive: true }); // {recursive: true} -> It prevents errors if the folder already exists.
  };
  fileSystemMkdir(theFolderPath);
}

function FileSystemLesson5() {
  // REMOVE DIRECTORY (FOLDER)
  const theFolderPath: string = path.join(__dirname, "other/otherFolder");
  const fileSystemRmDir: (path: string) => void = async (path: string) => {
    /**
     * OLD (Limited)
     * -> works only if empty.
     * -> being phased out.
     */
    await fs.rmdir(path);
  };
  const fileSystemRm: (path: string) => void = async (path: string) => {
    /**
     * MODERN (Recommended)
     * -> deletes folder and all its contents
     * -> No error if it doesnt exist
     *
     * {recursive: true, force: true}
     * recursive -> delete everything inside
     * force -> ignore errors
     */
    await fs.rm(path, { recursive: true, force: true });
  };
  fileSystemRmDir(theFolderPath);
  fileSystemRm(theFolderPath);
}

function FileSystemLesson6() {
  // APPEND FILE
  const theFilepath: string = path.join(__dirname, "test.txt");
  const fileSystemAppend: (path: string, data: string) => void = async (
    path: string,
    data: string,
  ) => {
    /**
     * Adds to the end of the file.
     * Creates the file if it doesn’t exist.
     * Great for logs or diary-style files.
     */
    await fs
      .appendFile(path, data)
      .then((res) => {
        console.log("Content Appended!");
      })
      .catch((e) => console.log(e));
  };
  fileSystemAppend(theFilepath, "\nShit");
  fileSystemAppend(theFilepath, "\nShit");
  fileSystemAppend(theFilepath, "\nShit");
  fileSystemAppend(theFilepath, "\nShit");
  fileSystemAppend(theFilepath, "\nShit");
}

function FileSystemLesson7() {
  // FILE STAT
  const filePath: string = path.join(__dirname, "test.txt");
  fs.stat(filePath)
    .then((stat) => {
      console.log(`Size: ${stat.size}`); // file size in bytes
      console.log(`Created: ${stat.birthtime}`);
      console.log(`Modified: ${stat.mtime}`);
      console.log(`Accessed: ${stat.atime}`);
      console.log(`Changed: ${stat.ctime}`);
      console.log(`Is Directory: ${stat.isDirectory()}`);
      console.log(`Is File: ${stat.isFile()}`);
      console.log(`Is Symbolic Link: ${stat.isSymbolicLink()}`);
      console.log(`Is Block Device: ${stat.isBlockDevice()}`);
      console.log(`Is Character Device: ${stat.isCharacterDevice()}`);
      console.log(`Is FIFO: ${stat.isFIFO()}`);
      console.log(`Is Socket: ${stat.isSocket()}`);
    })
    .catch((err) => console.error(`Stat error ${err}`));
}

export default function FileSystemLesson() {
  // FileSystemLesson1();
  // FileSystemLesson2();
  // FileSystemLesson3();
  // FileSystemLesson4();
  // FileSystemLesson5();
  // FileSystemLesson6();
  FileSystemLesson7();
}
