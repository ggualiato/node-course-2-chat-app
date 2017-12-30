class Rooms {
  constructor () {
    this.rooms = []
  }

  addRoom (roomName) {
    if (this.isUniqueRoom(roomName)) {
      this.rooms.push(roomName)
    }
  }
  removeRoom (roomName) {
    var room = this.getRoom(roomName)

    if (room) {
      this.rooms = this.rooms.filter((room) => room !== roomName)
    }

    return room
  }
  getRoom (roomName) {
    return this.rooms.filter((room) => room === roomName)
  }
  getRoomList () {
    return {
      rooms: this.rooms
    }
  }
  isUniqueRoom (roomName) {
    var allRooms = this.getRoomList()
    var filterRooms = allRooms.rooms.filter((room) => room.toLowerCase() === roomName.toLowerCase())

    return filterRooms.length === 0
  }
}

module.exports = {Rooms}
