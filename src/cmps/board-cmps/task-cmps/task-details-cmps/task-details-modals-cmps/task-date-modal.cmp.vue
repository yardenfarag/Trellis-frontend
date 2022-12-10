<template>
    <section @click.stop="" :style="{ top: pos.top + 'px', left: pos.left + 'px' }"
        class="modal-container task-date-modal">
        <section class="modal-header">
            <h5 class="title-modal-header">Date</h5>
            <span @click="closeModal()" class="close material-symbols-outlined">
                close
            </span>
        </section>

        <section class="modal-body">
            <div class="block">
                <el-date-picker class="date-picker" ref="datePicker" v-model="dueDate.info" type="datetime"
                    placeholder="Select date and time" :default-time="defaultTime" />
            </div>
            <div class="btns-container">
                <button class="save call-to-action" @click="saveDueDate">Save</button>
                <button class="remove primary-btn-modal" @click="closeModal">Remove</button>
            </div>
        </section>

    </section>
</template>
<script>
export default {
    emits: ['closeModal', 'saveTask'],
    name: 'date-modal',
    props: {
        task: Object,
        pos: Object
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
            this.$emit('closeModal')
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
