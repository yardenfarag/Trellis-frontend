<template>
    <div class="board-invite-modal-overlay">
        <section class="share-modal">
            <section class="share-modal-header">
                <h1 class="share-title">Share board</h1>
                <span @click="closeModal()" class="close material-symbols-outlined">
                    close
                </span>
            </section>

            <section class="input-container">
                <div class="controler-container">
                    <input class="share-input" v-model="filterBy.txt" type="text" placeholder="Search for a user">
                    <button class="btn-share call-to-action">Share</button>
                </div>

                <!-- <div v-if="filterBy.txt" class="users-container">
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
                </div> -->



                <section v-if="filterBy.txt" class="member-select-section">
                    <div class="member-select-list">
                        <div class="autocomplete-option" @click="addUserToBoard(user._id)" v-for="user in usersToShow"
                            :key="user._id">
                            <div class="member-select-container">
                                <div class="icon-select-container">
                                    <img v-if="user.imgUrl" :style="{ width: 40 + 'px', 'border-radius': 50 + '%' }"
                                        :src="user.imgUrl" alt="">
                                    <img src="../../../assets/default-avatar.png" alt="">
                                </div>
                                <div class="info-select-container">
                                    <div class="member-select-name">{{ user.fullname }}</div>
                                    <span>A Team</span>
                                    <span>Board admin</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </section>



            <section class="memebr-list-container">
                <div class="share-link-container">
                    <div class="share-link-icon-container">
                        <span class="share-link-icon"></span>
                    </div>
                    <div class="share-link-info-container">
                        <p class="share-link-text">Share this board with a link</p>
                        <span class="share-link-link">Create link</span>
                    </div>
                </div>
                <div v-if="boardMembers">
                    <div class="member-list" v-for="boardMember in boardMembers">
                        <div class="member-container">
                            <div class="icon-container">
                                <img :src="boardMember.imgUrl" alt="">
                            </div>
                            <div class="member-info-container">
                                <div class="member-name">{{ boardMember.fullname }}</div>
                                <div class="member-info">@omazig931 - Workspace admin</div>
                            </div>
                        </div>
                        <!-- <div class="member-container">
                        <div class="icon-container">
                            <img src="../../../assets/default-avatar.png" alt="">
                        </div>
                        <div class="member-info-container">
                            <div class="member-name">Yotam GROSS</div>
                            <div class="member-info">@omazig931 - Workspace admin</div>
                        </div>
                    </div> -->
                    </div>
                </div>
            </section>

            <!-- <div v-if="boardMembers" class="board-members">
                <h5>Board members</h5>
                <div v-for="boardMember in boardMembers" class="board-member flex align-center">
                    <div class="member-avatar">
                        <img :style="{ width: 40 + 'px', 'border-radius': 50 + '%' }" :src="boardMember.imgUrl" alt="">
                    </div>
                    <div class="member-info">
                        <h6>{{ boardMember.fullname }}</h6>
                    </div>
                </div>
            </div> -->
        </section>
    </div>
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
            if (board.memberIds) {
                board.memberIds.push(userId)
            } else {
                board.memberIds = [userId]
            }
            this.$store.dispatch({ type: 'saveBoard', board })
        },
    },
    computed: {
        usersToShow() {
            const regex = new RegExp(this.filterBy.txt, 'i')
            const users = this.$store.getters.users
            let usersToShow = users?.filter(user => {
                return !this.board?.memberIds?.includes(user._id)
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
            let members = this.users?.filter(user => {
                return this.board?.memberIds?.includes(user._id)
            })
            return members
        }

    },
    unmounted() { },
};
</script>

