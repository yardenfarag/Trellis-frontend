<template>
    <section class="modal-container">

        <button @click="closeModal">X</button>
        <h5>Members</h5>
        <hr>
        <input type="search" placeholder="Search members">
        <h6>Board members</h6>
        <ul>
            <li>name</li>
        </ul>
    </section>
</template>

<script>
export default {
    emits: ['closeMembersModal'],
    name: 'members-modal',
    components: {},
    data() {
        return {};
    },
    created() {

    },
    methods: {
        closeModal() {
            this.$emit('closeMembersModal')
        }
    },
    computed: {},
    unmounted() { },
};
</script>
