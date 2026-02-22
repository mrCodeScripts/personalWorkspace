// import { connectSocket } from "@/src/lib/socket";
import { io, Socket } from "socket.io-client";
import { useEffect, useState } from "react";

const URL: string = "http://localhost:3001";
let socket: Socket | null = null;

function socketInit() {
  if (!socket) {
    socket = io(URL, { autoConnect: true });
  }
  return socket;
}

function connectSocket() {
  const s = socketInit();
  if (!s.connected) return s.connect();
  return s;
}

function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}

export default function () {
  const [messages, newMessages] = useState<string[]>([]);

  useEffect(() => {
    const socket = connectSocket();
    socket.on("connect", () => {
      console.log(`Socket is connected...`);
    });
    socket.emit("toServer", "THIS DATA FROM THE CLIENT");
    socket.on("toClient", (msg) => {
      console.log(msg);
      newMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("toClient");
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <div>
        <ul style={{color: "red"}}>{messages.map((e, i) => <li key={i}>{e}</li>)}</ul>
      </div>
    </>
  );
}
