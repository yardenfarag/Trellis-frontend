<template>
    <section class="modal-container task-members-modal">
        <section class="modal-header">
            <span @click="closeModal" class="material-symbols-outlined">
                close
            </span>
            <h5>Members</h5>
        </section>
        <section class="modal-body">
            <input class="primary-input-modal" v-model="filterBy.txt" type="search" placeholder="Search members">
            <h6>Board members</h6>
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
        </section>
        <section class="modal-footer">
            <button class="primary-btn-modal">Show other Workspace members</button>
        </section>
    </section>
</template>

<script>
export default {
    emits: ['closeMembersModal', 'saveTask'],
    name: 'members-modal',
    props: {
        task: Object
    },
    components: {},
    data() {
        return {
            filterBy: {
                txt: '',
            },
        };
    },
    created() {
        this.$store.dispatch({ type: 'loadUsers' })
    },
    methods: {
        toggleMemberToTask(memberToToggleId) {
            const taskToSave = JSON.parse(JSON.stringify(this.task))
            if (this.isTaskMember(memberToToggleId)) {
                const idx = taskToSave.memberIds.findIndex(memberId => memberId === memberToToggleId)
                taskToSave.memberIds.splice(idx, 1)
            } else {
                taskToSave.memberIds.push(memberToToggleId)
            }
            this.$emit('saveTask', taskToSave)
        },
        closeModal() {
            this.$emit('closeMembersModal')
        },
        isTaskMember(memberId) {
            if (this.task.memberIds.includes(memberId)) {
                return true
            }
        }
    },
    computed: {
        users() {
            return this.$store.getters.users
        },
        board() {
            return this.$store.getters.board
        },
        boardMembers() {
            let members = this.users.filter(user => {
                return this.board.memberIds.includes(user._id)
            })
            const regex = new RegExp(this.filterBy.txt, 'i')
            members = members.filter(member => regex.test(member.fullname))
            return members
        },
    },
    unmounted() { },
};
</script>
