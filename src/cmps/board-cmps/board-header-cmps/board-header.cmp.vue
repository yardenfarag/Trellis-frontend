<template>
    <header class="board-header flex align-center">
        <div class="board-header-actions flex align-center space-between">

            <section class="start-section flex align-center">
                <section class="board-title" contenteditable="true">
                    <h3>Board Title</h3>
                </section>
                <button>⭐</button>
            </section>

            <section class="end-section flex-align-center">
                <button>Filter</button>
                <section class="members flex align-center">
                    <button>🦊</button>
                    <button>🦝</button>
                    <button>🐻</button>
                </section>
                <button>Share</button>
                <button>...</button>
            </section>
        </div>
    </header>
</template>
<script>
export default {
    name: 'board-header',
    components: {},
    data() {
        return {};
    },
    created() { },
    methods: {},
    computed: {},
    unmounted() { },
};
</script>
<style>

</style>