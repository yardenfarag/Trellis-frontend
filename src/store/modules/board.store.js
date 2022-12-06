import { localService } from '../../services/board.service.local'
import { boardService } from '../../services/board.service'
import { socketService, SOCKET_EVENT_CHANGE_BOARD } from '../../services/socket.service'
import { utilService } from '../../services/util.service'


export const boardStore = {
    state: {
        boards: [],
        currBoard: null,
    },
    getters: {
        boards({ boards }) { return boards },
        board({ currBoard }) { return currBoard },
    },
    mutations: {
        setBoards(state, { boards }) {
            state.boards = boards
        },
        setCurrBoard(state, { board }) {
            state.currBoard = board
        },
        removeBoard(state, { boardId }) {
            const idx = state.boards.findIndex((board) => board._id === boardId)
            state.boards.splice(idx, 1)
        },
        saveBoard(state, { board }) {
            const idx = state.boards.findIndex((b) => b._id === board._id)
            if (idx !== -1) {
                if (state.currBoard && board._id === state.currBoard._id) state.currBoard = board
                state.boards.splice(idx, 1, board)
            } else {
                state.boards.push(board)
                state.currBoard = board
            }
        },
        addGroup(state, { emptyGroup }) {
            state.currBoard.groups.push(emptyGroup)
        },
        addActivity(state, { activity }) {
            state.currBoard.activities.unshift(activity)
        },
    },
    actions: {
        async loadBoards({ commit }) {
            try {
                var boards = await boardService.query()
                commit({ type: 'setBoards', boards })
                // socketService.off(SOCKET_EVENT_CHANGE_BOARD)
                // socketService.on(SOCKET_EVENT_CHANGE_BOARD, (board) => {
                //     commit({ type: 'saveBoard', board })
                // })
            } catch (err) {
                console.error('There was a problem loading these boards, please try again later.', err)
                throw err
            }
        },
        async setCurrBoard({ commit }, { boardId }) {
            try {
                const board = await boardService.getById(boardId)
                commit({ type: 'setCurrBoard', board })
                return board
            } catch (err) {
                console.log('There was a problem finding that board, please try again later.', err)
                throw err
            }
        },
        async removeBoard({ commit }, { boardId }) {
            try {
              var boardId = await boardService.remove(boardId)
              commit({ type: 'removeBoard', boardId })
            } catch (err) {
              console.error('There was a problem removing that board, please try again later.', err)
              throw err
            }
          },
          async saveBoard({ commit }, { board }) {
            try {
              commit({ type: 'saveBoard', board })
              var board = await boardService.save(board)
              
              return board
            } catch (err) {
              console.error('There was a problem saving that board, please try again later.', err)
              throw err
            }
          },
          async addGroup({ commit, state }, { title }) {
            try {
              const board = await localService.addGroup(state.currBoard._id, title)
              console.log('store addGroup board', board)
              commit({ type: 'saveBoard', board })
            } catch (err) {
              console.log('There was a problem adding that group, please try again later.', err)
              throw err
            }
          },
          async addTask({ commit, state }, { groupId, title }) {
            try {
              const board = await localService.addTask(state.currBoard._id, groupId, title)
              commit({ type: 'saveBoard', board })
            } catch (err) {
              console.log('There was a problem adding that task, please try again later.', err)
              throw err
            }
          },
          async removeGroup({ commit, state }, { groupId }) {
            try {
              const board = await localService.removeGroup(state.currBoard._id, groupId)
              commit({ type: 'saveBoard', board })
            } catch (err) {
              console.log('There was a problem removing that group, please try again later.', err)
              throw err
            }
          },
          async removeTask({ commit, state }, { groupId, taskId }) {
            try {
              const board = await localService.removeTask(state.currBoard._id, groupId, taskId)
              commit({ type: 'saveBoard', board })
            } catch (err) {
              console.log('There was a problem removing that task, please try again later.', err)
              throw err
            }
          },
          async updateTask({ commit, state }, { groupId, task }) {
            try {
              const board = await localService.updateTask(state.currBoard._id, groupId, task)
              commit({ type: 'saveBoard', board })
            } catch (err) {
              console.log('There was a problem updating that task, please try again later.', err)
              throw err
            }
          },
          async getTaskById({ commit }, { boardId, taskId }) {
            try {
              const task = await localService.getTaskById(boardId, taskId)
              return task
            } catch (err) {
              console.log('There was a problem getting that task, please try again later.', err)
              throw err
            }
          },
          async addActivity({ commit, getters, dispatch }, { txt, task }) {
            const clearAct = getters.currBoard.activities.length > 100
            const activity = {
              id: utilService.makeId(),
              txt: txt,
              createdAt: Date.now(),
              byMember: {
                _id: getters.loggedinUser?._id || null,
                fullname: getters.loggedinUser?.fullname || 'Guest',
                imgUrl: getters.loggedinUser?.imgUrl || '',
              },
              task: {
                id: task.id,
                title: task.title,
              },
            }
            commit({ type: 'addActivity', activity})
            await dispatch({ type: 'saveBoard', board: getters.currBoard })
          },
    }
}