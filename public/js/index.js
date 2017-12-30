var socket = io()

$(document).ready(function () {
  socket.emit('loadIndex')
})

jQuery('#rooms-select').change(function () {
  // console.log('floioiasd')
  var selectedRoom = jQuery('#rooms-select option:selected').text()
  var selectedRoomIndex = jQuery('#rooms-select option:selected').index()
  console.log(selectedRoom)
  console.log('index: ', selectedRoomIndex)
  if (selectedRoomIndex !== 0) {
    jQuery('#room-input').val(selectedRoom)
  } else {
    jQuery('#room-input').val('')
  }
  // console.log(jQuery('#room-input').val())
  // jQuery('#room-input').val(selectedRoom)
})

socket.on('updateRoomList', function (rooms) {
  // console.log('Rooms List: ', rooms)

  var template = jQuery('#option-template').html()
  var html = Mustache.render(template, rooms)

  jQuery('#rooms-select').html(html)
})
