import axios from '@/apis/server';

export default {
  state: {
    isAuthenticated: false,
  },
  mutations: {
    SET_LOGIN_STATUS(state, payload) {
      state.isAuthenticated = payload || !state.isAuthenticated;
    },
  },
  actions: {
    doLogin(context, payload) {
      return axios({
        url: 'auth/login',
        method: 'POST',
        data: payload,
      });
    },
    googleLogin(context, payload) {
      return axios({
        url: 'auth/google-signin',
        method: 'POST',
        data: payload,
      });
    },
  },
};
