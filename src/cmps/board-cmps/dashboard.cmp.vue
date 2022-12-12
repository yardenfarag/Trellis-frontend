<template>
    <div class="dashboard-screen"></div>
    <section class="main-dashboard flex column">
        <button @click.stop="closeDashboard">X</button>
        <section class="dashboard-content">
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

                </div>
                <div class="dashboard-number">
                    <h3>Stuck Tasks</h3>
                    
                </div>
            </section>
        </section>
    </section>
</template>

<script>
export default {
    emits: ['closeDashboard'],
    name: 'dashboard',
    components: {},
    data() {
        return {};
    },
    created() { },
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