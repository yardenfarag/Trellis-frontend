<template>
    <section v-if="editLabel" class="task-label-modal">
        <div class="filter-labels">
            <input type="search" placeholder="Search labels...">
        </div>
        <div class="labels">
            <input @change="addLabeltoTask(label)" v-for="label in board.labels" type="checkbox">
            <span :class="label.class">{{ label.title }}</span>
            <button @click="editLabel = true">✏️</button>
        </div>
        <button>Create a new label</button>
    </section>
    <section v-if="!editLabel" class="task-edit-label-modal">
        <div class="label-show">
            <span :class="label.class">{{ label.title }}</span>
        </div>
        <div class="labels">
            <input @change="addLabeltoTask(label)" v-for="label in board.labels" type="checkbox">
            <span :class="label.class">{{ label.title }}</span>
            <button @click="editLabel = true">✏️</button>
        </div>
        <button>Create a new label</button>
    </section>
</template>
<script>
export default {
    props: ['board', 'task'],
    name: 'task-label-modal',
    components: {},
    data() {
        return {
            editLabel: false,
            currLabel: {
                title: '',
                class: ''
            }
        };
    },
    created() { },
    methods: {
        addLabeltoTask(label) {
            this.task.labels.push(label)

        }
    },
    computed: {},
    unmounted() { },
};
</script>
<style>

</style>