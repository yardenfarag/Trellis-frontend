<template>
    <section class="modal-container">
        <button @click="closeModal">X</button>
        <h1>Share Board</h1>
        <input type="search"><button>Member</button><button>Share</button>
        <h6>Share this board with a link</h6>
        <a href="#">Create link</a>
        <hr>
        <select name="" id="">
            <option v-for="user in users" value="">{{ user.fullname }}</option>
        </select>



    </section>
</template>
<script>
export default {
    emits: ['closeShareModal'],
    name: 'share-modal',
    components: {},
    data() {
        return {
        };
    },
    async created() {
        await this.$store.dispatch('loadUsers')
    },
    methods: {
        closeModal() {
            this.$emit('closeShareModal')
        }
    },
    computed: {
        users() {
            return this.$store.getters.users
        }
    },
    unmounted() { },
};
</script>

