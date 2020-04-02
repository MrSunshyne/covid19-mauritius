<template>
	<div class="py-8 px-8 md:px-0 bg-teal-900">
		<div class="container mx-auto flex flex-col items-center">
			<h2 class="text-2xl leading-none font-bold text-center pb-8 text-white">
				Worldwide Trends
			</h2>

			<div class="controls-wrapper grid gap-4 sm:flex pb-8 text-white ">
				<div class="flex">
					<label for="" class="font-bold mr-2 text-sm uppercase">From: </label>
					<datepicker
						class="mr-2 text-center text-black"
						placeholder="Start Date"
						type="date"
						v-model="startDate"
						:disabled-dates="{from: new Date()}"
					></datepicker>
				</div>

				<div class="flex">
					<label for="" class="font-bold mr-2 text-sm uppercase">To: </label>
					<datepicker
						class="mr-2 text-center text-black"
						placeholder="End Date"
						type="date"
						v-model="endDate"
						:disabled-dates="{from: new Date()}"
					></datepicker>
				</div>
				<!--				<button-->
				<!--					@click="toggleChartYAxisType"-->
				<!--					class="mx-auto btn p-2 bg-green-600 hover:bg-green-700 text-xs uppercase font-bold rounded text-white inline-block mb-8"-->
				<!--				>-->
				<!--					Chart type-->
				<!--				</button>-->
				<!--				<div v-else>Data loaded succesfully</div>-->
			</div>

			<div class="chart w-full">
				<line-chart
					:chart-data="datacollection"
					:options="options"
					:responsive="true"
				></line-chart>
			</div>
			<div>
				<p class="text-gray-200 text-center pt-5">
					Mauritius on the global (linear) scale with selected countries
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
	import Datepicker from "vuejs-datepicker";
	import {pickColor} from "../helpers";

	import {mapActions, mapGetters} from "vuex";

	export default {
		components: {
			LineChart,
			BarChart,
			Datepicker,
		},
		data() {
			return {
				datacollection: null,
				startDate: new Date("03/01/2020"),
				endDate: new Date(),
				dayInterval: 1000 * 60 * 60 * 24,
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
								type: "linear",
							},
						],
						xAxes: [
							{
								type: "time",
								bounds: "ticks",
								ticks: {
									source: "labels",
								},
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
			compoundProperty() {
				this.fillData();
			},
		},
		mounted() {
			this.FETCH_TIMESERIES();
		},
		computed: {
			compoundProperty() {
				// watch all these properties
				return (
					this.getCuratedTimeseries,
					this.startDate,
					this.endDate,
					this.chartType,
					Date.now()
				);
			},
			...mapGetters([
				"getStats",
				"getTimestamps",
				"getTotal",
				"getTotalDeceased",
				"getRecovered",
				"getActive",
				"getTimeseries",
				"getCuratedTimeseries",
			]),
		},
		methods: {
			...mapActions(["FETCH_TIMESERIES"]),
			getDates(startDate, endDate, interval) {
				const duration = endDate - startDate;
				const steps = duration / interval;
				return Array.from(
					{length: steps + 1},
					(v, i) => new Date(startDate.valueOf() + interval * i)
				);
			},
			toggleChartYAxisType() {
				if (this.options.scales.yAxes[0].type === "linear") {
					this.options.scales.yAxes[0].type = "logarithmic";
				} else {
					this.options.scales.yAxes[0].type = "linear";
				}
			},
			fillData() {
				let dataset = [];

				for (let country in this.getCuratedTimeseries.points) {
					let highlightedCountryConfig = {
						borderColor: pickColor(country),
					};

					if (country === "Mauritius") {
						highlightedCountryConfig = {
							borderWidth: 4,
							borderColor: "#E44450",
						};
					}

					let countryData = {
						label: country,
						data: this.getCuratedTimeseries.points[country],
						...this.points,
						...highlightedCountryConfig,
					};
					dataset.push(countryData);
				}

				let dateRange = this.getDates(
					this.startDate,
					this.endDate,
					this.dayInterval
				);

				this.datacollection = {
					labels: dateRange,
					datasets: dataset,
				};
			},
		},
	};
</script>
