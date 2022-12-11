<template>
    <section @click="onBoardClick" :style="{ background: board.style.bgc, backgroundSize: 'cover' }" v-if="board"
        class="board-details">
        <board-header @openShare="(isShareOpen = true)" @toggleFilter="toggleFilter" @closeFilter="closeFilter"
            @toggleMenu="toggleMenu" v-if="board"></board-header>
        <Container non-drag-area-selector="drag-disabled" :drop-placeholder="{ className: 'task-preview ghost' }"
            @drop="onGroupDrop" :get-child-payload="getChildPayload" group-name="trello-group" drop-class="drop-preview"
            drag-class="drag-preview" class="clean-list flex group-list" orientation="horizontal">
            <Draggable class="group-item" v-if="board" v-for="(group, idx) in board.groups" :key="group.id">
                <group-details ref="groupDetails" :gTaskTitle="taskTitle" @closeAllAddTask="closeAllAddTask"
                    @updateTaskTitle="updateTaskTitle" @saveBoard="saveBoard" @saveTaskDrop="saveTaskDrop"
                    :txt="filterBy.txt" :group="group" :boardId="board._id" :board="board" />
            </Draggable>

            <li>
                <div v-if="!isAddGroup" @click.stop="openAddGroup" class="btn-open-add-group opacity-input">
                    <div class="cont">
                        <span style="font-size:22px;" class="plus material-symbols-outlined">
                            add
                        </span>
                        <span class="title">Add another list </span>
                    </div>
                </div>
                <section @click.stop="" v-if="isAddGroup" class="add-group-open">
                    <input v-if="titleVis" ref="title" v-model="groupTitle" type="text"
                        placeholder="Enter list title...">
                    <div class="add-group-controler">
                        <button @click="addGroup" class="call-to-action">Add List</button>
                        <span @click="closeAddGroup" class="close-add-group material-symbols-outlined">
                            close
                        </span>
                    </div>
                </section>
            </li>
        </Container>
        <board-menu @changeBackgroundImg="changeBackgroundImg" @changeBackgroundColor="changeBackgroundColor"
            @toggleMenu="toggleMenu" v-if="isMenuOpen">
        </board-menu>
        <task-filter v-if="isFilterOpen" @setFilterBy="setFilterBy" @closeFilter="(isFilterOpen = false)"
            :pos="modalPos">
        </task-filter>
        <share-modal @closeShareModal="isShareOpen = false" v-if="isShareOpen" />
    </section>
    <router-view />
</template>

