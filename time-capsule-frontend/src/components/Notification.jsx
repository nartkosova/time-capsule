import PropTypes from 'prop-types'
import './notification.css'
const Notification = ({ message, isError }) => {
  if (message === null) {
    return null
  }

  const notificationStyle = {
    padding: '1rem',
    marginBottom: '1rem',
    marginTop: '1rem',
    backgroundColor: isError ? '#ffcccc' : '#ccffcc',
    color: isError ? '#272727' : '#272727',
    border: `2px solid ${isError ? '#ff0000' : '#00cc00'}`,
    transition: 'all 0.3s ease-in-out',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
    marginLeft: '2rem',
    marginRight: '2rem',
    top: '7rem',
    position: 'sticky',
    zIndex: '100',
    animation: 'slideIn 0.5s ease-in-out',
  }

  return (
    <div className="notification-container">
      <div style={notificationStyle}>
        <p>{message}</p>
      </div>
    </div>
  )
}
Notification.propTypes = {
  message: PropTypes.string,
  isError: PropTypes.bool,
}

export default Notification
