<template>
    <section class="board-preview flex">
        <div @click="goToDetails()" :style="{ background: board.style.bgc, backgroundSize: 'cover' }"
            class="mini-board">
            <h1>{{ board.title }}</h1>
        </div>
        <!-- <button @click="removeBoard">X</button> -->
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
        async goToDetails() {
            await this.$store.dispatch({ type: 'setCurrBoard', boardId: this.board._id })
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