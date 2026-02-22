import { Socket } from 'socket.io-client';

let socket: Socket | null = null;

const URL = typeof window !== 'undefined' 
  ? process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3000'
  : null;

export async function initSocket() {
  if (typeof window === 'undefined') return null; // SSR check
  if (socket) return socket;
  
  const { io } = await import('socket.io-client');
  socket = io(URL || 'http://localhost:3000', { autoConnect: false });
  return socket;
}

export async function connectSocket() {
  const s = await initSocket();
  if (s && !s.connected) s.connect();
  return s;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}

export function getSocket() {
  return socket;
}
