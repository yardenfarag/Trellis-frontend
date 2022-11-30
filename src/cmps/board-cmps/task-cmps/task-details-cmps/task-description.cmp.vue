<template>
    <div v-if="task.description" class="description-container">
        <div class="title">
            <h3><span class="task-details-icon">☰</span>Description</h3>
        </div>
        <div class="description-input">
            <div v-if="!isDescriptionSelected" class="pre-text-area" @click="isDescriptionSelected = true">
                <p v-if="task.description">{{ task.description }}</p>
                <p v-else>Add a more detailed description…</p>
            </div>
            <div v-if="isDescriptionSelected">
                <textarea placeholder="Add a more detailed description…"></textarea>
                <button>Save</button>
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
            description: task.description
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