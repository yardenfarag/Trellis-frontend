<template>
    <section class="group-wrapper">
        <section class="group-details">
            <div class="group-header">
                <textarea rows="1" class="group-title" v-model="group.title"
                    @blur="updateGroup()">{{ group.title }}</textarea>
                <span @click="removeGroup" class="btn-group-actions"></span>
            </div>
            <!-- <button class="btn-group-actions">...</button> -->
            <ul class="clean-list task-list">
                <li v-if="group.tasks" v-for="task in 
                group.tasks" :key="task">
                    <!-- <draggable :list="group.tasks" ghostClass="on-drag">
                        <transitionGroup type="transition"> -->

                    <task-preview :task="task" :boardId="boardId" :groupId="group.id" />

                    <!-- </transitionGroup>
                    </draggable> -->
                </li>
                <form v-if="isAddTask" @submit.prevent="addTask()" class="add-task-form">
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
            </ul>
            <div v-if="!isAddTask" class="open-add-task-container">
                <button @click="openTaskForm" class="btn-open-add-task"><span style="font-size:20px;"
                        class="material-symbols-outlined">
                        add
                    </span><span>Add a card</span></button>
            </div>
        </section>
    </section>
</template>
<script>
import { utilService } from '../../../services/util.service';
import taskPreview from '../task-cmps/task-preview.cmp.vue'
// import { DndProvider } from 'vue3-dnd'
// import { HTML5Backend } from 'react-dnd-html5-backend'
// import draggable from 'vuedraggable'
export default {
    props: {
        group: Object,
        boardId: String,
    },
    name: 'group-details',
    components: {
        taskPreview,
        // draggable,

    },
    data() {
        return {
            isAddTask: false,
            taskToEdit: {
                title: '',
                members: [],
                comments: [],
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
            const newActivity = utilService.setActivity(`added ${this.taskToEdit.title} to ${this.group.title}`, this.taskToEdit)
            if (!boardToSave.activities) boardToSave.activities = [newActivity]
            else boardToSave.activities.unshift(newActivity)
            console.log(boardToSave);
            await this.$store.dispatch({ type: 'saveTask', board: boardToSave, groupId: this.group.id, taskToSave: this.taskToEdit })
            this.taskToEdit = {
                title: '',
                members: [],
                labels: [],
                position: null
            }
        },
        async updateGroup() { // need to get old title on blur
            const groupToEdit = JSON.parse(JSON.stringify(this.group))
            if (!groupToEdit.title) {
                return
            } else {
                const boardToSave = JSON.parse(JSON.stringify(this.board))
                await this.$store.dispatch({ type: 'saveGroup', board: boardToSave, groupToEdit: groupToEdit })
            }


        },
        async removeGroup() {
            const boardToSave = JSON.parse(JSON.stringify(this.board))
            const groupId = this.group.id
            const newActivity = utilService.setActivity(`removed ${this.group.title} from this board`, null)
            boardToSave.activities.unshift(newActivity)
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
.on-drag {
    background-color: blue;
    color: blueviolet;
    z-index: 100;
}
</style>