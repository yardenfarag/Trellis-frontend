<template>
    <section v-if="task" class="task-preview" @click.stop="goToDetails">
        <div class="task-bg-color" v-if="task.style?.asTop" :style="taskTopBg"></div>
        <span @click.stop="openQuickEdit" class="pencil-icon material-symbols-outlined">
            edit
        </span>
        <section v-if="isTaskInfo" class="task-info">
            <div v-if="showLabels" class="labels-container">
                <div v-for="label in task.labels" :style="{ backgroundColor: label.color }" class="prev-label">
                </div>
            </div>
            <h5 class="task-title">{{ task.title }}</h5>
            <section class="badges">

                <div class="icon-container" v-if="(task.dueDate)">
                    <span class="icon date-icon"></span>
                    <span class="text text-date">{{ dueDate }}</span>
                </div>
                <div class="icon-container" title="This card has a description" v-if="(task.description)">
                    <span class="icon desc-icon"></span>
                    <span class="text text-desc"> </span>
                </div>
                <div class="icon-container" title="Comments" v-if="(task.comments?.length > 0)">
                    <span class="icon comments-icon"></span>
                    <span class="text text-comments"> {{ task.comments?.length }}</span>
                </div>
                <div class="icon-container" title="Attachments" v-if="(task.attachments?.length > 0)">
                    <span class="icon attach-icon"></span>
                    <span class="text text-attach"> {{ task.attachments?.length }}</span>
                </div>
                <div :style="checklistDoneStyle" class="icon-container" title="Checklist items"
                    v-if="(task.checklists?.length > 0)">
                    <span class="icon checklists-icon"></span>
                    <span class="text text-checklists"> {{ checklistSum }}</span>
                </div>
            </section>

            <ul v-if="taskMembers.length" class="clean-list member-list">
                <li v-for="taskMember in taskMembers" class="avatar">
                    <img :src="taskMember.imgUrl">
                </li>
            </ul>
        </section>
        <section v-else>
            <div :style="{ background: this.task?.style?.bg, color: this.task?.style?.textColor }"
                class="full-bg-container">
                <div class="full-bg-title-container">
                    <h5 class="full-bg-title">{{ task.title }}</h5>
                </div>
            </div>
        </section>

    </section>

    <section v-if="isQuickEdit" class="quick-edit-main">
        <div @click.stop="closeModals" class="quick-menu-screen"></div>
        <section class="quick-edit-modal flex">
            <div @click.stop="" class="edit-modal-title flex column">
                <textarea v-model="newTitle" cols="30" rows="5"></textarea>
                <button @click="updateTaskTitle" class="call-to-action">Save</button>
            </div>
            <div class="edit-modal-btns flex column">
                <button @click.stop="goToDetails">Open card</button>
                <button @click.stop="toggleLabelModal">Edit labels</button>
                <button @click.stop="toggleMembersModal">Change members</button>
                <button @click.stop="toggleCoverModal">Change cover</button>
                <!-- <button @click.stop="">Move</button>
                <button @click.stop="">Copy</button> -->
                <button @click.stop="toggleDateModal">Edit dates</button>
                <button @click.stop="removeTask">Archive</button>
            </div>
        </section>
        <taskLabelsModalCmpVue @updateTask="updateTask" @closeModal="toggleLabelModal" v-if="isLabelsModalOpen"
            :board="board" :task="task" />
        <taskMembersModal @saveTask="updateTask" :task="task" v-if="isMembersModal"
            @closeMembersModal="toggleMembersModal" />
        <taskCoverModal :task="task" v-if="isCoverModal" @saveTask="updateTask" @toggleCoverModal="toggleCoverModal" />

        <taskDatesModal :task="task" v-if="isDateModal" @closeDateModal="toggleDateModal" @saveTask="updateTask" />
    </section>

