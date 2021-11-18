import Vue from 'vue';
import Vuex from 'vuex';
import login from './modules/login';
import mapbox from './modules/mapbox';
import register from './modules/register';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    register,
    login,
    mapbox,
  },
});
