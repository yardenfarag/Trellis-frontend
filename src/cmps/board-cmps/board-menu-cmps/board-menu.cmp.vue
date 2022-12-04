<template>
    <section class="board-menu">

        <section v-if="isMenu" class="menu-container menu-layout">
            <section class="menu-header">
                <h5>Menu</h5>
                <span @click="closeModal()" class="material-symbols-outlined">
                    close
                </span>
            </section>
            <section class="menu-body">
                <div class="actions flex column">
                    <button>
                        About this board
                    </button>
                    <button @click="toggleChangeBackground">
                        Change background
                    </button>
                    <button>
                        Stickers
                    </button>
                    <button>More</button>
                </div>
                <div class="activity">
                    <div class="title">
                        <h6>Activity</h6>
                        <div v-if="board.activities" class="activities">
                            <div v-for="activity in board.activities" class="activity">
                                <board-activity :activity="activity"></board-activity>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </section>
        <section v-if="isChangeBackground" class="bg-container menu-layout">
            <section class="menu-header">
                <span @click="toggleChangeBackground" class="back material-symbols-outlined">
                    arrow_back_ios
                </span>
                <h5>Change Background</h5>
                <span @click="closeModal()" class="material-symbols-outlined">
                    close
                </span>
            </section>
            <section class="menu-body">
                <div class="options">
                    <div @click="toggleImages">
                        <img src="https://i.ibb.co/tKphwfp/photos.jpg" />
                        <h6 class="title">Photos</h6>
                    </div>
                    <div @click="toggleColors">
                        <img src="https://i.ibb.co/GF3jN08/colors.jpg" />
                        <h6 class="title">Colors</h6>
                    </div>
                </div>
                <div @click="" class="custom">
                    <h6>Custom</h6>
                    <button>
                        <img-uploader :str="plus" @uploaded="onUploaded"></img-uploader>
                    </button>
                </div>
            </section>
        </section>
        <section v-if="isColors" class="color-container menu-layout">
            <section class="menu-header">
                <span @click="toggleColors" class="back material-symbols-outlined">
                    arrow_back_ios
                </span>
                <h5>Colors</h5>
                <span @click="closeModal()" class="material-symbols-outlined">
                    close
                </span>
            </section>
            <section class="menu-body">
                <div class="colors flex wrap">
                    <div @click="setBoardBgColor(color)"
                        :style="{ backgroundColor: color, borderRadius: 3 + 'px', width: 140 + 'px', height: 90 + 'px' }"
                        v-for="color in colors" class="color"></div>
                </div>
            </section>
        </section>
        <section v-if="isImages" class="img-container menu-layout">
            <section class="menu-header">
                <span @click="toggleImages" class="back material-symbols-outlined">
                    arrow_back_ios
                </span>
                <h5>Photos by Unsplash</h5>
                <span @click="closeModal()" class="material-symbols-outlined">
                    close
                </span>
            </section>
            <section class="menu-body">
                <div class="img-search">
                    <input type="search" placeholder="🔍Photos" v-model="searchTerm" @input="searchImages(searchTerm)">
                </div>
                <div class="images flex wrap">
                    <div v-for="image in images" @click="setBoardBgImg(image.src.original, image.avg_color)"
                        :style="{ borderRadius: 3 + 'px', width: 140 + 'px', height: 90 + 'px' }" class="image">
                        <img :style="{ width: 100 + '%', height: 100 + '%', objectFit: 'cover' }" :src="image.src.tiny">
                    </div>
                </div>
            </section>
        </section>
    </section>
</template>
<script>
import { uploadService } from '../../../services/upload.service'
import imgUploader from '../../img-uploader.vue'
import boardActivity from './board-activity.cmp.vue'
export default {
    emits: ['onUploaded', 'toggleMenu', 'changeBackgroundColor', 'changeBackgroundImg'],
    name: 'board-menu',
    components: {
        imgUploader,
        boardActivity
    },
    data() {
        return {
            plus: '+',
            colors: ['#0079bf', '#d29034', '#519839', '#b04632',
                '#89609e', '#cd5a91', '#4bbf6b', '#00aecc', '#838c91'],
            isColors: false,
            isImages: false,
            isMenu: true,
            isChangeBackground: false,
            images: null,
            searchTerm: '',
        };
    },
    created() {
    },
    methods: {
        onUploaded(imgUrl) {
            const avgColor = '#0079bf'
            this.$emit('changeBackgroundImg', imgUrl, avgColor)
        },
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
        setBoardBgImg(imgUrl, avgColor) {
            this.$emit('changeBackgroundImg', imgUrl, avgColor)
        },
        setBoardBgColor(color) {
            this.$emit('changeBackgroundColor', color)
        },
        toggleImages() {
            this.searchImages('nature')
            this.isChangeBackground = !this.isChangeBackground
            this.isImages = !this.isImages
        },
        toggleColors() {
            this.isChangeBackground = !this.isChangeBackground
            this.isColors = !this.isColors
        },
        toggleChangeBackground() {
            this.isMenu = !this.isMenu
            this.isChangeBackground = !this.isChangeBackground
        },
        closeModal() {
            this.$emit('toggleMenu')
        }
    },
    computed: {
        board() {
            return this.$store.getters.board
        }
    },
    unmounted() { },
};
</script>
<style>

</style>