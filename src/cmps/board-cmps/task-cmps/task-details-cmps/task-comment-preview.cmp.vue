<template>
    <div class="comment-details">
        <img :src="commentUser.imgUrl" :style="{ borderRadius: 50 + '%', width: 30 + 'px', height: 30 + 'px' }">
        <h4 class="name">{{ commentUser.fullname }} <span class="time">{{ formattedTime }}</span></h4>
        <span>{{ isEdited }}</span>
        <div v-if="!isCommentEdit">
            <div class="txt-preview">{{ comment.txt }}</div>
            <div class="">
                <span @click="openEdit">Edit</span>-<span @click="deleteComment(comment.id)">Delete</span>
            </div>
        </div>
    </div>

    <section v-if="isCommentEdit" class="comment-edit">
        <input v-model="txt" type="text">
        <button @click="saveComment" class="call-to-action">Save</button>
        <button @click="closeEdit">X</button>
    </section>
</template>
<script>
import { utilService } from '../../../../services/util.service';

export default {
    emits: ['deleteComment', 'saveComment'],
    props: {
        comment: Object
    },
    name: 'task-comment-preview',
    components: {},
    data() {
        return {
            txt: '',
            isCommentEdit: false,
        };
    },
    async created() {
        await this.$store.dispatch({ type: 'loadUsers' })
        this.txt = this.comment.txt
    },
    methods: {
        saveComment() {
            const commentToSave = JSON.parse(JSON.stringify(this.comment))
            commentToSave.txt = this.txt
            commentToSave.isEdited = true
            this.$emit('saveComment', commentToSave)
            this.isCommentEdit = false
        },
        deleteComment(commentId) {
            this.$emit('deleteComment', commentId)
        },
        openEdit() {
            this.isCommentEdit = true
            this.txt = this.comment.txt
        },
        closeEdit() {
            this.isCommentEdit = false
        }
    },
    computed: {
        users() {
            return this.$store.getters.users
        },
        commentUser() {
            let user = this.users.find(user => user._id === this.comment.byMember._id)
            if (!user) {
                user = { fullname: 'Guest', imgUrl: 'https://api-private.atlassian.com/users/b7723e87cdacea8bf9bf6b36952f6a06/avatar' }
            }
            return user
        },
        formattedTime() {
            return utilService.timeAgo(this.comment.createdAt)
        },
        isEdited() {
            if (this.comment.isEdited) {
                return '(edited)'
            }
            return ''
        }
    },
    unmounted() { },
};
</script>
<style>

</style>