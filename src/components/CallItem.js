import Image from 'next/image';
import { useEffect, useState } from 'react';

const CallItem = ({ call, onSelect, isSelected }) => {
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDuration((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDuration = (duration) => {
    return new Date(duration * 1000).toISOString().slice(14, 19);
  };

  return (
    <div
      onClick={() => onSelect(call)}
      style={{
        ...styles.container,
        borderLeft: isSelected ? '8px solid red' : 'none',
      }}
    >
      <div style={styles.contentContainer}>
        <Image
          src="/images/chat.png"
          alt="chat"
          width={40}
          height={40}
          style={styles.image}
        />
        <div>
          <h4 style={styles.title}>{call.caller}</h4>
          <p style={styles.text}>{call.service}</p>
        </div>
      </div>
      <p style={styles.text}>{formatDuration(duration)}</p>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    marginBottom: '10px',
    cursor: 'pointer',
    border: '1px solid #ddd',
    borderRadius: '5px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  text: {
    fontSize: '14px',
    color: '#555',
    marginBottom: '4px',
  },
  image: {
    marginRight: '20px',
  },
};

export default CallItem;
