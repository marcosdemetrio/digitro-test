import { useSocket } from '../contexts/SocketContext';
import CallItem from './CallItem';

const ChatList = ({ onSelectChat, selectedChatId }) => {
  const { chats } = useSocket();

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Atendimentos</h2>
      <div style={styles.callList}>
        {chats.map((chat) => (
          <CallItem
            key={chat.callId}
            call={chat}
            onSelect={onSelectChat}
            isSelected={selectedChatId === chat.callId}
          />
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minWidth: '20vw',
    borderRight: '1px solid #ccc',
    padding: '10px',
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#143253',
    paddingBottom: '10px',
  },
};

export default ChatList;
