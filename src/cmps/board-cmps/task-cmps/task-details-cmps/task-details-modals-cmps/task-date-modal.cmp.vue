<template>
    <section class="modal-container">
        <header>
            <button @click="closeModal">X</button>
            <h5>Dates</h5>
        </header>
        <section>

        </section>

    </section>
</template>
<script>
export default {
    emits: ['closeDateModal'],
    name: 'date-modal',
    components: {

    },
    data() {
        return {
        };
    },
    created() { },
    methods: {
        closeModal() {
            this.$emit('closeDateModal')
        }
    },
    computed: {},
    unmounted() { },
};
</script>
<style>
.modal-container {
    height: 695px;
    width: 304px;
    background-color: var(--clr0);
    position: fixed;
    right: 100px;
    border: 1px solid black;
}
</style>