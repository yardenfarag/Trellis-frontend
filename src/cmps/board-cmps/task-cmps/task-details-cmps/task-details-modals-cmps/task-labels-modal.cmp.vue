<template>
    <section v-if="!editLabel" class="modal-container task-label-modal">
        <section class="modal-header">
            <h5>Labels</h5>
            <span @click="$emit('closeModal')" class="material-symbols-outlined">
                close
            </span>
        </section>
        <section class="modal-body">
            <div class="filter-labels">
                <input class="primary-input-modal" v-model="filterBy.txt" type="search" placeholder="Search labels...">
            </div>
            <h6>Labels</h6>
            <div class="lables">
                <div v-if="labels" v-for="label in labels" class="label-container">
                    <input @change="toggleLabel(label)" :key="label.id" type="checkbox">
                    <div @click="toggleLabel(label)" :style="{ 'background-color': label.color }" class="label">{{
                            label.title
                    }}</div>
                    <span @click="labelEditor(label)" class="pencil-icon material-symbols-outlined">edit</span>
                </div>
            </div>
        </section>
        <section class="modal-footer">
            <button class="primary-btn-modal" @click="currLabel = { title: '', color: '', } ; editLabel = true">Create a
                new label</button>
        </section>
    </section>
    <section v-if="editLabel" class="modal-container task-label-modal">
        <section class="modal-header">
            <h5>Create label</h5>
            <span @click="editLabel = false" class="back material-symbols-outlined">
                arrow_back_ios
            </span>
            <span @click="$emit('closeModal')" class="material-symbols-outlined">
                close
            </span>
        </section>
        <section class="modal-body">
            <div class="label-show">
                <div class="label-preview" :style="{ backgroundColor: currLabel.color }"></div>
                <div class="label-circle" :style="{ backgroundColor: currLabel.color }"></div>
                <span class="label-title">{{ currLabel.title }}</span>
            </div>
            <div class="label-editor">
                <h5>Title</h5>
                <input class="primary-input-modal" type="text" v-model="currLabel.title">
                <h5>Select a color</h5>
                <div class="colors">
                    <div @click="currLabel.color = color" class="color" v-for="color in colors"
                        :style="{ backgroundColor: color }"></div>
                </div>
                <button class="primary-btn-modal"> <span class="material-symbols-outlined">
                        close
                    </span>Remove color</button>
            </div>
        </section>
        <section class="modal-footer">
            <button @click="saveLabel" class="call-to-action">Create</button>
        </section>
    </section>
</template>
<script>
import { utilService } from '../../../../../services/util.service';

export default {
    props: {
        board: Object,
        task: Object
    },
    emits: ['closeModal', 'updateTask'],
    name: 'task-label-modal',
    components: {},
    data() {
        return {
            filterBy: { txt: '' },
            editLabel: false,
            currLabel: {
                title: '',
                color: ''
            },
            colors: ['#b7ddb0', '#f5ea92', '#fad29c', '#efb3ab', '#dfc0eb',
                '#7bc86c', '#f5dd29', '#ffaf3f', '#ef7564', '#cd8de5',
                '#5aac44', '#e6c60d', '#e79217', '#cf513d', '#a86cc1',
                '#8bbdd9', '#8fdfeb', '#b3f1d0', '#f9c2e4', '#505f79',
                '#5ba4cf', '#29cce5', '#6deca9', '#ff8ed4', '#344563',
                '#026aa7', '#00aecc', '#4ed583', '#e568af', '#091e42'
            ]
        };
    },
    created() {
        console.log(this.board.labels);
        console.log(this.task);
    },
    methods: {
        saveLabel() {
            const board = JSON.parse(JSON.stringify(this.board))
            const labelToSave = JSON.parse(JSON.stringify(this.currLabel))
            if (labelToSave.id) {
                const labelIdx = board.labels.findIndex(label => label.id === labelToSave.id)
                board.labels.splice(labelIdx, 1, labelToSave)
            }
            else {
                labelToSave.id = utilService.makeId()
                board.labels.push(labelToSave)
            }
            this.$store.dispatch({ type: 'saveBoard', board })
        },
        labelEditor(label) {
            this.editLabel = true
            const labelToEdit = JSON.parse(JSON.stringify(label))
            this.currLabel = labelToEdit
        },
        toggleLabel(labeltoAdd) {
            const labelToAdd = JSON.parse(JSON.stringify(labeltoAdd))
            const labelInTask = this.task.labels.find(label => label.id === labeltoAdd.id)
            const taskToSave = JSON.parse(JSON.stringify(this.task))
            if (labelInTask) {
                const labelIdx = this.task.labels.findIndex(label => label.id === labelInTask.id)
                taskToSave.labels.splice(labelIdx, 1)
            } else {
                taskToSave.labels.push(labelToAdd)
            }
            this.$emit('updateTask', taskToSave)
            // this.$store.dispatch({ type: 'saveTask', board, groupId, taskToSave })
        }
    },
    computed: {
        labels() {
            const regex = new RegExp(this.filterBy.txt, 'i')
            return this.board.labels.filter(label => regex.test(label.title))
        }
    },
    unmounted() { },
};
</script>
<style>

</style>