<template>
    <section v-if="!editLabel" class="task-label-modal">
        <div class="filter-labels">
            <input type="search" placeholder="Search labels...">
        </div>
        <div v-if="board.labels" v-for="label in board.labels" class="labels flex">
            <input @change="toggleLabel(label)" :key="label.id" type="checkbox">
            <div :style="{ 'background-color': '#' + label.color }" class="label">{{ label.title }}</div>
            <button @click="editLabel = true">✏️</button>
        </div>
        <button>Create a new label</button>
    </section>
    <!-- <section v-if="editLabel" class="task-edit-label-modal">
        <div class="label-show">
            <span :style="{ backgroundColor: label.color }">{{ label.title }}</span>
        </div>
        <div class="labels">
            <input @change="addLabeltoTask(label)" v-for="label in board.labels" type="checkbox">
            <span :style="{ backgroundColor: label.color }">{{ label.title }}</span>
            <button @click="editLabel = true">✏️</button>
        </div>
        <button>Create a new label</button>
    </section> -->
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
    created() {
        console.log(this.board.labels);
        console.log(this.task);
    },
    methods: {
        toggleLabel(labeltoAdd) {
            const labelToAdd = JSON.parse(JSON.stringify(labeltoAdd))
            const board = JSON.parse(JSON.stringify(this.board))
            const groupId = this.$route.params.groupId
            const labelIdx = this.task.labels.findIndex(label => label.id === labeltoAdd.id)
            const taskToSave = JSON.parse(JSON.stringify(this.task))
            if (labelIdx > 0) {
                taskToSave.labels.splice(labelIdx, 1)
            } else {
                taskToSave.labels.push(labelToAdd)
            }
            this.$emit('updateTask', taskToSave)
            // this.$store.dispatch({ type: 'saveTask', board, groupId, taskToSave })
        }
    },
    computed: {},
    unmounted() { },
};
</script>
<style>

</style>