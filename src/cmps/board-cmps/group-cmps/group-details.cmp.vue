<template>
    <section class="group-wrapper">
        <section @click.stop="" class="group-details">
            <div class="group-header">
                <textarea rows="1" class="group-title drag-disabled" v-model="newTitle"
                    @blur="updateGroup()">{{ group.title }}</textarea>
                <span @click="openGroupActions" class="btn-group-actions"></span>
                <section v-if="isGroupActions" class="group-actions modal-container">
                    <div class="modal-title">
                        <button @click="closeGroupActions">X</button>
                        <h5>List actions</h5>
                    </div>
                    <hr>
                    <div class="group-actions-btns">
                        <h6>Add card...</h6>
                        <h6 @click="openCopyList">Copy list...</h6>
                        <h6 @click="openMoveList">Move list...</h6>
                    </div>
                    <hr>
                    <div class="archive-list">
                        <h6 @click="removeGroup">Archive this list</h6>
                    </div>
                </section>

                <div v-if="isCopyList" class="copy-list modal-container">
                    <div class="modal-title">
                        <button @click="closeCopyList">←</button>
                        <button @click="closeGroupActions">X</button>
                        <h5>Copy list</h5>
                    </div>
                    <hr>
                    <div class="copy-list-body">
                        <h6>Name</h6>
                        <textarea v-model="copyGroupTitle" cols="30" rows="4"></textarea>
                        <button @click="copyGroup" class="call-to-action">Create list</button>
                    </div>
                </div>

                <div v-if="isMoveList" class="move-list modal-container">
                    <div class="modal-title">
                        <button @click="closeMoveList">←</button>
                        <button @click="closeGroupActions">X</button>
                        <h5>Move list</h5>
                    </div>
                    <hr>
                    <div class="move-list-body">
                        <label class="boards">
                            <h6>Boards</h6>
                            <select @change="changeSelectedBoard" v-model="selectedBoardId">
                                <option v-for="board in boards" :value="board._id">{{ board.title }}</option>
                            </select>
                            <h6>Position</h6>
                            <select v-model="selectedIdx">
                                <option v-for="group in selectedBoard.groups" :value="selectedBoard.groups.findIndex(g => g.id ===
                                group.id)">{{
            selectedBoard.groups.findIndex(g => g.id ===
                group.id) + 1
    }}</option>
                            </select>
                        </label>
                        <button @click="moveGroup" class="call-to-action">Move</button>
                    </div>
                </div>

            </div>
            <div class="task-list">
                <Container :drop-placeholder="{ className: 'task-preview ghost' }" :get-child-payload="getChildPayload"
                    @drop="onTaskDrop" group-name="task" orientation="vertical" class="clean-list"
                    drag-class="drag-preview" dro-class="drop-preview">
                    <Draggable v-if="group.tasks.length" v-for="task in group.tasks" :key="task.id">
                        <task-preview :task="task" :boardId="boardId" :groupId="group.id" />
                    </Draggable>
                </Container>


                <div v-if="isAddTask" class="add-task-container">
                    <div class="textarea-input-margin">
                        <div class="textarea-input-padding">
                            p <textarea @keyup.enter="addTask" @input="onTaskTitleType" v-model="taskTitle" ref="title"
                                placeholder="Enter a title for this card..."></textarea>
                        </div>
                    </div>
                    <div class="controller-container">
                        <div class="btn-container">
                            <button @click.stop="addTask" class="btn-add-task call-to-action">Add
                                card</button>
                            <span @click.stop="closeAddTaskAndClear" class="close-btn-placeholder"></span>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="!isAddTask" class="open-add-task-container">
                <button @click="openTaskForm" class="btn-open-add-task"><span style="font-size:20px;"
                        class="x material-symbols-outlined">
                        add
                    </span><span class="txt">Add a card</span></button>
            </div>
        </section>
    </section>
