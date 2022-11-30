<template>
  <section v-if="task.location" class="location-container">
    <div class="title">
      <h3><span>📍</span>Location</h3>
    </div>

    <div class="map">
      <GoogleMap api-key="AIzaSyAgIcVfys_vQ4OwhTVIut8RsPboBf17FXA" style="width: 100%; height: 500px" :center="center"
        :zoom="7">
        <Marker v-for="m in markers" :options="m" @click="center = m.position" />
      </GoogleMap>
    </div>
  </section>
</template>
<script>
import { GoogleMap, Marker } from "vue3-google-map";
export default {
  props: ['task'],
  name: 'task-map',
  components: {},
  data() {
    return {
      center: { lat: 32.085300, lng: 34.781769 },
      markers: [
        {
          title: 'Tel-Aviv',
          label: 'A',
          position: { lat: 32.085300, lng: 34.781769 }
        },
      ]
    };
  },
  created() { },
  methods: {},
  computed: {},
  unmounted() { },
};
</script>
<style>

</style>