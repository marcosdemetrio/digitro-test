const InputText = ({ placeholder, value, onChange, type = 'text' }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value || ''}
    onChange={onChange}
    required
    style={inputStyle}
  />
);

const inputStyle = {
  padding: '8px',
  margin: '8px 0',
  width: '100%',
  boxSizing: 'border-box',
};

export default InputText;
