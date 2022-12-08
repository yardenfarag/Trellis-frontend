import {userService} from '../services/user.service.js'

export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    debounce,
    randomPastTime,
    saveToStorage,
    loadFromStorage,
    timeAgo,
    dueDateFormat,
    setActivity,
    dueDateShortFormat,
    makeAvatar,
    getEmptyBoard,
    getEmptyTask,
    getEmptyGroup,
    getEmptyTodo,
    getEmptyChecklist,

}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function dueDateFormat(dueDate) {
    let strDate = ''
    strDate += `${new Date(dueDate).toLocaleString('en-US', { day: 'numeric' })} `
    strDate += `${new Date(dueDate).toLocaleString('en-US', { month: 'short' })}`
    strDate += ' at '
    strDate += `${new Date(dueDate).toLocaleTimeString('en-US', { hour: "2-digit", minute: "2-digit" })}`
    return strDate
  }
function dueDateShortFormat(dueDate) {
    let strDate = ''
    strDate += `${new Date(dueDate).toLocaleString('en-US', { day: 'numeric' })} `
    strDate += `${new Date(dueDate).toLocaleString('en-US', { month: 'short' })}`
    return strDate
  }

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}


function randomPastTime() {
    const HOUR = 1000 * 60 * 60
    const DAY = 1000 * 60 * 60 * 24
    const WEEK = 1000 * 60 * 60 * 24 * 7

    const pastTime = getRandomIntInclusive(HOUR, WEEK)
    return Date.now() - pastTime
}

function debounce(func, timeout = 2000){
    let timer
    return (...args) => {
      clearTimeout(timer)
      timer = setTimeout(() => { func.apply(this, args) }, timeout)
    }
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

function timeAgo(input) {
    const date = input instanceof Date ? +input : new Date(+input)
    const formatter = new Intl.RelativeTimeFormat('en')
    const ranges = {
        years: 3600 * 24 * 365,
        months: 3600 * 24 * 30,
        weeks: 3600 * 24 * 7,
        days: 3600 * 24,
        hours: 3600,
        minutes: 60,
        seconds: 1,
    }
    const secondsElapsed = (date.getTime() - Date.now()) / 1000
    for (let key in ranges) {
        if (ranges[key] < Math.abs(secondsElapsed)) {
            const delta = secondsElapsed / ranges[key]
            let time = formatter.format(Math.round(delta), key)
            if (time.includes('in')) {
                time = time.replace('in ', '')
                time = time.replace('ago', '')
                time += ' ago'
            }
            return time
        }
    }
    return 'Just now'
}

function setActivity(txt, task) {
    const user = userService.getLoggedinUser()
    const miniTask = task ? {id: task.id || null, title: task.title} : null
    const activity = {
        id: makeId(),
        txt,
        createdAt: Date.now(),
        byMember: user,
        task: miniTask,
    }
    return activity
}

function makeAvatar(fullname) {
    fullname = fullname.split(' ')
    var short = (fullname.split(' ')[0].split('')[0] + fullname.split(' ')[1].split('')[0]).toUpperCases()
    return short.toUpperCases()
  }

  
function getEmptyChecklist() {
    return {
        id: makeId(),
        title: '',
        todos: []
    }
}

function getEmptyTodo() {
    return {
        id: makeId(),
        title: '',
        isDone: false
    }
}

function getEmptyGroup(title) {
    return {
      id: makeId(),
      title,
      tasks: [],
    }
  }

  function getEmptyTask(title) {
    return {
      id: makeId(),
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
        groups: [getEmptyGroup('Todo'), getEmptyGroup('Doing'), getEmptyGroup('Done')],
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
