<template>
    <section class="board-create-modal flex column align-center">
        <div class="modal-title">
            <h2>Create board</h2>
        </div>
        <label>
            <p>Board title *</p>
            <input v-model="newBoard.title" @input="toggleCreateBtn($event)" type="text" required>
        </label>
        <button @click="saveBoard" :disabled='isDisabled'>Create</button>
    </section>
</template>
<script>
import { boardService } from '../../../services/board.service.local';
export default {
    name: 'board-create-modal',
    components: {},
    data() {
        return {
            isDisabled: false,
            newBoard: boardService.getEmptyBoard()
        };
    },
    created() { },
    methods: {
        toggleCreateBtn(ev) {
            if (!ev.target.value) this.isDisabled = true
            else this.isDisabled = false
        },
        async saveBoard() {
            await this.$store.dispatch({ type: 'saveBoard', board: this.newBoard })
            const newBoard = this.$store.getters.board
            this.newBoard = boardService.getEmptyBoard()
            this.$emit('closeModal')
            this.$router.push('/board/' + newBoard._id)
        }
    },
    computed: {},
    unmounted() { },
};
</script>
<style>

</style>