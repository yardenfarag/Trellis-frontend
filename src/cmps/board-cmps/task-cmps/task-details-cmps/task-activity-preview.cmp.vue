<template>
    <div class="activity-info">
        <div class="img-grabber">
            <div class="img-container">
                <img :src="activity.byMember?.imgUrl" :style="{ width: 32 + 'px', 'border-radius': 50 + '%' }">
            </div>
        </div>
        <div class="info">
            <div class="name-and-act">
                <span class="name">{{ activity.byMember?.fullname }} <span> </span></span>
                <span class="act"> {{ activity.txt }} </span>
            </div>
            <div class="time">
                <span>{{ formattedTime }}</span>
            </div>
        </div>
    </div>
</template>
<script>
import { utilService } from '../../../../services/util.service.js'

export default {
    props: {
        activity: Object
    },
    name: 'task-activity-preview',
    components: {},
    data() {
        return {};
    },
    created() { },
    methods: {},
    computed: {
        formattedTime() {
            return utilService.timeAgo(this.activity.createdAt)
        }
    },
    unmounted() { },
};
</script>
<style>

</style>