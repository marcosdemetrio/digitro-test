import { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const newSocket = io('http://dev.digitro.com', {
      reconnectionDelayMax: 10000,
      path: '/callcontrol',
    });

    setSocket(newSocket);

    newSocket.on('NEW_CALL', (chat) => {
      setChats((prevChats) => [...prevChats, chat]);
    });

    newSocket.on('CALL_ENDED', (callId) => {
      setChats((prevChats) =>
        prevChats.filter((chat) => chat.callId !== callId)
      );
    });

    newSocket.on('USER_CONNECTED', (userData) => {
      setUser(userData);
      setError(null);
    });

    newSocket.on('USER_CONNECTION_ERROR', (errorData) => {
      setError(`Erro ao conectar: ${errorData.error}`);
    });

    newSocket.on('USER_DISCONNECTED', (userData) => {
      setUser(null);
      setChats([]);
      setError(null);
    });

    newSocket.on('USER_DISCONNECTION_ERROR', (errorData) => {
      setError(`Erro ao desconectar: ${errorData.error}`);
    });

    return () => newSocket.close();
  }, []);

  const connectUser = (username, maxCalls) => {
    setUser({ username, maxCalls });
    socket.emit('USER_CONNECT', { username, maxCalls });
  };

  const disconnectUser = () => {
    if (user) {
      socket.emit('USER_DISCONNECT', { username: user.username });
    }
    setUser(null);
    setChats([]);
  };

  const endCall = (callId) => {
    socket.emit('END_CALL', { callId });
    setChats((prevChats) => prevChats.filter((chat) => chat.callId !== callId));
  };

  return (
    <SocketContext.Provider
      value={{ socket, user, chats, connectUser, disconnectUser, endCall, error }}
    >
      {children}
    </SocketContext.Provider>
  );
};