<script>
import shareModal from '../cmps/board-cmps/board-header-cmps/share-modal.cmp.vue'
import boardHeader from '../cmps/board-cmps/board-header-cmps/board-header.cmp.vue'
import groupDetails from '../cmps/board-cmps/group-cmps/group-details.cmp.vue'
import boardMenu from '../cmps/board-cmps/board-menu-cmps/board-menu.cmp.vue'
import { Container, Draggable } from "vue3-smooth-dnd"
import taskFilter from '../cmps/board-cmps/board-header-cmps/task-filter.cmp.vue'
import { socketService, SOCKET_EVENT_CHANGE_BOARD, SOCKET_EVENT_SET_BOARD } from '../services/socket.service'
import { utilService } from '../services/util.service.js'
export default {
    name: 'board-details',
    components: {
        groupDetails,
        boardHeader,
        boardMenu,
        taskFilter,
        Container,
        Draggable,
        shareModal,
    },
    data() {
        return {
            gTaskTitle: '',

            dndActivity: '',
            editTitle: false,
            groupTitle: '',
            titleVis: false,
            isFilterOpen: false,
            isMenuOpen: false,
            isShareOpen: false,
            isAddGroup: false,
            modalPos: null,
            groupToSave: {
                title: '',
                style: {},
                tasks: [],
            },
            // board: null,
            filterBy: {
                txt: '',
                memberIds: [],
                isMyTask: false,
                isNoMembers: false,
            }
        }
    },
    async created() {
        const { boardId } = this.$route.params
        await this.$store.dispatch({ type: 'setCurrBoard', boardId })

        socketService.on(SOCKET_EVENT_CHANGE_BOARD, this.updateBoardFromSocket)

        socketService.emit(SOCKET_EVENT_SET_BOARD, this.board._id)
    },
    methods: {
        getChildPayload(index) {
            return this.board.groups[index]
        },
        closeAddGroup() {
            this.isAddGroup = false
            // this.groupTitle = '' ???
        },
        onBoardClick() {
            this.isFilterOpen = false
            this.closeAddGroup
            this.addTaskFromBoardClick()
        },
        addTaskFromBoardClick() {
            for (var i = 0; i < this.board.groups.length; i++) {
                if (this.$refs.groupDetails[i].isAddTask) this.$refs.groupDetails[i].addTask()
            }
        },
        closeAllAddTask() {
            for (var i = 0; i < this.board.groups.length; i++) {
                this.$refs.groupDetails[i].closeAddTask()
            }
            this.closeAddGroup()
        },
        updateTaskTitle(title) {
            this.gTaskTitle = title
        },
        closeFilter() {
            this.isFilterOpen = false
        },
        toggleFilter() {
            this.isFilterOpen = !this.isFilterOpen
        },
        updateBoardFromSocket(board) {
            this.$store.commit({ type: 'saveBoard', board })
        },
        async onGroupDrop(ev) {
            if (ev.removedIndex !== null) {
                this.board.groups.splice(ev.removedIndex, 1)
            }
            if (ev.addedIndex !== null) {
                this.board.groups.splice(ev.addedIndex, 0, ev.payload)
            }
            await this.$store.dispatch({ type: "saveBoard", board: this.board, activityTxt: this.dndActivity, task: ev.payload })
        },
        async saveTaskDrop({ ev, groupId }) {
            const group = this.board.groups.find((group) => group.id === groupId)
            if (ev.removedIndex !== null) {
                group?.tasks?.splice(ev.removedIndex, 1)
                this.dndActivity = `moved ${ev.payload.title} from ${group.title}`
            }
            if (ev.addedIndex !== null) {
                this.dndActivity += ` to ${group.title}`
                group?.tasks?.splice(ev.addedIndex, 0, ev.payload)
            }
            await this.$store.dispatch({ type: "saveBoard", board: this.board, activityTxt: this.dndActivity, task: ev.payload })
        },
        setFilterBy(filterBy) {
            this.filterBy = filterBy
        },
        openAddGroup() {
            this.titleVis = true
            this.isAddGroup = true
            this.$nextTick(() => {
                this.$refs.title.focus()
            })
        },
        async saveBoard(board, activityTxt, task) {
            await this.$store.dispatch({ type: 'saveBoard', board, activityTxt, task })
        },
        async saveThisBoard(activityTxt) {
            await this.$store.dispatch({ type: 'saveBoard', board: this.board, activityTxt })
        },

        async changeBackgroundImg(imgUrl, tinyImgUrl, avgColor) {
            this.board.style.bgc = `url(${imgUrl})`
            this.board.style.headerClr = avgColor
            this.board.style.preview = `url(${tinyImgUrl})`
            let activityTxt = `changed this board cover`
            await this.saveThisBoard(this.board, activityTxt)
        },
        async changeBackgroundColor(color) {
            this.board.style.bgc = color
            this.board.style.headerClr = color
            this.board.style.preview = color
            let activityTxt = `changed this board cover`
            await this.saveThisBoard(this.board, activityTxt)
        },
        toggleFilter() {
            this.isFilterOpen = !this.isFilterOpen
        },
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen
        },
        async addGroup() {
            if (!this.groupTitle) return
            this.board.groups.push(utilService.getEmptyGroup(this.groupTitle))
            let activityTxt = `added ${this.groupTitle} to this board`
            await this.saveThisBoard(this.board, activityTxt)
            this.groupTitle = ''
            this.$nextTick(() => {
                this.$refs.title.focus()
            })
        },
    },
    computed: {
        taskTitle() {
            return this.gTaskTitle
        },
        board() {
            let board = JSON.parse(JSON.stringify(this.$store.getters.board))
            const loggedinUser = this.$store.getters.loggedinUser
            const regex = new RegExp(this.filterBy.txt, 'i')

            if (this.filterBy.txt) {
                board.groups.forEach(group => {
                    return group.tasks = group.tasks.filter(task => regex.test(task.title))
                })
            }
            if (this.filterBy.isMyTask) {
                board.groups.forEach(group => {
                    return group.tasks = group.tasks.filter(task => {
                        if (task.memberIds.find(memberId => memberId === loggedinUser._id)) {
                            return task
                        }
                    })
                })
            }

            if (this.filterBy.isNoMembers) {
                board.groups.forEach(group => {
                    return group.tasks = group.tasks.filter(task => !task.memberIds.length)
                })
            }
            if (this.filterBy.memberIds.length) {
                this.filterBy.memberIds.forEach(memberId => {
                    board.groups.forEach(group => {
                        return group.tasks = group.tasks.filter(task => {
                            return task.memberIds.includes(memberId)
                        })
                    })
                })
            }
            return board
        },
    },
    mounted() {
        document.querySelector('#app').classList.add('board-page')
    },
    unmounted() {
        socketService.off(SOCKET_EVENT_CHANGE_BOARD, this.updateBoardFromSocket)
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
