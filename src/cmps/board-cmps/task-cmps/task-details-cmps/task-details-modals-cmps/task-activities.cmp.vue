<template>
    <div v-if="activity" class="activity-info flex align-center">
        <img :src="activity.byMember?.imgUrl" :style="{ width: 40 + 'px', 'border-radius': 50 + '%' }">
        <h3>{{ activity.byMember.fullname }}</h3>
        <h4>{{ activity.txt }}</h4>
        <div class="time">
            <h6>{{ formattedTime }}</h6>
        </div>
    </div>
</template>
<script>
import { utilService } from '../../../services/util.service';

export default {
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

    },
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