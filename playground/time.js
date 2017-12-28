const moment = require('moment')
const path = require('path')
var {generateMessage, generateLocationMessage} = path.join(__dirname, '../server/utils/message')

console.log(path.join(__dirname, '../server/utils/message'));

// var date = moment()
// date.add(1, 'year').subtract(9, 'months')
// console.log(date.format('MMM Do YYYY'))
// var date = new Date()
// var month
//
// console.log(date.getMonth());

// var createdAt = 1234
// var date = moment(createdAt)
//
// console.log(date.format('h:mm a'));

var from = 'Gio'
var text = 'Some message'
var message = generateMessage(from, text)
//
// console.log(message.createAt);
