<!-- <template>
    <section v-if="pos" :style="{ top: pos.top + 'px', left: pos.left + 'px' }" class="group-actions">
        <section class="group-actions-menu modal-container">
            <section class="modal-header">
                <h5 class="title-modal-header">List actions</h5>
                <span @click="closeGroupActions()" class="close material-symbols-outlined">
                    close
                </span>
            </section>
            <section class="modal-body">
                <div class="group-actions-btns">
                    <h6>Add card...</h6>
                    <h6 @click="openCopyList">Copy list...</h6>
                    <h6 @click="openMoveList">Move list...</h6>
                    <div class="archive-list">
                        <h6 @click="removeGroup">Archive this list</h6>
                    </div>
                </div>
            </section>
        </section>

        <section v-if="isCopyList" class="copy-list modal-container">
            <section class="modal-header">
                <span @click="closeCopyList()" class="back material-symbols-outlined">
                    arrow_back_ios
                </span>
                <h5 class="title-modal-header">Copy list</h5>
                <span @click="closeGroupActions()" class="close material-symbols-outlined">
                    close
                </span>
            </section>

            <div class="modal-body">
                <h5 class="copy-list-name">Name</h5>
                <textarea class="copy-input" v-model="copyGroupTitle" cols="30" rows="4"></textarea>
                <button @click="copyGroup" class="call-to-action btn-copy">Create list</button>
            </div>
        </section>

        <div v-if="isMoveList" class="move-list modal-container">
            <div class="modal-title">
                <button @click="closeMoveList">←</button>
                <button @click="closeGroupActions">X</button>
                <h5>Move list</h5>
            </div>

            <div class="move-list-body">
                <label class="boards">
                    <h6>Boards</h6>
                    <select @change="changeSelectedBoard" v-model="selectedBoardId">
                        <option v-for="board in boards" :value="board._id">{{ board.title }}</option>
                    </select>
                    <h6>Position</h6>
                    <select v-model="selectedIdx">
                        <option v-for="group in selectedBoard.groups" :value="selectedBoard.groups.findIndex(g => g.id ===
                        group.id)">{{
            selectedBoard.groups.findIndex(g => g.id ===
                group.id) + 1
    }}</option>
                    </select>
                </label>
                <button @click="moveGroup" class="call-to-action">Move</button>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    props: {
        pos: Object
    },
    emits: ['closeGroupActions'],
    name: 'group-actions',
    components: {},
    data() {
        return {};
    },
    created() { },
    methods: {
        closeGroupActions() {
            this.$emit('closeGroupActions')
        }
    },
    computed: {},
    unmounted() { },
};
</script>
<style>

</style> -->