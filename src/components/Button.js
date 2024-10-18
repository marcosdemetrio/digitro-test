const Button = ({ text, onClick, color = 'blue', style }) => (
  <button
    role="button"
    onClick={onClick}
    style={{ ...buttonStyle, ...style, backgroundColor: color }}
  >
    {text}
  </button>
);

const buttonStyle = {
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default Button;
