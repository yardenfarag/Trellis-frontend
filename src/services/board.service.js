import {socketService, SOCKET_EVENT_CHANGE_BOARD} from './socket.service'
import axios from 'axios'
import { httpService } from './http.service'

axios.defaults.withCredentials = true

export const boardService = {
    query,
    getById,
    save,
    remove,
}

async function query() {
    return await httpService.get('board')
}

async function getById(boardId) {
    return await httpService.get(`board/${boardId}`)
}

async function remove(boardId) {
    return await httpService.delete(`board/${boardId}`)
}

async function save(board, activityTxt, task) {
    if (board._id) {
        return await httpService.put(`board/${board._id}`, {board, activityTxt, task})
        // socketService.emit(SOCKET_EVENT_CHANGE_BOARD, board)
    } else {
        return await httpService.post('board', board)
    }
}
