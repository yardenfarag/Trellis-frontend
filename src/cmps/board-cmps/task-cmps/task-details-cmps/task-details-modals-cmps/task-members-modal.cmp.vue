<template>
    <section class="modal-container">
        <button @click="closeModal">X</button>
        <h5>Members</h5>
        <hr>
        <input v-model="filterBy.txt" type="search" placeholder="Search members">
        <div v-if="boardMembers" class="board-members">
            <h6>Board members</h6>
            <div @click="toggleMemberToTask(boardMember._id)" v-for="boardMember in boardMembers"
                class="board-member flex align-center">
                <div class="member-avatar">
                    <img :style="{ width: 40 + 'px', 'border-radius': 50 + '%' }" :src="boardMember.imgUrl" alt="">
                </div>
                <div class="member-info flex">
                    <h6>{{ boardMember.fullname }}</h6>
                    <span v-if="isTaskMember(boardMember._id)">✔️</span>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    emits: ['closeMembersModal'],
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
            this.$store.dispatch({ type: 'saveTask', taskToSave })
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
