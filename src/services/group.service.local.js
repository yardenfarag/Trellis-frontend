import { boardService } from './group.service.local'
import { utilService } from './util.service.js'

export const groupService = {
    getById,
    save,
    remove,
    getEmptyGroup,
}

async function getById(boardId, groupId) {
    try {
        const board = await boardService.getById(boardId)
        return await board.groups.find(group => group._id === groupId) 
    }
    catch {
        throw err
    }
}

async function remove(boardId, groupId) {
    try {
        const board = await boardService.getById(boardId)
        const groupIdx = board.groups.findInedx(group => group.id === groupId)
        board.groups.splice(groupIdx, 1)
        return await boardService.save(board)
    }
    catch {
        throw err
    }
}

async function save(boardId, group) {
    try {
        const board = await boardService.getById(boardId)
        if (group.id) {
            const groupIdx = board.groups.findInedx(group => group.id === group.id)
            board.groups.splice(groupIdx, 1, group)
        } else {
            group.id = utilService.makeId()
            board.groups.push(group)
        }
        return await boardService.save(board)
    }
    catch {
        throw err
    }
}

function getEmptyGroup() {
    return {
        title: '',
        style: {},
        tasks: [],
    }
}
