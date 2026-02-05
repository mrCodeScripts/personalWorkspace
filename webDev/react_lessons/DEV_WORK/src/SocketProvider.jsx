import { useContext, createContext, useEffect, useState } from "react"
import {io} from 'socket.io-client'

const SocketContextProvider = createContext();

export function SocketProvider ({children}) {
    const [ioSock, newSocket] = useState(null);

    useEffect(() => {
        const ioSocket = io("http://localhost:3000");
        newSocket(ioSocket);

        return () => {ioSocket.disconnect()};
    }, []);

    return (
        <SocketContextProvider.Provider value={ioSock}>
            {children}
        </SocketContextProvider.Provider>
    )
}

export function useContextProvider () {
    return useContext(SocketContextProvider);
}
