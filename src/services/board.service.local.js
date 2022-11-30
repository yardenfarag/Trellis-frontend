
import { storageService } from './async-storage.service.js'
// import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'board'

export const boardService = {
    query,
    getById,
    save,
    remove,
    getEmptyBoard,
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
    }
}


// TEST DATA
// ; (async () => {
//     await storageService.post(STORAGE_KEY, {
//         title: 'Omer board',
//         isStarred: false,
//         style: {},
//         groups: [{
//             "id": "g101",
//             "title": "Group 1",
//             "archivedAt": 1589983468418,
//             "tasks": [
//                 {
//                     "id": "c101",
//                     "title": "Replace logo"
//                 },
//                 {
//                     "id": "c102",
//                     "title": "Add Samples"
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
//                     "archivedAt": 1589983468418,
//                 },
//                 {
//                     "id": "c104",
//                     "title": "Help me",
//                     "status": "in-progress",
//                     "priority": "high",
//                     "description": "description",
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
//                     "memberIds": ["u101"],
//                     "labelIds": ["l101", "l102"],
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

// //     // await storageService.post(STORAGE_KEY, { title: 'Subali Rahok 2', price: 240 })
// })()
