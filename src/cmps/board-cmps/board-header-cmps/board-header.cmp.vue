<template>
    <header class="board-header flex align-center">
        <div class="board-header-actions flex align-center space-between">

            <section class="start-section flex align-center">
                <div class="title-container">
                    <button class="title" contenteditable="true" @blur="ChangeBoardTitle($event)">{{ board.title
                    }}</button>
                </div>
                <button v-if="board.isStarred" class="star active opacity-input" @click="toggleStarred()"></button>
                <button v-else class="star  opacity-input" @click="toggleStarred()"></button>
                <span class="btn-divider">|</span>
                <!-- <button @click="isDashboard = true" class="board opacity-input">DashBoard</button> -->
                <!-- <button class="table opacity-input">Table</button> -->
            </section>

            <section class="end-section">
                <button @click.stop="toggleFilter()" class="filter-btn opacity-input">
                    <span style="font-size:15px;" class="material-symbols-outlined">
                        filter_list
                    </span>Filter</button>
                <!-- <span class="btn-divider">|</span> -->
                <button @click.stop="toggleFilter()" class="filter-btn only-icon opacity-input">
                    <span style="font-size:15px;" class="material-symbols-outlined">
                        filter_list
                    </span></button>
                <span class="btn-divider">|</span>
                <section class="members">
                    <div v-if="boardMembers" v-for="boardMember in boardMembers" class="member">
                        <img v-if="boardMember.imgUrl" :src="boardMember.imgUrl" alt="" />
                    </div>
                </section>

                <button @click.stop="openShare" class="share-btn">
                    Share</button><span class="btn-divider">|</span>
                <button @click.stop="toggleMenu" class="menu-btn opacity-input"></button>

            </section>
        </div>

    </header>

    <dashboard v-if="isDashboard" @closeDashboard="isDashboard = false" />
    <!-- <section class="header-modals">
        <share-modal @closeShareModal="isShareModal = false" v-if="isShareModal" />
    </section> -->
</template>
<script>
import dashboard from '../dashboard.cmp.vue'
// import shareModal from '../../../cmps/board-cmps/board-header-cmps/share-modal.cmp.vue'
export default {
    // props: ['board'],
    name: 'board-header',
    emits: ['toggleMenu', 'toggleFilter', 'openShare'],
    components: {
        // shareModal,
        dashboard,
    },
    data() {
        return {
            isDashboard: false,
        }
    },
    created() { },
    methods: {
        toggleFilter() {
            this.$emit('toggleFilter')
        },
        toggleMenu() {
            this.$emit('toggleMenu')
        },
        openShare() {
            this.$emit('openShare')
        },
        ChangeBoardTitle(ev) {
            const board = JSON.parse(JSON.stringify(this.board))
            let newTitle
            if (!ev.target.innerText) {
                ev.target.innerText = board.title
                return
            } else {
                newTitle = ev.target.innerText
                board.title = newTitle
                this.$store.dispatch({ type: 'saveBoard', board })
            }
        },
        toggleStarred() {
            const board = JSON.parse(JSON.stringify(this.board))
            board.isStarred = !board.isStarred
            this.$store.dispatch({ type: 'saveBoard', board })
        }
    },
    computed: {
        users() {
            return this.$store.getters.users
        },
        board() {
            return this.$store.getters.board
        },
        boardMembers() {
            let members = this.users?.filter(user => {
                return this.board?.memberIds?.includes(user._id)
            })
            if (members) {
                return members
            }
            return ''
        }
    },
    unmounted() { },
};
</script>
<style>

</style>