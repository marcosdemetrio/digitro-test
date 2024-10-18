import { useState } from 'react';
import { useSocket } from '../contexts/SocketContext';
import InputText from './InputText';
import Button from './Button';

const ConnectionForm = () => {
  const { connectUser } = useSocket();
  const [username, setUsername] = useState('');
  const [maxCalls, setMaxCalls] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (maxCalls < 1) return;
    connectUser(username, maxCalls);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <InputText
        placeholder="Usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <InputText
        type="number"
        placeholder="Máximo de chamadas"
        value={maxCalls}
        onChange={(e) => setMaxCalls(parseInt(e.target.value, 10))}
        min="1"
      />
      <Button text="Conectar" color="blue" style={styles.button} />
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '300px',
  },
};

export default ConnectionForm;
