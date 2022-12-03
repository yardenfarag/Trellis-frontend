<template>
    <section class="group-details">
        <div class="group-header">
            <h5 class="group-title" contenteditable="true" @blur="updateGroup($event)">{{ group.title }}</h5>
            <span>12 cards</span>
            <!-- <button @click="removeGroup" class="btn-group-actions">X</button> -->
            <span @click="removeGroup" style="font-size:16px;" class="btn-group-actions material-symbols-outlined">
                more_horiz
            </span>
        </div>
        <!-- <button class="btn-group-actions">...</button> -->
        <ul class="clean-list task-list">
            <li v-if="group.tasks" v-for="task in 
                group.tasks" :key="task">
                <task-preview :task="task" :boardId="boardId" :groupId="group.id" />
            </li>
        </ul>
        <button v-if="!isAddTask" @click="openTaskForm" class="btn-open-add-task"><span style="font-size:20px;"
                class="material-symbols-outlined">
                add
            </span><span>Add a card</span></button>
        <form v-if="isAddTask" @submit.prevent="addTask()" class="add-task-form">
            <!-- <input ref="title" v-model="taskToEdit.title" type="text" placeholder="Enter a title for this card..."> -->
            <textarea ref="title" v-model="taskToEdit.title" type="text"
                placeholder="Enter a title for this card..."></textarea>
            <div class="add-task-form-controler">
                <button class="call-to-action">Add card</button>
                <span style="font-size:32px;" @click="isAddTask = false"
                    class="close-add-task material-symbols-outlined">
                    close
                </span>
                <span style="font-size:28px;" class="add-task-options material-symbols-outlined">
                    more_horiz
                </span>
            </div>
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
        openTaskForm() {
            this.isAddTask = true
            this.$nextTick(() => {
                this.focusOnTitle();
            });

        },
        focusOnTitle() {
            this.$refs.title.focus()
        },
        async addTask() {
            this.focusOnTitle()

            if (!this.taskToEdit.title) return
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
            const groupToEdit = JSON.parse(JSON.stringify(this.group))
            let newTitle
            if (!ev.target.innerText) {
                ev.target.innerText = groupToEdit.title
                return
            } else {
                newTitle = ev.target.innerText
                groupToEdit.title = newTitle
            }
            const boardToSave = JSON.parse(JSON.stringify(this.board))
            await this.$store.dispatch({ type: 'saveGroup', board: boardToSave, groupToEdit: groupToEdit })

        },
        async removeGroup() {
            const boardToSave = JSON.parse(JSON.stringify(this.board))
            const groupId = this.group.id
            await this.$store.dispatch({ type: 'removeGroup', board: boardToSave, groupId })
        }
    },
    computed: {
        board() {
            return this.$store.getters.board
        }
    },
    unmounted() {

    },
};
</script>
<style>

</style>