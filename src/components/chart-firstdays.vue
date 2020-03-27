<template>
	<div class="py-8 px-8 md:px-0 bg-green-900">
		<div class="container mx-auto flex flex-col items-center">
			<h2 class="text-2xl leading-none font-bold text-center pb-8 text-white">
				First {{ numberOfDays }} days of the COVID-19
			</h2>

			<div class="w-10/12 md:w-1/3 py-3">
				<vue-range-slider
					ref="slider"
					v-model="numberOfDays"
					step="1"
					min="1"
					:max="getCuratedTimeseries.simple.length"
					:bg-style="sliderOptions.bgStyle"
					:tooltip-style="sliderOptions.tooltipStyle"
					:process-style="sliderOptions.processStyle"
				></vue-range-slider>
			</div>

			<div class="controls-wrapper flex items-center mb-8">
				<div class="text-white uppercase text-sm  mr-2">
					Change the number of days
				</div>
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
					The first {{ numberOfDays }} days of the virus in these countries.
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
	import {pickColor, trimEmptyCountryData} from "../helpers";

	import {mapActions, mapGetters} from "vuex";
	import "vue-range-component/dist/vue-range-slider.css";
	import VueRangeSlider from "vue-range-component";
	export default {
		components: {
			LineChart,
			BarChart,
			Datepicker,
			VueRangeSlider,
		},
		data() {
			return {
				datacollection: null,
				startDate: new Date("03/01/2020"),
				endDate: new Date(),
				dayInterval: 1000 * 60 * 60 * 24,
				numberOfDays: 10,
				sliderOptions: {
					bgStyle: {
						backgroundColor: "#fff",
						boxShadow: "inset 0.5px 0.5px 3px 1px rgba(0,0,0,.36)",
					},
					tooltipStyle: {
						backgroundColor: "#fff",
						borderColor: "#fff",
						color: "#000",
					},
					processStyle: {
						backgroundColor: "#E44450",
					},
				},
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
									stepSize: 10,
								},
							},
						],
						xAxes: [
							{
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
		mounted() {
			this.FETCH_TIMESERIES();
		},
		methods: {
			...mapActions(["FETCH_TIMESERIES"]),
			fillData() {
				let dataset = [];

				for (let country in this.getCuratedTimeseries.simple) {
					let highlightedCountryConfig = {
						borderColor: pickColor(country),
					};

					// Highlight Mauritius in red
					if (country === "Mauritius") {
						highlightedCountryConfig = {
							borderWidth: 4,
							borderColor: "#E44450",
						};
					}

					let countryData = {
						label: country,
						data: trimEmptyCountryData(
							this.getCuratedTimeseries.simple[country]
						).slice(0, this.numberOfDays),
						...this.points,
						...highlightedCountryConfig,
					};
					dataset.push(countryData);
				}

				let dateRange = this.getDates;

				this.datacollection = {
					labels: dateRange,
					datasets: dataset,
				};
			},
		},
		computed: {
			compoundProperty() {
				// watch all these properties
				return this.getCuratedTimeseries, this.numberOfDays, Date.now();
			},
			getDates() {
				let result = [];
				for (let i = 0; i < this.numberOfDays; i++) {
					result.push(`Day ${i + 1}`);
				}
				return result;
			},
			...mapGetters(["getActive", "getTimeseries", "getCuratedTimeseries"]),
		},
		watch: {
			compoundProperty() {
				this.fillData();
			},
		},
	};
</script>
