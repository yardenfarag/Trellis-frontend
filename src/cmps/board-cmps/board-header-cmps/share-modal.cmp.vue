<template>
    <section class="modal-container">
        <button @click="closeModal">X</button>
        <h1>Share Board</h1>
        <input type="search"><button>Member</button><button>Share</button>
        <h6>Share this board with a link</h6>
        <a href="#">Create link</a>
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
       console.log(this.users)
    },
    methods: {
        closeModal() {
            this.$emit('closeShareModal')
        }
    },
    computed: {
        users(){
            console.log(this.$store.getters.users);
            return this.$store.getters.users
        }
    },
    unmounted() { },
};
</script>
<style>
.modal-container {
    width: 695px;
    min-height: 304px;
    background-color: var(--clr0);
    position: fixed;
    right: 10px;
    z-index: 400;
    border: 1px solid black;
}
</style>