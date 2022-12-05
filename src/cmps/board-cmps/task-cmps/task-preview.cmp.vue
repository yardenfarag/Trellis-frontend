<template>
    <section v-if="task" class="task-preview">
        <span class="pencil-icon material-symbols-outlined">
            edit
        </span>
        <h5 @click="goToDetails">{{ task.title }}</h5>
    </section>


    <section class="prev-icons">
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
        <ul v-if="taskMembers.length"  class="clean-list flex">
            <li v-for="taskMember in taskMembers" class="avatar flex">
                <img :src="taskMember.imgUrl">
            </li>
        </ul>
    </section>
</template>
<script>
import { utilService } from '../../../services/util.service'

export default {
    props: {
        task: Object,
        boardId: String,
        groupId: String,
    },
    name: 'task-preview',
    components: {

    },
    data() {
        return {
            isTodosDone: false,
        }
    },
    async created() {
        await this.$store.dispatch({ type: 'loadUsers' })
    },
    methods: {
        goToDetails() {
            const taskId = this.task.id
            this.$router.push('/board/' + this.boardId + '/' + this.groupId + '/' + taskId)
        }
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
            if (this.isTodosDone) return { backgroundColor: 'green', color: 'white' }
        },
        dueDate() {
            var date = utilService.dueDateShortFormat(this.task.dueDate.info)
            return date
        },
        board() {
            return this.$store.getters.board
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

    },
    unmounted() { },
};
</script>