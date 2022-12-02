<template>
    <section v-if="isMenu" class="modal-container">
        <button @click="closeModal">X</button>
        <div class="menu-title">
            <h5>Menu</h5>
        </div>
        <hr>
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
                <h5>Activity</h5>
            </div>
            <div class="activities">
                <p>example: Yarden changed the background color of this board</p>
            </div>
        </div>
    </section>
    <section v-if="isChangeBackground" class="modal-container">
        <button @click="toggleChangeBackground"> ← </button>
        <button @click="closeModal">X</button>
        <div class="modal-title">
            <h5>Change background</h5>
        </div>
        <div class="options">
            <div @click="toggleImages">
                <img :style="{ borderRadius: 3 + 'px', width: 140 + 'px', height: 100 + 'px', }"
                    src="https://i.ibb.co/tKphwfp/photos.jpg">
                <h6>Photos</h6>
            </div>
            <div @click="toggleColors">
                <img :style="{ borderRadius: 3 + 'px', width: 140 + 'px', height: 100 + 'px', }"
                    src="https://i.ibb.co/GF3jN08/colors.jpg">
                <h6>Colors</h6>
            </div>
        </div>
        <hr>
        <div @click="" class="custom">
            <h4>Custom</h4>
            <button>
                <img-uploader :str="plus" @uploaded="onUploaded"></img-uploader>
            </button>
        </div>
    </section>
    <section v-if="isColors" class="modal-container">
        <button @click="toggleColors"> ← </button>
        <button @click="closeModal">X</button>
        <div class="modal-title">
            <h5>Colors</h5>
        </div>
        <div class="colors flex wrap">
            <div @click="setBoardBgColor(color)"
                :style="{ backgroundColor: color, borderRadius: 3 + 'px', width: 140 + 'px', height: 90 + 'px' }"
                v-for="color in colors" class="color"></div>
        </div>
    </section>
    <section v-if="isImages" class="modal-container">
        <button @click="toggleImages"> ← </button>
        <button @click="closeModal">X</button>
        <div class="modal-title">
            <h5>Photos by Pexels</h5>
        </div>
        <hr>
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
</template>
<script>
import { uploadService } from '../../../services/upload.service';
import imgUploader from '../../img-uploader.vue';
export default {
    emits: ['onUploaded', 'toggleMenu', 'changeBackgroundColor', 'changeBackgroundImg'],
    name: 'board-menu',
    components: {
        imgUploader
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
            this.$emit('changeBackgroundImg', imgUrl)
        },
        async searchImages(searchTerm) {
            try {
                const images = await uploadService.getImages(searchTerm)
                this.images = images.photos
                console.log(this.images);
            }
            catch (err) {
                console.log('Cannot get images')
                throw err
            }
        },
        setBoardBgImg(imgUrl, avgColor) {
            console.log(avgColor);
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
    },
    unmounted() { },
};
</script>
<style>

</style>