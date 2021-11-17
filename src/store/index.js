import Vue from 'vue';
import Vuex from 'vuex';
import login from './modules/login';
import mapbox from './modules/mapbox';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    login,
    mapbox,
  },
});
