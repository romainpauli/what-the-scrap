<template>
  <div class="h-full h-[600px] p-10 shadow" >
    <vue3-chart-js
        :id="lineChart.id"
        :type="lineChart.type"
        :data="lineChart.data"
        :options="lineChart.options"
        @before-render="beforeRenderLogic"
    ></vue3-chart-js>
  </div>
</template>

<script>
import { toRefs } from 'vue'
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'

export default {
  name: 'App',
  components: {
    Vue3ChartJs,
  },
  props: {
      obj: Object,
      default: () => {}
  },
  setup (props) {
    const { obj } = toRefs(props)
    const lineChart = {
      id: 'line',
      type: 'line',
      data: {
        labels: obj.value.date,
        datasets: [
          {
            label: "In",
            data: obj.value.enter_1_pred_0,
            backgroundColor: "rgba(50, 200, 200, 0.35)",
            borderColor: "rgba(50, 200, 200, 0.55)",
            pointBackgroundColor: "rgba(50, 200, 200, 1)",
            pointRadius: 1.5,
          },
          {
            label: "In pred.",
            data: obj.value.enter_1_pred_1,
            backgroundColor: "rgba(50, 200, 200, 0.1)",
            borderColor: "rgba(50, 200, 200, 0.2)",
            pointBackgroundColor: "rgba(50, 200, 200, 0.2)",
            pointRadius: 1.5,
          },
          {
            label: "out",
            data: obj.value.enter_0_pred_0,
            backgroundColor: "rgba(255,105,180, 0.25)",
            borderColor: "rgba(255,105,180, 0.50)",
            pointBackgroundColor: "rgba(255,105,180, 1)",
            pointRadius: 1.5,
          },
          {
            label: "out pred.",
            data: obj.value.enter_0_pred_1,
            backgroundColor: "rgba(255,105,180, 0.1)",
            borderColor: "rgba(255,105,180, 0.2)",
            pointBackgroundColor: "rgba(255,105,180, 0.2)",
            pointRadius: 1.5,
          },
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    }

    const beforeRenderLogic = (event) => {
      //...
      //if(a === b) {
      //  event.preventDefault()
      //}
    }

    return {
      lineChart,
      beforeRenderLogic
    }
  },
}
</script>
