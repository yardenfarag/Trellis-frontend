<template>
    <section v-if="task" class="task-preview" :style="taskBg" @click.stop="goToDetails">
        <div class="" v-if="task.style?.asTop" :style="taskTopBg" style="height: 30px"></div>
        <span @click.stop="openQuickEdit" class="pencil-icon material-symbols-outlined">
            edit
        </span>
        <div v-if="showLabels" class="labels-prev-container flex">
            <div v-for="label in task.labels" :style="{ backgroundColor: label.color }" class="prev-label"></div>
        </div>
        <h5>{{ task.title }}</h5>

        <section v-if="showLabels" class="prev-icons">

            <div class="icon" title="This card has a description" v-if="(task.dueDate)">
                <small class="prev-date"> {{ dueDate }}</small>
            </div>
            <div class="icon" title="This card has a description" v-if="(task.description)">
                <small class="prev-desc"> </small>
            </div>
            <div class="icon" title="Comments" v-if="(task.comments?.length > 0)">
                <small class="prev-comments"> {{ task.comments?.length }}</small>
            </div>
            <div class="icon" title="Attachments" v-if="(task.attachments?.length > 0)">
                <small class="prev-attach"> {{ task.attachments?.length }}</small>
            </div>
            <div :style="checklistDoneStyle" class="icon" title="Checklist items" v-if="(task.checklists?.length > 0)">
                <small class="prev-checklists"> {{ checklistSum }}</small>
            </div>
            <ul v-if="taskMembers.length" class="clean-list flex">
                <li v-for="taskMember in taskMembers" class="avatar flex">
                    <img :src="taskMember.imgUrl">
                </li>
            </ul>
        </section>

    </section>

    <section v-if="isQuickEdit" class="quick-edit-main">
        <div @click.stop="closeModals" class="quick-menu-screen"></div>
        <section class="quick-edit-modal flex">
            <div @click.stop="" class="edit-modal-title flex column">
                <textarea cols="30" rows="5">{{ task.title }}</textarea>
                <button class="call-to-action">Save</button>
            </div>
            <div class="edit-modal-btns flex column">
                <button @click.stop="goToDetails">Open card</button>
                <button @click.stop="toggleLabelModal">Edit labels</button>
                <button @click.stop="toggleMembersModal">Change members</button>
                <button @click.stop="toggleCoverModal">Change cover</button>
                <button @click.stop="">Move</button>
                <button @click.stop="">Copy</button>
                <button @click.stop="toggleDateModal">Edit dates</button>
                <button @click.stop="">Archive</button>
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
            // board: null,
            isTodosDone: false,
            isQuickEdit: false,
            isLabelsModalOpen: false,
            isMembersModal: false,
            isCoverModal: false,
            isDateModal: false,
        }
    },
    async created() {
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
    },
    computed: {
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
        taskTopBg() {
            if (this.task?.style?.asTop) return { background: this.task?.style?.bg }
        },
        taskBg() {
            if (!this.task?.style?.asTop) return { background: this.task?.style?.bg, color: this.task?.style?.textColor }
            else return { background: 'white' }
        },
        board() {
            return JSON.parse(JSON.stringify(this.$store.getters.board))
        },
        showLabels() {
            if (!this.task?.style?.asTop || !this.task.style) return false
            else return true
        },
    },
    unmounted() { },
};
</script>