<template>
    <section class="modal-container">
        <div class="modal-title">
            <h5>Account</h5>
        </div>
        <hr>
        <div class="user-info">
            <div class="user-avatar">
                <img :src="user.imgUrl"
                    :style="{ borderRadius: 50 + '%', width: 30 + 'px', height: 30 + 'px', objectFit: 'cover' }">
            </div>
            <h4>{{ user.fullname }}</h4>
        </div>
        <hr>
        <button @click="logout">Log out</button>
    </section>
</template>
<script>
export default {
    name: 'user-modal',
    props: {
        user: Object
    },
    components: {},
    data() {
        return {};
    },
    created() { },
    methods: {
        async logout() {
            await this.$store.dispatch({ type: 'logout' })
            this.$router.push('/login')
        }
    },
    computed: {},
    unmounted() { },
};
</script>
<style>

</style>