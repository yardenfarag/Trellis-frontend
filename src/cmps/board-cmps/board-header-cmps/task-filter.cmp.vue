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
                <input type="checkbox">
                No members
            </label>
            <label>
                <input type="checkbox">
                Cards assigned to me
            </label>
            <label>
                <input type="checkbox">
                <select multiple size="2">
                    <option v-for="member in boardMembers" value="member._id">{{ member.fullname }}</option>
                </select>
            </label>
        </div>
        <div class="dueDate-filter flex column">
            <h4>Due date</h4>
            <label>
                <input type="checkbox">
                No dates
            </label>
            <label>
                <input type="checkbox">
                Overdue
            </label>
            <label>
                <input type="checkbox">
                Due in the next day
            </label>
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
            }
        };
    },
    created() { },
    methods: {
        setFilterBy() {
            let filterBy = JSON.parse(JSON.stringify(this.filterBy))
            this.$emit('setFilterBy', filterBy)
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
                return this.board.memberIds.includes(user._id)
            })
            return members
        }
    },
    unmounted() { },
};
</script>
<style>

</style>