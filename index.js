var Emitter = require('events/')

module.exports = attach

function attach(element, listener) {
  var position = new Emitter

  position[0] = 0
  position[1] = 0
  position.prev = [0, 0]
  position.flush = flush

  if (typeof window === 'undefined') {
    return position
  }

  listener = listener || element || window
  element  = element  || document.body
  listener.addEventListener('mousemove', (
       element === document.body
    || element === window
  ) ? function(e) {
      position.prev[0] = position[0]
      position.prev[1] = position[1]
      position[0] = e.clientX
      position[1] = e.clientY
      position.emit('move', e)
    }
    : function(e) {
      position.prev[0] = position[0]
      position.prev[1] = position[1]
      var bounds = element.getBoundingClientRect()
      position[0] = e.clientX - bounds.left
      position[1] = e.clientY - bounds.top
      position.emit('move', e)
    }
  , false)

  return position

  function flush() {
    position.prev[0] = position[0]
    position.prev[1] = position[1]
  }
}
