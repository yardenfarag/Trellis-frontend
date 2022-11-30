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
            <input type="text" placeholder="Enter a title for this card...">
            <button>Add card</button>
            <button type="button">X</button>
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
            taskToEdit: {

            }
        }
    },
    created() { },
    methods: {
        addTask() {
            console.log('ss')
        }
    },
    computed: {},
    unmounted() { },
};
</script>
<style>

</style>