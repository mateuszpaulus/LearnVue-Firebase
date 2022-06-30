<template>
  <div class="form-wrap">
    <form class="register">
      <p class="login-register">
        Already have an account?
        <router-link class="router-link" :to="{ name: 'LoginView' }"> Login </router-link>
      </p>
      <h2>Create Your Learn Vue Account</h2>
      <div class="inputs">
        <div class="input">
          <input v-model="firstName" type="text" placeholder="First Name" aria-label="firstName" />
          <v-icon class="icon">
            {{ mdiAccount }}
          </v-icon>
        </div>
        <div class="input">
          <input v-model="lastName" type="text" placeholder="Last Name" aria-label="lastName" />
          <v-icon class="icon">
            {{ mdiAccount }}
          </v-icon>
        </div>
        <div class="input">
          <input v-model="userName" type="text" placeholder="Username" aria-label="userName" />
          <v-icon class="icon">
            {{ mdiAccount }}
          </v-icon>
        </div>
        <div class="input">
          <input v-model="email" type="text" placeholder="Email" aria-label="email" />
          <v-icon class="icon">
            {{ mdiEmail }}
          </v-icon>
        </div>
        <div class="input">
          <input v-model="password" type="text" placeholder="Password" aria-label="password" />
          <v-icon class="icon">
            {{ mdiLock }}
          </v-icon>
        </div>
        <div v-show="error" class="error">
          {{ errorMsg }}
        </div>
      </div>
      <button class="router-button" @click.prevent="register">Sign Up</button>
      <div class="angle" />
    </form>
    <div class="background" />
  </div>
</template>

<script>
import { mdiEmail, mdiLock, mdiAccount } from '@mdi/js';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import db from '@/firebase/firebaseInit';

export default {
  name: 'RegisterView',
  data() {
    return {
      mdiEmail,
      mdiLock,
      mdiAccount,
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
      error: null,
      errorMsg: '',
    };
  },
  methods: {
    async register() {
      if (this.email !== '' && this.password !== '' && this.firstName !== '' && this.lastName !== '' && this.userName !== '') {
        this.error = false;
        this.errorMsg = '';
        const firebaseAuth = await firebase.auth();
        const createUser = await firebaseAuth.createUserWithEmailAndPassword(this.email, this.password);
        const result = await createUser;
        const dataBase = db.collection('users').doc(result.user.uid);
        await dataBase.set({
          firstName: this.firstName,
          lastName: this.lastName,
          userName: this.userName,
          email: this.email,
        });
        this.$router.push({ name: 'WelcomeView' });
        return;
      }
      this.error = true;
      this.errorMsg = 'Please complete all fields';
    },
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
