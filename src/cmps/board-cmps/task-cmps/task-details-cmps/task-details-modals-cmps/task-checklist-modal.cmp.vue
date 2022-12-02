<template>
    <section class="checklist-modal">
        <button @click="closeModal">X</button>
        <h2>Add checklist</h2>
        <hr>
        <label for="title">Title</label>
        <input v-model="listTitle" type="text">
        <button @click="addCheckList" class="call-to-action">Add</button>
    </section>
</template>


<script>
import { boardService } from '../../../../../services/board.service.local';

export default {
    emits: ['closeCheckListModal', 'updateTask'],
    props: {
        task: Object,
    },
    name: 'task-checklist',
    data() {
        return {
            listTitle: '',
        };
    },
    methods: {
        closeModal() {
            this.$emit('closeCheckListModal', false)
        },
        addCheckList() {
            this.closeModal()
            const checklist = boardService.getEmptyChecklist()
            checklist.title = this.listTitle
            console.log(checklist)
            console.log(this.task)
            const updateTask = JSON.parse(JSON.stringify(this.task))
            if (updateTask.checklists) updateTask.checklists.push(checklist)
            else updateTask.checklists = [checklist]
            this.$emit('updateTask', updateTask)
            this.listTitle = ''
        },
    },
}
</script>