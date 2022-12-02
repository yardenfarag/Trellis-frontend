<template>
    <section :style="{ background: board.style.bgc, backgroundSize: 'cover' }" v-if="board" class="board-details">
        <!-- <img id="i" src="../assets/icon.png" alt=""> -->
        <board-header @toggleMenu="toggleMenu" v-if="board" :board="board"></board-header>
        <ul class="clean-list flex group-list">
            <li v-for="group in board.groups" :key="group.id">
                <group-details :group="group" :boardId="board._id" />
            </li>
            <li>
                <div v-if="!isAddGroup" @click="isAddGroup = true" class="btn-open-add-group opacity-input">
                    <span style="font-size:20px;" class="material-symbols-outlined">
                        add
                    </span><span>Add another list</span>
                </div>
                <section v-if="isAddGroup" class="add-group-open">
                    <input v-model="groupToSave.title" type="text" placeholder="Enter list title">
                    <div class="add-group-controler">
                        <button @click="addGroup" class="call-to-action">Add List</button>
                        <span @click="isAddGroup = false" class="close-add-group material-symbols-outlined">
                            close
                        </span>
                    </div>
                </section>
            </li>
        </ul>
        <board-menu @changeBackgroundImg="changeBackgroundImg" @changeBackgroundColor="changeBackgroundColor"
            @toggleMenu="toggleMenu" v-if="isMenuOpen">
        </board-menu>
    </section>
    <router-view />
</template>

<script>
import boardHeader from '../cmps/board-cmps/board-header-cmps/board-header.cmp.vue';
import groupDetails from '../cmps/board-cmps/group-cmps/group-details.cmp.vue'
import boardMenu from '../cmps/board-cmps/board-menu-cmps/board-menu.cmp.vue';
export default {
    name: 'board-details',
    components: {
        groupDetails,
        boardHeader,
        boardMenu,
    },
    data() {
        return {
            isMenuOpen: false,
            isAddGroup: false,
            groupToSave: {
                title: '',
                style: {},
                tasks: [],
            }
        };
    },
    async created() {
        const { boardId } = this.$route.params
        if (!this.$store.getters.board) await this.$store.dispatch({ type: 'setCurrBoard', boardId })
    },
    methods: {
        async changeBackgroundImg(imgUrl, avgColor) {
            const boardToSave = JSON.parse(JSON.stringify(this.board))
            boardToSave.style.bgc = `url(${imgUrl})`
            await this.$store.dispatch({ type: 'saveBoard', board: boardToSave })
            await this.$store.dispatch({ type: 'setHeaderClr', color: avgColor })
        },
        async changeBackgroundColor(color) {
            const boardToSave = JSON.parse(JSON.stringify(this.board))
            boardToSave.style.bgc = color
            await this.$store.dispatch({ type: 'saveBoard', board: boardToSave })
            await this.$store.dispatch({ type: 'setHeaderClr', color })
        },
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen
        },
        async addGroup() {
            if (!this.groupToSave.title) return
            const boardToSave = JSON.parse(JSON.stringify(this.board))
            await this.$store.dispatch({ type: 'saveGroup', board: boardToSave, groupToEdit: this.groupToSave })
            this.groupToSave = {
                title: '',
                style: {},
                tasks: [],
            }
        }
    },
    computed: {
        board() {
            return this.$store.getters.board
        }
    },
    // mounted() {

    //     var rgb = getAverageRGB(document.getElementById('i'));
    //     document.body.style.backgroundColor = 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';

    //     function getAverageRGB(imgEl) {

    //         var blockSize = 5, // only visit every 5 pixels
    //             defaultRGB = { r: 0, g: 0, b: 0 }, // for non-supporting envs
    //             canvas = document.createElement('canvas'),
    //             context = canvas.getContext && canvas.getContext('2d'),
    //             data, width, height,
    //             i = -4,
    //             length,
    //             rgb = { r: 0, g: 0, b: 0 },
    //             count = 0;

    //         if (!context) {
    //             return defaultRGB;
    //         }

    //         height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    //         width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

    //         context.drawImage(imgEl, 0, 0);

    //         try {
    //             data = context.getImageData(0, 0, width, height);
    //         } catch (e) {
    //         /* security error, img on diff domain */alert('x');
    //             return defaultRGB;
    //         }

    //         length = data.data.length;

    //         while ((i += blockSize * 4) < length) {
    //             ++count;
    //             rgb.r += data.data[i];
    //             rgb.g += data.data[i + 1];
    //             rgb.b += data.data[i + 2];
    //         }

    //         // ~~ used to floor values
    //         rgb.r = ~~(rgb.r / count);
    //         rgb.g = ~~(rgb.g / count);
    //         rgb.b = ~~(rgb.b / count);
    //         console.log(rgb)
    //         return rgb;

    //     }

    // },
    unmounted() { },
}
</script>

