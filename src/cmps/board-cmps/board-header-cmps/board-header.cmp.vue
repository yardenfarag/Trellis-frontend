<template>
    <header class="board-header flex align-center">
        <div class="board-header-actions flex align-center space-between">

            <section class="start-section flex align-center">
                <h3 contenteditable="true" @blur="ChangeBoardTitle($event)">{{ board.title }}</h3>
                <button class="opacity-input" @click="toggleStarred()">⭐</button>
                <button class="opacity-input">Board</button>
                <button class="opacity-input">
                    <span style="font-size:15px;" class="material-symbols-outlined">
                        table_chart
                    </span>Table
                </button>
            </section>

            <section class="end-section flex align-center">
                <button class="filter-btn opacity-input">
                    <span style="font-size:15px;" class="material-symbols-outlined">
                        filter_list
                    </span>Filter</button> |
                <section class="members flex align-center">
                    <div v-if="boardMembers" v-for="boardMember in boardMembers" class="member">
                        <img v-if="boardMember.imgUrl" :style="{ width: 30 + 'px', 'border-radius': 50 + '%' }"
                            :src="boardMember.imgUrl" alt="">
                        <p :style="{ textAlign: 'center', backgroundColor: 'lightgray', width: 21 + 'px', 'border-radius': 50 + '%' }"
                            v-else>{{
                                    user.fullname.charAt(0)
                            }}</p>
                    </div>
                </section> |
                <button @click="isShareModal = true" class="share-btn">
                    <span style="font-size:19px;" class="material-symbols-outlined">
                        person_add
                    </span>Share</button> |
                <button @click="toggleMenu" class="menu-btn opacity-input"><span class="material-symbols-outlined">
                        more_horiz
                    </span></button>
            </section>
        </div>
    </header>

    <section class="header-modals">
        <share-modal @closeShareModal="isShareModal = false" v-if="isShareModal" />
    </section>
</template>
<script>
import shareModal from '../../../cmps/board-cmps/board-header-cmps/share-modal.cmp.vue'
import boardMenu from '../board-menu-cmps/board-menu.cmp.vue';
export default {
    props: ['board'],
    name: 'board-header',
    emits: ['toggleMenu'],
    components: {
        shareModal,
    },
    data() {
        return {
            isShareModal: false,
        }
    },
    created() { },
    methods: {
        toggleMenu() {
            this.$emit('toggleMenu')
        },
        ChangeBoardTitle(ev) {
            const newTitle = ev.target.innerText
            const board = JSON.parse(JSON.stringify(this.board))
            board.title = newTitle
            this.$store.dispatch({ type: 'saveBoard', board })
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
            let members = this.users.filter(user => {
                return this.board.memberIds.includes(user._id)
            })
            return members
        }
    },
    unmounted() { },
};
</script>
<style>

</style>