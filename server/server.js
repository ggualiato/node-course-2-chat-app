const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const {generateMessage, generateLocationMessage} = require('./utils/message')
const {isRealString} = require('./utils/validation')
const {Users} = require('./utils/users')
const {Rooms} = require('./utils/rooms')

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000
var app = express()
var server = http.createServer(app)
var io = socketIO(server)
var users = new Users()
var rooms = new Rooms()

app.use(express.static(publicPath))

io.on('connection', (socket) => {
  socket.on('loadIndex', () => {
    io.emit('updateRoomList', rooms.getRoomList())
  })

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required')
    }

    socket.join(params.room)

    if (!users.isUniqueNameInRoom(params)) {
      return callback('This name is already in use')
    }

    users.removeUser(socket.id)
    users.addUser(socket.id, params.name, params.room)

    rooms.addRoom(params.room)

    io.to(params.room).emit('updateUserList', users.getUserList(params.room))
    io.emit('updateRoomList', rooms.getRoomList())
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))

    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`))

    callback()
  })

  socket.on('createMessage', (message, callback) => {
    var user = users.getUser(socket.id)

    if (user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text))
    }

    callback()
  })

  socket.on('createLocationMessage', (coords) => {
    var user = users.getUser(socket.id)

    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude))
    }
  })

  socket.on('disconnect', (data) => {
    var user = users.removeUser(socket.id)

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room))
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`))

      if (users.getUserList(user.room).length === 0) {
        var room = rooms.removeRoom(user.room)

        if (room) {
          console.log('Lista: ', rooms.getRoomList())
          io.emit('updateRoomList', rooms.getRoomList())
        }
      }
    }
  })
})

server.listen(port, () => {
  console.log(`The server is up on port ${port}`)
})
