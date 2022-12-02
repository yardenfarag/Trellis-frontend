
import { storageService } from './async-storage.service.js'
// import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'board'

export const boardService = {
    query,
    getById,
    save,
    remove,
    getEmptyBoard,
    getEmptyChecklist,
    getEmptyTodo,
}
// window.cs = boardService // (just for test)

async function query() {
    var boards = await storageService.query(STORAGE_KEY)
    return boards
}

function getById(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
}

async function remove(boardId) {
    await storageService.remove(STORAGE_KEY, boardId)
}

async function save(board) {
    var savedBoard
    if (board._id) {
        savedBoard = await storageService.put(STORAGE_KEY, board)
    } else {
        // Later, owner is set by the backend
        board.createdBy = userService.getLoggedinUser()
        savedBoard = await storageService.post(STORAGE_KEY, board)
    }
    return savedBoard
}

function getEmptyBoard() {
    return {
        title: '',
        isStarred: false,
        style: {},
        groups: [],
        activities: [],
        members: [],
        labels: _getLabels()
    }
}

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

function _getLabels() {
    return [
        {
            id: 'l101',
            title: '',
            color: '#0079bf'
        },
        {
            id: 'l102',
            title: '',
            color: '#70b500'
        },
        {
            id: 'l103',
            title: '',
            color: '#ff9f1a'
        },
        {
            id: 'l104',
            title: '',
            color: '#eb5a46'
        },
        {
            id: 'l105',
            title: '',
            color: '#f2d600'
        },
        {
            id: 'l106',
            title: '',
            color: '#c377e0'
        },
        {
            id: 'l107',
            title: '',
            color: '#ff78cb'
        },
        {
            id: 'l108',
            title: '',
            color: '#00c2e0'
        },
    ]
}


// TEST DATA
// ; (async () => {
//     await storageService.post(STORAGE_KEY, {
//         title: 'Omer board',
//         isStarred: false,
//         memberIds: ["jC1op", "Csv8i", "Nlviw"],
//         style: {},
//         groups: [{
//             "id": "g101",
//             "title": "Group 1",
//             "tasks": [
//                 {
//                     "id": "c101",
//                     "title": "Replace logo",
//                     "labels":[],
//                     "attachments":[],
//                     "memberIds":["jC1op", "Csv8i"],
//                     "description": '',
//                     "comments":[],
//                     "checklists":[],
//                     "dueDate": '',
//                     "style": {},
//                 },
//                 {
//                     "id": "c102",
//                     "title": "Add Samples",
//                     "labels":[],
//                     "attachments":[],
//                     "memberIds":["Nlviw", "jC1op"],
//                     "description": '',
//                     "comments":[],
//                     "checklists":[],
//                     "dueDate": '',
//                     "style": {},
//                 }
//             ],
//             "style": {}
//         },
//         {
//             "id": "g102",
//             "title": "Group 2",
//             "tasks": [
//                 {
//                     "id": "c103",
//                     "title": "Do that",
//                     "labels":[],
//                     "attachments":[],
//                     "memberIds":["Nlviw", "jC1op"],
//                     "description": '',
//                     "comments":[],
//                     "checklists":[],
//                     "dueDate": '',
//                     "style": {},
//                 },
//                 {
//                     "id": "c104",
//                     "title": "Help me",
//                     "description": "description",
//                     "labels":[],
//                     "attachments":[],
//                     "dueDate": '',
//                     "comments": [
//                         {
//                             "id": "ZdPnm",
//                             "txt": "also @yaronb please CR this",
//                             "createdAt": 1590999817436,
//                             "byMember": {
//                                 "_id": "u101",
//                                 "fullname": "Tal Tarablus",
//                                 "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
//                             }
//                         }
//                     ],
//                     "checklists": [
//                         {
//                             "id": "YEhmF",
//                             "title": "Checklist",
//                             "todos": [
//                                 {
//                                     "id": "212jX",
//                                     "title": "To Do 1",
//                                     "isDone": false
//                                 }
//                             ]
//                         }
//                     ],
//                     "memberIds": ["jC1op", "Csv8i"],
//                     "labels": ["l101", "l102"],
//                     "dueDate": 16156215211,
//                     "byMember": {
//                         "_id": "u101",
//                         "username": "Tal",
//                         "fullname": "Tal Tarablus",
//                         "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
//                     },
//                     "style": {
//                         "bgColor": "#26de81"
//                     }
//                 }
//             ],
//             "style": {}
//         }]
//     })

// })()
