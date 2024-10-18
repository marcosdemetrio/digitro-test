import { useSocket } from '../contexts/SocketContext';
import Button from './Button';

const ChatDetails = ({ chat, onSelectChat }) => {
  const { endCall } = useSocket();

  if (!chat) return <div />;

  const handleEndCall = () => {
    endCall(chat.callId);
    onSelectChat(null);
  };

  return (
    <div style={styles.container}>
      <div style={styles.contentContainer}>
        <h3 style={styles.title}>Chamada selecionada</h3>
        <p style={styles.text}>
          <strong>CallId:</strong> {chat.callId}
        </p>
        <p style={styles.text}>
          <strong>Mídia:</strong> {chat.media}
        </p>
        <p style={styles.text}>
          <strong>Data inicial:</strong>{' '}
          {new Date(chat.startDate).toLocaleString()}
        </p>
        <p style={styles.text}>
          <strong>Serviço:</strong> {chat.service}
        </p>
        <p style={styles.text}>
          <strong>Origem:</strong> {chat.caller}
        </p>
        <div style={styles.buttonContainer}>
          <Button text="Finalizar" color="red" onClick={handleEndCall} />
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    margin: '40px 10px',
  },
  contentContainer: {
    minWidth: '30vw',
    backgroundColor: '#f7f7fa',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '5px',
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
    paddingBottom: '15px',
    color: '#333',
  },
  text: {
    fontSize: '14px',
    color: '#555',
    marginBottom: '8px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
};

export default ChatDetails;
