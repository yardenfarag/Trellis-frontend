import { boardService } from '../../services/board.service.local.js'

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
        board
    }
}

export const boardStore = {
    state: {
        boards: [],
        currBoard: null
    },
    getters: {
        boards({ boards }) { return boards },
        board({ currBoard }) { return currBoard }
    },

    mutations: {
        setBoards(state, { boards }) {
            state.boards = boards
        },
        setCurrBoard(state, { board }) {
            state.currBoard = board
        },
        addBoard(state, { board }) {
            state.boards.push(board)
        },
        // updateBoard(state, { updatedBoard }) {
        //     const idx = state.boards.findIndex(b => b.id === updatedBoard._id)
        //     state.boards.splice(idx, 1, updatedBoard)
        // },
        removeBoard(state, { boardId }) {
            state.boards = state.boards.filter(board => board._id !== boardId)
        },
    },
    actions: {
        async addBoard(context, { board }) {
            try {
                board = await boardService.save(board)
                context.commit(getActionAddBoard(board))
                return board
            } catch (err) {
                console.log('boardStore: Error in addBoard', err)
                throw err
            }
        },
        async setCurrBoard({ commit }, { boardId }) {
            console.log('from store', boardId);

            try {
                const board = await boardService.getById(boardId)
                commit({ type: 'setCurrBoard', board })
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
    }
}