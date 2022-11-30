<template>
    <section v-if="board" class="board-details">
        <board-header v-if="board" :board="board"></board-header>
        <ul class="clean-list flex group-list">
            <li v-for="group in board.groups" :key="group.id">
                <group-details :group="group" :boardId="board._id" />
            </li>
        </ul>
    </section>
    <router-view />
</template>

<script>
import boardHeader from '../cmps/board-cmps/board-header-cmps/board-header.cmp.vue';
import { boardService } from '../services/board.service.local.js'
import groupDetails from '../cmps/board-cmps/group-cmps/group-details.cmp.vue'
export default {
    name: 'board-details',
    components: {
        groupDetails,
        boardHeader
    },
    data() {
        return {
            // board: null
        };
    },
    async created() {
        const { id } = this.$route.params
        if (!this.$store.getters.board) await this.$store.dispatch({ type: 'setCurrBoard', boardId: id })
    },
    methods: {},
    computed: {
        board() {
            return this.$store.getters.board
        }
    },
    unmounted() { },
}
</script>
