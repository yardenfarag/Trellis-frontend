<template>
    <section v-if="board" class="board-details">
        <board-header v-if="board" :board="board"></board-header>
        <ul class="clean-list flex group-list">
            <li v-for="group in board.groups" :key="group.id">
                <group-details :group="group" :boardId="board._id" />
            </li>
            <li>

                <div v-if="!isAddGroup" @click="isAddGroup = true" class="btn-open-add-group opacity-input">
                    <span style="font-size:20px;" class="material-symbols-outlined">
                        add
                    </span><span>Add another list</span>
                </div>

                <section v-if="isAddGroup" class="add-group-open">
                    <input v-model="groupToSave.title" type="text" placeholder="Enter list title">
                    <div class="add-group-controler">
                        <button @click="addGroup" class="call-to-action">Add List</button>
                        <span @click="isAddGroup = false" class="close-add-group material-symbols-outlined">
                            close
                        </span>
                    </div>
                </section>
            </li>
        </ul>
    </section>
    <router-view />
</template>

<script>
import boardHeader from '../cmps/board-cmps/board-header-cmps/board-header.cmp.vue';
import groupDetails from '../cmps/board-cmps/group-cmps/group-details.cmp.vue'
export default {
    name: 'board-details',
    components: {
        groupDetails,
        boardHeader
    },
    data() {
        return {
            isAddGroup: false,
            groupToSave: {
                title: '',
                style: {},
                tasks: [],
            }
        };
    },
    async created() {
        const { boardId } = this.$route.params
        if (!this.$store.getters.board) await this.$store.dispatch({ type: 'setCurrBoard', boardId })
    },
    methods: {
        async addGroup() {
            if (!this.groupToSave.title) return
            const boardToSave = JSON.parse(JSON.stringify(this.board))
            await this.$store.dispatch({ type: 'saveGroup', board: boardToSave, groupToEdit: this.groupToSave })
            this.groupToSave = {
                title: '',
                style: {},
                tasks: [],
            }
        }
    },
    computed: {
        board() {
            return this.$store.getters.board
        }
    },
    unmounted() { },
}
</script>
