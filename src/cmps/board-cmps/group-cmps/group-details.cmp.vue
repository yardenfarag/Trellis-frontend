<template>
    <section class="group-details">
        <h5>{{ group.title }}</h5>
        <button class="btn-group-actions">...</button>
        <ul class="clean-list task-list">
            <li v-for="task in 
                group.tasks" :key="task">
                <task-preview :task="task" :boardId="boardId" :groupId="group.id" />
            </li>
        </ul>
        <!-- <button @click="" class="btn-open-add-task">+ Add a card</button> -->
        <form @submit.prevent="addTask()" class="add-task-form">
            <input v-model="taskToEdit.title" type="text" placeholder="Enter a title for this card...">
            <button class="call-to-action">Add card</button>
            <button type="button">X</button>
            <button class="add-task-options">...</button>
        </form>
    </section>
</template>
<script>

import { taskService } from '../../../services/task.service.local'
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
            taskToEdit: {
                title: '',
                members: [],
                labels: [],
                position: null
            }
        }
    },
    created() { },
    methods: {
        async addTask() {
            const updatedBoard = await taskService.save(this.boardId, this.group.id, this.taskToEdit)
            this.$
        }
    },
    computed: {},
    unmounted() { },
};
</script>
<style>

</style>