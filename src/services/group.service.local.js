import { boardService } from './board.service.local' // change
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
        return board.groups.find(group => group._id === groupId) // change
    }
    catch {
        throw err
    }
}

async function remove(boardId, groupId) {
    try {
        const board = await boardService.getById(boardId)
        const groupIdx = board.groups.findInedx(group => group._id === groupId)
        board.groups.splice(groupIdx, 1)
        return await boardService.save(board)
    }
    catch {
        throw err
    }
}

async function save(boardId, groupToEdit) { // change
    try {
        const board = await boardService.getById(boardId)
        if (groupToEdit._id) {
            const groupIdx = board.groups.findInedx(group => group._id === groupToEdit._id)
            board.groups.splice(groupIdx, 1, groupToEdit)
        } else {
            groupToEdit._id = utilService.makeId()
            board.groups.push(groupToEdit)
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
