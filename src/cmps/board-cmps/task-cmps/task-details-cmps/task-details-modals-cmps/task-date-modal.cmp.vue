<template>
    <section class="modal-container">
        <header>
            <button @click="closeModal">X</button>
            <h5>Dates</h5>
        </header>
        <hr>
        <section>
            <div class="block">
                <el-date-picker ref="datePicker" v-model="dueDate.info" type="datetime"
                    placeholder="Select date and time" :default-time="defaultTime" />
            </div>
            <button @click="saveDueDate">Save</button>
            <button @click="closeModal">Remove</button>
        </section>

    </section>
</template>
<script>
export default {
    emits: ['closeDateModal', 'saveTask'],
    name: 'date-modal',
    props: {
        task: Object
    },
    components: {

    },
    data() {
        return {
            dueDate: {
                info: '',
                isDone: false,
            },
            defaultTime: new Date(2000, 1, 1, 12, 0, 0)
        };
    },
    created() {

    },
    methods: {
        saveDueDate() {
            const taskToSave = JSON.parse(JSON.stringify(this.task))
            taskToSave.dueDate = this.dueDate
            this.$emit('saveTask', taskToSave)
            this.closeModal()
        },
        closeModal() {
            this.$emit('closeDateModal')
        },
        focusInput() {
            // this.$refs.datePicker.$el.focus()
            this.$nextTick(() => this.$refs.datePicker.focus())
        }
    },
    computed: {},
    mounted() {
        this.focusInput()
    },
    unmounted() { },
};
</script>
