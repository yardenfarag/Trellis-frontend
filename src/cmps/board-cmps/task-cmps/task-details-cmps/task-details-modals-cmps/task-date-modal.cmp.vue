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
