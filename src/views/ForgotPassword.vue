<template>
  <div class="reset-password">
    <ModalComponent v-if="modalActive" :modal-message="modalMessage" @close-modal="closeModal" />
    <LoadingComponent v-if="loading" />
    <div class="form-wrap">
      <form class="reset">
        <p class="login-register">
          Already have an account?
          <router-link class="router-link" :to="{ name: 'LoginView' }"> Login </router-link>
        </p>
        <h2>Reset Password</h2>
        <p>Forgot your password? Enter your email to reset it</p>
        <div class="inputs">
          <div class="input">
            <input v-model="email" type="text" placeholder="Email" aria-label="email" />
            <v-icon class="icon">
              {{ mdiEmail }}
            </v-icon>
          </div>
        </div>
        <button class="router-button" @click.prevent="resetPassword">Reset</button>
        <div class="angle" />
      </form>
      <div class="background" />
    </div>
  </div>
</template>

<script>
import { mdiEmail } from '@mdi/js';
import ModalComponent from '@/components/Modal.vue';
import LoadingComponent from '@/components/Loading.vue';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export default {
  name: 'ForgotPasswordView',
  components: { ModalComponent, LoadingComponent },
  data() {
    return {
      mdiEmail,
      email: '',
      modalActive: false,
      modalMessage: '',
      loading: null,
    };
  },
  methods: {
    resetPassword() {
      this.loading = true;
      firebase
        .auth()
        .sendPasswordResetEmail(this.email)
        .then(() => {
          this.modalMessage = 'If your account exist, you will receive a email';
          this.loading = false;
          this.modalActive = true;
        }).catch((err) => {
          this.modalMessage = err.message;
          this.loading = false;
          this.modalActive = true;
        });
    },
    closeModal() {
      this.modalActive = !this.modalActive;
      this.email = '';
    },
  },
};
</script>

<style lang="scss" scoped>
.reset-password {
  position: relative;
  .form-wrap {
    .reset {
      h2 {
        margin-bottom: 8px;
      }
      p {
        text-align: center;
        margin-bottom: 32px;
      }
    }
  }
}
</style>
