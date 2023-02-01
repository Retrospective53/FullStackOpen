const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  const notificationStyle = {
    color: message[0] === 0 ? 'green' : 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return(
    <div className='messageNotif' style={notificationStyle}>
      {message[1]}
    </div>
  )
}

export default Notification