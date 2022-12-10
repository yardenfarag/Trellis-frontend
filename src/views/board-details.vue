<template>
    <section :style="{ background: board.style.bgc, backgroundSize: 'cover' }" v-if="board" class="board-details">
        <board-header @openShare="(isShareOpen = true)" @openFilter="openFilter" @closeFilter="closeFilter"
            @toggleMenu="toggleMenu" v-if="board"></board-header>
        <Container non-drag-area-selector="drag-disabled" :drop-placeholder="{ className: 'task-preview ghost' }"
            @drop="onGroupDrop" :get-child-payload="getChildPayload" group-name="trello-group" drop-class="drop-preview"
            drag-class="drag-preview" class="clean-list flex group-list" orientation="horizontal">
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
                    <input v-if="titleVis" ref="title" v-model="groupTitle" type="text"
                        placeholder="Enter list title...">
                    <div class="add-group-controler">
                        <button @click="addGroup" class="call-to-action">Add List</button>
                        <span @click="isAddGroup = false" class="close-add-group material-symbols-outlined">
                            close
                        </span>
                    </div>
                </section>
            </li>
        </Container>
        <board-menu @openTask="openTask" @changeBackgroundImg="changeBackgroundImg"
            @changeBackgroundColor="changeBackgroundColor" @toggleMenu="toggleMenu" v-if="isMenuOpen">
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
            dndActivity: '',
            boardToEdit: null,
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
        this.boardToEdit = JSON.parse(JSON.stringify(this.board))

        socketService.on(SOCKET_EVENT_CHANGE_BOARD, this.updateBoardFromSocket)

        socketService.emit(SOCKET_EVENT_SET_BOARD, this.board._id)
    },
    methods: {
        openTask(task) {
            const taskId = task.id
            // this.$router.push('/board/' + this.boardId + '/' + this.groupId + '/' + taskId)
        },
        getChildPayload(index) {
            return this.boardToEdit.groups[index]
        },
        closeFilter() {
            this.isFilterOpen = false
        },
        openFilter(ev) {
            const elPos = ev.target.getBoundingClientRect()
            const top = elPos.top + elPos.height + 8
            const right = elPos.right
            this.modalPos = { top, right }
            this.isFilterOpen = true
        },
        updateBoardFromSocket(board) {
            this.$store.commit({ type: 'saveBoard', board })
        },
        onGroupDrop(ev) {
            // this.boardToEdit = JSON.parse(JSON.stringify(this.board))
            const dragIdx = ev.removedIndex
            const dropIdx = ev.addedIndex
            const dragGroup = ev.payload
            console.log(ev, dragIdx, dropIdx, dragGroup)
            this.boardToEdit.groups.splice(dragIdx, 1)
            this.boardToEdit.groups.splice(dropIdx, 0, dragGroup)
            this.$store.dispatch({ type: 'saveBoard', board: JSON.parse(JSON.stringify(this.boardToEdit)) })
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
        // focusOnTitle() {
        //     this.$refs.title.focus()
        // },
        openAddGroup() {
            this.titleVis = true
            this.isAddGroup = true
            this.$nextTick(() => {
                this.$refs.title.focus()
            })
        },
        async saveThisBoard(activityTxt) {
            await this.$store.dispatch({ type: 'saveBoard', board: this.board, activityTxt })
        },
        async changeBackgroundImg(imgUrl, tinyImgUrl, avgColor) {
            this.board.style.bgc = `url(${imgUrl})`
            this.board.style.headerClr = avgColor
            this.board.style.preview = `url(${tinyImgUrl})`
            let activityTxt = `changed this board cover`
            this.saveThisBoard(activityTxt)
        },
        async changeBackgroundColor(color) {
            this.board.style.bgc = color
            this.board.style.headerClr = color
            this.board.style.preview = color
            let activityTxt = `changed this board cover`
            this.saveThisBoard(activityTxt)
        },
        toggleFilter() {
            this.isFilterOpen = !this.isFilterOpen
        },
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen
        },
        addGroup() {
            if (!this.groupTitle) return
            this.board.groups.push(utilService.getEmptyGroup(this.groupTitle))
            let activityTxt = `added ${this.groupTitle} to this board`
            this.saveThisBoard(activityTxt)
            this.groupTitle = ''
            this.$nextTick(() => {
                this.$refs.title.focus()
            })
        },
    },
    computed: {
        board() {
            let board = JSON.parse(JSON.stringify(this.$store.getters.board))
            const loggedinUser = this.$store.getters.loggedinUser
            const regex = new RegExp(this.filterBy.txt, 'i')


            // function filterTasks(condition, key, board) {
            //     if (key === 'memberIds' || key === 'labels') {

            //         board.groups.forEach(group => {
            //             return group.tasks.filter(task => {
            //                 if (condition.id || condition._id) {
            //                     if (task[key].find(arrItem => arrItem.id === condition)) {
            //                         return task
            //                     }
            //                 } else {
            //                     if (!condition.length) {
            //                         return task
            //                     } else {
            //                         condition.forEach(item => {
            //                             return task[key].includes(item)
            //                         })
            //                     }
            //                 }
            //             })
            //         })
            //     }
            //     return board
            // }




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
