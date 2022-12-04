<template>
    <section :style="{ background: board.style.bgc, backgroundSize: 'cover' }" v-if="board" class="board-details">
        <!-- <img id="i" src="../assets/icon.png" alt=""> -->
        <board-header @toggleFilter="toggleFilter" @toggleMenu="toggleMenu" v-if="board"></board-header>
        <ul class="clean-list flex group-list">
            <li class="group-item" v-if="board" v-for="group in board.groups" :key="group.id">
                <group-details :group="group" :boardId="board._id" />
            </li>
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
        </ul>
        <board-menu @changeBackgroundImg="changeBackgroundImg" @changeBackgroundColor="changeBackgroundColor"
            @toggleMenu="toggleMenu" v-if="isMenuOpen">
        </board-menu>
        <task-filter v-if="isFilterOpen" @setFilterBy="setFilterBy" @closeFilter="toggleFilter">
        </task-filter>
    </section>
    <router-view />
</template>

<script>
// import { DndProvider } from 'vue3-dnd'
// import { useDrag, useDrop, useDragLayer } from 'vue3-dnd'
import { utilService } from '../services/util.service.js'
import boardHeader from '../cmps/board-cmps/board-header-cmps/board-header.cmp.vue';
import groupDetails from '../cmps/board-cmps/group-cmps/group-details.cmp.vue'
import boardMenu from '../cmps/board-cmps/board-menu-cmps/board-menu.cmp.vue';
import taskFilter from '../cmps/board-cmps/board-header-cmps/task-filter.cmp.vue';
export default {
    name: 'board-details',
    components: {
        groupDetails,
        boardHeader,
        boardMenu,
        taskFilter,
        // DndProvider,
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
            filterBy: null,
        };
    },
    async created() {
        const { boardId } = this.$route.params
        await this.$store.dispatch({ type: 'setCurrBoard', boardId })
        // this.boardToShow = this.board
    },
    methods: {
        setFilterBy(filterBy) {
            this.filterBy = filterBy
            this.setBoardToShow()
        },
        setBoardToShow() {
            const regex = new RegExp(this.filterBy.txt, 'i')
            if (this.filterBy.txt) {
                console.log('hi from inside');
                this.board.groups.forEach(group => {
                    return group.tasks = group.tasks.filter(task => regex.test(task.title))
                })
                console.log(this.board);
            }
        },
        focusOnTitle() {
            this.$refs.title.focus()
        },
        openAddGroup() {
            this.titleVis = true
            this.isAddGroup = true
            this.$nextTick(() => {
                this.focusOnTitle();
            });
        },
        async changeBackgroundImg(imgUrl, avgColor) {
            const boardToSave = JSON.parse(JSON.stringify(this.board))
            boardToSave.style.bgc = `url(${imgUrl})`
            boardToSave.style.headerClr = avgColor
            const newActivity = utilService.setActivity(`changed this board cover`, null)
            if (boardToSave.activities) {
                boardToSave.activities.unshift(newActivity)
            } else {
                boardToSave.activities = [newActivity]
            }
            await this.$store.dispatch({ type: 'saveBoard', board: boardToSave })
        },
        async changeBackgroundColor(color) {
            const boardToSave = JSON.parse(JSON.stringify(this.board))
            boardToSave.style.bgc = color
            boardToSave.style.headerClr = color
            const newActivity = utilService.setActivity(`changed this board cover`, null)
            if (boardToSave.activities) {
                boardToSave.activities.unshift(newActivity)
            } else {
                boardToSave.activities = [newActivity]
            }
            await this.$store.dispatch({ type: 'saveBoard', board: boardToSave })
        },
        toggleFilter() {
            this.isFilterOpen = !this.isFilterOpen
        },
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen
        },
        async addGroup() {
            if (!this.groupToSave.title) return
            const boardToSave = JSON.parse(JSON.stringify(this.board))
            const newActivity = utilService.setActivity(`added ${this.groupToSave.title} to this board`, null)
            boardToSave.activities.unshift(newActivity)
            await this.$store.dispatch({ type: 'saveGroup', board: boardToSave, groupToEdit: this.groupToSave })
            this.groupToSave = {
                title: '',
                style: {},
                tasks: [],
            }
        }
    },
    computed: {
        board() {
            return JSON.parse(JSON.stringify(this.$store.getters.board))
        }
    },
    mounted() {
        document.querySelector('html').classList.add('board-page')
    },
    unmounted() {
        document.querySelector('html').classList.remove('board-page')
    },
}
</script>

