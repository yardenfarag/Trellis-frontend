
import { utilService } from './util.service'
import { boardService } from './board.service'
import { userService } from './user.service'
import axios from 'axios'
import { httpService } from './http.service'

axios.defaults.withCredentials = true

const STORAGE_KEY = 'board'

export const localService = {
    getEmptyBoard,
    addGroup,
    editGroup,
    removeGroup,
    addTask,
    getTaskById,
    updateTask,
    removeTask,
    getEmptyTodo,
    getEmptyChecklist,
}

// task related functions

async function addTask(boardId, groupId, title) {
    try {
        var board = await boardService.getById(boardId)
        const groupIdx = board.groups.findIndex((group) => group.id === groupId)
        const newTask = _getEmptyTask(title)
        board.groups[groupIdx].tasks.push(newTask)
        let activityTxt = `added ${title} to ${board.groups[groupIdx].title}`
        return await boardService.save(board, activityTxt, newTask)
    } catch (err) {
        throw err
    }
}

async function updateTask(boardId, groupId, updatedTask, activityTxt) {
    try {
        const board = await boardService.getById(boardId)
        const groupIdx = board.groups.findIndex((group) => group.id === groupId)
        const idxTask = board.groups[groupIdx].tasks.findIndex((task) => task.id === updatedTask.id)
        board.groups[groupIdx].tasks.splice(idxTask, 1, updatedTask)
        return await boardService.save(board, activityTxt, updatedTask)
    } catch (err) {
        throw err
    }
}

async function removeTask(boardId, groupId, taskId, activityTxt) {
    try {
        var board = await boardService.getById(boardId)
        const groupIdx = board.groups.findIndex((group) => group.id === groupId)
        const taskIdx = board.groups[groupIdx].tasks.findIndex((task) => task.id === taskId)
        board.groups[groupIdx].tasks.splice(taskIdx, 1)[0]
        return await boardService.save(board, activityTxt, null)
    } catch (err) {
        throw err
    }
}

async function getTaskById(boardId, taskId) {
    try {
        var board = await boardService.getById(boardId)
        var taskData = null
        board.groups.forEach((group) => {
            group.tasks.forEach((task) => {
                if (task.id === taskId) taskData = { groupId: group.id, task }
            })
        })
        return taskData
    } catch (err) {
        throw err
    }
}

// group related functions

async function addGroup(boardId, title) {
    try {
        var board = await boardService.getById(boardId)
        board.groups.push(_getEmptyGroup(title))
        let txt = `added ${title} to this board`
        return await boardService.save(board, txt, null)
    } catch (err) {
        throw err
    }
}

async function editGroup(boardId, groupToEdit) {
    try {
        var board = await boardService.getById(boardId)
        const idx = board.groups.findIndex((group) => group.id === groupToEdit.id)
        board.groups[idx] = groupToEdit
        return await boardService.save(board)
    } catch (err) {
        throw err
    }
}
async function removeGroup(boardId, groupId) {
    try {
        var board = await boardService.getById(boardId)
        const idx = board.groups.findIndex((group) => group.id === groupId)
        board.groups.splice(idx, 1)[0]
        return await boardService.save(board)
    } catch (err) {
        throw err
    }
}

// get empty stuff

function getEmptyChecklist() {
    return {
        id: utilService.makeId(),
        title: '',
        todos: []
    }
}

function getEmptyTodo() {
    return {
        id: utilService.makeId(),
        title: '',
        isDone: false
    }
}

function _getEmptyGroup(title) {
    return {
      id: utilService.makeId(),
      title,
      tasks: [],
    }
  }

  function _getEmptyTask(title) {
    return {
      id: utilService.makeId(),
      title,
      description: '',
      dueDate: null,
      createdAt: Date.now(),
      attachments: [],
      checklists: [],
      comments: [],
      memberIds: [],
      labels: [],
      createdBy: userService.getLoggedinUser(),
      stickers: [],
      style: {},
    }
  }

function getEmptyBoard() {
    return {
        title: '',
        recentlyViewed: Date.now(),
        isStarred: false,
        createdBy: userService.getLoggedinUser() || {}, //add logged in user
        style: {
            bgImUrl: '',
            bgColor: '',
            bgHeader: ''
        },
        labels: _getLabels(),
        memberIds: [userService.getLoggedinUser()._id],
        groups: [_getEmptyGroup('Todo'), _getEmptyGroup('Doing'), _getEmptyGroup('Done')],
        activities: [],
    }
}

function _getLabels() {
    return [
        {
            id: 'l101',
            title: '',
            color: '#7bc86c'
        },
        {
            id: 'l102',
            title: '',
            color: '#f5dd29'
        },
        {
            id: 'l103',
            title: '',
            color: '#ffaf3f'
        },
        {
            id: 'l104',
            title: '',
            color: '#ef7564'
        },
        {
            id: 'l105',
            title: '',
            color: '#cd8de5'
        },
        {
            id: 'l106',
            title: '',
            color: '#5ba4cf'
        },

    ]
}