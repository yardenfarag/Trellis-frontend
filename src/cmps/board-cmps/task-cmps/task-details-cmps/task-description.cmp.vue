<template>
    <div class="description-container">
        <div class="title">
            <h3><span class="task-details-icon">☰</span>Description</h3>
        </div>
        <div class="description-input">
            <div v-if="!isDescriptionSelected" class="pre-text-area" @click="isDescriptionSelected = true">
                <p v-if="description">{{ description }}</p>
                <p v-else>Add a more detailed description…</p>
            </div>
            <div v-if="isDescriptionSelected">
                <textarea placeholder="Add a more detailed description…" v-model="description"></textarea>
                <button @click="updateTaskDesc()">Save</button>
                <button @click="isDescriptionSelected = false">Cancel</button>
            </div>
        </div>
    </div>
</template>
 
<script>
export default {
    props: ['task'],
    name: 'task-description',
    components: {},
    data() {
        return {
            isDescriptionSelected: false,
            description: this.task.description,
            desc: ''
        };
    },
    created() { },
    methods: {
        updateTaskDesc() {
            this.$emit('updateTaskDesc', this.description)
            this.isDescriptionSelected = false
        }
    },
    computed: {},
    unmounted() { },
};
</script>
<style>

</style>