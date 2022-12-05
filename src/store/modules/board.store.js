import { boardService } from '../../services/board.service.local.js'
import { groupService } from '../../services/group.service.local.js'
import { taskService } from '../../services/task.service.local.js'
import { utilService } from '../../services/util.service.js'

export function getActionRemoveBoard(boardId) {
    return {
        type: 'removeBoard',
        boardId
    }
}
export function getActionAddBoard(board) {
    return {
        type: 'addBoard',
        board
    }
}
export function getActionUpdateBoard(board) {
    return {
        type: 'updateBoard',
        board,
    }
}

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
            console.log('board set')
        },
        addBoard(state, { board }) {
            state.boards.push(board)
        },
        // updateBoard(state, { updatedBoard }) {
        //     const idx = state.boards.findIndex(b => b.id === updatedBoard._id)
        //     state.boards.splice(idx, 1, updatedBoard)
        // },
        removeBoard(state, { boardId }) {
            const boards = state.boards
            const boardIdx = boards.findIndex(board => board._id === boardId)
            boards.splice(boardIdx, 1)
            state.boards = boards
        },
    },
    actions: {
        async clearCurrBoard(context) {
            await context.commit({ type: 'setCurrBoard', board: null })
        },
        async setCurrBoard({ commit }, { boardId }) {
            console.log(boardId);
            try {
                const board = await boardService.getById(boardId)
                await commit({ type: 'setCurrBoard', board })
            } catch (err) {
                console.log(err);
            }
        },
        // async updateBoard(context, { updatedBoard }) {
        //     try {
        //         console.log(updatedBoard)

        //         var board = await boardService.save(updatedBoard)
        //         context.commit({ type: 'updateBoard', updatedBoard })
        //         return board
        //     } catch (err) {
        //         console.log('boardStore: Error in updateBoard', err)
        //         throw err
        //     }
        // },
        async loadBoards(context) {
            try {
                const boards = await boardService.query()
                context.commit({ type: 'setBoards', boards })
            } catch (err) {
                console.log('boardStore: Error in loadBoards', err)
                throw err
            }
        },
        async removeBoard(context, { boardId }) {
            try {
                await boardService.remove(boardId)
                context.commit(getActionRemoveBoard(boardId))
            } catch (err) {
                console.log('boardStore: Error in removeBoard', err)
                throw err
            }
        },
        async saveTask(context, { boardId, groupId, taskToSave }) {
            try {
                taskService.save(boardId, groupId, taskToSave)
                context.dispatch({ type: 'setCurrBoard', boardId })
            }
            catch (err) {
                console.log('there was a problem saving that task in the store')
                throw err
            }
        },
        async removeTask(context, { boardId, groupId, taskId }) {
            try {
                taskService.remove(boardId, groupId, taskId)
                context.dispatch({ type: 'setCurrBoard', boardId })
            }
            catch (err) {
                console.log('there was a problem removing that task in the store')
                throw err
            }
        },
        async saveGroup(context, { boardId, groupToEdit }) {
            console.log('group that got to the store',groupToEdit);
            try {
                groupService.save(boardId, groupToEdit)
                context.dispatch({ type: 'setCurrBoard', boardId })
            }
            catch (err) {
                console.log('there was a problem saving that group in the store')
                throw err
            }
        },
        async saveBoard(context, { board }) {
            try {
                const savedBoard = await boardService.save(board)
                console.log(savedBoard);
                await context.dispatch({ type: 'setCurrBoard', boardId: savedBoard._id })
            }
            catch (err) {
                console.log('there was a problem updating this board in the store')
                throw err
            }
        },
        async removeGroup(context, { boardId, groupId }) {
            try {
                await groupService.remove(boardId, groupId)
                context.dispatch({ type: 'setCurrBoard', boardId })
            }
            catch (err) {
                console.log('there was a promblen removing this group in the store')
                throw err
            }
        },
        async removeBoard(context, { boardId }) {
            try {
                await boardService.remove(boardId)
                context.commit({ type: 'removeBoard', boardId })
            }
            catch (err) {
                console.log('there was a problem removing this board in the store')
                throw err
            }
        }
    }
}