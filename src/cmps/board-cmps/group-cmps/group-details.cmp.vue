<template>
    <section class="group-details">
        <h5>{{ group.title }}</h5>
        <ul>
            <li v-for="task in 
                group.tasks" :key="task">
                <task-preview :task="task" />
            </li>
        </ul>
    </section>
</template>
<script>
import taskPreview from '../task-cmps/task-preview.cmp.vue'
export default {
    props: {
        group: Object
    },
    name: 'group-details',
    components: {
        taskPreview
    },
    data() {
        return {};
    },
    created() { },
    methods: {},
    computed: {},
    unmounted() { },
};
</script>
<style>

</style>