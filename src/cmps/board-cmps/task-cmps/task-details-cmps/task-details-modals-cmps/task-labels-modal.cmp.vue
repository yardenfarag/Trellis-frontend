<template>
    <section  v-if="(!editLabel && !isDelete)" class="modal-container task-label-modal">
        <section class="modal-header">
            <h5>Labels</h5>
            <span @click="closeModal()" class="material-symbols-outlined">
                close
            </span>
        </section>
        <section class="modal-body">
            <div class="filter-labels">
                <input v-if="filterVis" ref="filter" class="primary-input-modal" v-model="filterBy.txt" type="search"
                    placeholder="Search labels..." />
            </div>
            <h6>Labels</h6>
            <div class="lables">
                <div v-if="labels" v-for="label in labels" class="label-container">
                    <input @change="toggleLabel(label)" :key="label.id" type="checkbox">
                    <div class="label">
                        <div @click="toggleLabel(label)" :style="{ 'background-color': label.color }"
                            class="label-preview">
                            <!-- <div class="dark"></div> -->
                        </div>
                        <div :style="{ 'background-color': label.color }" class="label-circle">
                        </div>
                        <span class="label-title">{{ label.title }}</span>
                    </div>
                    <button class="edit-btn" @click="labelEditor(label)"> <span
                            class="pencil-icon material-symbols-outlined">edit</span></button>


                </div>
            </div>
        </section>
        <section class="modal-footer">
            <button class="primary-btn-modal" @click="onOpenCreateEditor">Create
                a
                new label</button>
        </section>
    </section>
    <section v-if="(editLabel && !isDelete)" class="modal-container task-label-modal">
        <section class="modal-header">
            <h5 v-if="isCreate">Create label</h5>
            <h5 v-else>Edit label</h5>
            <span @click="goBack()" class="back material-symbols-outlined">
                arrow_back_ios
            </span>
            <span @click="closeModal()" class="material-symbols-outlined">
                close
            </span>
        </section>
        <div class="label-show full">
            <div class="label-preview" :style="{ backgroundColor: currLabel.color }">
            </div>
            <div class="label-circle" :style="{ backgroundColor: currLabel.color }"></div>
            <span class="label-title">{{ currLabel.title }}</span>
        </div>
        <section class="modal-body">
            <div class="label-editor">
                <h6>Title</h6>
                <input @keyup.enter="saveLabel" v-if="titleVis" ref="title" class="primary-input-modal" type="text"
                    v-model="currLabel.title">
                <h6>Select a color</h6>
                <div class="colors">
                    <div @click.stop="selectLabel($event, color, idx)" class="color"
                        :class="{ 'selected': idx === idxOfSelectedColor }" v-for="color, idx in colors"
                        :style="{ backgroundColor: color }">
                        <div class="dark"></div>
                    </div>
                </div>
                <button v-if="currLabel.color === '#babdbe'" class="primary-btn-modal btn-disabled"> <span
                        class="material-symbols-outlined">
                        close
                    </span>Remove color</button>
                <button v-else @click="removeColor()" class="primary-btn-modal"> <span
                        class="material-symbols-outlined">
                        close
                    </span>Remove color</button>
            </div>
        </section>
        <section class="modal-footer">
            <div v-if="isCreate">
                <button v-if="(currLabel.color === '#babdbe' && currLabel.title === '')"
                    class="btn-disabled">Create</button>
                <button v-else @click="saveLabel" class="call-to-action">Create</button>
            </div>
            <div v-else class="btn-group">
                <button v-if="(currLabel.color === '#babdbe' && currLabel.title === '')"
                    class="btn-disabled">Save</button>
                <button v-else @click="saveLabel" class="call-to-action">Save</button>
                <button @click="openDeleteModal()" class="btn-danger">Delete</button>
            </div>
        </section>
    </section>
    <section v-if="isDelete" class="modal-container delete-label-modal">
        <section class="modal-header">
            <h5>Delete label</h5>
            <span @click="goBackFromDelete()" class="back material-symbols-outlined">
                arrow_back_ios
            </span>
            <span @click="closeModal()" class="material-symbols-outlined">
                close
            </span>
        </section>
        <section class="modal-body">

        </section>
        <section class="modal-footer">
            <p>This will remove this label from all cards. There is no undo.</p>
            <button @click="removeLabel()" class="btn-danger">Delete</button>
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
            // boardToShow: null,
            filterBy: { txt: '' },
            editLabel: false,
            isCreate: false,
            isDelete: false,
            filterVis: false,
            titleVis: false,
            idxOfSelectedColor: null,
            currLabel: {
                id: '',
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
    async created() {
        // const boardId = this.$route.params.boardId
        // await this.$store.dispatch({ type: 'setCurrBoard', boardId })
        // this.boardToShow = JSON.parse(JSON.stringify(this.$store.getters.board))
        this.idxOfSelectedColor = 7
    },
    methods: {
        focusOnTitle() {
            this.$refs.title.focus()
        },
        focusOnFilter() {
            this.$refs.filter.focus()
        },
        openDeleteModal() {
            this.isDelete = true
        },
        goBack() {
            this.editLabel = false
            this.isCreate = false
            this.isDelete = false

            this.filterVis = true
            this.$nextTick(() => {
                this.focusOnFilter();
            });
        },
        goBackFromDelete() {
            this.isDelete = false

            this.titleVis = true
            this.$nextTick(() => {
                this.focusOnTitle()();
            });
        },
        closeModal() {
            this.$emit('closeModal')
        },
        onOpenCreateEditor() {
            this.currLabel = { title: '', color: '#ffaf3f', },
                this.editLabel = true,
                this.isCreate = true,
                this.idxOfSelectedColor = 7

            this.titleVis = true
            this.$nextTick(() => {
                this.focusOnTitle()();
            });
        },
        removeColor() {
            this.currLabel.color = '#babdbe'
        },
        selectLabel(ev, color, idx) {
            this.idxOfSelectedColor = idx
            this.currLabel.color = color
        },
        async removeLabel() {
            // let board = JSON.parse(JSON.stringify(this.board))
            const labelToSave = JSON.parse(JSON.stringify(this.currLabel))
            let labelIdx
            if (labelToSave.id) {
                this.board.groups.forEach(group => {
                    group.tasks.forEach(task => {
                        labelIdx = task.labels.findIndex(label => label.id === labelToSave.id)
                        if (labelIdx >= 0) {
                            task.labels.splice(labelIdx, 1)
                            this.$emit('updateTask', task)
                        }
                    })
                })
            }
            const idx = this.board.labels.findIndex(label => label.id === this.currLabel.id)
            this.board.labels.splice(idx, 1)
            await this.$store.dispatch({ type: 'saveBoard', board: this.board })
            this.goBack()
        },
        async saveLabel() {
            if ((this.currLabel.color === '#babdbe' && this.currLabel.title === '')) {
                this.goBack()
                return
            }
            // let board = JSON.parse(JSON.stringify(this.board))
            const labelToSave = JSON.parse(JSON.stringify(this.currLabel))
            let labelIdx
            if (labelToSave.id) {
                this.board.groups.forEach(group => {
                    group.tasks.forEach(task => {
                        labelIdx = task.labels.findIndex(label => label.id === labelToSave.id)
                        if (labelIdx >= 0) {
                            task.labels.splice(labelIdx, 1, labelToSave)
                            this.$emit('updateTask', task)
                        }
                    })
                })
                const idx = this.board.labels.findIndex(label => label.id === labelToSave.id)
                this.board.labels.splice(idx, 1, labelToSave)
            }
            else {
                labelToSave.id = utilService.makeId()
                this.board.labels.push(labelToSave)
            }
            await this.$store.dispatch({ type: 'saveBoard', board: this.board })
            this.goBack()
        },
        labelEditor(label) {
            this.editLabel = true
            const labelToEdit = JSON.parse(JSON.stringify(label))
            this.currLabel = labelToEdit
            const idx = this.colors.findIndex(color => color === label.color)
            this.idxOfSelectedColor = idx

            this.titleVis = true
            this.$nextTick(() => {
                this.focusOnTitle()();
            });
        },
        toggleLabel(labeltoAdd) {
            const labelToAdd = JSON.parse(JSON.stringify(labeltoAdd))
            const labelInTask = this.task.labels.find(label => label.id === labeltoAdd.id)
            const taskToSave = JSON.parse(JSON.stringify(this.task))
            if (labelInTask) {
                const labelIdx = this.task.labels.findIndex(label => label.id === labelInTask.id)
                taskToSave.labels.splice(labelIdx, 1)
                console.log('inTask')
            } else {
                taskToSave.labels.push(labelToAdd)
                console.log('New')
            }
            this.$emit('updateTask', taskToSave)
            // this.$store.dispatch({ type: 'saveTask', board, groupId, taskToSave })
        }
    },
    computed: {
        labels() {
            const regex = new RegExp(this.filterBy.txt, 'i')
            return this.board.labels.filter(label => regex.test(label.title))
        },
        setSelected() {
            return { 'selected': this.isSelected }
        }
    },
    mounted() {
        this.filterVis = true

        this.$nextTick(() => {
            this.focusOnFilter();
        });
    },
    unmounted() { },
};
</script>
<style>

</style>