<template>
    <section class="modal-container">
        <button @click="closeModal">X</button>
        <h1>Add to board</h1>
        <hr>
        <div class="user-input">
            <input v-model="filterBy.txt" type="text" placeholder="Search for a user">
        </div>

        <div v-if="filterBy.txt" class="users-container">
            <div class="users">
                <div @click="addUserToBoard(user._id)" v-for="user in usersToShow" :key="user._id"
                    class="user flex align-center">
                    <div class="user-avatar">
                        <img v-if="user.imgUrl" :style="{ width: 40 + 'px', 'border-radius': 50 + '%' }"
                            :src="user.imgUrl" alt="">
                        <p :style="{ textAlign: 'center', backgroundColor: 'lightgray', width: 21 + 'px', 'border-radius': 50 + '%' }"
                            v-else>{{
                                    user.fullname.charAt(0)
                            }}</p>
                    </div>
                    <div class="user-info">
                        <h6>{{ user.fullname }}</h6>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="boardMembers" class="board-members">
            <h5>Board members</h5>
            <div v-for="boardMember in boardMembers" class="board-member flex align-center">
                <div class="member-avatar">
                    <img :style="{ width: 40 + 'px', 'border-radius': 50 + '%' }" :src="boardMember.imgUrl" alt="">
                </div>
                <div class="member-info">
                    <h6>{{ boardMember.fullname }}</h6>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    emits: ['closeShareModal'],
    name: 'share-modal',
    components: {
    },
    data() {
        return {
            filterBy: {
                txt: '',
            }
        };
    },
    async created() {
        await this.$store.dispatch('loadUsers')
    },
    methods: {
        closeModal() {
            this.$emit('closeShareModal')
        },
        addUserToBoard(userId) {
            const board = JSON.parse(JSON.stringify(this.board))
            board.members.push(userId)
            this.$store.dispatch({ type: 'saveBoard', board })
        }
    },
    computed: {
        usersToShow() {
            const regex = new RegExp(this.filterBy.txt, 'i')
            const users = this.$store.getters.users
            let usersToShow = users.filter(user => {
                return !this.board.members.includes(user._id)
            })
            return usersToShow.filter(user => {
                return regex.test(user.fullname)
            })
        },
        users() {
            return this.$store.getters.users
        },
        board() {
            return this.$store.getters.board
        },
        boardMembers() {
            let members = this.users.filter(user => {
                return this.board.members.includes(user._id)
            })
            return members
        }

    },
    unmounted() { },
};
</script>

