var socket = io()

socket.on('connect', function () {
  console.log('Connected to server')
})

socket.on('disconnect', function () {
  console.log('Disconnected from server')
})

socket.on('newEmail', function (email) {
  console.log('New email', email)
})

socket.on('newMessage', function (message) {
  console.log('New message', message)
})

socket.on('welcomeEmit', function (message) {
  console.log('Welcome', message)
})

// socket.emit('createMessage', {from: 'GIOVANNI', text: 'OI TUDO BEM COMO VAI'})
