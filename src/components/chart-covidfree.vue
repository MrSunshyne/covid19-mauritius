<template>
	<div class="py-8 px-8 md:px-0 bg-green-900">
		<div class="container mx-auto flex flex-col items-center justify-center">
			<h2 class="text-2xl leading-normal font-bold text-center pb-8 text-white">
				Days since Covid Free
			</h2>

			<pre>
				<!-- {{ getTimeseries }} -->
			</pre>

			<div class="chart w-full">
				<bar-chart
					:chart-data="datacollection"
					:options="options"
					:responsive="true"
				></bar-chart>
			</div>
			<div>
				<p class="text-gray-200 text-center pt-5">
					Number of days since these country have been COVID19 free.
					<span class=""
						>Source :
						<a href="https://github.com/CSSEGISandData/COVID-19"
							>Johns Hopkins CSSE</a
						></span
					>
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
					height: 500,
					scales: {
						yAxes: [
							{
								ticks: {
									stepSize: 1,
								},
							},
						],
						xAxes: [
							{
								stacked: false,
							},
						],
					},
				},
			};
		},
		watch: {
			getStats() {
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
							label: "Deceased",
							backgroundColor: "#111",
							data: this.getDeceased,
						},
						{
							label: "New Cases",
							backgroundColor: "#E44450",
							data: this.getNew,
						},
						{
							label: "Recovered",
							backgroundColor: "#19aa00",
							data: this.getRecovered,
						},
					],
				};
			},
		},
		computed: {
			...mapGetters([
				"getVerifiedStats",
				"getTimeseries",
				"getTimestamps",
				"getNew",
				"getDeceased",
				"getRecovered",
			]),
		},
	};
</script>
