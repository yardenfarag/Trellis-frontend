<template>
    <section v-if="task" class="task-preview" @click.stop="goToDetails">
        <span @click.stop="openQuickEdit" class="pencil-icon material-symbols-outlined">
            edit
        </span>
        <div v-if="isFullBg && (isColor || isImg)">
            <div v-if="isColor">
                <section :style="color" class="full-color-container">
                    <div class="full-color-title-container">
                        <h5 class="full-color-title">{{ task.title }}</h5>
                    </div>
                    <!-- <span @click.stop="openQuickEdit" class="pencil-icon material-symbols-outlined">
                        edit
                    </span> -->
                </section>
            </div>
            <div v-if="isImg">
                <section :style="img" class="full-img-container">
                    <div class="full-img-title-container">
                        <h5 :style="{ color: isBlackText }" class="full-img-title">{{ task.title }}</h5>
                    </div>
                    <!-- <span @click.stop="openQuickEdit" class="pencil-icon material-symbols-outlined">
                        edit
                    </span> -->
                </section>
            </div>
        </div>

        <div v-else>
            <div class="task-bg-color" v-if="isColor" :style="color"></div>
            <div class="task-bg-img" v-if="isImg" :style="img"></div>
            <!-- <span @click.stop="openQuickEdit" class="pencil-icon material-symbols-outlined">
                edit
            </span> -->
            <section class="task-info">
                <div v-if="task.labels?.length" class="labels-container">
                    <div @click.stop="" v-for="label in task.labels" :style="{ backgroundColor: label.color }"
                        class="prev-label">
                    </div>
                </div>
                <h5 class="task-title">{{ task.title }}</h5>
                <section class="badges">

                    <div :style="checkDuoDateStyle" @click.stop="toggleDuedate" class="icon-container"
                        :class="dueDateClass" v-if="(task.dueDate)">
                        <span v-if="task.dueDate.isDone" class="icon date-isdone-icon"></span>
                        <span v-else class="icon date-icon"></span>
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
                    <div :style="checklistDoneStyle" class="icon-container checklist" title="Checklist items"
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
        </div>
    </section>
    <section v-if="isQuickEdit" class="quick-edit-main">
        <div @click.stop="closeQuickEdit" class="quick-menu-screen"></div>
        <section class="quick-edit-modal">
            <section class="quick-edit-modal-card">
                <div class="task-bg-color" v-if="isColor" :style="color"></div>
                <div class="task-bg-img" v-if="isImg" :style="img"></div>
                <!-- <span @click.stop="openQuickEdit" class="pencil-icon material-symbols-outlined">
                edit
            </span> -->
                <section class="task-info">
                    <div v-if="task.labels?.length" class="labels-container">
                        <div @click.stop="" v-for="label in task.labels" :style="{ backgroundColor: label.color }"
                            class="prev-label">
                        </div>
                    </div>
                    <textarea class="edit-modal-title" v-model="newTitle"></textarea>
                    <section class="badges">

                        <div :style="checkDuoDateStyle" @click.stop="toggleDuedate" class="icon-container"
                            :class="dueDateClass" v-if="(task.dueDate)">
                            <span v-if="task.dueDate.isDone" class="icon date-isdone-icon"></span>
                            <span v-else class="icon date-icon"></span>
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
                        <div :style="checklistDoneStyle" class="icon-container checklist" title="Checklist items"
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
            </section>
            <button @click="updateTaskTitle" class="call-to-action">Save</button>
            <!-- <div class="edit-modal-btns">
                <button @click.stop="goToDetails">Open card</button>
                <button @click.stop="openModal($event, 'labels')">Edit labels</button>
                <button @click.stop="openModal($event, 'members')">Change members</button>
                <button @click.stop="openModal($event, 'cover')">Change cover</button>
                <button @click.stop="openModal($event, 'dates')">Edit dates</button>
                <button @click.stop="openModal($event, 'delete')">Archive</button>
            </div> -->
        </section>
        <taskLabelsModalCmpVue v-if="isLabelsModal" :pos="modalPos" :task="task" @updateTask="updateTask"
            @closeModal="closeModals" :board="board" />
        <taskMembersModal v-if="isMembersModal" :pos="modalPos" :task="task" @saveTask="updateTask"
            @closeModal="closeModals" />
        <taskCoverModal v-if="isCoverModal" :pos="modalPos" :task="task" @saveTask="updateTask"
            @closeModal="closeModals" />
        <taskDatesModal v-if="isDateModal" :pos="modalPos" :task="task" @saveTask="updateTask"
            @closeModal="closeModals" />
        <deleteModal v-if="isDeleteModal" :pos="modalPos" @remove="removeTask" @closeModal="closeModals"
            :toDelete="'task'" />
    </section>

