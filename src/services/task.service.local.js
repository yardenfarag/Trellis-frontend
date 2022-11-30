import { boardService } from './board.service.local' // no need?
import { groupService } from './group.service.local'
import { userService } from './user.service'
import { utilService } from './util.service.js'

export const taskService = {
    getById,
    save,
    remove,
    getEmptyTask,
}

async function getById(boardId, groupId, taskId) {
    try {
        const group = await groupService.getById(boardId, groupId)
        return group.tasks.find(task => task.id === taskId) // change
    }
    catch {
        throw err
    }
}

async function remove(boardId, groupId, taskId) {
    try {
        const group = await groupService.getById(boardId, groupId)
        const taskIdx = group.tasks.findIndex(task => task.id === taskId)
        group.splice(taskIdx, 1)
        return await groupService.save(group)
    }
    catch {
        throw err
    }
}

async function save(boardId, groupId, task) {
    try {
        const group = await groupService.getById(boardId, groupId) // change
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
        byMember: userService.getLoggedinUser()
    }
}
