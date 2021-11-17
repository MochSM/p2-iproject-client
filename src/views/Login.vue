<template>
  <main class="form-signin">
    <form>
      <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
      <div class="form-floating">
        <input
          type="email"
          class="form-control"
          id="floatingInput"
          placeholder="name@example.com"
        />
        <label for="floatingInput">Email address</label>
      </div>
      <div class="form-floating">
        <input
          type="password"
          class="form-control"
          id="floatingPassword"
          placeholder="Password"
        />
        <label for="floatingPassword">Password</label>
      </div>
      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me" /> Remember me
        </label>
      </div>
      <button class="w-100 btn btn-lg btn-primary" type="submit">
        Sign in
      </button>
    </form>
    <GoogleLogin
      :params="params"
      :renderParams="renderParams"
      :onSuccess="onSuccess"
      :onFailure="onFailure"></GoogleLogin>
  </main>
</template>

<script>
import { mapActions } from 'vuex';
import GoogleLogin from 'vue-google-login';

export default {
  name: 'Login',
  components: {
    GoogleLogin,
  },
  data() {
    return {
      params: {
        client_id: '150884543308-iof8m54k8nnp22o4iru0nfd7hk3tj3oo.apps.googleusercontent.com',
      },
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true,
      },
    };
  },
  methods: {
    ...mapActions(['googleLogin']),
    async onSuccess(googleUser) {
      const loading = this.$toast.info('Loading, Please wait.', {
        duration: 0,
      });
      try {
        const { data } = await this.googleLogin({
          id_token: googleUser.getAuthResponse().id_token,
        });
        localStorage.setItem('access_token', data.access_token);
        this.$store.commit('SET_LOGIN_STATUS');
        this.$router.push('/').catch(() => {});
        loading.dismiss();
        this.$toast.success(data.message);
      } catch (error) {
        loading.dismiss();
        this.$toast.error(error.response.data.message);
      }
    },
    onFailure() {
      this.$toast.error('Internal server error');
    },
  },
};
</script>

<style scoped>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

</style>
