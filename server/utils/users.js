[{
  id: 'asd',
  name: 'Giovanni',
  room: 'Room Test'
}]

class Users {
  constructor() {
    this.users = []
  }
  addUser (id, name, room) {
    var user = {id, name, room}

    this.users.push(user)

    return user
  }
  removeUser (id) {
    var user = this.getUser(id)

    if (user) {
      this.users = this.users.filter((user) => user.id !== id)
    }

    return user
  }
  getUser (id) {
    return this.users.filter((user) => user.id === id )[0]
  }
  getUserList (room) {
    var users = this.users.filter((user) => user.room === room)
    var namesArray = users.map((user) => user.name)

    return namesArray;
  }
  isUniqueNameInRoom (newUser) {
    var usersInRoom = this.users.filter((user) => {
      if (user.room === newUser.room) {
        return user.name.toLowerCase() === newUser.name.toLowerCase()
      }
    })

    return usersInRoom.length === 0
  }
}

module.exports = {Users}
