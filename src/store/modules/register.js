import axios from '@/apis/server';

export default {
  actions: {
    doRegister(context, payload) {
      return axios({
        url: 'auth/register',
        method: 'POST',
        data: payload,
      });
    },
  },
};
