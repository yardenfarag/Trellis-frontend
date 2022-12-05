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
import { boardService } from '../../../../../services/board.service.local';
import { utilService } from '../../../../../services/util.service.js'
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
            this.closeModal()
            const checklist = boardService.getEmptyChecklist()
            checklist.title = this.listTitle
            const updateTask = JSON.parse(JSON.stringify(this.task))
            if (updateTask.checklists) updateTask.checklists.push(checklist)
            else updateTask.checklists = [checklist]
            // const newActivity = utilService.setActivity(`added ${checklist.title} to ${updateTask.title}`, updateTask)
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