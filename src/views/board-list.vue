<template>
    <section v-if="boards.length" class="board-list">
        <!-- <router-link to="/">Home</router-link> -->
        <div v-for="board in boards" :key="board._id">
            <board-preview :board="board" />
        </div>
    </section>
</template>
<script>
import boardPreview from '../cmps/board-cmps/board-preview.cmp.vue'
export default {
    name: 'board-list',
    components: {
        boardPreview
    },
    data() {
        return {
            // boards: []
        }
    },
    async created() {
        await this.$store.dispatch({ type: 'loadBoards' })
        // await this.$store.dispatch({ type: 'clearCurrBoard' })
    },
    methods: {
    },
    computed: {
        boards() {
            return this.$store.getters.boards
        }
    },
    unmounted() { },
};
</script>
<style>

</style>