<template>
  <BarChart :chartData="testData" :options="options" />
</template>
  
<script>
import { BarChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

export default {
  name: 'awesome-chart',
  props: {
    board: Object,
  },
  components: { BarChart },
  data() {
    return {
      testData: {
        labels: this.board.memberIds,
        datasets: [
          {
            data: [30, 40, 60, 70, 5],
            backgroundColor: [
              'red',
              '#77CEFF',
              '#0079AF',
              '#123E6B',
              '#97B0C4',
              '#A5C8ED',
            ],
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    }
  },
  created() {
  },
}
</script>
  