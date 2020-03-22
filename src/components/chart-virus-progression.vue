<template>
  <div class="py-8 px-8 md:px-0 bg-gray-900">
    <div class="container mx-auto">
      <h2 class="text-2xl leading-none font-bold text-center pb-8 text-white">
        Overview
      </h2>
      <div class="chart w-full">
        <line-chart
          :responsive="true"
          :chart-data="datacollection"
          :options="options"
        ></line-chart>
      </div>
      <div>
        <p class="text-gray-500 text-center pt-5">
          A cummulative chart showing statistics about Active Cases, Deceased,
          Recovered and the Total number of cases.
        </p>
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
        legend: {
          display: true,
          labels: {
            fontColor: "rgb(255, 255, 255)"
          }
        },
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
      },
      points: {
        pointStyle: "circle",
        borderWidth: 1,
        datasetStrokeWidth: 1
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
            ...this.points,
            borderWidth: 4,
            label: "Active Cases",
            borderColor: "#E44450",
            backgroundColor: "transparent",
            data: this.getActive
          },
          {
            label: "Deceased",
            borderColor: "#fff",
            backgroundColor: "transparent",
            data: this.getTotalDeceased,
            ...this.points
          },
          {
            label: "Recovered",
            borderColor: "#4bce00",
            backgroundColor: "transparent",
            data: this.getRecovered,
            ...this.points
          },
          {
            label: "Total",
            borderColor: "lightgray",
            backgroundColor: "transparent",
            data: this.getTotal,
            ...this.points
          }
        ]
      };
    }
  },
  computed: {
    ...mapGetters([
      "getStats",
      "getTimestamps",
      "getTotal",
      "getTotalDeceased",
      "getRecovered",
      "getActive"
    ])
  }
};
</script>
