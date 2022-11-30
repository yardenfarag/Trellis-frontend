<template>
    <header class="board-header flex align-center">
        <div class="board-header-actions flex align-center space-between">

            <section class="start-section flex align-center">
                <h3 contenteditable="true" @blur="ChangeBoardTitle($event)">{{ board.title }}</h3>
                <button @click="setStarred()">⭐</button>
                <button>Board</button>
                <button>Table</button>
            </section>

            <section class="end-section flex align-center">
                <button>Filter</button> |
                <section class="members flex align-center">
                    <button class="member">🦊</button>
                    <button class="member">🦝</button>
                    <button class="member">🐻</button>
                </section> |
                <button class="share-btn">Share</button> |
                <button>...</button>
            </section>
        </div>
    </header>
</template>
<script>
export default {
    props: ['board'],
    name: 'board-header',
    components: {},
    data() {
        return {};
    },
    created() { },
    methods: {
        ChangeBoardTitle(ev) {
            const newTitle = ev.target.innerText
            const board = JSON.parse(JSON.stringify(this.board))
            board.title = newTitle
            this.$store.dispatch({ type: 'updateBoard', board })
        },
        setStarred() {
            console.log('set starred');
        }
    },
    computed: {},
    unmounted() { },
};
</script>
<style>

</style>