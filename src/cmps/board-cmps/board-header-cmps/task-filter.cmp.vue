<template>
    <section class="task-filter modal-container">
        <button @click="closeModal">X</button>
        <div class="filter-title">
            <h5>Filter</h5>
        </div>
        <hr>
        <div class="keyword">
            <h3>Keyword</h3>
            <input @input="setFilterBy" v-model="filterBy.txt" type="text" placeholder="Enter a keyword...">
            <h6>Search cards, members, labels, and more.</h6>
        </div>
        <div class="members-filter flex column">
            <h4>Members</h4>
            <label>
                <input @change="toggleNoMembers" type="checkbox">
                No members
            </label>
            <label>
                <input @change="toggleTaskByMe" type="checkbox">
                Cards assigned to me
            </label>
            <label>
                <el-select @change="setFilterBy" v-model="filterBy.memberIds" multiple collapse-tags
                    collapse-tags-tooltip placeholder="Select members" style="width: 240px">
                    <el-option v-for="member in boardMembers" :name="member.fullname" :value="member._id">{{
                            member.fullname
                    }}</el-option>
                </el-select>
            </label>
            <p>hi</p>
        </div>
    </section>
</template>
<script>
export default {
    emits: ['setFilterBy', 'closeFilter'],
    name: 'task-filter',
    components: {},
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