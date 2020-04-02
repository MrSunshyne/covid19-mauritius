<template>
	<div class="py-8 px-8 md:px-0 bg-green-900">
		<div class="container mx-auto flex flex-col items-center justify-center">
			<h2 class="text-2xl leading-normal font-bold text-center pb-8 text-white">
				First {{ numberOfDays }} days of the COVID-19

				<button
					v-if="!timer.isRunning"
					class="ml-3 text-sm uppercase font-bold tracking-tight py-2 px-4 rounded-full bg-white text-black shadow"
					@click="toggleTimer"
				>
					Replay animation
				</button>
				<button
					v-else
					class="ml-3 text-sm uppercase font-bold tracking-tight py-2 px-4 rounded-full bg-white text-black shadow"
					@click="timer.isRunning = false"
				>
					Pause
				</button>
			</h2>

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
	import {pickColor, trimEmptyCountryData, sleep} from "../helpers";
	import {mapActions, mapGetters} from "vuex";
	import {FETCH_VERIFIED_STATS} from "../store";

	export default {
		components: {
			LineChart,
			BarChart,
		},
		data() {
			return {
				datacollection: null,
				startDate: new Date("03/01/2020"),
				endDate: new Date(),
				dayInterval: 1000 * 60 * 60 * 24,
				numberOfDays: 15,
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
					animation: {
						easing: 'linear',
					},
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
				timer: {
					isRunning: false,
					interval: undefined, // store the interval here
				},
			};
		},
		mounted() {
			this.FETCH_TIMESERIES();
		},
		methods: {
			...mapActions(["FETCH_TIMESERIES", "FETCH_VERIFIED_STATS"]),
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
			async toggleTimer() {
				if (this.timer.isRunning) {
					clearInterval(this.timer.interval);
				} else {
					// this.numberOfDays = 1;

					while (this.numberOfDays != 2) {
						await sleep(200)
						this.numberOfDays--;
					}


					this.timer.interval = setInterval(this.incrementTime, 500);
				}
				this.timer.isRunning = !this.timer.isRunning; // better to read
			},
			incrementTime() {
				if (!this.timer.isRunning) {
					clearInterval(this.timer.interval);
				} else {
					this.numberOfDays += 1;
				}
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
			...mapGetters([
				"getActive",
				"getTimeseries",
				"getCuratedTimeseries",
				"getVerifiedStats",
			]),
		},
		watch: {
			compoundProperty() {
				this.fillData();
			},
		},
	};
</script>
