<template>
    <section v-if="starredBoards" class="modal-container">
        <div @click="goToDetails(board)" v-for="board in starredBoards" class="starred-boards">
            <div class="starred-board">
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
    name: 'starred-boards-modal',
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