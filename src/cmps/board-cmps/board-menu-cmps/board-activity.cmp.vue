<template>
    <div v-if="activity" class="activity-info">
        <div class="img-grabber">
            <div class="img-container">
                <img :src="activity.byMember?.imgUrl" :style="{ width: 32 + 'px', 'border-radius': 50 + '%' }">
            </div>
        </div>
        <div class="info">
            <div class="name-and-act">
                <span class="name">{{ activity.byMember.fullname }} <span> </span></span>
                <span @click="openTask" class="act"> {{ activity.txt }} </span>
            </div>
            <div class="time">
                <span>{{ formattedTime }}</span>
            </div>
        </div>
    </div>
</template>
<script>
import { utilService } from '../../../services/util.service';

export default {
    emits: ['openTask'],
    props: {
        activity: Object
    },
    name: 'board-activity',
    components: {},
    data() {
        return {};
    },
    created() { },
    methods: {
        openTask() {
            if (!this.activity.task) return
            this.$emit('openTask', this.activity.task)
        }
    },
    computed: {
        formattedTime() {
            return utilService.timeAgo(this.activity.createdAt)
        }
    },
    mounted() {
        // console.log(this.activity)

    },
    unmounted() { },
};
</script>
<style>

</style>