</template>
<script>
import { utilService } from '../../../services/util.service'
import taskLabelsModalCmpVue from './task-details-cmps/task-details-modals-cmps/task-labels-modal.cmp.vue'
import taskMembersModal from './task-details-cmps/task-details-modals-cmps/task-members-modal.cmp.vue'
import taskCoverModal from './task-details-cmps/task-details-modals-cmps/task-cover-modal.cmp.vue'
import taskDatesModal from './task-details-cmps/task-details-modals-cmps/task-date-modal.cmp.vue'
import deleteModal from '../../board-cmps/task-cmps/task-details-cmps/task-details-modals-cmps/delete-modal.cmp.vue'
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
        deleteModal,
    },
    data() {
        return {
            newTitle: '',
            isTodosDone: false,

            isQuickEdit: false,
            isLabelsModal: false,
            isMembersModal: false,
            isCoverModal: false,
            isDateModal: false,
            isDeleteModal: false,
            modalPos: null
        }
    },
    async created() {
        // this.newTitle = this.task.title
        await this.$store.dispatch({ type: 'loadUsers' })
    },
    methods: {
        openQuickEdit() {
            this.newTitle = this.task.title
            this.isQuickEdit = true
        },
        openModal(ev, modal) {
            this.closeModals()
            const elPos = ev.target.getBoundingClientRect()
            // console.log(elPos)
            if (modal === 'delete') this.isDeleteModal = true
            if (modal === 'members') this.isMembersModal = true
            if (modal === 'labels') this.isLabelsModal = true
            if (modal === 'dates') this.isDateModal = true
            if (modal === 'cover') this.isCoverModal = true
            const top = elPos.top + elPos.height + 8
            const left = elPos.left
            this.modalPos = { top, left }
        },
        closeQuickEdit() {
            this.closeModals()
            this.isQuickEdit = false
        },
        closeModals() {
            this.isLabelsModal = false
            this.isDateModal = false
            this.isMembersModal = false
            this.isCoverModal = false
            this.isDeleteModal = false
        },
        goToDetails() {
            this.closeQuickEdit()
            const taskId = this.task.id
            this.$router.push('/board/' + this.boardId + '/' + this.groupId + '/' + taskId)
        },
        async toggleDuedate() {
            const taskToEdit = JSON.parse(JSON.stringify(this.task))
            taskToEdit.dueDate.isDone = !taskToEdit.dueDate.isDone
            await this.updateTask(taskToEdit)
        },
        async updateTask(taskToEdit) {
            const boardToEdit = JSON.parse(JSON.stringify(this.board))
            const groupIdx = boardToEdit.groups.findIndex(group => group.id === this.groupId)
            const taskIdx = boardToEdit.groups[groupIdx].tasks.findIndex(task => task.id === taskToEdit.id)
            boardToEdit.groups[groupIdx].tasks.splice(taskIdx, 1, taskToEdit)
            await this.$store.dispatch({ type: 'saveBoard', board: boardToEdit })
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
                await this.updateTask(taskToEdit)
                this.closeModals()
            }
        },
    },
    computed: {
        board() {
            const board = this.$store.getters.board
            return board
        },
        isFullBg() {
            if (!this.task.style.asTop) return true
            return false
        },
        isColor() {
            if (this.task.style.bgc) return true
        },
        isImg() {
            if (this.task.style.imgUrl) return true
        },
        color() {
            return { background: this.task.style.bgc }
        },
        isBlackText() {
            if (this.task.style.textColor === 'white') return 'white'
            else return 'black'
        },
        img() {
            return { backgroundImage: this.task.style.imgUrl, borderRadius: 3 + 'px' }
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
            if (total - done <= 0 && total !== 0) this.isTodosDone = true
            else this.isTodosDone = false
            return `${done}/${total}`
        },
        checklistDoneStyle() {
            if (this.isTodosDone) return { backgroundColor: '#61bd4f', color: 'white' }
        },
        checkDuoDateStyle() {
            if ((new Date(this.task?.dueDate?.info) / (60 * 60 * 1000)) < (Date.now()) / (60 * 60 * 1000)) return { backgroundColor: '#e2604b', color: 'white' }
            if ((new Date(this.task?.dueDate?.info) / (60 * 60 * 1000) + 10) < (Date.now()) / (60 * 60 * 1000)) return { backgroundColor: '#edd727', color: 'white' }
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
        dueDateClass() {
            if (this.task.dueDate.isDone) return 'due-date-done'
            return 'due-date'
        }

    },
    unmounted() { },
};
</script>