</template>
<script>
import { utilService } from '../../../services/util.service'
import taskLabelsModalCmpVue from './task-details-cmps/task-details-modals-cmps/task-labels-modal.cmp.vue'
import taskMembersModal from './task-details-cmps/task-details-modals-cmps/task-members-modal.cmp.vue'
import taskCoverModal from './task-details-cmps/task-details-modals-cmps/task-cover-modal.cmp.vue'
import taskDatesModal from './task-details-cmps/task-details-modals-cmps/task-date-modal.cmp.vue'
import { eventBus } from '../../../services/event-bus.service'

export default {
    props: {
        task: Object,
        boardId: String,
        groupId: String,
    },
    name: 'task-preview',
    components: {
        taskLabelsModalCmpVue,
        taskMembersModal,
        taskCoverModal,
        taskDatesModal,
    },
    data() {
        return {
            newTitle: '',
            isTodosDone: false,
            isQuickEdit: false,
            isLabelsModalOpen: false,
            isMembersModal: false,
            isCoverModal: false,
            isDateModal: false,
        }
    },
    async created() {
        this.newTitle = this.task.title
        await this.$store.dispatch({ type: 'loadUsers' })
    },
    methods: {
        goToDetails() {
            this.isQuickEdit = false
            const taskId = this.task.id
            this.$router.push('/board/' + this.boardId + '/' + this.groupId + '/' + taskId)
        },
        openQuickEdit() {
            this.isQuickEdit = true
        },
        closeModals(modal) {
            this.isQuickEdit = false
            if (modal !== 'label') this.isLabelsModalOpen = false
        },
        toggleLabelModal() {
            this.isLabelsModalOpen = !this.isLabelsModalOpen
        },
        toggleMembersModal() {
            this.isMembersModal = !this.isMembersModal
        },
        toggleCoverModal() {
            this.isCoverModal = !this.isCoverModal
        },
        toggleDateModal() {
            this.isDateModal = !this.isDateModal
        },
        async updateTask(task) {
            const taskToEdit = JSON.parse(JSON.stringify(task))
            this.$store.dispatch({ type: 'updateTask', groupId: this.groupId, task: taskToEdit })
        },
        async removeTask() {
            const groupId = this.groupId
            const taskId = this.task.id
            await this.$store.dispatch({ type: 'removeTask', groupId, taskId })
            this.closeModals()
        },
        async updateTaskTitle() {
            if (!this.newTitle) {
                this.newTitle = this.task.title
                return
            } else {
                const taskToEdit = JSON.parse(JSON.stringify(this.task))
                taskToEdit.title = this.newTitle
                this.updateTask(taskToEdit)
                this.closeModals()
            }
        },
    },
    computed: {
        isTaskInfo() {
            if (this.task.style.asTop) return true
            return false
        },
        taskTopBg() {
            if (this.task?.style?.asTop) return { background: this.task?.style?.bg }
        },
        taskBg() {
            if (!this.task?.style?.asTop) return { background: this.task?.style?.bg, color: this.task?.style?.textColor }
            else return { background: 'white' }
        },
        checklistSum() {
            let total = 0
            let done = 0
            this.task.checklists.forEach(list => {
                list.todos.forEach(todo => {
                    if (todo.isDone) done++
                    total++
                })
            })
            if (total - done <= 0) this.isTodosDone = true
            return `${done}/${total}`
        },
        checklistDoneStyle() {
            if (this.isTodosDone) return { backgroundColor: '#61bd4f', color: 'white' }
        },
        dueDate() {
            var date = utilService.dueDateShortFormat(this.task.dueDate.info)
            return date
        },
        users() {
            return this.$store.getters.users
        },
        taskMembers() {
            let members = this.users?.filter(user => {
                return this.board?.memberIds?.includes(user._id)
            })
            let taskMembers = members?.filter(member => {
                return this.task?.memberIds?.includes(member._id)
            })
            return taskMembers
        },
        board() {
            return JSON.parse(JSON.stringify(this.$store.getters.board))
        },

    },
    unmounted() { },
};
</script>