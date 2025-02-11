import { createContext,useState,useEffect,useContext } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        //connect to the server
        const newSocket = io(import.meta.env.VITE_SERVER_URL || "${import.meta.env.VITE_SERVER_URL}",{
            withCredentials: true,
            transports: ["websocket", "polling"],
        });
        setSocket(newSocket);
        return () => {
            newSocket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}

export const useSocket = () => {
    return useContext(SocketContext);
}
