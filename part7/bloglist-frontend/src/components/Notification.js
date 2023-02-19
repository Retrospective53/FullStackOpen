const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  const notificationStyle = {
    // color: message[0] === 0 ? 'green' : 'red',
    // background: 'lightgrey',
    // fontSize: 20,
    // borderStyle: 'solid',
    // borderRadius: 5,
    // padding: 10,
    margin: 20,
    position: 'fixed',
    bottom: 0,
    right: 0,
    display: 'flex',
    minWidth: '30vw',
    // flexDirection: 'column',
    // justifyContent: 'flex-end',
    // alignItems: 'center',
    gap: '10px',
    zIndex: 1000
  }

  return(
    <div className={message[0] === 0 ? 'alert alert-success' : 'alert alert-danger'} style={notificationStyle}>
      {message[1]}
    </div>
  )
}

export default Notification