
import { boardService } from '../../services/board.service'



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
  },
  actions: {
    async loadBoards({ commit }) {
      try {
        var boards = await boardService.query()
        commit({ type: 'setBoards', boards })
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
        console.error('There was a problem finding that board, please try again later.', err)
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
    async saveBoard({ commit }, { board, activityTxt, task = null }) {
      try {
        if (board._id) {
          commit({ type: 'saveBoard', board })
          await boardService.save(board, activityTxt, task)
        } else {
          console.log('hehehehe')
          board = await boardService.save(board, activityTxt, task )
          commit({ type: 'saveBoard', board})
        }
        //TODO: if await fails, set before board and send user-msg
        return board
      } catch (err) {
        console.error('There was a problem saving that board, please try again later.', err)
        throw err
      }
    },
  }
}