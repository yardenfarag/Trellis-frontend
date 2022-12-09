<template>
    <section class="board-preview flex">
        <div @click="goToDetails()"
            :style="{ background: this.board.style.preview ? board.style.preview : board.style.bgc, backgroundSize: 'cover' }"
            class="mini-board">
            <h1>{{ board.title }}</h1>
            <button v-if="board.isStarred" class="stared board-prev-star" @click.stop="toggleStarred()"></button>
            <button v-else class="not-stared board-prev-star" @click.stop="toggleStarred()"></button>
        </div>
    </section>
</template>
<script>
export default {
    name: 'boardPreview',
    props: {
        board: Object
    },
    components: {},
    data() {
        return {};
    },
    created() { },
    methods: {
        toggleStarred() {
            const board = JSON.parse(JSON.stringify(this.board))
            board.isStarred = !board.isStarred
            this.$store.dispatch({ type: 'saveBoard', board })
        },
        async goToDetails() {
            const currBoard = JSON.parse(JSON.stringify(this.board))
            currBoard.recentlyViewed = Date.now()
            await this.$store.dispatch({ type: 'saveBoard', board: currBoard })
            // await this.$store.dispatch({ type: 'setCurrBoard', boardId: currBoard._id })
            this.$router.push('/board/' + this.board._id)

        },
        async removeBoard() {
            await this.$store.dispatch({ type: 'removeBoard', boardId: this.board._id })
        }
    },
    computed: {},
    unmounted() { },
};
</script>
<style>

</style>