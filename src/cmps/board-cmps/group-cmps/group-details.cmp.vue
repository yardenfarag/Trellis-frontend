<template>
    <section class="group-details">
        <h5 contenteditable="true" @blur="updateGroup($event)">{{ group.title }}</h5>
        <button class="btn-group-actions">...</button>
        <ul class="clean-list task-list">
            <li v-for="task in 
                group.tasks" :key="task">
                <task-preview :task="task" :boardId="boardId" :groupId="group.id" />
            </li>
        </ul>
        <button v-if="!isAddTask" @click="isAddTask = true" class="btn-open-add-task">+ Add a card</button>
        <form v-if="isAddTask" @submit.prevent="addTask()" class="add-task-form">
            <input v-model="taskToEdit.title" type="text" placeholder="Enter a title for this card...">
            <button class="call-to-action">Add card</button>
            <button @click="isAddTask = false" type="button">X</button>
            <button class="add-task-options">...</button>
        </form>
    </section>
</template>
<script>
import taskPreview from '../task-cmps/task-preview.cmp.vue'
export default {
    props: {
        group: Object,
        boardId: String,
    },
    name: 'group-details',
    components: {
        taskPreview,
    },
    data() {
        return {
            isAddTask: false,
            taskToEdit: {
                title: '',
                members: [],
                labels: [],
                position: null
            }
        }
    },
    created() {
    },
    methods: {
        async addTask() {
            const boardToSave = JSON.parse(JSON.stringify(this.board))
            await this.$store.dispatch({ type: 'saveTask', board: boardToSave, groupId: this.group.id, taskToSave: this.taskToEdit })
            this.taskToEdit = {
                title: '',
                members: [],
                labels: [],
                position: null
            }
        },
        async updateGroup(ev) {
            const newTitle = ev.target.innerText
            const groupToEdit = JSON.parse(JSON.stringify(this.group))
            groupToEdit.title = newTitle
            const boardToSave = JSON.parse(JSON.stringify(this.board))
            await this.$store.dispatch({ type: 'saveGroup', board: boardToSave, groupToEdit: groupToEdit })

        }
    },
    computed: {
        board() {
            return this.$store.getters.board
        }
    },
    unmounted() { },
};
</script>
<style>

</style>