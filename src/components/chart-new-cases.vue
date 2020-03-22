<template>
  <div class="py-8 bg-gray-100">
    <div class="container mx-auto ">
      <h2 class="text-2xl leading-none pb-8">New Cases</h2>
      <div class="chart-container w-full h-64 bg-red-300 relative">
        <line-chart :chart-data="datacollection"></line-chart>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from "../helpers/LineChart";

export default {
  components: {
    LineChart
  },
  data() {
    return {
      datacollection: null
    };
  },
  mounted() {
    this.fillData();
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: [this.getRandomInt(), this.getRandomInt()],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [this.getRandomInt(), this.getRandomInt()]
          },
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [this.getRandomInt(), this.getRandomInt()]
          }
        ]
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    }
  }
};
</script>
