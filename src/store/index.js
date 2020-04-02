import Vue from "vue";
import Vuex from "vuex";

import timeago from "../helpers/timeago";
import {extractData, fetchJson, getInt, pick} from "@/helpers";

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
			if (state.stats.length > 0) {
				let result = state.stats.map((row) => row.timestamp);
				return result;
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
		getDeceased(state) {
			if (state.stats.length > 0) {
				let result = state.stats.map((row) => row.deceased);
				return result;
			} else {
				return {};
			}
		},
		getTotalRecovered(state) {
			if (state.stats.length > 0) {
				let result = state.stats.map((row) => row.recovered);
				return result;
			} else {
				return {};
			}
		},
		getTotalDeceased(state) {
			if (state.stats.length > 0) {
				// let result = state.stats.map((row) => row.cumdeceased);
				// return result;

				let reverse = [...state.verified_stats].reverse();
				let result = reverse.map((row) => row.death);
				return result;
			} else {
				return {};
			}
		},
		getTotal(state) {
			if (state.stats.length > 0) {
				// let result = state.stats.map((row) => row.cumnew);
				// return result;

				let reverse = [...state.verified_stats].reverse();
				let result = reverse.map((row) => row.total_cases);
				return result;
			} else {
				return {};
			}
		},
		getActive(state) {
			if (state.stats.length > 0) {
				// let result = state.stats.map((row) => row.active);
				// return result

				let reverse = [...state.verified_stats].reverse();
				let verifiedResult = reverse.map((row) => {
					return (
						getInt(row.total_cases) -
						(getInt(row.death) + getInt(row.recovered))
					);
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
			};

			// Fetch Verified Stats

			if (state.verified_stats.length > 1) {
				let latestStat = state.verified_stats[0];

				overview.active.amt =
					getInt(latestStat.total_cases) - getInt(latestStat.death);
				overview.active.diff = getInt(latestStat.today_cases);

				overview.recovered.amt = getInt(latestStat.recovered);

				overview.deceased.amt = getInt(latestStat.death);
				overview.deceased.diff = getInt(latestStat.today_death);

				overview.total.amt = getInt(latestStat.total_cases);
				overview.total.diff = getInt(latestStat.today_cases);

				return overview;
			}

			if (state.stats.length === 0) {
				return overview;
			}

			let i = state.stats.length - 1;

			overview.active.amt += getInt(state.stats[i].active);
			overview.active.diff += getInt(state.stats[i].new);

			overview.recovered.amt += getInt(state.stats[i].cumrecovered);
			overview.recovered.diff += getInt(state.stats[i].recovered);

			overview.deceased.amt += getInt(state.stats[i].cumdeceased);
			overview.deceased.diff += getInt(state.stats[i].deceased);

			overview.total.amt +=
				getInt(state.stats[i].active) +
				getInt(state.stats[i].cumdeceased) -
				getInt(state.stats[i].cumrecovered);
			overview.total.diff = getInt(state.stats[i].new);

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

			let datesForHorizAxis = state.timeseries["China"].map(
				(time) => time.date
			);

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

			let entry;
			let updated;
			try {
				const {feed} = await fetchJson(URL);

				entry = feed.entry;
				updated = feed.updated;
			} catch (error) {
				throw new Error(
					"Error should be caught by Vue global error handler." + error
				);
			}

			const stats = extractData(entry);
			commit(SET_STATS, stats);
			// commit(SET_UPDATED, updated);
			return stats;
		},
		async [FETCH_VERIFIED_STATS]({commit}) {
			let URL = "/data/cases.json";
			try {
				const result = await fetchJson(URL);
				commit(SET_VERIFIED_STATS, result);
				commit(SET_UPDATED, result[0].case_date);
			} catch (error) {
				throw new Error(
					"Error should be caught by Vue global error handler." + error
				);
			}
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
