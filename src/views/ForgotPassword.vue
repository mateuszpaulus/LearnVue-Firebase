<template>
  <div class="reset-password">
    <ModalComponent v-if="modalActive" @close-modal="closeModal" />
    <LoadingComponent v-if="loading" />
    <div class="form-wrap">
      <form class="reset">
        <h2>Reset Password</h2>
        <p>Forgot your password? Enter your email to reset it</p>
        <div class="inputs">
          <div class="input">
            <input
              v-model="email" type="text" placeholder="Email"
              aria-label="email"
            >
            <v-icon class="icon">
              {{ mdiEmail }}
            </v-icon>
          </div>
        </div>
        <button class="router-button" @click.prevent="resetPassword">
          Reset
        </button>
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

export default {
  name: 'ForgotPasswordView',
  components: { ModalComponent, LoadingComponent },
  data() {
    return {
      mdiEmail,
      email: null,
      modalActive: false,
      modalMessage: '',
      loading: null,
    };
  },
  methods: {
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
