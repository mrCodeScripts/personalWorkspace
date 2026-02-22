'use client';

import React, { useEffect, useState } from 'react';
import { connectSocket, disconnectSocket } from '../lib/socket';

export default function SocketTest() {
  const [messages, setMessages] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      const s = await connectSocket();
      if (!s || !isMounted) return;

      const handleConnect = () => {
        if (isMounted) {
          setIsConnected(true);
          setMessages((m) => [...m, `connected: ${s.id}`]);
        }
      };

      const handlePong = () => {
        if (isMounted) setMessages((m) => [...m, 'pong received']);
      };

      const handleEcho = (msg: string) => {
        if (isMounted) setMessages((m) => [...m, `echo: ${msg}`]);
      };

      s.on('connect', handleConnect);
      s.on('pong', handlePong);
      s.on('echo', handleEcho);

      return () => {
        s.off('connect', handleConnect);
        s.off('pong', handlePong);
        s.off('echo', handleEcho);
      };
    })();

    return () => {
      isMounted = false;
      disconnectSocket();
    };
  }, []);

  async function sendPing() {
    const s = await connectSocket();
    if (s) s.emit('ping');
  }

  async function sendEcho() {
    const s = await connectSocket();
    if (s) s.emit('echo', 'hello from client');
  }

  return (
    <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3>Socket.IO Test</h3>
      <p>Status: {isConnected ? '✓ Connected' : '✗ Disconnected'}</p>
      <button onClick={sendPing} style={{ marginRight: '0.5rem' }}>
        Send ping
      </button>
      <button onClick={sendEcho}>Send echo</button>
      <ul style={{ marginTop: '1rem', maxHeight: '200px', overflow: 'auto' }}>
        {messages.map((m, i) => (
          <li key={i} style={{ fontSize: '0.875rem' }}>
            {m}
          </li>
        ))}
      </ul>
    </div>
  );
}
