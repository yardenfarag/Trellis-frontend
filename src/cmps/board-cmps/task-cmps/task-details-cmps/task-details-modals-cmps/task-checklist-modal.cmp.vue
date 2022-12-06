<template>
    <section class="modal-container checklist-modal">
        <section class="modal-header">
            <span @click="closeModal()" class="material-symbols-outlined">
                close
            </span>
            <h5>Add checklist</h5>
        </section>
        <section class="modal-body">
            <div>
                <h6>Tilte</h6>
                <input ref="title" @keyup.enter="addCheckList" class="primary-input-modal" v-model="listTitle"
                    type="text">
            </div>
        </section>
        <section class="modal-footer">
            <button @click="addCheckList" class="call-to-action">Add</button>
        </section>
    </section>
</template>

<script>
import { localService } from '../../../../../services/board.service.local';
export default {
    emits: ['closeCheckListModal', 'updateTask'],
    props: {
        task: Object,
        group: Array,
    },
    name: 'task-checklist',
    data() {
        return {
            listTitle: 'Checklist',
        };
    },
    methods: {
        focusOnTitle() {
            this.$refs.title.focus()
        },
        closeModal() {
            this.$emit('closeCheckListModal', false)
        },
        addCheckList() {
            if (!this.listTitle) return
            this.closeModal()
            const checklist = localService.getEmptyChecklist()
            checklist.title = this.listTitle
            const updateTask = JSON.parse(JSON.stringify(this.task))
            if (updateTask.checklists) updateTask.checklists.push(checklist)
            else updateTask.checklists = [checklist]
            this.$emit('updateTask', updateTask)
            this.listTitle = ''
        },
    },
    mounted() {
        this.focusOnTitle()
    },
    computed: {
    }
}
</script>