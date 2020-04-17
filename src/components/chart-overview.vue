<template>
	<div class="py-8 px-8 md:px-0 bg-gray-900">
		<div class="container mx-auto">
			<h2 class="text-2xl leading-none font-bold text-center pb-8 text-white">
				Mauritius Statistics
			</h2>
			<div class="chart w-full">
				<line-chart
					:chart-data="datacollection"
					:options="options"
					:responsive="true"
					v-if="getUpdated"
				></line-chart>
			</div>
			<div>
				<p class="text-gray-500 text-center pt-5">
					A cumulative chart showing statistics about Active Cases, Deceased,
					Recovered and the Total number of cases.
				</p>
			</div>
		</div>
	</div>
</template>

<script>
	import LineChart from "../helpers/LineChart";
	import BarChart from "../helpers/BarChart";
	import {mapGetters} from "vuex";

	export default {
		components: {
			LineChart,
			BarChart,
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
							fontColor: "rgb(255, 255, 255)",
						},
					},
					scales: {
						yAxes: [
							{
								gridLines: {
									color: "rgba(255,255,255,0.1)",
								},
								ticks: {
									stepSize: 1,
								},
							},
						],
						xAxes: [
							{
								stacked: true,
							},
						],
					},
				},
				points: {
					pointStyle: "circle",
					borderWidth: 1,
					datasetStrokeWidth: 1,
				},
			};
		},
		watch: {
			getUpdated() {
				this.fillData();
			},
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
							borderColor: "#E44450",
							label: "Active Cases",
							backgroundColor: "rgba(228,68,80,0.1)",
							data: this.getActive,
						},
						{
							label: "Deceased",
							borderColor: "#fff",
							borderWidth: 4,
							backgroundColor: "transparent",
							data: this.getTotalDeceased,
							...this.points,
						},
						{
							label: "Recovered",
							borderColor: "#4bce00",
							backgroundColor: "transparent",
							data: this.getTotalRecovered,
							...this.points,
						},
						{
							label: "Total",
							borderColor: "#f5dd06",
							backgroundColor: "transparent",
							data: this.getTotal,
							...this.points,
						},
					],
				};
			},
		},
		computed: {
			...mapGetters([
				"getStats",
				"getTimestamps",
				"getTotal",
				"getTotalDeceased",
				"getTotalRecovered",
				"getActive",
				"getUpdated"
			]),
		},
	};
</script>
