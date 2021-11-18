<template>
  <div id="app">
    <div id="nav" class="position-absolute w-100 text-end" style="z-index: 1;">
      <span v-if="authenticated">
        <router-link to="/">Home</router-link>  |
        <a @click.prevent="logout">Logout</a>
      </span>
      <span v-if="!authenticated">
        <router-link to="/login">Login</router-link>  |
        <router-link to="/register">Register</router-link>
      </span>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    logout() {
      localStorage.clear();
      this.$store.commit('SET_LOGIN_STATUS');
      this.$toast.success('Logout successful');
      this.$router.push('/login').catch(() => {});
    },
  },
  computed: {
    authenticated() {
      return this.$store.state.login.isAuthenticated;
    },
  },
  created() {
    if (localStorage.access_token) this.$store.commit('SET_LOGIN_STATUS');
  },
};

</script>
<style>
html,
body {
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
