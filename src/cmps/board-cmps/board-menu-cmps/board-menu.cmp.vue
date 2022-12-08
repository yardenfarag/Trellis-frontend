<template>
    <section class="board-menu-layout">
        <section v-if="isMenu" class="main-menu-container">
            <section class="menu-header">
                <h5>Menu</h5>
                <span @click="closeModal()" class="material-symbols-outlined close">
                    close
                </span>
            </section>
            <div class="board-menu-wrapper">

                <section class="board-menu-content-frame">

                    <ul class="board-menu-navigation">
                        <!-- <li class="board-menu-navigation-item">
                            <span class="about-this-board for-icon">
                                <span class="board-menu-navigation-item-link">
                                    <span class="about-this-board-button-header">About this board</span>
                                </span>
                            </span>
                        </li> -->
                        <li class="board-menu-navigation-item">
                            <span @click="toggleChangeBackground" class="change-background for-icon">
                                <span :style="{ background: board.style.bgc }" class="small-bg"></span>
                                <span class="board-menu-navigation-item-link">
                                    <span class="about-this-board-button-header">Change Background</span>
                                </span>
                            </span>
                        </li>
                        <!-- <li class="board-menu-navigation-item">
                            <span class="stickers for-icon">
                                <span class="board-menu-navigation-item-link">
                                    <span class="about-this-board-button-header">Stickers</span>
                                </span>
                            </span>
                        </li>
                        <li class="board-menu-navigation-item">
                            <span class="more for-icon">
                                <span class="board-menu-navigation-item-link">
                                    <span class="about-this-board-button-header">More</span>
                                </span>
                            </span>
                        </li> -->
                    </ul>

                    <section class="activity-container">
                        <h6 class="activity-title">Activity</h6>
                        <div v-if="board.activities" class="activities">
                            <div v-for="activity in board.activities" class="activity">
                                <board-activity :activity="activity"></board-activity>
                            </div>
                        </div>
                    </section>
                </section>
            </div>
        </section>
        <section v-if="isChangeBackground" class="bg-container">
            <section class="menu-header">
                <span @click="toggleChangeBackground" class="back material-symbols-outlined">
                    arrow_back_ios
                </span>
                <h5>Change Background</h5>
                <span @click="closeModal()" class="close material-symbols-outlined ">
                    close
                </span>
            </section>
            <div class="board-menu-wrapper">
                <section class="board-menu-content-frame">
                    <section class="board-backgrounds-section-tiles">
                        <div class="board-backgrounds-photos-tile" @click="toggleImages">
                            <img src="https://i.ibb.co/tKphwfp/photos.jpg" />
                            <h6 class="title">Photos</h6>
                        </div>

                        <div class="board-backgrounds-colors-tile" @click="toggleColors">
                            <img src="https://i.ibb.co/GF3jN08/colors.jpg" />
                            <h6 class="title">Colors</h6>
                        </div>
                    </section>
                    <!-- <hr class="board-menu-divider"> -->
                    <div class="custom">
                        <h6>Custom</h6>
                        <button>
                            <img-uploader :str="plus" @uploaded="onUploaded"></img-uploader>
                        </button>
                    </div>
                </section>
            </div>
        </section>
        <section v-if="isColors" class="color-container">
            <section class="menu-header">
                <span @click="toggleColors" class="back material-symbols-outlined">
                    arrow_back_ios
                </span>
                <h5>Colors</h5>
                <span @click="closeModal()" class="close  material-symbols-outlined">
                    close
                </span>
            </section>
            <div class="board-menu-wrapper">
                <section class="board-menu-content-frame">
                    <div class="board-backgrounds-list-observer">
                        <section class="board-backgrounds-colors">
                            <div @click="setBoardBgColor(color)" :style="{ backgroundColor: color }"
                                v-for="color in colors" class="color"></div>
                        </section>
                    </div>
                </section>
            </div>
        </section>
        <section v-if="isImages" class="img-container">
            <section class="menu-header">
                <span @click="toggleImages" class="back material-symbols-outlined">
                    arrow_back_ios
                </span>
                <h5>Photos by Unsplash</h5>
                <span @click="closeModal()" class="close material-symbols-outlined">
                    close
                </span>
            </section>
            <div class="board-menu-wrapper">
                <section class="board-menu-content-frame">
                    <section class="board-backgrounds-photos">
                        <div class="img-search">
                            <input class="primary-input-menu" type="search" placeholder="Photos" v-model="searchTerm"
                                @input="searchImages(searchTerm)">
                        </div>
                        <div class="board-backgrounds-list-observer">
                            <div class="board-backgrounds-list">
                                <div v-for="image in images" @click="setBoardBgImg(image.src.original, image.avg_color)"
                                    class="image">
                                    <img :src="image.src.tiny">
                                </div>
                            </div>
                        </div>
                    </section>
                </section>
            </div>
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
            console.log(this.$store.getters.board);
            return this.$store.getters.board
        }
    },
    unmounted() { },
};
</script>
<style>

</style>