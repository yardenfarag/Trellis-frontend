<template>
    <section :style="{ background: board.style.bgc, backgroundSize: 'cover' }" v-if="board" class="board-details">
        <!-- <img id="i" src="../assets/icon.png" alt=""> -->
        <board-header @toggleMenu="toggleMenu" v-if="board" :board="board"></board-header>
        <ul class="clean-list flex group-list">
            <li v-for="group in board.groups" :key="group.id">
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
    </section>
    <router-view />
</template>

<script>
import boardHeader from '../cmps/board-cmps/board-header-cmps/board-header.cmp.vue';
import groupDetails from '../cmps/board-cmps/group-cmps/group-details.cmp.vue'
import boardMenu from '../cmps/board-cmps/board-menu-cmps/board-menu.cmp.vue';
export default {
    name: 'board-details',
    components: {
        groupDetails,
        boardHeader,
        boardMenu,
    },
    data() {
        return {
            titleVis: false,
            isMenuOpen: false,
            isAddGroup: false,
            groupToSave: {
                title: '',
                style: {},
                tasks: [],
            }
        };
    },
    async created() {
        const { boardId } = this.$route.params
        if (!this.$store.getters.board) await this.$store.dispatch({ type: 'setCurrBoard', boardId })
    },
    methods: {
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
            await this.$store.dispatch({ type: 'saveBoard', board: boardToSave })
            await this.$store.dispatch({ type: 'setHeaderClr', color: avgColor })
        },
        async changeBackgroundColor(color) {
            const boardToSave = JSON.parse(JSON.stringify(this.board))
            boardToSave.style.bgc = color
            await this.$store.dispatch({ type: 'saveBoard', board: boardToSave })
            await this.$store.dispatch({ type: 'setHeaderClr', color })
        },
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen
        },
        async addGroup() {
            if (!this.groupToSave.title) return
            const boardToSave = JSON.parse(JSON.stringify(this.board))
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
            return this.$store.getters.board
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

