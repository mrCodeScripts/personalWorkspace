import fs from "fs/promises";
import fs2, { write } from "fs";
import path from "path";
import { pathToFileURL } from "url";

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

function FileSystemLesson8() {
  // FILE ACCESS
  const filepath: string = path.join(__dirname, "test.txt");
  /**
   * fs.constants.R_OK -> check read permission
   * fs.constants.W_OK -> check write permission
   * fs.constants.X_OK -> check execute permission
   * You can combine them using |
   */
  fs.access(filepath, fs.constants.R_OK)
    .then(() => console.log("File is readable!"))
    .catch((err) => console.log(`File is not readable: ${err}`));

  fs.access(filepath, fs.constants.W_OK)
    .then(() => console.log("File is writeable!"))
    .catch((err) => console.log(`File is not writeable: ${err}`));

  fs.access(filepath, fs.constants.X_OK)
    .then(() => console.log("File is executable!"))
    .catch((err) => console.log(`File is not executable: ${err}`));

  fs.access(filepath, fs.constants.R_OK | fs.constants.X_OK | fs.constants.X_OK)
    .then(() => console.log("File is readable, writeable, and executable!"))
    .catch((err) =>
      console.log(`File is not readable, writeable, and executable: ${err}`),
    );
}

function FileSystemLesson9() {
  // READ DIRECTORY
  const filepath: string = path.join(__dirname, ".");
  fs.readdir(filepath)
    .then((files) => console.log(`Files: ${files.map((e) => ` ${e} `)}`))
    .catch((err) => console.log(err));

  fs.readdir(filepath, "utf-8") // or "ascii", "base64", etc.
    .then((files) => console.log(files))
    .catch((err) => console.log(err));

  fs.readdir(filepath, { withFileTypes: true })
    .then((entries) => {
      console.log(`FILES INSIDE ${filepath}`);
      entries.forEach((entry) => {
        console.log(`${entry.name} -> 
        File: ${entry.isFile()}, 
        Dir: ${entry.isDirectory()}, 
        Symlink: ${entry.isSymbolicLink()}, 
        Block: ${entry.isBlockDevice()}, 
        Char: ${entry.isCharacterDevice()}, 
        FIFO: ${entry.isFIFO()}, 
        Socket: ${entry.isSocket()}, 
      `);
      });
    })
    .catch((err) => console.log(err));
}

function FileSystemLesson10() {
  // READ STREAM -> Read
  // WRITE STREAM -> Write
  // PIPE -> Copy

  const sourcePath: string = path.join(__dirname, "../../text/copy1.txt");
  const destinationPath: string = path.join(
    __dirname,
    "../../text/innerText.txt",
  );

  // HOW READ STREAM IS PRACTICALLY USED FOR COPYING FILES
  const readStream = fs2.createReadStream(sourcePath, {
    highWaterMark: 64 * 1024,
  }); // 64kb chunk
  const writeStream = fs2.createWriteStream(destinationPath); // 64kb chunk

  /**
   * readStream.pipe(writeStream)
   * -> This is the direct connection between reading and writing. Node handles flow control / backpressure automatically, so the write stream won’t get overwhelmed if it’s slower than the read. No need to manually listen for data chunks just to write them — the pipe handles it.
   */
  readStream.pipe(writeStream);

  readStream.on("open", () => console.log("READ STREAM OPENED!"));
  writeStream.on("open", () => console.log("WRITE STREAM OPENED!"));

  readStream.on("data", (chunk) =>
    console.log(`Read chunk of ${chunk.length} bytes.`),
  );

  readStream.on("end", () => console.log("FILE COPIED SUCCESSFULY"));
  writeStream.on("finish", () => console.log("FILE COPIED SUCCESSFULY"));

  readStream.on("error", (e) => console.log("READ ERROR: ", e));
  writeStream.on("error", (e) => console.log("READ ERROR: ", e));

  /**
   * Event	Trigger / Use
   * 'open' ->	Fires when the stream file descriptor is opened. Useful to know the stream is ready.
   * 'data' ->	Fires whenever a chunk is read (for readStream). Lets you inspect each chunk if needed.
   * 'end' -> Fires when the read stream finishes reading all data.
   * 'finish' ->	Fires when the write stream has finished writing all data and flushed the buffer.
   * 'error'	Fires if there’s any problem reading or writing. Always good to catch to prevent crashes.
   * 
   * 
   * pipe() does the heavy lifting of reading → writing. Events give you fine-grained logging / control — see exactly when reading starts, chunks come in, writing finishes, or errors occur.
   */

  /**
   * READSTREAMS EVENTS 
   * 'open' ->	when file descriptor is opened; readStream.fd becomes available.
   * 'data' ->	each time a chunk is read (Buffer or string); can process chunks live.
   * 'end' ->	when all data has been read; signals read completion.
   * 'close' ->	when file descriptor is closed; only if autoClose=true.
   * 'error' ->	on read errors; must handle, otherwise crashes.
   * 'pause' ->	when the stream is paused; can be triggered by .pause() or backpressure.
   * 'resume' ->	when the stream resumes; can be triggered by .resume() or backpressure.
   * 'readable' ->	when stream has data ready to read via .read(); useful for manual .read() 
   * 
   * 
   * WRITESTREAM EVENTS 
   * 'open' ->	when file descriptor is opened; writeStream.fd becomes available
   * 'finish' ->	when .end() is called and all data is flushed; signals write completion
   * 'close' -> when fd is closed; Only if autoClose=true.
   * 'error' ->	on write errors;	must handle.
   * 'drain' ->	when internal buffer is empty after write; useful for backpressure.
   * 'pipe' ->	when another stream pipes into this write stream; useful for chaining.
   * 'unpipe' ->	when a piped stream is removed; Cleanup / logging.
   */
  // ------------------------------------------------------------------------------------


  



  const readStream2 = fs2.createReadStream(sourcePath, { flags: "r" });

}

export default function FileSystemLesson() {
  // FileSystemLesson1();
  // FileSystemLesson2();
  // FileSystemLesson3();
  // FileSystemLesson4();
  // FileSystemLesson5();
  // FileSystemLesson6();
  // FileSystemLesson7();
  // FileSystemLesson8();
  // FileSystemLesson9();
  FileSystemLesson10();
}
