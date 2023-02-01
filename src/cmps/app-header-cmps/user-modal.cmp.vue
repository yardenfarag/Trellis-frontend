<template>
    <section class="user-modal">
        <div class="modal-title">
            <h5 class="title-account">Account</h5>
        </div>
        <div class="user-info">
            <div class="user-avatar-container">
                <div class="user-avatar">
                    <img :src="user.imgUrl"
                        :style="{ borderRadius: 50 + '%', width: 30 + 'px', height: 30 + 'px', objectFit: 'cover' }">
                </div>
            </div>
            <h4 class="user-name">{{ user.fullname }}</h4>
        </div>
        <button class="btn-logout" @click="logout">{{ user._id ? 'Log out' : 'Log in' }}</button>
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