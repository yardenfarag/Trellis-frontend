
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

async function save(board) {
    if (board._id) {
        return await httpService.put(`board/${board._id}`, board)
    } else {
        return await httpService.post('board', board)
    }
}
