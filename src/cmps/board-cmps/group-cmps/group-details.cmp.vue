<template>
    <section class="group-wrapper">
        <section @click.stop="" class="group-details">
            <div class="group-header">
                <textarea rows="1" class="group-title drag-disabled" v-model="newTitle"
                    @blur="updateGroup()">{{ group.title }}</textarea>
                <span @click="removeGroup" class="btn-group-actions"></span>
            </div>
            <div class="task-list">
                <Container :drop-placeholder="{ className: 'task-preview ghost' }" :get-child-payload="getChildPayload"
                    @drop="onTaskDrop" group-name="task" orientation="vertical" class="clean-list"
                    drag-class="drag-preview" drop-class="drop-preview">
                    <Draggable v-if="group.tasks" v-for="task in group.tasks" :key="task.id">
                        <task-preview :task="task" :boardId="boardId" :groupId="group.id" />
                    </Draggable>
                </Container>


                <div v-if="isAddTask" class="add-task-container">
                    <div class="textarea-input-margin">
                        <div class="textarea-input-padding">
                            <textarea @keyup.enter="addTask" @input="onTaskTitleType" v-model="taskTitle" ref="title"
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
            taskTitle: '',
            newTitle: this.group.title,
            isAddTask: false,
        }
    },
    created() { },
    methods: {
        scrollToAddTask() {
            const el = this.$refs.title

            if (el) {
                // Use el.scrollIntoView() to instantly scroll to the element
                el.scrollIntoView({ behavior: 'smooth' })
            }
        },
        getChildPayload(index) {
            console.log('drag');
            return this.group.tasks[index]
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
        async addTask() {
            this.taskTitle.trim()
            if (!this.taskTitle.replace(/\s/g, '').length) return
            if (!this.taskTitle) return

            const groupIdx = this.board.groups.findIndex(group => group.id === this.group.id)
            const newTask = utilService.getEmptyTask(this.taskTitle)
            this.board.groups[groupIdx].tasks.push(newTask)
            let activityTxt = `added ${this.taskTitle} to ${this.board.groups[groupIdx].title}`
            this.$emit('saveBoard', this.board, activityTxt, newTask)
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
                // const title = this.newTitle
                const groupIdx = this.board.groups.findIndex(group => group.id === this.group.id)
                const groupToEdit = this.board.groups[groupIdx]
                groupToEdit.title = this.newTitle
                this.board.groups.splice(groupIdx, 1, groupToEdit)
                this.$emit('saveBoard', this.board)
            }
        },
        removeGroup() {
            this.closeAddTaskAndClear()
            const groupIdx = this.board.groups.findIndex(group => group.id === this.group.id)
            this.board.groups.splice(groupIdx, 1)
            this.$emit('saveBoard', this.board)
        },
    },
    computed: {},
    mounted() {
    },
    unmounted() {

    },
}
</script>