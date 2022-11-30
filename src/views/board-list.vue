<template>
    <section v-if="boards.length" class="board-list">
        <ul>
            <li v-for="board in 
                boards" :key="board._id">
                <board-preview :board="board" />
            </li>
        </ul>
    </section>
</template>
<script>
import { boardService } from '../services/board.service.local.js'
import boardPreview from '../cmps/board-cmps/board-preview.cmp.vue'
export default {
    name: 'board-list',
    components: {
        boardPreview
    },
    data() {
        return {
            boards: []
        }
    },
    async created() {
        this.boards = await boardService.query()
    },
    methods: {},
    computed: {},
    unmounted() { },
};
</script>
<style>

</style>