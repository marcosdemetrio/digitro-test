'use client';

import { useState, useEffect } from 'react';
import { SocketProvider, useSocket } from '../contexts/SocketContext';
import ConnectionForm from '../components/ConnectionForm';
import ChatList from '../components/ChatList';
import ChatDetails from '../components/ChatDetails';
import Header from '../components/Header';

const ChatApp = () => {
  const { user, disconnectUser } = useSocket();
  const [activeChat, setActiveChat] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleDisconnectUser = () => {
    setActiveChat(null);
    disconnectUser();
  };
  
  const onSelectChat = (chat) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveChat(chat);
  };

  return (
    <div style={styles.pageContainer}>
      {user ? <Header user={user} onDisconnect={handleDisconnectUser} /> : null}

      <main
        style={{
          ...styles.mainContainer,
          ...(user ? {} : styles.centeredMainContainer),
        }}
      >
        {!user ? (
          <div style={styles.connectionSection}>
            <h1>Dígitro Chat</h1>
            <ConnectionForm />
          </div>
        ) : (
          isMobile ? (
            <div style={styles.chatContainerMobile}>
              <ChatDetails onSelectChat={onSelectChat} chat={activeChat} />
              <ChatList
                onSelectChat={onSelectChat}
                selectedChatId={activeChat?.callId}
              />
            </div>
          ) : (
            <div style={styles.chatContainerDesktop}>
              <ChatList
                onSelectChat={onSelectChat}
                selectedChatId={activeChat?.callId}
              />
              <ChatDetails onSelectChat={onSelectChat} chat={activeChat} />
            </div>
          )
        )}
      </main>
    </div>
  );
};

const styles = {
  pageContainer: {
    display: 'flex',
    minHeight: '100vh',
  },
  mainContainer: {
    display: 'flex',
    flexGrow: 1,
  },
  centeredMainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatContainerDesktop: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: '80px',
    width: '100%',
  },
  chatContainerMobile: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '80px',
    width: '100%',
  },
  connectionSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: '20vh',
  },
};

export default function MainPage() {
  return (
    <SocketProvider>
      <ChatApp />
    </SocketProvider>
  );
}
