<template>
    <div class="dashboard-screen"></div>
    <section class="main-dashboard flex column">
        <button @click.stop="closeDashboard">X</button>
        <section class="dashboard-content flex column">
            <h4>Dashboard</h4>
            <section class="dashboard-main-grid">
                <div class="dashboard-number">
                    <h3>Total tasks in board</h3>

                </div>
                <div class="dashboard-number">
                    <h3>Total activities today</h3>

                </div>
                <div class="dashboard-chart">
                    <h3>Tasks by group</h3>

                </div>
                <div class="dashboard-number">
                    <h3>Done Tasks</h3>

                </div>
                <div class="dashboard-chart">
                    <h3>Due dates</h3>

                </div>
                <div class="dashboard-chart">
                    <h3>Tasks by members</h3>
                    <awesomeBarChart :board="board" />
                </div>

            </section>
        </section>
    </section>
</template>

<script>
import awesomeBarChart from '../board-cmps/dashboard.cmps/barChart.cmp.vue'

export default {
    emits: ['closeDashboard'],
    props: {
        board: Object,
    },
    name: 'dashboard',
    components: {
        awesomeBarChart,
    },
    data() {
        return {

        }
    },
    created() {

     },
    methods: {
        closeDashboard() {
            this.$emit('closeDashboard')
        }
    },
    computed: {},
    unmounted() { },
}
</script>
<style>

</style>