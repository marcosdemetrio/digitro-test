import Button from './Button';

const Header = ({ user, onDisconnect }) => {
  return (
    <header style={styles.header}>
      <p style={styles.headerTitle}>{user.username}</p>
      <Button text="Desconectar" color="red" onClick={onDisconnect} />
    </header>
  );
};

const styles = {
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#fff',
    borderBottom: '1px solid #ccc',
    zIndex: 1,
    height: '80px',
    backgroundColor: '#143253',
  },
  headerTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#FFF',
  },
};

export default Header;
