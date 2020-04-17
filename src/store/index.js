import Vue from "vue";
import Vuex from "vuex";

import timeago from "../helpers/timeago";
import {extractData, fetchJson, getInt, pick, reverseDate} from "@/helpers";
import moment from "moment";
import {countryByPopulations} from "../data/country-by-population.js";

Vue.use(Vuex);

export const SET_STATS = "SET_STATS";
export const SET_VERIFIED_STATS = "SET_VERIFIED_STATS";
export const SET_TIMESTERIES = "SET_TIMESTERIES";
export const SET_UPDATED = "SET_UPDATED";

export const FETCH_STATS = "FETCH_STATS";
export const FETCH_VERIFIED_STATS = "FETCH_VERIFIED_STATS";
export const FETCH_TIMESERIES = "FETCH_TIMESERIES";

export default new Vuex.Store({
	state: {
		stats: [],
		verified_stats: [],
		updated: null,
		countryByPopulations,
		timeseries: {
			China: [
				{
					date: "",
				},
			],
		},
		selected_countries: [
			"Mauritius",
			"France",
			"Singapore",
			"Korea, South",
			"United Kingdom",
			"Italy",
			"US",
			"Malaysia",
			"South Africa",
			"Australia",
		],
	},

	getters: {
		getUpdated(state) {
			return state.updated;
		},
		getStats(state) {
			return state.stats;
		},
		getVerifiedStats(state) {
			return state.verified_stats;
		},
		getTimestamps(state) {
			if (state.verified_stats.length > 0) {
				let reverse = [...state.verified_stats].reverse();
				let verified = reverse.map((row) => {
					// provide parse date format to avoid deprecation warning
					return moment(row.case_date, "DD/MM/YYYY").format("MMM DD");
				});
				return verified;
			} else {
				return {};
			}
		},
		getNew(state) {
			let reverse = [...state.verified_stats].reverse();
			if (reverse.length > 0) {
				let result = reverse.map((row) => row.today_cases);
				return result;
			} else {
				return {};
			}
		},
		getRecovered(state) {
			let stats = state.stats;
			if (stats.length > 0) {
				let result = stats.map((row) => row.recovered);
				// console.log(result)
				return result;
			} else {
				return {};
			}

				// let reverse = [...state.verified_stats].reverse();
				// if (reverse.length > 0) {
				// 	let result = reverse.map((row) => row.today_recovered);
				// 	return result;
				// } else {
				// 	return {};
				// }
		},
		getDeceased(state) {
			if (state.stats.length > 0) {
				let result = state.stats.map((row) => row.deceased);
				return result;
			} else {
				return {};
			}
		},
		getTotalRecovered(state) {
			if (state.verified_stats.length > 0) {
				let reverse = [...state.verified_stats].reverse();
				let verified = reverse.map((row) => row.total_recovered);

				return verified;
			} else {
				return {};
			}
		},
		getTotalDeceased(state) {
			if (state.verified_stats.length > 0) {
				let reverse = [...state.verified_stats].reverse();
				let result = reverse.map((row) => row.death);
				return result;
			} else {
				return {};
			}
		},
		getTotal(state) {
			if (state.verified_stats.length > 0) {
				let reverse = [...state.verified_stats].reverse();
				let result = reverse.map((row) => row.total_cases);
				return result;
			} else {
				return {};
			}
		},
		getActive(state) {
			if (state.verified_stats.length > 0 && state.stats.length > 0) {
				let reverse = [...state.verified_stats].reverse();
				let stats = state.stats;
				let verifiedResult = reverse.map((row, index) => {
					if (typeof stats[index] !== 'undefined' ) {
						let today_recovered = stats[index].cumrecovered;
						let today_death = stats[index].cumdeceased;

							//getInt(row.total_cases) - ((getInt(row.death) + getInt(row.today_recovered))) commented until BeSafeMoris adds daily recovered
						let active = 	getInt(row.total_cases) - ((getInt(today_death) + getInt(today_recovered) + getInt(row.other)));
						return active
					}
					return null
				});
				return verifiedResult;
			} else {
				return {};
			}
		},
		getOverview(state) {
			let overview = {
				active: {
					diff: 0,
					amt: 0,
				},
				recovered: {
					diff: 0,
					amt: 0,
				},
				deceased: {
					diff: 0,
					amt: 0,
				},
				total: {
					diff: 0,
					amt: 0,
				},
				other: {
					amt: 0
				}
			};

			// Fetch Verified Stats
			if (state.verified_stats.length > 1 && state.stats.length > 1) {
				let verified_stats = state.verified_stats[0];

				overview.deceased.amt = getInt(verified_stats.death);
				overview.deceased.diff = getInt(verified_stats.today_death);

				overview.total.amt = getInt(verified_stats.total_cases);
				overview.total.diff = getInt(verified_stats.today_cases);

				overview.recovered.amt += getInt(verified_stats.total_recovered);
				overview.recovered.diff += getInt(verified_stats.today_recovered);

				overview.active.amt =
					getInt(verified_stats.total_cases) -
					getInt(verified_stats.death) -
					getInt(verified_stats.total_recovered);
				overview.active.amt = verified_stats.active_cases;
				overview.active.diff = getInt(verified_stats.today_cases);

				overview.other.amt = verified_stats.other
			}
			return overview;
		},
		getTimeseries(state) {
			return state.timeseries;
		},
		getCuratedTimeseries(state) {
			let selectedCountriesObject = pick(
				state.timeseries,
				state.selected_countries
			);
			// flatten array

			let flatObj = {};
			let simpleSeries = {};

			let datesForHorizAxis = state.timeseries["China"].map((time) => time.date);

			for (let country in selectedCountriesObject) {
				flatObj[country] = selectedCountriesObject[country].map((time) => {
					return {x: time.date, y: time.confirmed};
				});

				simpleSeries[country] = selectedCountriesObject[country].map((time) => {
					return time.confirmed;
				});
			}
			return {
				labels: datesForHorizAxis,
				points: flatObj,
				simple: simpleSeries,
			};
		},
		getCountryByPopulations(state) {
			return state.countryByPopulations;
		}
	},

	mutations: {
		[SET_STATS](state, payload) {
			state.stats = payload;
		},
		[SET_VERIFIED_STATS](state, payload) {
			state.verified_stats = payload;
		},
		[SET_TIMESTERIES](state, payload) {
			state.timeseries = payload;
		},
		[SET_UPDATED](state, updated) {
			state.updated = {
				value: updated,
				ago: updated.split(" ")[0],
			};
		},
	},

	actions: {
		async [FETCH_STATS]({commit}) {
			const URL = require("@/constants/urls.json")["covid-stats"];
			const VERIFIED = require("@/constants/urls.json")["verified-stats"];

			let entry;
			let updated;
			let result;
			try {
				const {feed} = await fetchJson(URL);
				entry = feed.entry;
				updated = feed.updated;


				result = await fetchJson(VERIFIED);

			} catch (error) {
				throw new Error(
					"Error should be caught by Vue global error handler." + error
				);
			}

			const stats = extractData(entry);
			commit(SET_STATS, stats);
			commit(SET_VERIFIED_STATS, result);
			commit(SET_UPDATED, result[0].case_date);
			// console.log(stats)
			// commit(SET_UPDATED, updated);
			// return stats;
		},
		async [FETCH_VERIFIED_STATS]({commit}) {
			// let URL = "/data/cases.json";
			// try {
			// 	const result = await fetchJson(URL);
			// 	commit(SET_VERIFIED_STATS, result);
			// 	commit(SET_UPDATED, result[0].case_date);
			// } catch (error) {
			// 	throw new Error(
			// 		"Error should be caught by Vue global error handler." + error
			// 	);
			// }
		},
		async [FETCH_TIMESERIES]({commit}) {
			let URL = "https://pomber.github.io/covid19/timeseries.json";
			try {
				const result = await fetchJson(URL);
				commit(SET_TIMESTERIES, result);
			} catch (error) {
				throw new Error(
					"Error should be caught by Vue global error handler." + error
				);
			}
		},
	},
});
