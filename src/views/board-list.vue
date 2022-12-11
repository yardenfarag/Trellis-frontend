<template>
    <section class="board-list-container"  >
            <h3 class="board-prev-title starred"> Starred Boards</h3>
            <section v-if="boards.length" class="board-list">
                <div v-for="board in boards" :key="board._id">
                    <board-preview v-if="(board.isStarred)" :board="board" />
                </div>
            </section>
            <div v-else class="skeleton-pr15qsgku0q"></div>
            <h3 class="board-prev-title recently"> Recently viewed</h3>
            <section v-if="boards.length" class="board-list">
                <div v-for="board in boards" :key="board._id">
                    <board-preview v-if="((board.recentlyViewed / (60*60*1000) + 5) > (Date.now()) / (60*60*1000))" :board="board" />
                </div>
            </section>
            <div v-else class="skeleton-pr15qsgku0q"></div>
            <h3 class="board-prev-title all"> All Boards</h3>
            <section  v-if="boards.length" class="all-boards board-list">
                <div v-for="board in boards" :key="board._id">
                    <board-preview :board="board" />
                </div>
            </section>
            <div v-else>
                <div class="skeleton-pr15qsgku0q"></div>
                <div class="skeleton-pr15qsgku0q"></div>
                <div class="skeleton-pr15qsgku0q"></div>
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
        },
        isLoaded(){

        }
    },
    unmounted() { },
};
</script>
<style>

</style>