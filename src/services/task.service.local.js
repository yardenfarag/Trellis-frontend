import { boardService } from './board.service.local'
import { groupService } from './group.service.local'
import { utilService } from './util.service.js'

export const taskService = {
    getById,
    save,
    remove,
    getEmptyTask,
}

async function getById(boardId, groupId, taskId) {
    try {
        const board = await boardService.getById(boardId)
        const group = await board.groups.find(group => group._id === groupId) 
        return task = group.tasks.find(task => task.id === taskId) 
    }
    catch {
        throw err
    }
}

async function remove(boardId, groupId, taskId) {
    try {
        const board = await boardService.getById(boardId)
        const group = board.groups.find(group => group.id === groupId)
        const taskIdx = group.tasks.findIndex(task => task.id === taskId)
        group.splice(taskIdx, 1)
        return await boardService.save(board)
    }
    catch {
        throw err
    }
}

async function save(boardId, groupId, task) {
    try {
        const board = await boardService.getById(boardId)
        const group = board.groups.find(group => group.id === groupId)
        if (task.id) {
            const taskIdx = group.tasks.findIndex(task => task.id === task.id)
            group.tasks.splice(taskIdx, 1, task)
        } else {
            task.id = utilService.makeId()
            group.tasks.push(task)
        }
        return await groupService.save(group)
    }
    catch {
        throw err
    }
}

function getEmptyTask() {
    return {
        title: '',
    }
}
