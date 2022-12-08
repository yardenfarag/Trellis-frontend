<template>
    <section @click.stop="" :style="{ top: pos.top + 'px', left: pos.left + 'px' }"
        class="modal-container task-members-modal">
        <section class="modal-header">
            <span @click="closeModal()" class="close material-symbols-outlined">
                close
            </span>
            <h5 class="title-modal-header">Members</h5>
        </section>
        <div class="modal-body-wrapper">
            <section class="modal-body">
                <input ref="search" class="primary-input-modal" v-model="filterBy.txt" type="search"
                    placeholder="Search members">
                <h6 class="title-mt16-mb8">Board members</h6>
                <div v-if="boardMembers" class="board-members">
                    <div @click="toggleMemberToTask(boardMember._id)" v-for="boardMember in boardMembers"
                        class="board-member">
                        <div class="avatar">
                            <img :src="boardMember.imgUrl">
                        </div>
                        <h6>{{ boardMember.fullname }}</h6>
                        <span v-if="isTaskMember(boardMember._id)" class="v-icon material-symbols-outlined">
                            done
                        </span>
                    </div>
                </div>
                <button class="primary-btn-modal">Show other Workspace members</button>
            </section>
        </div>
    </section>
</template>

<script>
export default {
    emits: ['closeModal', 'saveTask'],
    name: 'members-modal',
    props: {
        task: Object,
        pos: Object
    },
    components: {},
    data() {
        return {
            boardToShow: null,
            filterBy: {
                txt: '',
            },
        };
    },
    async created() {
        await this.$store.dispatch({ type: 'loadUsers' })
        const boardId = this.$route.params.boardId
        await this.$store.dispatch({ type: 'setCurrBoard', boardId })
        this.boardToShow = JSON.parse(JSON.stringify(this.$store.getters.board))

    },
    methods: {
        toggleMemberToTask(memberToToggleId) {
            const taskToSave = JSON.parse(JSON.stringify(this.task))
            if (!taskToSave.memberIds) taskToSave.memberIds = []
            if (this.isTaskMember(memberToToggleId)) {
                const idx = taskToSave.memberIds.findIndex(memberId => memberId === memberToToggleId)
                taskToSave.memberIds.splice(idx, 1)
            } else {
                taskToSave.memberIds.push(memberToToggleId)
            }
            this.$emit('saveTask', taskToSave)
        },
        closeModal() {
            this.$emit('closeModal')
        },
        isTaskMember(memberId) {
            if (this.task.memberIds?.includes(memberId)) {
                return true
            }
        }
    },
    computed: {
        users() {
            return this.$store.getters.users
        },
        // board() {
        //     return this.$store.getters.board
        // },
        boardMembers() {
            let members = this.users.filter(user => {
                return this.boardToShow?.memberIds?.includes(user._id)
            })
            const regex = new RegExp(this.filterBy.txt, 'i')
            members = members.filter(member => regex.test(member.fullname))
            return members
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.$refs.search.focus()
        })
    },
    unmounted() { },
};
</script>
