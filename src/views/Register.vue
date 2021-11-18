<template>
  <main class="form-signin">
    <form @submit.prevent="register">
      <h1 class="h3 mb-3 fw-normal">Please Register</h1>
      <div class="form-floating">
        <input
          v-model="email"
          type="email"
          class="form-control"
          id="email"
          placeholder="name@example.com"
        />
        <label for="email">Email address</label>
      </div>
      <div class="form-floating">
        <input
          v-model="password"
          type="password"
          class="form-control"
          id="password"
          placeholder="Password"
        />
        <label for="password">Password</label>
      </div>
      <div class="form-floating">
        <input
          v-model="firstName"
          type="text"
          class="form-control"
          placeholder="John"
          id="firstName"
        />
        <label for="firstName">First Name</label>
      </div>
      <div class="form-floating">
        <input
          v-model="lastName"
          type="text"
          class="form-control"
          id="lastName"
          placeholder="Password"
        />
        <label for="lastName">Last Name</label>
      </div>
      <div class="form-check my-2">
        <input v-model="isDriver" value="false"
          class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
        <label class="form-check-label" for="flexRadioDefault1">
          Customer
        </label>
      </div>
      <div class="form-check my-2">
        <input v-model="isDriver" value="true"
          class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2">
        <label class="form-check-label" for="flexRadioDefault2">
          Driver
        </label>
      </div>
      <button class="w-100 btn btn-lg btn-primary" type="submit">
        Register
      </button>
    </form>
  </main>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Register',
  data() {
    return {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      isDriver: 'false',
    };
  },
  methods: {
    ...mapActions(['doRegister']),
    async register() {
      const loading = this.$toast.info('Registering, Please wait.', {
        duration: 0,
      });
      try {
        const { data } = await this.doRegister({
          email: this.email,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName,
          isDriver: this.isDriver,
        });
        this.$router.push('/login').catch(() => {});
        loading.dismiss();
        this.$toast.success(data.message);
      } catch (error) {
        loading.dismiss();
        this.$toast.error(error.response.data.message);
      }
    },
  },
};
</script>

<style>
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
