<template>
    <section :style="{ background: board.style.bgc, backgroundSize: 'cover' }" v-if="board" class="board-details">
        <!-- <img id="i" src="../assets/icon.png" alt=""> -->
        <board-header @toggleFilter="toggleFilter" @toggleMenu="toggleMenu" v-if="board"></board-header>
        <!-- <ul class="clean-list flex group-list"> -->
        <Container @drop="onGroupDrop" group-name="trello-group" drop-class="drop-preview" drag-class="drag-preview"
            class="clean-list flex group-list" orientation="horizontal">
            <!-- <li class="group-item" v-if="board" v-for="group in board.groups" :key="group.id">
                <group-details :txt="filterBy.txt" :group="group" :boardId="board._id" />
            </li> -->
            <Draggable class="group-item" v-if="boardToShow" v-for="group in boardToShow.groups" :key="group.id">
                <group-details @saveTaskDrop="saveTaskDrop" @removeGroup="removeGroup" @updateGroup="updateGroup"
                    :txt="filterBy.txt" :group="group" :boardId="boardToShow._id" />
            </Draggable>
        </Container>
        <li>
            <div v-if="!isAddGroup" @click="openAddGroup" class="btn-open-add-group opacity-input">
                <div class="cont">
                    <span style="font-size:22px;" class="plus material-symbols-outlined">
                        add
                    </span>
                    <span class="title">Add another list </span>
                </div>
            </div>
            <section v-if="isAddGroup" class="add-group-open">
                <input v-if="titleVis" ref="title" v-model="groupToSave.title" type="text"
                    placeholder="Enter list title">
                <div class="add-group-controler">
                    <button @click="addGroup" class="call-to-action">Add List</button>
                    <span @click="isAddGroup = false" class="close-add-group material-symbols-outlined">
                        close
                    </span>
                </div>
            </section>
        </li>
        <!-- </ul> -->
        <board-menu @changeBackgroundImg="changeBackgroundImg" @changeBackgroundColor="changeBackgroundColor"
            @toggleMenu="toggleMenu" v-if="isMenuOpen">
        </board-menu>
        <task-filter v-if="isFilterOpen" @setFilterBy="setFilterBy" @closeFilter="toggleFilter">
        </task-filter>
    </section>
    <router-view />
</template>

