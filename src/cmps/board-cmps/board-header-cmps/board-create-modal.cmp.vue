<template>
    <section class="board-create-modal flex column align-center">
        <div class="modal-title">
            <h2>Create board</h2>
        </div>
        <div class="choose-color">
            <select v-model="bgc">
                <option v-for="color in colors">{{ color }}</option>
            </select>
        </div>
        <label>
            <p>Board title *</p>
            <input v-model="newBoard.title" @input="toggleCreateBtn($event)" type="text" required>
        </label>
        <button @click="saveBoard" :disabled='isDisabled'>Create</button>
    </section>
</template>
<script>
import { localService } from '../../../services/board.service.local';
export default {
    name: 'board-create-modal',
    components: {},
    data() {
        return {
            colors: ['#0079bf', '#d29034', '#519839', '#b04632',
                '#89609e', '#cd5a91', '#4bbf6b', '#00aecc', '#838c91'],
            isDisabled: false,
            newBoard: localService.getEmptyBoard(),
            bgc: ''
        };
    },
    created() { },
    methods: {
        toggleCreateBtn(ev) {
            if (!ev.target.value) this.isDisabled = true
            else this.isDisabled = false
        },
        async saveBoard() {
            if (!this.bgc) return
            if (!this.newBoard.title) return
            this.newBoard.style.bgc = this.bgc
            this.newBoard.style.headerClr = this.bgc
            const board = await this.$store.dispatch({ type: 'saveBoard', board: this.newBoard })
            const newBoard = await this.$store.getters.board
            this.newBoard = localService.getEmptyBoard()
            this.$emit('closeModal')
            await this.$router.push('/board/' + newBoard._id)
            location.reload()
        }
    },
    computed: {},
    unmounted() { },
};
</script>
<style>

</style>