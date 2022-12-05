<template>
    <section class="group-wrapper">
        <section class="group-details">
            <div class="group-header">
                <textarea rows="1" class="group-title" v-model="group.title"
                    @blur="updateGroup()">{{ group.title }}</textarea>
                <span @click="removeGroup" class="btn-group-actions"></span>
            </div>
            <!-- <button class="btn-group-actions">...</button> -->
            <Container :drop-placeholder="{ class: 'placeholder' }" :get-child-payload="getChildPayload"
                @drag-start="onDragStart(group, $event)" @drop="onTaskDrop(group, $event)" group-name="task"
                class="clean-list task-list" drag-class="drag-preview">
                <!-- <ul class="clean-list task-list"> -->
                <Draggable v-if="group.tasks" v-for="task in group.tasks" :key="task">
                    <task-preview :task="task" :boardId="boardId" :groupId="group.id" />
                    <!-- </li> -->
                </Draggable>
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
                <!-- </ul> -->
            </Container>
            <button v-if="!isAddTask" @click="openTaskForm" class="btn-open-add-task"><span style="font-size:20px;"
                    class="material-symbols-outlined">
                    add
                </span><span>Add a card</span></button>
        </section>
    </section>
</template>
<script>
import { utilService } from '../../../services/util.service';
import taskPreview from '../task-cmps/task-preview.cmp.vue'
// import { DndProvider } from 'vue3-dnd'
// import { HTML5Backend } from 'react-dnd-html5-backend'
// import draggable from 'vuedraggable'
import { Container, Draggable } from "vue3-smooth-dnd";
export default {
    props: {
        group: Object,
        boardId: String,
        txt: String,
    },
    name: 'group-details',
    components: {
        taskPreview,
        Draggable,
        Container,

    },
    data() {
        return {
            isAddTask: false,
            taskToEdit: {
                title: '',
                members: [],
                comments: [],
                labels: [],
                position: null,
                isFilter: false,
                draggingTask: {
                    group: '',
                    index: -1,
                    taskData: {},
                }

            }
        }
    },
    created() {

    },
    methods: {
        getChildPayload(index) {
            return {
                index,
            }
        },
        onDragStart(group, ev) {
            const { payload, isSource } = ev
            if (isSource) {
                this.draggingTask = {
                    group,
                    index: payload.index,
                    taskData: group.tasks[payload.index],

                }
            }
            console.log('task dragged:', this.draggingTask);
        },
        async onTaskDrop(currGroup, ev) {
            let boardToSave = JSON.parse(JSON.stringify(this.board))
            const { removedIndex, addedIndex } = ev
            if (currGroup === this.draggingTask?.group && removedIndex === addedIndex) {
                return
            }
            if (removedIndex !== null) {
                console.log('deleting that task....');
                currGroup.tasks.splice(removedIndex, 1)
                await this.$store.dispatch({ type: 'saveGroup', board: boardToSave, groupToEdit: currGroup })
            }
            if (addedIndex !== null) {
                console.log('task that was dragged:', this.draggingTask?.taskData);
                currGroup.tasks.splice(addedIndex, 0, this.draggingTask.taskData)
                await this.$store.dispatch({ type: 'saveGroup', board: boardToSave, groupToEdit: currGroup })
            }
            await this.$store.dispatch({ type: 'saveBoard', board: boardToSave })


        },
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
        },
        groupTasksCount() {
            const board = this.$store.getters.board
            const group = board.groups.find(group => group.id === this.group.id)
            const groupTasks = group.tasks
            return groupTasks.length
        }
    },
    unmounted() {

    },
};
</script>
<style>
.drag-preview {
    /* transform: rotate(4deg); */
    /* transform: rotateZ(5deg);
    transition: transform 0.18s ease; */
}

.placeholder {
    background: rgba(33, 33, 33, .08);
    width: 256px;
    height: 32px;
    position: relative;
    border-radius: 0.04rem;
    /* transform: scaleY(0.85);
    transform-origin: 0% 0%; */
}
</style>