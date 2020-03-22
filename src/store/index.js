import Vue from 'vue';
import Vuex from 'vuex';

import { extractData, fetchJson, groupById, getInt } from '@/helpers';

Vue.use(Vuex);

export const SET_STATS = 'SET_STATS';
export const SET_UPDATED = 'SET_UPDATED';

export const FETCH_STATS = 'FETCH_STATS';

export default new Vuex.Store({
  state: {
    stats: [],
    updated: null
  },

  getters: {
    getUpdated(state) {
      return state.updated;
    },
    getStats(state) {
      return state.stats;
    },
    getTimestamps(state) {
      if (state.stats.length > 0) {
        let result = state.stats.map(row => row.timestamp);
        return result
      } else {
        return {}
      }
    },
    getNew(state) {
      if (state.stats.length > 0) {
        let result = state.stats.map(row => row.new);
        return result
      } else {
        return {}
      }
    },
    getRecovered(state) {
      if (state.stats.length > 0) {
        let result = state.stats.map(row => row.recovered);
        return result
      } else {
        return {}
      }
    },
    getDeceased(state) {
      if (state.stats.length > 0) {
        let result = state.stats.map(row => row.deceased);
        return result
      } else {
        return {}
      }
    },
    getTotalDeceased(state) {
      if (state.stats.length > 0) {
        let result = state.stats.map(row => row.cumdeceased);
        return result
      } else {
        return {}
      }
    },
    getTotal(state) {
      if (state.stats.length > 0) {
        let result = state.stats.map(row => row.cumnew);
        return result
      } else {
        return {}
      }
    },
    getActive(state) {
      if (state.stats.length > 0) {
        let result = state.stats.map(row => row.active);
        return result
      } else {
        return {}
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
      }

      if (state.stats.length === 0) {
        return overview;
      }

      let i = state.stats.length - 1;

      console.log(state.stats[i]);

      overview.active.amt += getInt(state.stats[i].active);
      overview.active.diff += getInt(state.stats[i].new);

      overview.recovered.amt += getInt(state.stats[i].cumrecovered);
      overview.recovered.diff += getInt(state.stats[i].recovered);

      overview.deceased.amt += getInt(state.stats[i].cumdeceased);
      overview.deceased.diff += getInt(state.stats[i].deceased);

      overview.total.amt += getInt(state.stats[i].active) + getInt(state.stats[i].cumdeceased) - getInt(state.stats[i].cumrecovered);
      overview.total.diff = getInt(state.stats[i].new);

      return overview;
    }
  },

  mutations: {
    [SET_STATS](state, stats) {
      state.stats = stats;
    },
    [SET_UPDATED](state, updated) {
      state.updated = updated.$t;
    }
  },

  actions: {
    async [FETCH_STATS]({ commit }) {
      const URL = require('@/constants/urls.json')['covid-stats'];

      let entry;
      let updated;
      try {
        const { feed } = await fetchJson(URL);

        entry = feed.entry;
        updated = feed.updated;
      } catch (error) {
        throw new Error(
          'Error should be caught by Vue global error handler.' + error
        );
      }



      const stats = extractData(entry);
      console.log(stats);
      commit(SET_STATS, stats);
      commit(SET_UPDATED, updated);
      return stats;
    }
  }
});
