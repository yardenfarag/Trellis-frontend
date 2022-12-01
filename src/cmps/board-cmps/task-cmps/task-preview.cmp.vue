<template>
    <section v-if="task" class="task-preview">
        <h5 @click="goToDetails">{{ task.title }}<span class="pencil-icon material-symbols-outlined">
                edit
            </span></h5>

    </section>
</template>
<script>
export default {
    props: {
        task: Object,
        boardId: String,
        groupId: String,
    },
    name: 'task-preview',
    components: {},
    data() {
        return {};
    },
    created() { },
    methods: {
        goToDetails() {
            const taskId = this.task.id
            this.$router.push('/board/' + this.boardId + '/' + this.groupId + '/' + taskId)
        }
    },
    computed: {},
    unmounted() { },
};
</script>