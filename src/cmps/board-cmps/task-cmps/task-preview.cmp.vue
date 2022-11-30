<template>
    <section v-if="task" class="task-preview">
        <h5 @click="goToDetails">{{ task.title }}</h5>
    </section>
</template>
<script>
export default {
    props: {
        task: Object
    },
    name: 'task-preview',
    components: {},
    data() {
        return {};
    },
    created() { },
    methods: {
        goToDetails() {
            this.$router.push('/task/' + this.task.id)
        }
    },
    computed: {},
    unmounted() { },
};
</script>