const expect = require('expect')

var {generateMessage} = require('./message')

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    var from = 'Gio'
    var text = 'Some message'
    var message = generateMessage(from, text)

    expect(message.createAt).toBeA('number')
    expect(message).toInclude({ from, text })
  })
})