<script>
import { utilService } from '../services/util.service.js'
import boardHeader from '../cmps/board-cmps/board-header-cmps/board-header.cmp.vue'
import groupDetails from '../cmps/board-cmps/group-cmps/group-details.cmp.vue'
import boardMenu from '../cmps/board-cmps/board-menu-cmps/board-menu.cmp.vue'
import { Container, Draggable } from "vue3-smooth-dnd"
import taskFilter from '../cmps/board-cmps/board-header-cmps/task-filter.cmp.vue'
import { eventBus } from '../services/event-bus.service'
export default {
    name: 'board-details',
    components: {
        groupDetails,
        boardHeader,
        boardMenu,
        taskFilter,
        Container,
        Draggable,
    },
    data() {
        return {
            titleVis: false,
            isFilterOpen: false,
            isMenuOpen: false,
            isAddGroup: false,
            groupToSave: {
                title: '',
                style: {},
                tasks: [],
            },
            boardToShow: null,
            filterBy: {
                txt: '',
            },
        }
    },
    async created() {
        const { boardId } = this.$route.params
        await this.$store.dispatch({ type: 'setCurrBoard', boardId })
        this.boardToShow = JSON.parse(JSON.stringify(this.$store.getters.board))
        eventBus.on('removeTask', ({ boardId, groupId, taskId }) => {
            this.removeTask({ boardId, groupId, taskId })
        })
        eventBus.on('saveTask', ({ boardId, groupId, taskToEdit }) => {
            this.saveTask({ boardId, groupId, taskToEdit })
        })
    },
    methods: {
        async onGroupDrop(ev) {
            const dragIdx = ev.removedIndex
            const dropIdx = ev.addedIndex
            const dragGroup = this.boardToShow.groups[ev.removedIndex]
            const dropGroup = this.boardToShow.groups[ev.addedIndex]
            await this.boardToShow.groups.splice(dragIdx, 1)
            await this.boardToShow.groups.splice(dropIdx, 0, dragGroup)
            await this.$store.dispatch({ type: 'saveBoard', board: this.boardToShow })
        },
        async saveTaskDrop({ ev, groupId }) {
            const board = this.boardToShow
            const group = board.groups.find((group) => group.id === groupId)

            if (ev.removedIndex !== null) group.tasks.splice(ev.removedIndex, 1)

            if (ev.addedIndex !== null) group.tasks.splice(ev.addedIndex, 0, ev.payload)

            await this.$store.dispatch({ type: "saveBoard", board })
        },
        setFilterBy(filterBy) {
            this.filterBy = filterBy
        },
        focusOnTitle() {
            this.$refs.title.focus()
        },
        openAddGroup() {
            this.titleVis = true
            this.isAddGroup = true
            this.$nextTick(() => {
                this.focusOnTitle()
            })
        },
        async changeBackgroundImg(imgUrl, avgColor) {
            this.boardToShow.style.bgc = `url(${imgUrl})`
            this.boardToShow.style.headerClr = avgColor
            const newActivity = utilService.setActivity(`changed this board cover`, null)
            if (this.boardToShow.activities) {
                this.boardToShow.activities.unshift(newActivity)
            } else {
                this.boardToShow.activities = [newActivity]
            }
            await this.$store.dispatch({ type: 'saveBoard', board: this.boardToShow })
        },
        async changeBackgroundColor(color) {
            this.boardToShow.style.bgc = color
            this.boardToShow.style.headerClr = color
            const newActivity = utilService.setActivity(`changed this board cover`, null)
            if (this.boardToShow.activities) {
                this.boardToShow.activities.unshift(newActivity)
            } else {
                this.boardToShow.activities = [newActivity]
            }
            await this.$store.dispatch({ type: 'saveBoard', board: this.boardToShow })
        },
        toggleFilter() {
            this.isFilterOpen = !this.isFilterOpen
        },
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen
        },
        async addGroup() {
            if (!this.groupToSave.title) return
            const newActivity = utilService.setActivity(`added ${this.groupToSave.title} to this board`, null)
            this.boardToShow.activities.unshift(newActivity)
            this.boardToShow.groups.push(this.groupToSave)
            await this.$store.dispatch({ type: 'saveGroup', boardId: this.boardToShow._id, groupToEdit: this.groupToSave })
            this.groupToSave = {
                title: '',
                tasks: [],
            }
        },
        async updateGroup(groupToSave) {
            const groupIdx = this.boardToShow.groups.findIndex(group => group.id === groupToSave.id)
            this.boardToShow.groups.splice(groupIdx, 1, groupToSave)
            await this.$store.dispatch({ type: 'saveGroup', boardId: this.boardToShow._id, groupToEdit: groupToSave })
        },
        async removeGroup(groupId) {
            const groupIdx = this.boardToShow.groups.findIndex(group => group.id === groupId)
            this.boardToShow.groups.splice(groupIdx, 1)
            await this.$store.dispatch({ type: 'removeGroup', boardId: this.boardToShow._id, groupId, })
        },
        async removeTask({ boardId, groupId, taskId }) {
            const groupIdx = this.boardToShow.groups.findIndex(group => group.id === groupId)
            const group = this.boardToShow.groups.find(group => group.id === groupId)
            const taskIdx = group.tasks.findIndex(task => task.id === taskId)
            this.boardToShow.groups[groupIdx].tasks.splice(taskIdx, 1)
            await this.$store.dispatch({ type: 'removeTask', boardId, groupId, taskId })
        },
        async saveTask({ boardId, groupId, taskToEdit }) {
            const groupIdx = this.boardToShow.groups.findIndex(group => group.id === groupId)
            const group = this.boardToShow.groups.find(group => group.id === groupId)
            const taskIdx = group.tasks.findIndex(task => task.id === taskToEdit.id)
            this.boardToShow.groups[groupIdx].tasks.splice(taskIdx, 1, taskToEdit)
            await this.$store.dispatch({ type: 'saveTask', boardId, groupId, taskToSave: taskToEdit })
        },
    },
    computed: {
        board() {
            let board = JSON.parse(JSON.stringify(this.$store.getters.board))
            const regex = new RegExp(this.filterBy.txt, 'i')
            if (this.filterBy.txt) {
                console.log('hi from inside')
                board.groups.forEach(group => {
                    return group.tasks = group.tasks.filter(task => regex.test(task.title))
                })
            }
            return board
        }
    },
    mounted() {
        document.querySelector('#app').classList.add('board-page')
    },
    unmounted() {
        document.querySelector('#app').classList.remove('board-page')
    },
}
</script>
<style>
.drag-preview {
    transition: transform 0.18s ease;
    transform: rotateZ(5deg)
}

.drop-preview {
    transition: transform 0.18s ease-in-out;
    transform: rotateZ(0deg)
}
</style>
