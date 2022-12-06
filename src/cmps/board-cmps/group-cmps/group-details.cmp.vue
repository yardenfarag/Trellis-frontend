<template>
    <section class="group-wrapper">
        <section class="group-details">
            <div class="group-header">
                <textarea rows="1" class="group-title" v-model="newTitle"
                    @blur="updateGroup()">{{ group.title }}</textarea>
                <span @click="removeGroup" class="btn-group-actions"></span>
            </div>
            <!-- <button class="btn-group-actions">...</button> -->
            <Container :drop-placeholder="{ className: 'task-preview ghost' }" :get-child-payload="getChildPayload"
                @drop="onTaskDrop" group-name="task" orientation="vertical" class="clean-list task-list"
                drag-class="drag-preview">
                <!-- <ul class="clean-list task-list"> -->
                <Draggable v-if="group.tasks" v-for="task in group.tasks" :key="task.id">
                    <task-preview :task="task" :boardId="boardId" :groupId="group.id" />
                    <!-- </li> -->
                </Draggable>
            </Container>
            <form v-if="isAddTask" @submit.prevent="addTask" class="add-task-form">
                <textarea ref="title" v-model="taskTitle" type="text"
                    placeholder="Enter a title for this card..."></textarea>
                <div class="add-task-form-controler">
                    <button class="call-to-action">Add card</button>
                    <span style="font-size:32px;" @click="isAddTask = false"
                        class="close-add-task material-symbols-outlined">
                        close
                    </span>
                    <span style="font-size:28px;" class="add-task-options material-symbols-outlined">
                        more_horiz
                    </span>
                </div>
            </form>
            <!-- </ul> -->
            <button v-if="!isAddTask" @click="openTaskForm" class="btn-open-add-task"><span style="font-size:20px;"
                    class="material-symbols-outlined">
                    add
                </span><span>Add a card</span></button>
        </section>
    </section>
</template>
<script>
import { utilService } from '../../../services/util.service'
import taskPreview from '../task-cmps/task-preview.cmp.vue'
import { Container, Draggable } from "vue3-smooth-dnd"
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
    async created() { },
    methods: {
        getChildPayload(index) {
            return this.group.tasks[index]
        },
        async onTaskDrop(ev) {
            const groupId = JSON.parse(JSON.stringify(this.group.id))
            this.$emit('saveTaskDrop', { ev, groupId })
        },
        openTaskForm() {
            this.isAddTask = true
            this.$nextTick(() => {
                this.focusOnTitle()
            })

        },
        focusOnTitle() {
            this.$refs.title.focus()
        },
        addTask() {
            if (!this.taskTitle) return
            this.$store.dispatch({ type: 'addTask', groupId: this.group.id, title: this.taskTitle })
            this.taskTitle = ''
        },
        async updateGroup() {
            const groupToEdit = JSON.parse(JSON.stringify(this.group))
            if (!this.newTitle) {
                this.newTitle = this.group.title
                return
            } else {
                groupToEdit.title = this.newTitle
                const groupIdx = this.board.groups.findIndex(group => group.id === this.group.id)
                this.board.groups.splice(groupIdx, 1, groupToEdit)
                await this.$store.dispatch({ type: 'saveBoard', board: this.board })
            }


        },
        async removeGroup() {
            this.$store.dispatch({ type: 'removeGroup', groupId: this.group.id })
        },
        // removeTask(taskId) {
        //     this.$store.dispatch({ type: 'removeTask', groupId: this.group.id, taskId })
        // },
    },
    computed: {
        board() {
            return JSON.parse(JSON.stringify(this.$store.getters.board))
        },
        groupTasksCount() {
            const board = this.$store.getters.board
            const group = board.groups.find(group => group.id === this.group.id)
            const groupTasks = group.tasks
            return groupTasks.length
        }
    },
    unmounted() {

    },
}
</script>
<style>
.drag-preview {
    /* transform: rotate(4deg); */
    /* transform: rotateZ(5deg);
    transition: transform 0.18s ease; */
}

.placeholder {
    background: rgba(33, 33, 33, .08);
    width: 256px;
    height: 32px;
    position: relative;
    border-radius: 0.04rem;
    /* transform: scaleY(0.85);
    transform-origin: 0% 0%; */
}
</style>