import Vue from 'vue';
import Vuex from 'vuex';

import { extractData, fetchJson, groupById } from '@/helpers';

Vue.use(Vuex);

export const SET_STATS = 'SET_STATS';

export const FETCH_STATS = 'FETCH_STATS';

export default new Vuex.Store({
  state: {
    stats: []
  },

  getters: {
    getStats(state) {
      return state.stats;
    }
  },

  mutations: {
    [SET_STATS](state, stats) {
      state.stats = stats;
    }
  },

  actions: {
    async [FETCH_STATS]({ commit }) {
      const URL = require('@/constants/urls.json')['covid-stats'];

      let entry;
      try {
        const { feed } = await fetchJson(URL);
        entry = feed.entry;
      } catch (error) {
        throw new Error(
          'Error should be caught by Vue global error handler.' + error
        );
      }

      const stats = extractData(entry);
      console.log(stats);
      commit(SET_STATS, stats);
      return stats;
    }
  }
});
