<template>
    <section class="board-preview" @click="goToDetails()">{{ board.title }}</section>
</template>
<script>
export default {
    name: 'boardPreview',
    props: {
        board: Object
    },
    components: {},
    data() {
        return {};
    },
    created() { },
    methods: {
        goToDetails() {
            this.$router.push('/board/' + this.board._id)
        }
    },
    computed: {},
    unmounted() { },
};
</script>
<style>

</style>