<template>
    <section @click.stop="" :style="{ top: pos.top + 'px', left: pos.left + 'px' }"
        class="modal-container checklist-modal">
        <section class="modal-header">
            <span @click="closeModal()" class="close material-symbols-outlined">
                close
            </span>
            <h5 class="title-modal-header">Add checklist</h5>
        </section>
        <div class="modal-body-wrapper">
            <section class="modal-body">
                <div>
                    <h6 class="title-title">Tilte</h6>
                    <input ref="title" @keyup.enter="addCheckList" class="primary-input-modal" v-model="listTitle"
                        type="text">
                </div>
                <button @click="addCheckList" class="call-to-action">Add</button>
            </section>
        </div>
    </section>
</template>

<script>
import { utilService } from '../../../../../services/util.service.js';
export default {
    emits: ['closeModal', 'updateTask'],
    props: {
        task: Object,
        group: Array,
        pos: Object
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
            this.$emit('closeModal')
        },
        addCheckList() {
            if (!this.listTitle) return
            this.closeModal()
            const checklist = utilService.getEmptyChecklist()
            checklist.title = this.listTitle
            const updateTask = JSON.parse(JSON.stringify(this.task))
            if (updateTask.checklists) updateTask.checklists.push(checklist)
            else updateTask.checklists = [checklist]
            let activityTxt = `added ${checklist.title} to ${updateTask.title}`
            this.$emit('updateTask', updateTask, activityTxt)
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