</template>
<script>
import taskPreview from '../task-cmps/task-preview.cmp.vue'
import { Container, Draggable } from "vue3-smooth-dnd"
import { utilService } from '../../../services/util.service.js'
export default {
    emits: ['updateGroup', 'deleteGroup', 'addTask', 'saveBoard', 'saveTaskDrop', 'updateTaskTitle', 'closeAllAddTask'],
    props: {
        group: Object,
        boardId: String,
        board: Object,
        txt: String,
        gTaskTitle: String,
    },
    name: 'group-details',
    components: {
        taskPreview,
        Draggable,
        Container,
    },
    data() {
        return {
            selectedIdx: this.board.groups.findIndex(g => g.id === this.group.id),
            selectedBoard: this.board,
            selectedBoardId: this.boardId,
            isMoveList: false,
            isCopyList: false,
            isGroupActions: false,
            taskTitle: '',
            newTitle: this.group.title,
            copyGroupTitle: this.group.title,
            isAddTask: false,
        }
    },
    created() {
        this.$store.dispatch({ type: 'loadBoards' })
    },
    methods: {
        openMoveList() {
            this.isMoveList = true
            this.isGroupActions = false
        },
        closeMoveList() {
            this.isMoveList = false
            this.isGroupActions = true
        },
        openCopyList() {
            this.isCopyList = true
            this.isGroupActions = false
        },
        closeCopyList() {
            this.isCopyList = false
            this.isGroupActions = true
        },
        openGroupActions() {
            this.isGroupActions = true
        },
        closeGroupActions() {
            this.isMoveList = false
            this.isGroupActions = false
            this.isCopyList = false
        },
        scrollToAddTask() {
            const el = this.$refs.title

            if (el) {
                el.scrollIntoView({ behavior: 'smooth' })
            }
        },
        getChildPayload(index) {
            const boardToEdit = JSON.parse(JSON.stringify(this.board))
            const groupIdx = boardToEdit.groups.findIndex(group => group.id === this.group.id)
            const groupToEdit = boardToEdit.groups[groupIdx]
            return groupToEdit.tasks[index]
        },
        closeAddTask() {
            this.isAddTask = false
        },
        onTaskTitleType() {
            this.$emit('updateTaskTitle', this.taskTitle)
        },
        closeAddTaskAndClear() {
            this.isAddTask = false
            this.$emit('updateTaskTitle', '')
            this.taskTitle = ''
        },
        onTaskDrop(ev) {
            const groupId = JSON.parse(JSON.stringify(this.group.id))
            this.$emit('saveTaskDrop', { ev, groupId })
        },
        openTaskForm() {
            this.$emit('closeAllAddTask')
            this.taskTitle = this.gTaskTitle
            this.isAddTask = true
            this.$nextTick(() => {
                this.scrollToAddTask()
                this.$refs.title.focus()
            })

        },
        moveGroup() {
            const groupToMove = JSON.parse(JSON.stringify(this.group))
            const boardToEdit = JSON.parse(JSON.stringify(this.board))
            const groupIdx = boardToEdit.groups.findIndex(group => group.id === this.group.id)
            const selectedBoard = JSON.parse(JSON.stringify(this.selectedBoard))
            const boardsToSave = JSON.parse(JSON.stringify(this.boards))
            const selectedBoardIdx = boardsToSave.findIndex(b => b._id === selectedBoard._id)
            boardToEdit.groups.splice(groupIdx, 1)
            this.$emit('saveBoard', boardToEdit)

            groupToMove.id = utilService.makeId()
            groupToMove.tasks.map(task => {
                task.id = utilService.makeId()
                task.memberIds = []
                task.labels = []
            })
            selectedBoard.groups.splice(this.selectedIdx, 0, groupToMove)
            boardsToSave.splice(selectedBoardIdx, 1, selectedBoard)
            this.$store.dispatch({ type: 'saveBoardFromMoveList', board: selectedBoard })

        },
        changeSelectedBoard() {
            const board = this.boards.find(b => b._id === this.selectedBoardId)
            const selectedBoard = JSON.parse(JSON.stringify(board))
            this.selectedBoard = selectedBoard
        },
        copyGroup() {
            if (!this.copyGroupTitle) return
            const boardToEdit = JSON.parse(JSON.stringify(this.board))
            const groupIdx = boardToEdit.groups.findIndex(group => group.id === this.group.id)
            let copyGroup = utilService.getEmptyGroup(this.copyGroupTitle)
            copyGroup.tasks = this.group.tasks
            copyGroup.tasks.map(task => task.id = utilService.makeId())
            boardToEdit.groups.splice(groupIdx + 1, 0, copyGroup)
            this.$emit('saveBoard', boardToEdit)
            this.copyGroupTitle = this.group.title
            this.closeGroupActions()
        },
        async addTask() {
            this.taskTitle.trim()
            if (!this.taskTitle.replace(/\s/g, '').length) return
            if (!this.taskTitle) return

            const boardToEdit = JSON.parse(JSON.stringify(this.board))

            const groupIdx = boardToEdit.groups.findIndex(group => group.id === this.group.id)
            const newTask = utilService.getEmptyTask(this.taskTitle)
            boardToEdit.groups[groupIdx].tasks.push(newTask)
            let activityTxt = `added ${this.taskTitle} to ${boardToEdit.groups[groupIdx].title}`
            this.$emit('saveBoard', boardToEdit, activityTxt, newTask)
            this.$emit('updateTaskTitle', '')
            this.taskTitle = ''
            this.isAddTask = true
            this.$nextTick(() => {
                this.scrollToAddTask()
                this.$refs.title.focus()
            })
        },
        updateGroup() {
            if (this.newTitle === this.group.title) return
            if (!this.newTitle) {
                this.newTitle = this.group.title
                return
            } else {
                const boardToEdit = JSON.parse(JSON.stringify(this.board))
                const groupIdx = boardToEdit.groups.findIndex(group => group.id === this.group.id)
                const groupToEdit = boardToEdit.groups[groupIdx]
                groupToEdit.title = this.newTitle
                boardToEdit.groups.splice(groupIdx, 1, groupToEdit)
                this.$emit('saveBoard', boardToEdit)
            }
        },
        removeGroup() {
            const boardToEdit = JSON.parse(JSON.stringify(this.board))
            this.closeAddTaskAndClear()
            const groupIdx = boardToEdit.groups.findIndex(group => group.id === this.group.id)
            boardToEdit.groups.splice(groupIdx, 1)
            this.$emit('saveBoard', boardToEdit)
        },
    },
    computed: {
        boards() {
            return this.$store.getters.boards
        }
    },
    mounted() {
    },
    unmounted() {

    },
}
</script>