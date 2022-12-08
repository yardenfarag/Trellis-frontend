<template>
    <div class="description-container">
        <div class="description-wraper">
            <div class="title-container">
                <h3> Description</h3>
                <button v-if="(!isDescriptionSelected && description)" class="task-detail-btn"
                    @click="openDescInput">Edit</button>
            </div>
            <div>
                <div v-if="!isDescriptionSelected" ref="desc" class="pre-text-area" @click="openDescInput">
                    <pre @blur="onCancel" class="task-desc-pre" v-if="description">{{ description }}</pre>
                    <p class="no-desc-style" v-else>Add a more detailed description…</p>
                </div>
            </div>
        </div>
        <div class="description-form" v-if="isDescriptionSelected">
            <div class="description-input-container">
                <textarea ref="textarea" class="description-input" placeholder="Add a more detailed description…"
                    v-model="description"></textarea>
            </div>
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
        resize() {
            this.$nextTick(() => {
                const { textarea } = this.$refs;
                textarea.style.height = textarea.scrollHeight - 4 + 'px';
                textarea.focus()
            })

        },

        openDescInput() {
            this.isDescriptionSelected = true
            this.resize()
        },
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
    mounted() {

    },
    unmounted() { },
};
</script>
<style>

</style>