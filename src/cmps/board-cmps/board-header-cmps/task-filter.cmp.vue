<template>
    <section :style="{ top: pos.top + 'px', right: pos.right + 'px' }" class="task-filter">
        <section class="header">
            <h2 class="filter-title-header">Filter</h2>
            <button class="btn-close clean" @click="closeModal"><span class="material-symbols-outlined">
                    close
                </span></button>
        </section>

        <section class="filter-body">

            <p class="filter-title-content">Keyword</p>
            <div class="keyword-input-continer">
                <input class="keyword-input" @input="setFilterBy" v-model="filterBy.txt" type="text"
                    placeholder="Enter a keyword...">
            </div>
            <p class="filter-title-content small">Search cards, members, labels, and more.</p>

            <div class="filter-member-container">
                <p class="filter-title-content">Members</p>
                <ul class="member-list">
                    <li>
                        <label class="members-label">
                            <input @change="toggleNoMembers" type="checkbox">
                            <div class="li-container">
                                <div class="icon-container">
                                    <div class="icon-holder">
                                        <span class="icon icon-no-members"></span>
                                    </div>
                                </div>
                                <div class="text">No members</div>
                            </div>
                        </label>
                    </li>
                    <li>
                        <label class="members-label">
                            <input @change="toggleTaskByMe" type="checkbox">
                            <div class="li-container">
                                <div class="icon-container">
                                    <div class="icon-holder">
                                        <span class="icon icon-to-me"></span>
                                    </div>
                                </div>
                                <div class="text to-me">Cards assigned to me</div>
                            </div>
                        </label>
                    </li>
                </ul>


                <el-select class="select-input" @change="setFilterBy" v-model="filterBy.memberIds" multiple
                    collapse-tags collapse-tags-tooltip placeholder="Select members">
                    <el-option v-for="member in boardMembers" :label="member.fullname" :value="member._id">{{
                            member.fullname
                    }}</el-option>
                </el-select>

            </div>
        </section>
    </section>
</template>
<script>
export default {
    emits: ['setFilterBy', 'closeFilter'],
    name: 'task-filter',
    components: {},
    props: {
        pos: Object
    },
    data() {
        return {
            filterBy: {
                txt: '',
                memberIds: [],
                isMyTask: false,
                isNoMembers: false,
            }
        };
    },
    created() { },
    methods: {
        setFilterBy() {
            let filterBy = JSON.parse(JSON.stringify(this.filterBy))
            this.$emit('setFilterBy', filterBy)
        },
        toggleTaskByMe() {
            this.filterBy.isMyTask = !this.filterBy.isMyTask
            this.setFilterBy()
        },
        toggleNoMembers() {
            this.filterBy.isNoMembers = !this.filterBy.isNoMembers
            this.setFilterBy()
        },
        closeModal() {
            this.$emit('closeFilter')
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
                return this.board.memberIds?.includes(user._id)
            })
            return members
        }
    },
    unmounted() { },
};
</script>
<style>

</style>