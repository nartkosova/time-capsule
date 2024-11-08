import PropTypes from "prop-types";

const Notification = ({ message, isError }) => {
  if (message === null) {
    return null;
  }

  const notificationStyle = {
    fontSize: '14px',
    padding: '10px 15px',
    marginBottom: '10px',
    borderRadius: '6px',
    backgroundColor: isError ? '#ffcccc' : '#ccffcc',
    color: isError ? '#ff0000' : '#00cc00',
    border: `1px solid ${isError ? '#ff0000' : '#00cc00'}`,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease-in-out',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  };

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  );
};
Notification.propTypes = {
  message: PropTypes.string,
  isError: PropTypes.bool
};

export default Notification;
