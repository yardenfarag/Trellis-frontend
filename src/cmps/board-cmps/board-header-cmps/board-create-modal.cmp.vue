<template>
    <div class="modal-container create-board-modal">
        <section class="modal-header">
            <h5 class="title-modal-header">Create board</h5>
            <span @click="closeModal()" class="close material-symbols-outlined">
                close
            </span>
        </section>
        <div class="modal-body-wrapper">
            <section class="modal-body">
                <div class="background-preview-container">
                    <div v-if="images" :style="{ background: bgc }" class="background-preview">
                        <!-- <img class="image-preview" :src="images[0].src.small" /> -->
                    </div>
                </div>
                <div class="background-options-container">
                    <div class="label-holder">
                        <label class="background-label">Background</label>
                    </div>
                    <div class="background-picker">
                        <ul class="image-picker-list">
                            <!-- <li class="image-li" v-if="images" v-for="image in images.splice(0, 4)">
                                <div :style="{ backgroundImage: image.src.tiny }" class="btn-image-holder">
                                    <img :src="image.src.tiny">
                                </div>
                            </li> -->
                        </ul>
                    </div>
                    <ul class="color-picker-list">
                        <li class="color-li" v-for="color in colors.splice(0, 5)">
                            <div :style="{ backgroundColor: color }" class="btn-color-holder"
                                @click="setBackground(color)"></div>
                        </li>
                        <li class="color-li">
                            <div class="btn-color-holder more"></div>
                        </li>
                    </ul>
                </div>
                <form class="add-board-form">
                    <div class="board-title-container">
                        <label class="board-title">Board title <span>*</span></label>
                        <input v-model="newBoard.title" @input="toggleCreateBtn($event)" type="text" class="title-input"
                            :class="{ 'active': !isDisabled }">
                    </div>
                    <div v-if="isDisabled" class="title-req">👋

                        Board title is required</div>
                    <button @click="saveBoard" class="call-to-action btn-create"
                        :class="{ 'btn-disabled': isDisabled }">Create</button>
                </form>
                <div class="terms">By using images from Pexels, you agree to their <span>license</span> and
                    <span>terms of service</span>
                </div>


                <!-- <div class="choose-color">
                    <select v-model="bgc">
                        <option v-for="color in colors">{{ color }}</option>
                    </select>
                </div> -->
                <!-- <label>
                    <p>Board title *</p>
                    <input v-model="newBoard.title" @input="toggleCreateBtn($event)" type="text" required>
                </label> -->
                <!-- <button @click="saveBoard" :disabled='isDisabled'>Create</button> -->
            </section>
        </div>
    </div>
</template>

<script>
import { localService } from '../../../services/board.service.local'
import { uploadService } from '../../../services/upload.service'
export default {
    name: 'board-create-modal',
    components: {},
    data() {
        return {
            images: null,
            colors: ['#7bc86c', '#f5dd29', '#ffaf3f', '#ef7564', '#cd8de5',
                '#5ba4cf', '#29cce5', '#6deca9', '#ff8ed4', '#172b4d'],
            isDisabled: true,
            newBoard: localService.getEmptyBoard(),
            bgc: ''
        };
    },
    created() {
        this.searchImages('nature')
    },
    methods: {
        async searchImages(searchTerm) {
            try {
                const images = await uploadService.getImages(searchTerm)
                this.images = images.photos
            }
            catch (err) {
                console.log('Cannot get images')
                throw err
            }
        },
        toggleCreateBtn(ev) {
            if (!ev.target.value) this.isDisabled = true
            else this.isDisabled = false
        },

        setBackground(color) {
            this.bgc = color
        },
        async saveBoard() {
            if (!this.bgc) return
            if (!this.newBoard.title) return
            this.newBoard.style.bgc = this.bgc
            this.newBoard.style.headerClr = this.bgc
            const board = await this.$store.dispatch({ type: 'saveBoard', board: this.newBoard })
            const newBoard = await this.$store.getters.board
            this.newBoard = localService.getEmptyBoard()
            this.$emit('closeModal')
            await this.$router.push('/board/' + newBoard._id)
            location.reload()
        }
    },
    computed: {

    },
    unmounted() { },
};
</script>
<style>

</style>