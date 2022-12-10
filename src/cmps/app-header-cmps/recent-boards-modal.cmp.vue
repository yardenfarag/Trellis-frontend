<template>
    <section :style="{ top: pos.top + 'px', left: pos.left + 'px' }" v-if="recentBoards"
        class="small-modal-container recent">
        <section class="small-modal-body">
            <ul class="small-modal-list">
                <li @click="goToDetails(board)" v-for="board in recentBoards" class="small-modal-li">
                    <div class="li-content">
                        <div class="board-cover"
                            :style="{ background: board.style.preview ? board.style.preview : board.style.bgc }"></div>
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
    name: 'recent-boards-modal',
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
        recentBoards() {
            const boards = this.$store.getters.boards
            const recentBoards = boards.filter(board => {
                return (board.recentlyViewed / (60 * 60 * 1000) + 24) > (Date.now()) / (60 * 60 * 1000)
            })
            return recentBoards
        },
        style() {
            // return { background: board.style.preview ? board.style.preview : board.style.bgc }
            // return { background: board.style.bgc, width: 100 + '%', height: 100 + '%' }
        },
    },

    unmounted() { },
}
</script>
<style>

</style>