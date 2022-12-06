<template>
    <section :style="{ background: board.style.bgc, backgroundSize: 'cover' }" v-if="board" class="board-details">
        <board-header @toggleFilter="toggleFilter" @toggleMenu="toggleMenu" v-if="board"></board-header>
        <Container :drop-placeholder="{ className: 'task-preview ghost' }" @drop="onGroupDrop" group-name="trello-group"
            drop-class="drop-preview" drag-class="drag-preview" class="clean-list flex group-list"
            orientation="horizontal">
            <Draggable class="group-item" v-if="board" v-for="group in board.groups" :key="group.id">
                <group-details @saveTaskDrop="saveTaskDrop" :txt="filterBy.txt" :group="group" :boardId="board._id" />
            </Draggable>

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
                    <input v-if="titleVis" ref="title" v-model="groupTitle" type="text" placeholder="Enter list title">
                    <div class="add-group-controler">
                        <button @click="addGroup" class="call-to-action">Add List</button>
                        <span @click="isAddGroup = false" class="close-add-group material-symbols-outlined">
                            close
                        </span>
                    </div>
                </section>
            </li>
        </Container>
        <board-menu @changeBackgroundImg="changeBackgroundImg" @changeBackgroundColor="changeBackgroundColor"
            @toggleMenu="toggleMenu" v-if="isMenuOpen">
        </board-menu>
        <task-filter v-if="isFilterOpen" @setFilterBy="setFilterBy" @closeFilter="toggleFilter">
        </task-filter>
    </section>
    <router-view />
</template>

<script>
import boardHeader from '../cmps/board-cmps/board-header-cmps/board-header.cmp.vue'
import groupDetails from '../cmps/board-cmps/group-cmps/group-details.cmp.vue'
import boardMenu from '../cmps/board-cmps/board-menu-cmps/board-menu.cmp.vue'
import { Container, Draggable } from "vue3-smooth-dnd"
import taskFilter from '../cmps/board-cmps/board-header-cmps/task-filter.cmp.vue'
import { socketService } from '../services/socket.service'
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
            boardToEdit: null,
            editTitle: false,
            groupTitle: '',
            titleVis: false,
            isFilterOpen: false,
            isMenuOpen: false,
            isAddGroup: false,
            groupToSave: {
                title: '',
                style: {},
                tasks: [],
            },
            // board: null,
            filterBy: {
                txt: '',
            },
        }
    },
    async created() {
        const { boardId } = this.$route.params

        // socketService.emit('board room', boardId)
        // socketService.emit('setMemberJoin', this.$store.getters.loggedinUser?._id || '')

        await this.$store.dispatch({ type: 'setCurrBoard', boardId })
        this.boardToEdit = JSON.parse(JSON.stringify(this.board))
    },
    methods: {
        async onGroupDrop(ev) {
            const dragIdx = ev.removedIndex
            const dropIdx = ev.addedIndex
            const dragGroup = this.boardToEdit.groups[ev.removedIndex]
            const dropGroup = this.boardToEdit.groups[ev.addedIndex]
            await this.boardToEdit.groups.splice(dragIdx, 1)
            await this.boardToEdit.groups.splice(dropIdx, 0, dragGroup)
            // this.$store.commit({ type: 'setCurrBoard', board: JSON.parse(JSON.stringify(this.boardToEdit)) })
            await this.$store.dispatch({ type: 'saveBoard', board: JSON.parse(JSON.stringify(this.boardToEdit)) })
        },
        async saveTaskDrop({ ev, groupId }) {
            // const board = this.board
            const group = this.boardToEdit.groups.find((group) => group.id === groupId)

            if (ev.removedIndex !== null) group.tasks.splice(ev.removedIndex, 1)

            if (ev.addedIndex !== null) group.tasks.splice(ev.addedIndex, 0, ev.payload)
            // this.$store.commit({ type: 'setCurrBoard', board: JSON.parse(JSON.stringify(this.boardToEdit)) })

            await this.$store.dispatch({ type: "saveBoard", board: JSON.parse(JSON.stringify(this.boardToEdit)) })
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
            this.boardToEdit.style.bgc = `url(${imgUrl})`
            this.boardToEdit.style.headerClr = avgColor
            // const newActivity = utilService.setActivity(`changed this board cover`, null)
            // if (this.board.activities) {
            //     this.board.activities.unshift(newActivity)
            // } else {
            //     this.board.activities = [newActivity]
            // }
            await this.$store.dispatch({ type: 'saveBoard', board: this.boardToEdit })
        },
        async changeBackgroundColor(color) {
            this.boardToEdit.style.bgc = color
            this.boardToEdit.style.headerClr = color
            // const newActivity = utilService.setActivity(`changed this board cover`, null)
            // if (this.boardToEdit.activities) {
            //     this.board.activities.unshift(newActivity)
            // } else {
            //     this.board.activities = [newActivity]
            // }
            await this.$store.dispatch({ type: 'saveBoard', board: this.boardToEdit })
        },
        toggleFilter() {
            this.isFilterOpen = !this.isFilterOpen
        },
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen
        },
        async addGroup() {
            if (!this.groupTitle) return
            await this.$store.dispatch({ type: 'addGroup', title: this.groupTitle })
            this.groupTitle = ''
        },
    },
    computed: {
        board() {
            return this.$store.getters.board
        }
    },
    mounted() {
        document.querySelector('#app').classList.add('board-page')
    },
    unmounted() {
        document.querySelector('#app').classList.remove('board-page')
    },
    // watch: {
    //     boardFromStore: {
    //         handler() {
    //             this.board = this.boardFromStore
    //         },
    //         deep: true,
    //     },
    // },
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
