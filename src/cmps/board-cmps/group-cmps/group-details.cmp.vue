<template>
    <section class="group-wrapper">
        <section class="group-details">
            <div class="group-header">
                <textarea rows="1" class="group-title drag-disabled" v-model="newTitle"
                    @blur="updateGroup()">{{ group.title }}</textarea>
                <span @click="removeGroup" class="btn-group-actions"></span>
            </div>
            <div class="task-list">
                <Container :drop-placeholder="{ className: 'task-preview ghost' }" :get-child-payload="getChildPayload"
                    @drop="onTaskDrop" group-name="task" orientation="vertical" class="clean-list"
                    drag-class="drag-preview">
                    <Draggable v-if="group.tasks" v-for="task in group.tasks" :key="task.id">
                        <task-preview :task="task" :boardId="boardId" :groupId="group.id" />
                    </Draggable>
                </Container>


                <div v-if="isAddTask" class="add-task-container">
                    <div class="textarea-input-margin">
                        <div class="textarea-input-padding">
                            <textarea v-model="taskTitle" ref="title"
                                placeholder="Enter a title for this card..."></textarea>
                        </div>
                    </div>
                    <div class="controller-container">
                        <div class="btn-container">
                            <button @click.stop="addTask" class="btn-add-task call-to-action">Add card</button>
                            <span @click="(isAddTask = false)" class="close-btn-placeholder"></span>
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
    props: {
        group: Object,
        boardId: String,
        txt: String,
    },
    name: 'group-details',
    components: {
        taskPreview,
        Draggable,
        Container,

    },
    data() {
        return {
            taskTitle: '',
            newTitle: this.group.title,
            isAddTask: false,
        }
    },
    created() { },
    methods: {
        // onEnter() {
        //     if (this.taskTitle === '') return
        //     setTimeout(() => {
        //         this.addTask()
        //     }, "50")
        // },
        // scrollToElement() {
        //     const el = this.$refs.scrollToMe

        //     if (el) {
        //         // Use el.scrollIntoView() to instantly scroll to the element
        //         el.scrollIntoView({ behavior: 'smooth' })
        //     }
        // },
        getChildPayload(index) {
            return this.group.tasks[index]
        },
        closeAddCard() {
            this.isAddTask = false
        },
        onTaskDrop(ev) {
            const groupId = JSON.parse(JSON.stringify(this.group.id))
            this.$emit('saveTaskDrop', { ev, groupId })
        },
        openTaskForm() {
            this.isAddTask = true
            this.$nextTick(() => {
                this.$refs.title.focus()
            })
            // this.scrollToElement()
        },
        addTask() {
            if (!this.taskTitle) return
            // this.$store.dispatch({ type: 'addTask', groupId: this.group.id, title: this.taskTitle })
            const groupIdx = this.board.groups.findIndex((group) => group.id === this.group.id)
            const newTask = utilService.getEmptyTask(this.taskTitle)
            this.board.groups[groupIdx].tasks.push(newTask)
            let activityTxt = `added ${this.taskTitle} to ${this.board.groups[groupIdx].title}`
            this.$store.dispatch({ type: 'saveBoard', board: this.board, activityTxt })
            this.taskTitle = ''
            this.isAddTask = true
            this.$nextTick(() => {
                this.$refs.title.focus()
            })
        },
        updateGroup() {
            const groupToEdit = JSON.parse(JSON.stringify(this.group))
            if (!this.newTitle) {
                this.newTitle = this.group.title
                return
            } else {
                groupToEdit.title = this.newTitle
                const groupIdx = this.board.groups.findIndex(group => group.id === this.group.id)
                this.board.groups.splice(groupIdx, 1, groupToEdit)
                this.$store.dispatch({ type: 'saveBoard', board: this.board })
            }


        },
        removeGroup() {
            const groupIdx = this.board.groups.findIndex(group => group.id === this.group.id)
            this.board.groups.splice(groupIdx, 1)
            this.$store.dispatch({ type: 'saveBoard', board: this.board })
        },
    },
    computed: {
        board() {
            const board = JSON.parse(JSON.stringify(this.$store.getters.board))
            return board
        },
    },
    unmounted() {

    },
}
</script>