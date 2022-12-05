<template>
    <section class="group-wrapper">
        <section class="group-details">
            <div class="group-header">
                <textarea rows="1" class="group-title" v-model="newTitle"
                    @blur="updateGroup()">{{ group.title }}</textarea>
                <span @click="removeGroup" class="btn-group-actions"></span>
            </div>
            <!-- <button class="btn-group-actions">...</button> -->
            <Container :drop-placeholder="{ class: 'placeholder' }" :get-child-payload="getChildPayload"
                @drop="onTaskDrop(group, $event)" group-name="task" class="clean-list task-list"
                drag-class="drag-preview">
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
            newTitle: this.group.title,
            isAddTask: false,
            boardToShow: null,
            taskToEdit: {
                title: '',
                members: [],
                comments: [],
                labels: [],
                position: null,
                isFilter: false,
            }
        }
    },
    async created() {
        const { boardId } = this.$route.params
        await this.$store.dispatch({ type: 'setCurrBoard', boardId })
        this.boardToShow = JSON.parse(JSON.stringify(this.$store.getters.board))
    },
    methods: {
        getChildPayload(index) {
            return this.group.tasks[index]
        },
        async onTaskDrop(currGroup, dropResult) {
            // console.table('currGroup:', currGroup.tasks);
            // console.log(dropResult);
            const groupIdx = this.boardToSave.groups.findIndex(group => group.id === currGroup.id)
            const { removedIndex, addedIndex, payload } = dropResult
            if (removedIndex === null && addedIndex === null) {
                return
            }

            const result = JSON.parse(JSON.stringify(currGroup))
            // console.table(result.tasks)
            let itemToAdd = payload

            if (removedIndex !== null) {
                itemToAdd = result.tasks.splice(removedIndex, 1)[0]
            }
            if (addedIndex !== null) {
                // console.log('task that was dragged:', itemToAdd);
                result.tasks.splice(addedIndex, 0, itemToAdd)
            }

            this.boardToSave.groups[groupIdx] = result
            console.table(this.boardToSave.groups[0].tasks)
            console.table(this.boardToSave.groups[1].tasks)
            // console.table(this.boardToSave.groups[groupIdx].tasks)
            await this.$store.dispatch({
                type: 'saveBoard', board: this.boardToSave
            })
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
            const newActivity = utilService.setActivity(`added ${this.taskToEdit.title} to ${this.group.title}`, this.taskToEdit)
            if (!this.boardToShow.activities) this.boardToShow.activities = [newActivity]
            else this.boardToShow.activities.unshift(newActivity)

            const groupIdx = this.boardToShow.groups.findIndex(group => group.id === this.group.id)
            const groupToSave = JSON.parse(JSON.stringify(this.group))

            groupToSave.tasks.push(this.taskToEdit)
            this.boardToShow.groups.splice(groupIdx, 1, groupToSave)
            this.$emit('updateGroup', groupToSave)
            await this.$store.dispatch({ type: 'saveTask', boardId: this.boardToShow._id, groupId: this.group.id, taskToSave: this.taskToEdit })
            this.taskToEdit = {
                title: '',
                members: [],
                labels: [],
                position: null
            }
        },
        async updateGroup() {
            const groupToEdit = JSON.parse(JSON.stringify(this.group))
            if (!this.newTitle) {
                this.newTitle = this.group.title
                return
            } else {
                groupToEdit.title = this.newTitle
                const groupIdx = this.boardToShow.groups.findIndex(group => group.id === this.group.id)
                this.boardToShow.groups.splice(groupIdx, 1, groupToEdit)
                await this.$store.dispatch({ type: 'saveGroup', boardId: this.boardToShow._id, groupToEdit: groupToEdit })
            }


        },
        async removeGroup() {
            const newActivity = utilService.setActivity(`removed ${this.group.title} from this board`, null)
            // this.boardToSave.activities.unshift(newActivity)
            this.$emit('removeGroup', this.group.id)
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