const expect = require('expect');

const {Users} = require('./users')

describe('Users', () => {
  var users
  beforeEach(() => {
    users = new Users()
    users.users = [{
      id: '1',
      name: 'Giovanni',
      room: 'NodeJS Developers'
    }, {
      id: '2',
      name: 'Mike',
      room: 'React Developers'
    }, {
      id: '3',
      name: 'Julie',
      room: 'NodeJS Developers'
    }]
  })

  it('should add new user', () => {
    var users = new Users()
    var user = {
      id: '123',
      name: 'Giovanni',
      room: 'Node Developers'
    }

    var resUser = users.addUser(user.id, user.name, user.room)

    expect(users.users).toEqual([user])
  })

  it('should remove a user', () => {
    var userId = '1'
    var user = users.removeUser(userId)

    expect(user.id).toBe(userId)
    expect(users.users.length).toBe(2)
  })

  it('should not remove a user', () => {
    var userId = '198'
    var user = users.removeUser(userId)

    expect(user).toNotExist()
    expect(users.users.length).toBe(3)
  })

  it('should find user', () => {
    var userId = '2'
    var user = users.getUser(userId)

    expect(user.id).toBe(userId)

  })

  it('should not find user', () => {
    var userId = '99'
    var user = users.getUser(userId)

    expect(user).toNotExist()
  })

  it('should return names for NodeJS Developers', () => {
    var userList = users.getUserList('NodeJS Developers')

    expect(userList).toEqual(['Giovanni', 'Julie'])
  })

  it('should return names for React Developers', () => {
    var userList = users.getUserList('React Developers')

    expect(userList).toEqual(['Mike'])
  })
})
