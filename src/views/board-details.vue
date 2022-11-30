<template>
    <board-header></board-header>
    <section v-if="board" class="board-details">
        <ul>
            <li v-for="group in board.groups" :key="group.id">
            <group-details :group="group" :boardId="board._id"/>
            </li>
        </ul>
    </section>
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
            board: null
        };
    },
    async created() {
        const { id } = this.$route.params
        this.board = await boardService.getById(id)
    },
    methods: {},
    computed: {},
    unmounted() { },
}
</script>
