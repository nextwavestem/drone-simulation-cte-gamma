// ActionButton.jsx
import '../css/actionButton.css'; // Link to CSS for button styling 84d100
import PropTypes from 'prop-types';

const ActionButton = ({ onClick, title, green, small, medium, right, disableButton }) => {
  const buttonStyle = {
    backgroundColor: green ? '#28a745' : '#007bff', 
    width: small ? '100px' : medium ? '200px' : '100%',
    cursor: 'pointer',
    marginLeft: right ? 'auto' : '0', // Use margin-left to push the button to the right
    disable: disableButton,
    marginBottom: '10px'
  };

  return (
    <button className="action-button" onClick={onClick} style={buttonStyle}> { title }</button>
  );
};

ActionButton.propTypes = {
    onClick: PropTypes.func,
    title: PropTypes.string,
    green: PropTypes.bool,
    small: PropTypes.bool,
    right: PropTypes.bool,
    medium: PropTypes.bool,
    disableButton: PropTypes.bool
};

export default ActionButton;
