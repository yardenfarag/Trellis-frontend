<template>
    <section :style="{ top: pos.top + 'px', left: pos.left + 'px' }" v-if="starredBoards"
        class="small-modal-container starred">
        <section class="small-modal-body">
            <ul class="small-modal-list">
                <li @click="goToDetails(board)" v-for="board in starredBoards" class="small-modal-li">
                    <div class="li-content">
                        <div class="board-cover"
                            :style="{ background: board.style.preview ? board.style.preview : board.style.bgc, backgroundSize: 'cover' }">
                        </div>
                        <div class="board-info">
                            <div class="board-info-title">{{ board.title }}</div>
                            <div class="board-info-team">A Team</div>
                        </div>
                    </div>
                </li>
            </ul>
        </section>
    </section>
</template>
<script>
export default {
    name: 'starred-boards-modal',
    props: {
        pos: Object
    },
    components: {},
    data() {
        return {};
    },
    async created() {
        await this.$store.dispatch('loadBoards')
    },
    methods: {
        async goToDetails(board) {
            const currBoard = JSON.parse(JSON.stringify(board))
            currBoard.recentlyViewed = Date.now()
            await this.$store.dispatch({ type: 'saveBoard', board: currBoard })
            // await this.$store.dispatch({ type: 'setCurrBoard', boardId: currBoard._id })
            await this.$router.push('/board/' + board._id)
            location.reload()

        },
    },
    computed: {
        starredBoards() {
            const boards = this.$store.getters.boards
            const starredBoards = boards.filter(board => {
                return board.isStarred
            })
            return starredBoards
        },
    },
    unmounted() { },
}
</script>
<style>

</style>