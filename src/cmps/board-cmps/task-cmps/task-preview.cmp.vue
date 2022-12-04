<template>
    <section v-if="task" class="task-preview">
        <span class="pencil-icon material-symbols-outlined">
            edit
        </span>

        <!-- <section>
            <ul class="label-list clean-list">
                <li class="label-preview" v-for="label in task.labels" :key="label.id">
                    <div style="background-color: {{label.color}};"></div>
                </li>
            </ul>
        </section> -->

        <h5 @click="goToDetails">{{ task.title }}</h5>
        <!-- <section class="icon-toolbar flex"> -->

        <!-- </section> -->
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
    components: {

    },
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