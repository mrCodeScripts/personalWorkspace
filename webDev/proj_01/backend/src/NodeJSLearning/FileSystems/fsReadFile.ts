import fs from 'fs';

export default function FileSystemLesson () {

    console.log(`CURRENT DIRECTORY NAME: ${__dirname}`);

    // PROCESS -> info + control of your Node App
    console.log(`PROCESS PID: ${process.pid}`);
    console.log(`PROCESS ARGV: ${process.argv}`);
    console.log(`PROCESS ARGV0: ${process.argv0}`);
    console.log(`PROCESS EXECARGV: ${process.execArgv}`);
    console.log(`PROCESS ALLOWED NODE ENV FLAGS: ${process.allowedNodeEnvironmentFlags}`);
    console.log(`PROCESS ENV (CAN ACCESS ANYTHING FROM THE ENV): ${process.env.port}`);
    console.log(`PROCESS CURRENT WORKING DIRECTORY (CWD): ${process.cwd}`);
    // console.log(`PROCESS EXIT (KILLS APP [0 -> ERROR, 1 -> SUCCESS]) ${process.kill(1)}`);




};