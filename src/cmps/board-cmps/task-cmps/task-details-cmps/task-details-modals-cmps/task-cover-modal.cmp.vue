<template>
    <div class="modal-container cover-modal">
        <div class="modal-title">
            <h5>Cover</h5>
        </div>
        <hr>
        <div class="size">
            <h6>Size</h6>
            <span>1</span>---<span>2</span>
            <button>Remove cover</button>
        </div>
        <div class="colors">
            <h6>Colors</h6>
            <div class="color" v-for="color in colors"
                :style="{ background: color, width: 54 + 'px', height: 36 + 'px' }"></div>
        </div>
        <div v-if="attachments" class="attachments">
            <h6>Attachment</h6>
            <div v-for="attachment in attachments" class="mini-attachment">
                <img :src="attachment.imgUrl" :style="{ width: 100 + 'px', objectFit: 'contain' }">
            </div>
        </div>
        <button>Upload a cover image</button>

    </div>
</template>
<script>
export default {
    name: 'task-cover-modal',
    components: {},
    data() {
        return {
            colors: ['#f4f5f7', '#f5dd29', '#ffaf3f', '#ef7564', '#cd8de5',
                '#5ba4cf', '#29cce5', '#6deca9', '#ff8ed4', '#172b4d']
        };
    },
    created() { },
    methods: {},
    computed: {},
    unmounted() { },
};
</script>
<style>

</style>