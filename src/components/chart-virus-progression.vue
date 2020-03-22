<template>
  <div class="py-8 bg-gray-300">
    <div class="container mx-auto">
      <h2 class="text-2xl leading-none pb-8">Virus Progression</h2>
      <div class="chart w-full">
        <line-chart
          :responsive="true"
          :chart-data="datacollection"
          :options="options"
        ></line-chart>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from "../helpers/LineChart";
import BarChart from "../helpers/BarChart";
import { mapGetters } from "vuex";
export default {
  components: {
    LineChart,
    BarChart
  },
  data() {
    return {
      datacollection: null,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        height: 500,
        scales: {
          yAxes: [
            {
              ticks: {
                stepSize: 1
              }
            }
          ],
          xAxes: [
            {
              stacked: true
            }
          ]
        }
      }
    };
  },
  watch: {
    getStats() {
      this.fillData();
    }
  },
  mounted() {},
  methods: {
    fillData() {
      this.datacollection = {
        labels: this.getTimestamps,
        datasets: [
          {
            label: "Active Cases",
            borderColor: "#ff0000",
            backgroundColor: "transparent",

            data: this.getActive
          },
          {
            label: "Total",
            borderColor: "gray",

            backgroundColor: "transparent",
            data: this.getTotal
          }
        ]
      };
    }
  },
  computed: {
    ...mapGetters(["getStats", "getTimestamps", "getTotal", "getActive"])
  }
};
</script>
