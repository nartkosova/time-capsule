import PropTypes from 'prop-types'

const Notification = ({ message, isError }) => {
  if (message === null) {
    return null
  }

  const notificationStyle = {
    padding: '15px',
    marginBottom: '1rem',
    marginTop: '1rem',
    backgroundColor: isError ? '#ffcccc' : '#ccffcc',
    color: isError ? '#272727' : '#272727',
    border: `2px solid ${isError ? '#ff0000' : '#00cc00'}`,
    transition: 'all 0.3s ease-in-out',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    top: '7rem',
    position: 'sticky',
    zIndex: '100',
  }

  return (
    <div style={notificationStyle}>
      <p>{message}</p>
    </div>
  )
}
Notification.propTypes = {
  message: PropTypes.string,
  isError: PropTypes.bool,
}

export default Notification
