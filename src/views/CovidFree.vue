<template>
	<div class="py-8 px-8 md:px-0 bg-blue-800">
		<div class="container mx-auto flex flex-col items-center justify-center">
			<h2 class="text-2xl leading-normal font-bold text-center pb-8 text-white">
				Countries with Zero Cases of COVID-19
				<!-- <input
					type="number"
					min="0"
					max="100"
					v-model="limit"
					class="text-black w-24"
				/> -->
			</h2>

			<pre class="hidden">
				{{ freeByCountries }}
			</pre>

			<div class="chart w-full">
				<horizontal-bar
					:chart-data="datacollection"
					:options="options"
					:responsive="true"
					:height="height"
				></horizontal-bar>
			</div>
			<div>
				<p class="text-gray-200 text-center pt-5 pb-16">
					Number of days since active cases country have {{ limit }} cases of
					COVID-19.
					<span class=""
						>Source :
						<a href="https://github.com/CSSEGISandData/COVID-19"
							>Johns Hopkins CSSE</a
						></span
					>
				</p>
			</div>
		</div>
		<ShareSection></ShareSection>
	</div>
</template>

<script>
	import HorizontalBar from "../helpers/HorizontalBar";
	import ShareSection from "../components/share-section";

	import {mapGetters} from "vuex";

	export default {
		components: {
			HorizontalBar,
			ShareSection,
		},
		data() {
			return {
				labels: [],
				limit: 0,
				height: 500,
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
								ticks: {
									stepSize: 1,
									fontColor: "#fff",
								},
							},
						],
						xAxes: [
							{
								ticks: {
									source: "labels",
									fontColor: "#fff",
								},
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
			limit() {
				this.fillData();
			},
		},
		mounted() {},
		methods: {
			fillData() {
				this.datacollection = {
					labels: this.labels,
					datasets: [
						{
							label: `Number of days`,
							backgroundColor: "#68D391",
							data: this.freeByCountries,
						},
					],
				};
			},
			daysCovidFreeByCountry(country) {
				if (!this.getTimeseries.hasOwnProperty(country)) return;

				let currentCountry = this.getTimeseries[country];

				let arrayOfActiveCases = currentCountry.reduce(this.reducerActiv, []);
				arrayOfActiveCases.reverse();

				let count = 0;
				for (let i = 0; i < arrayOfActiveCases.length; i++) {
					if (arrayOfActiveCases[i] <= this.limit) {
						count++;
					} else {
						break;
						// First time using break in a for loop xD
					}
				}

				return count;
			},
			reducerActiv(accumulator, item) {
				let active = item.confirmed - (item.deaths + item.recovered);
				accumulator.push(active);
				return accumulator;
			},
		},
		computed: {
			...mapGetters([
				"getStats",
				"getTimeseries",
				"getTimestamps",
				"getNew",
				"getDeceased",
				"getRecovered",
			]),
			freeByCountries() {
				this.labels = [];
				let countryArray = [];
				for (const country in this.getTimeseries) {
					let days = this.daysCovidFreeByCountry(country);
					if (days !== 0) {
						countryArray.push({
							y: country,
							x: days,
							backgroundColor: "#f00",
						});
						this.labels.push(country);
					}
				}

				this.height = countryArray.length * 50;

				// console.log(countryArray);
				return countryArray;
			},
		},
		created() {
			this.$store.dispatch("FETCH_STATS");
			this.$store.dispatch("FETCH_TIMESERIES");
		},
	};
</script>
