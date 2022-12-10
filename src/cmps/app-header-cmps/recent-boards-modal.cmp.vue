<template>
    <section v-if="recentBoards" class="modal-container">
        <div @click="goToDetails(board)" v-for="board in recentBoards" class="recent-boards">
            <div class="recent-board">
                <div :style="{ background: board.style.preview ? board.style.preview : board.style.bgc, backgroundSize: 'cover' }"
                    class="board-style">
                </div>
                <h6>{{ board.title }}</h6>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    name: 'recent-boards-modal',
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
    },
    unmounted() { },
}
</script>
<style>

</style>