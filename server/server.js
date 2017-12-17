const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000
var app = express()
var server = http.createServer(app)
var io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log('New user connected')

  socket.emit('newMessage', {
    from: 'giovanni@example.com',
    text: 'Hey, whats your name',
    createAt: 20
  })

  socket.on('createMessage', (message) => {
    console.log('Message', message)
  })

  socket.on('disconnect', (data) => {
    console.log('User was disconnected')
  })
})

server.listen(port, () => {
  console.log(`The server is up on port ${port}`)
})
