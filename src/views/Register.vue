<template>
  <div class="form-wrap">
    <form class="register">
      <p class="login-register">
        Already have an account?
        <router-link class="router-link" :to="{ name: 'LoginView' }">
          Login
        </router-link>
      </p>
      <h2>Create Your Learn Vue Account</h2>
      <div class="inputs">
        <div class="input">
          <input
            v-model="firstName" type="text" placeholder="First Name"
            aria-label="firstName"
          >
          <v-icon class="icon">
            {{ mdiAccount }}
          </v-icon>
        </div>
        <div class="input">
          <input
            v-model="lastName" type="text" placeholder="Last Name"
            aria-label="lastName"
          >
          <v-icon class="icon">
            {{ mdiAccount }}
          </v-icon>
        </div>
        <div class="input">
          <input
            v-model="userName" type="text" placeholder="Username"
            aria-label="userName"
          >
          <v-icon class="icon">
            {{ mdiAccount }}
          </v-icon>
        </div>
        <div class="input">
          <input
            v-model="email" type="text" placeholder="Email"
            aria-label="email"
          >
          <v-icon class="icon">
            {{ mdiEmail }}
          </v-icon>
        </div>
        <div class="input">
          <input
            v-model="password" type="text" placeholder="Password"
            aria-label="password"
          >
          <v-icon class="icon">
            {{ mdiLock }}
          </v-icon>
        </div>
      </div>
      <button class="router-button">
        Sign Up
      </button>
      <div class="angle" />
    </form>
    <div class="background" />
  </div>
</template>

<script>
import { mdiEmail, mdiLock, mdiAccount } from '@mdi/js';

export default {
  name: 'RegisterView',
  data() {
    return {
      mdiEmail,
      mdiLock,
      mdiAccount,
      firstName: null,
      lastName: null,
      userName: null,
      email: null,
      password: null,
    };
  },
};
</script>

<style lang="scss" scoped>
.register {
  h2 {
    max-width: 350px;
  }
}
</style>
