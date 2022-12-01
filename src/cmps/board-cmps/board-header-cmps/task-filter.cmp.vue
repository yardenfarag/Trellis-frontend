<template>
    <section class="task-filter">
        <div class="filter-title">
            <h2>Filter</h2>
        </div>
        <div class="keyword">
            <h3>Keyword</h3>
            <input v-model="filterBy.txt" type="text" placeholder="Enter a keyword...">
        </div>
    </section>
</template>
<script>
export default {
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
            const filterBy = JSON.parse(JSON.stringify(this.filterBy))

        }
    },
    computed: {},
    unmounted() { },
};
</script>
<style>

</style>