<template>
    <section @click.stop="" :style="{ top: pos.top + 'px', left: pos.left + 'px' }"
        class="modal-container delete-modal">
        <section class="modal-header">
            <h5 class="title-modal-header">Delete {{ title }}</h5>
            <span @click="closeModal()" class="close material-symbols-outlined">
                close
            </span>
        </section>
        <div class="modal-body-wrapper">
            <section class="modal-body">
                <p class="delete-warning">{{ desc }}</p>
                <button @click="remove()" class="btn-danger">Delete {{ btn }}</button>
            </section>
        </div>
    </section>
</template>

<script>
export default {
    props: {
        pos: Object,
        toDelete: String
    },
    emits: ['closeModal', 'remove'],
    name: 'delete-modal',
    data() {
        return {

        }
    },
    created() {
    },
    methods: {
        closeModal() {
            this.$emit('closeModal')
        },
        remove() {
            this.$emit('remove')
        }
    },
    computed: {
        title() {
            if (this.toDelete === 'task') return 'Card?'
            if (this.toDelete === 'checklist') return 'Checklist?'
            if (this.toDelete === 'attachment') return 'Attachment?'
        },
        desc() {
            if (this.toDelete === 'task') {
                return `All actions will be removed from the
                 activity feed and you won’t be able to re-open 
                 the card. There is no undo.`
            }
            if (this.toDelete === 'checklist') {
                return `Deleting a checklist is permanent and there is no 
                way to get it back.`
            }
            if (this.toDelete === 'attachment') {
                return `Deleting an attachment is permanent. There is no undo.`
            }

        },
        btn() {
            if (this.toDelete === 'checklist') return 'Checklist'
            if (this.toDelete === 'attachment') return 'Attachment'
        }
    },
}
</script>