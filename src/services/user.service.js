import { httpService } from './http.service'
import { socketService } from './socket.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
}


async function getUsers() {
    return await httpService.get('user')
}

async function getById(userId) {
    const user = await storageService.get('user', userId)
    // const user = await httpService.get(`user/${userId}`)

    // socketService.emit(SOCKET_EMIT_USER_WATCH, userId)
    // socketService.off(SOCKET_EVENT_USER_UPDATED, onUserUpdate)
    // socketService.on(SOCKET_EVENT_USER_UPDATED, onUserUpdate)

    return user
}
function remove(userId) {
    return storageService.remove('user', userId)
    // return httpService.delete(`user/${userId}`)
}

// async function update(user) {
//     await storageService.put('user', user)
//     // user = await httpService.put(`user/${user._id}`, user)
//     // Handle case in which admin updates other user's details
//     if (getLoggedinUser()._id === user._id) saveLocalUser(user)
//     return user
// }

async function login(userCred) {
    const user = await httpService.post('auth/login', userCred)
    if (user) {
        socketService.login(user._id)
        return saveLocalUser(user)
    }
}

async function signup(userCred) {
    const user = await httpService.post('auth/signup', userCred)
    socketService.login(user._id)
    return saveLocalUser(user)
}
async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    socketService.logout()
    return await httpService.post('auth/logout')
}

function saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    // const user = await httpService.get('auth/loggedinUser')
    // saveLocalUser(user)
    const loggedinUser = JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
    if (loggedinUser) return loggedinUser
    else return { fullname: 'Guest', imgUrl: 'https://api-private.atlassian.com/users/b7723e87cdacea8bf9bf6b36952f6a06/avatar' }
}


// ; (async () => {
//     await userService.signup({ fullname: "Herman Cianciulli", imgUrl: "https://xsgames.co/randomusers/assets/avatars/male/53.jpg", password: "123", username: "herm" })
//     await userService.signup({ fullname: "Mack Schlax", imgUrl: "https://xsgames.co/randomusers/assets/avatars/male/75.jpg", password: "123", username: "mac" })
//     await userService.signup({ fullname: "Evangelina Najam", imgUrl: "https://xsgames.co/randomusers/assets/avatars/female/10.jpg", password: "123", username: "eva" })
//     await userService.signup({ fullname: "Leana Gauwitz", imgUrl: "https://xsgames.co/randomusers/assets/avatars/female/57.jpg", password: "123", username: "lea" })
//     await userService.signup({ fullname: "Mariana Hamara", imgUrl: "https://xsgames.co/randomusers/assets/avatars/female/55.jpg", password: "123", username: "mar" })
//     await userService.signup({ fullname: "Rashad Poiroux", imgUrl: "https://xsgames.co/randomusers/assets/avatars/male/61.jpg", password: "123", username: "ras" })
//     await userService.signup({ fullname: "Anton Madary", imgUrl: "https://xsgames.co/randomusers/assets/avatars/male/26.jpg", password: "123", username: "ant" })
//     await userService.signup({ fullname: "Mallie Walker", imgUrl: "https://xsgames.co/randomusers/assets/avatars/female/19.jpg", password: "123", username: "mal" })
//     await userService.signup({ fullname: "Yarden", imgUrl: "https://api-private.atlassian.com/users/b7723e87cdacea8bf9bf6b36952f6a06/avatar", password: "123", username: "herm" })

// })()




