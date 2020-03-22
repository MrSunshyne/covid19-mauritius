<template>
  <div class="py-8 px-8 md:px-0 bg-gray-100">
    <div class="container mx-auto ">
      <h2 class="text-2xl leading-none pb-8">New Cases</h2>
      <div class="chart-container w-full relative" v-if="getStats">
        <bar-chart
          :responsive="true"
          :chart-data="datacollection"
          :options="options"
        ></bar-chart>
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
            label: "Deceased",
            backgroundColor: "#ff0000",
            data: this.getDeceased
          },
          {
            label: "New Cases",
            // backgroundColor: "#ff0000",
            data: this.getNew
          }
        ]
      };
    }
  },
  computed: {
    ...mapGetters(["getStats", "getTimestamps", "getNew", "getDeceased"])
  }
};
</script>
