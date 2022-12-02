<template>
    <section v-if="task" class="task-preview">
        <span class="pencil-icon material-symbols-outlined">
            edit
        </span>

        <section>
            <ul class="label-list clean-list">
                <li class="label-preview" v-for="label in task.labels" :key="label.id">
                    <div style="background-color: {{label.color}};"></div>
                </li>
            </ul>
        </section>

        <h5 @click="goToDetails">{{ task.title }}</h5>
        <section class="icon-toolbar flex">
            <!-- <div class="todo-group">
                <span class="todo-checkbox material-symbols-outlined">
                    select_check_box
                </span>
                <span class="todo-prorgess">2\5</span>
                <span class="due-date-date">Dec 5</span>
            </div> -->

            <span class="comment material-symbols-outlined">
                maps_ugc
            </span>
            <span class="description material-symbols-outlined">
                subject
            </span>
            <div class="due-date-group">
                <span class="due-date-box material-symbols-outlined">
                    check_box_outline_blank
                </span>
                <span class="due-date-clock material-symbols-outlined">
                    schedule
                </span>
                <span class="due-date-date">Dec 5</span>
            </div>
            <span class="attachment material-symbols-outlined">
                attachment
            </span>
        </section>

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