
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
    saveBoard(state, { savedBoard }) {
      const idx = state.boards.findIndex((b) => b._id === savedBoard._id)
      if (idx !== -1) {
        state.boards.splice(idx, 1, savedBoard)
      } else {
        state.boards.push(savedBoard)
      }
      state.currBoard = savedBoard
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
          commit({ type: 'saveBoard', savedBoard: board })
          boardService.save(board, activityTxt, task)
        } else {
          const savedBoard = await boardService.save(board)
          commit({ type: 'saveBoard', savedBoard, activityTxt, task })
        }
        //TODO: if await fails, set before board and send user-msg
        // return board
      } catch (err) {
        console.error('There was a problem saving that board, please try again later.', err)
        throw err
      }
    },
  }
}