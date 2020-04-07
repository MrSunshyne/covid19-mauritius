<template>
	<div class="py-8 px-8 md:px-0 bg-gray-900">
		<div class="flex flex-col">
			<div class="md:flex justify-between text-white capitalize items-center p-4 md:py-0">

				<router-link :to="`/country/${previousCountry}`" class="block p-2 md:p-6 bg-gray-800 hover:bg-gray-700 w-full text-center md:text-left md:w-2/12">
                    <div class="text-xs  leading-none">Show for</div>
                    <div class="font-bold uppercase text-sm md:text-lg truncate">{{ previousCountry }}</div>
                </router-link>
				<div class="py-4 md:pb-8 text-center">
					<h2
						class="text-2xl md:text-4xl leading-none font-bold"
						v-if="getTimeseries"
					>
						{{ currentCountry }}
					</h2>
					<div class="text-sm uppercase">COVID-19 Stats</div>
				</div>
                <router-link :to="`/country/${nextCountry}`" class="block p-2 md:p-6 bg-gray-800 hover:bg-gray-700 w-full md:w-2/12 text-center md:text-right trim">
                    <div class="text-xs  leading-none">Show for</div>
                    <div class="font-bold uppercase text-sm md:text-lg truncate">{{ nextCountry }}</div>
                </router-link>
            </div>

			<div class="flex justify-center">
				<div class="controls-wrapper grid gap-4 sm:flex pb-0 md:pb-8 text-white ">
					<div class="flex">
						<label for="" class="font-bold mr-2 text-sm uppercase">From: </label>
						<datepicker
							class="mr-2 text-center text-black"
							placeholder="Start Date"
							type="date"
							v-model="startDate"
							:disabled-dates="{from: new Date(), to: new Date('2020/01/22')}"
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
				</div>
				<!--				<button-->
				<!--					@click="toggleChartYAxisType"-->
				<!--					class="mx-auto btn p-2 bg-green-600 hover:bg-green-700 text-xs uppercase font-bold rounded text-white inline-block mb-8"-->
				<!--				>-->
				<!--					Chart type-->
				<!--				</button>-->
				<!--				<div v-else>Data loaded succesfully</div>-->
			</div>


			<div>
				<div class="container mx-auto">
					<div class="grid grid-cols-1 sm:grid-cols-2 justify-center lg:grid-cols-3 gap-5 py-8" v-if="countryData">
						<StatCard
								:color="'red'"
								:icon="'total'"
								:label="'Total'"
								:value="confirmed"
								class="bg-white"
						>icon
						</StatCard>
						<StatCard
								:color="'gray'"
								:icon="'deceased'"
								:label="'Deceased'"
								:value="deaths"
								class="bg-white"
						>icon
						</StatCard>
						<StatCard
								:color="'green'"
								:icon="'recovered'"
								:label="'Recovered'"
								:value="recovered"
								class="bg-white"
						>icon
						</StatCard>
					</div>
				</div>
			</div>


			<div class="chart container mx-auto ">


				<line-chart
					:chart-data="datacollection"
					:options="options"
					:responsive="true"
				></line-chart>
			</div>
			<div>
				<p class="text-gray-200 text-center pt-5">
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
	import {days_between, getInt, pickColor} from "../helpers";
	import {format} from "moment";
	import StatCard from "../components/stat-card";

	import {mapActions, mapGetters} from "vuex";

	export default {
		components: {
			LineChart,
			BarChart,
			Datepicker,
			StatCard
		},
		data() {
			return {
				datacollection: null,
				startDate: new Date("2020/01/22"),
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
								ticks: {
									fontColor: "#fff",
								},
							},
						],
						xAxes: [
							{
								type: "time",
								time: {
									unit: "day",
									unitStepSize: 1,
									parser: "YYYY-MM-DD",
									displayFormats: {
										day: "MMM DD",
									},
								},
								ticks: {
									fontColor: "#fff",
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
			currentCountry() {
				return this.$route.params.country;
			},
			allCountries() {
				return Object.keys(this.getTimeseries);
			},
			currentCountryIndex() {
				return this.allCountries.indexOf(this.currentCountry);
			},
			nextCountry() {
				let index = getInt(this.currentCountryIndex) + 1;
				let result = this.allCountries[index];
				return result;
			},
			previousCountry() {
				let index = getInt(this.currentCountryIndex) - 1;
				let result = this.allCountries[index];
				return result;
			},
			countryData() {
				return this.getTimeseries[this.currentCountry];
			},
			compoundProperty() {
				// watch all these properties
				return (
					this.getTimeseries,
					this.startDate,
					this.endDate,
					this.chartType,
					this.currentCountry,
					Date.now()
				);
			},
			relativeStartDate() {
				return days_between(this.startDate, new Date("2020/01/22"));
			},
			relativeEndDate() {
				return days_between(this.endDate, new Date("2020/01/22"));
			},
			deaths() {
				return this.countryData[this.countryData.length - 1].deaths;
			},
			recovered() {
				return this.countryData[this.countryData.length - 1].recovered;
			},
			confirmed(){
				return this.countryData[this.countryData.length - 1].confirmed;
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
				let result = Array.from(
					{length: steps + 1},
					(v, i) => new Date(startDate.valueOf() + interval * i)
				);
				return result;
			},
			selectField(field) {
				let data = this.countryData.map((day) => day[field]);
				return data;
			},

			fillData() {
				let dataset = [];

				let fields = ["confirmed", "deaths", "recovered"];
				for (let field in fields) {
					let highlightedCountryConfig = {
						borderColor: pickColor(fields[field]),
					};

					if (fields[field] === "confirmed") {
						highlightedCountryConfig = {
							borderWidth: 4,
							borderColor: "#E44450",
						};
					}

					if (fields[field] === "recovered") {
						highlightedCountryConfig = {
							borderColor: "#198907",
						};
					}

					if (fields[field] === "deaths") {
						highlightedCountryConfig = {
							borderColor: "#000",
						};
					}

					let fieldData = {
						label: fields[field],
						data: this.selectField(fields[field]).slice(
							this.relativeStartDate,
							this.relativeEndDate
						),
						...this.points,
						...highlightedCountryConfig,
					};

					dataset.push(fieldData);
				}

				let dateRange = this.getDates(
					this.startDate,
					this.endDate,
					this.dayInterval
				);

				// console.log(dataset)

				this.datacollection = {
					labels: dateRange,
					datasets: dataset,
				};
			},
		},
	};
</script>
