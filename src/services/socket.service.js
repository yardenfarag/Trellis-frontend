import io from 'socket.io-client'
import { userService } from './user.service'

export const SOCKET_EVENT_SET_BOARD = 'board-set'
export const SOCKET_EVENT_CHANGE_BOARD = 'change-board'

const SOCKET_EMIT_LOGIN = 'set-user-socket'
const SOCKET_EMIT_LOGOUT = 'unset-user-socket'


const baseUrl = (process.env.NODE_ENV === 'production') ? '' : '//localhost:3030'
export const socketService = createSocketService()
socketService.setup()
function createSocketService() {
  var socket = null;
  const socketService = {
    async setup() {
      socket = io(baseUrl)
      setTimeout(() => {
        const user = userService.getLoggedinUser()
        if (user._id) this.login(user._id)
        else this.login('u103')
      }, 500)
    },
    on(eventName, cb) {
      socket.on(eventName, cb)
    },
    off(eventName, cb = null) {
      if (!socket) return;
      if (!cb) socket.removeAllListeners(eventName)
      else socket.off(eventName, cb)
    },
    emit(eventName, data) {
      data = JSON.parse(JSON.stringify(data))
      socket.emit(eventName, data)
    },
    login(userId) {
      socket.emit(SOCKET_EMIT_LOGIN, userId)
    },
    logout() {
      socket.emit(SOCKET_EMIT_LOGOUT)
    },
    terminate() {
      socket = null
    }
  }
  return socketService
}
