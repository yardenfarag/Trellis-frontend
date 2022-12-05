
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
    console.log(savedBoard);
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



// TEST DATA
; (async () => {
    await storageService.post(STORAGE_KEY, {
        title: 'Sprint 4',
        isStarred: true,
        activities: [],
        memberIds: [],
        labels: _getLabels(),
        style: { bgc: 'url(https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg)', headerClr: '#5D5A63' },
        groups: [
            {
                id: 'g101',
                title: 'Group 1',
                tasks: [
                    {
                        attachments: [],
                        checklists: [],
                        comments: [],
                        description: "Finish the frontend ASAP",
                        dueDate: "",
                        id: "c101",
                        labels: [],
                        memberIds: [],
                        title: "Finish frontend",
                    },
                    {
                        attachments: [],
                        checklists: [],
                        comments: [],
                        description: "Get data for product testing",
                        dueDate: "",
                        id: "c102",
                        labels: [],
                        memberIds: [],
                        title: "Get more data",
                    },
                    {
                        attachments: [],
                        checklists: [],
                        comments: [],
                        description: "move along, no description here",
                        dueDate: "",
                        id: "c103",
                        labels: [],
                        memberIds: [],
                        title: "Drag and drop",
                    }
                ]
            },
            {
                id: 'g102',
                title: 'Group 2',
                tasks: [
                    {
                        attachments: [],
                        checklists: [],
                        comments: [],
                        description: "Call me ASAP!",
                        dueDate: "",
                        id: "c104",
                        labels: [],
                        memberIds: [],
                        title: "Call me",
                    },
                    {
                        attachments: [],
                        checklists: [],
                        comments: [],
                        description: "get the right font and implement it on our trellis logo ASAP!",
                        dueDate: "16156215211",
                        id: "c105",
                        labels: ["l101", "l102"],
                        memberIds: [],
                        title: "find the trello logo font",
                    }
                ]
            },

        ]
    })
    await storageService.post(STORAGE_KEY, {
        title: 'Remote Team Hub',
        isStarred: false,
        activities: [],
        memberIds: [],
        createdBy: {
            fullname: 'Guest',
            imgUrl: 'https://api-private.atlassian.com/users/b7723e87cdacea8bf9bf6b36952f6a06/avatar'
        },
        labels: _getLabels(),
        style: { bgc: '#0079bf', headerClr: '#0079bf' },
        groups: [
            {
                id: 'wAMbUC',
                title: 'Team Info',
                tasks: [
                    {
                        attachments: [],
                        checklists: [],
                        comments: [],
                        description: "",
                        dueDate: "",
                        id: "c10234",
                        labels: [],
                        memberIds: [],
                        title: "Team Resources",
                    },
                    {
                        attachments: [],
                        checklists: [],
                        comments: [],
                        description: "",
                        dueDate: "",
                        id: "c1043",
                        labels: [],
                        memberIds: [],
                        title: "Working Hours",
                    },
                    {
                        attachments: [],
                        checklists: [],
                        comments: [],
                        description: "Link to your team's OKRs so that anyone at the company can see what you will be up to this quarter.",
                        dueDate: "",
                        id: "c10564",
                        labels: [],
                        memberIds: [],
                        title: "Team OKRs - Q3",
                    }
                ]
            },
            {
                id: 'g10sd2',
                title: 'Current Project',
                tasks: [
                    {
                        attachments: [],
                        checklists: [],
                        comments: [],
                        description: "Tip: Add a card for each project that the team is currently working on to provide a quick overview of what's in the pipeline.\n\nConsider including on each card:\n\nLink to the Trello board for that project\nLink to Confluence or Google Docs with specs for the project\nChat room where someone can ask questions/follow along\nThe person that is leading the project (add avatar to card)\nLaunch date (Add as due date to the card)\nAlso, whoever is in charge of the project should add weekly updates on any progress being made/work getting done so that everyone on the team can easily stay in the loop.",
                        dueDate: "",
                        id: "c1055",
                        labels: [],
                        memberIds: [],
                        title: "Current Project Template",
                    },
                    {
                        attachments: [],
                        checklists: [],
                        comments: [],
                        description: "Tip: Add a card for each project that the team is currently working on to provide a quick overview of what's in the pipeline.\n\nConsider including on each card:\n\nLink to the Trello board for that project\nLink to Confluence or Google Docs with specs for the project\nChat room where someone can ask questions/follow along\nThe person that is leading the project (add avatar to card)\nLaunch date (Add as due date to the card)\nAlso, whoever is in charge of the project should add weekly updates on any progress being made/work getting done so that everyone on the team can easily stay in the loop.",
                        dueDate: "16156215211",
                        id: "c1077",
                        labels: _getLabels(),
                        memberIds: [],
                        title: "Blog Redesign",
                    }
                ]
            },

        ]
    })
})
