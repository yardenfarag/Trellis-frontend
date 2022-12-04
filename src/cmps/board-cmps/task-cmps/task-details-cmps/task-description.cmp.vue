<template>
    <div class="description-container">
        <div class="description-wraper">
            <div class="title-container">
                <h3> Description</h3>
                <button v-if="!isDescriptionSelected" class="task-detail-btn"
                    @click="isDescriptionSelected = true">Edit</button>
            </div>
            <div v-if="!isDescriptionSelected" class="pre-text-area" @click="isDescriptionSelected = true">
                <p v-if="description">{{ description }}</p>
                <p v-else>Add a more detailed description…</p>
            </div>
        </div>
        <div class="description-form" v-if="isDescriptionSelected">
            <textarea class="description-input" placeholder="Add a more detailed description…" v-model="description"
                rows="3"></textarea>
            <button class="call-to-action" @click="updateTaskDesc()">Save</button>
            <button class="task-detail-btn" @click="onCancel()">Cancel</button>
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
        },
        onCancel() {
            this.isDescriptionSelected = false
            this.description = this.task.description
        }
    },
    computed: {}, // add getters to get curr task desc
    unmounted() { },
};
</script>
<style>

</style>