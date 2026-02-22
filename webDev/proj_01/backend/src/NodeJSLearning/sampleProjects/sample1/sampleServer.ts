import express, { Request, Response, NextFunction } from "express";
import { Server as IOServer } from 'socket.io';
import cors from "cors";
import http from 'http';

const DEFAULT_PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

/*
  This file provides multiple Socket.IO server samples you can use.
  Choose a sample by setting the environment variable SAMPLE to one of:
    basic         - plain http server + Socket.IO
    express       - Express app integrated with Socket.IO
    namespaces    - demonstrates namespaces
    rooms         - demonstrates joining/leaving rooms + broadcasting
    auth          - demonstrates auth middleware using handshake.auth
    typed         - shows TypeScript-typed events (basic)

  Default: `basic` on port 3000 (or PORT env).

  Run in dev with:
    npm run dev
  Or build and run:
    npm run build && npm start
*/

type SampleName = 'basic' | 'express' | 'namespaces' | 'rooms' | 'auth' | 'typed';

const sample: SampleName = (process.env.SAMPLE as SampleName) || 'basic';

function startBasic(port = DEFAULT_PORT) {
  const server = http.createServer();
  const io = new IOServer(server, { cors: { origin: '*' } });

  io.on('connection', (socket) => {
    console.log('[basic] client connected', socket.id);

    socket.on('ping', () => socket.emit('pong'));

    socket.on('echo', (msg) => {
      socket.emit('echo', msg);
    });

    socket.on('disconnect', (reason) => {
      console.log('[basic] disconnected', socket.id, reason);
    });
  });

  server.listen(port, () => console.log(`[basic] listening on ${port}`));
}

function startExpress(port = DEFAULT_PORT) {
  const app = express();
  app.use(cors());

  app.get('/', (_req, res) => res.send('Socket.IO Express server')); 

  const server = http.createServer(app);
  const io = new IOServer(server, { cors: { origin: '*' } });

  io.on('connection', (socket) => {
    console.log('[express] connected', socket.id);
    socket.on('msg', (text) => {
      // broadcast to all except sender
      socket.broadcast.emit('msg', { from: socket.id, text });
    });
  });

  server.listen(port, () => console.log(`[express] listening on ${port}`));
}

function startNamespaces(port = DEFAULT_PORT) {
  const server = http.createServer();
  const io = new IOServer(server, { cors: { origin: '*' } });

  const chat = io.of('/chat');
  const news = io.of('/news');

  chat.on('connection', (socket) => {
    console.log('[namespaces] /chat connected', socket.id);
    socket.on('message', (m) => chat.emit('message', { from: socket.id, m }));
  });

  news.on('connection', (socket) => {
    console.log('[namespaces] /news connected', socket.id);
    socket.emit('headline', { title: 'Welcome to /news' });
  });

  server.listen(port, () => console.log(`[namespaces] listening on ${port}`));
}

function startRooms(port = DEFAULT_PORT) {
  const server = http.createServer();
  const io = new IOServer(server, { cors: { origin: '*' } });

  io.on('connection', (socket) => {
    console.log('[rooms] connected', socket.id);

    socket.on('join', (room: string) => {
      socket.join(room);
      socket.emit('joined', room);
      io.to(room).emit('system', `${socket.id} joined ${room}`);
    });

    socket.on('leave', (room: string) => {
      socket.leave(room);
      io.to(room).emit('system', `${socket.id} left ${room}`);
    });

    socket.on('room-message', ({ room, text }: { room: string; text: string }) => {
      // send to all in room, including sender
      io.to(room).emit('room-message', { from: socket.id, text });
    });
  });

  server.listen(port, () => console.log(`[rooms] listening on ${port}`));
}

function startAuth(port = DEFAULT_PORT) {
  const server = http.createServer();
  const io = new IOServer(server, { cors: { origin: '*' } });

  // simple auth example using handshake.auth
  io.use((socket, next) => {
    const token = (socket.handshake.auth && (socket.handshake.auth as any).token) || null;
    if (token === 'secret-token') return next();
    return next(new Error('unauthorized'));
  });

  io.on('connection', (socket) => {
    console.log('[auth] authorized', socket.id);
    socket.emit('welcome', { id: socket.id });
  });

  server.listen(port, () => console.log(`[auth] listening on ${port}`));
}

// typed example: Server<EmitTypes, ListenTypes>
interface ClientToServerEvents {
  hello: (name: string) => void;
}

interface ServerToClientEvents {
  welcome: (msg: string) => void;
}

function startTyped(port = DEFAULT_PORT) {
  const server = http.createServer();
  const io = new IOServer<ClientToServerEvents, ServerToClientEvents>(server, { cors: { origin: '*' } });

  io.on('connection', (socket) => {
    console.log('[typed] connected', socket.id);
    socket.on('hello', (name) => {
      socket.emit('welcome', `Hello ${name}! (from server)`);
    });
  });

  server.listen(port, () => console.log(`[typed] listening on ${port}`));
}

// choose and start
// switch (sample) {
//   case 'express':
//     startExpress();
//     break;
//   case 'namespaces':
//     startNamespaces();
//     break;
//   case 'rooms':
//     startRooms();
//     break;
//   case 'auth':
//     startAuth();
//     break;
//   case 'typed':
//     startTyped();
//     break;
//   default:
//     startBasic();
// }




function myOwnLiveServer (thePort: string) {
    type MyOwnToServerEvents = {
        toServer: (msgFromClient: string) => void;
    };
    type MyOwnToClientEvents = {
        toClient: (msgToClient: string) => void;
    };
    const server = http.createServer();
    const io = new IOServer<MyOwnToServerEvents, MyOwnToClientEvents>(server, {cors: {origin: "http://localhost:3000/"}});
    const io2 = new IOServer<{from: () => void}, {to: () => void}>(server, {cors: {origin: "*"}});
    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);
        socket.on("toServer", (msgFromClient: string) => {
            socket.emit("toClient", `Received from live server: ${msgFromClient}`);
        });
    });
};


export {
    myOwnLiveServer
};
