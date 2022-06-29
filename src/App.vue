<template>
  <div class="app-wrapper">
    <div class="app">
      <NavigationComponent v-if="!navigation" />
      <router-view />
      <FooterComponent v-if="!navigation" />
    </div>
  </div>
</template>

<script>
import NavigationComponent from '@/components/Navigation.vue';
import FooterComponent from '@/components/Footer.vue';

export default {
  name: 'App',
  components: {
    NavigationComponent,
    FooterComponent,
  },
  data() {
    return {
      navigation: null,
    };
  },
  watch: {
    $route() {
      this.checkRoute();
    },
  },
  created() {
    this.checkRoute();
  },
  methods: {
    checkRoute() {
      if (this.$route.name === 'LoginView' || this.$route.name === 'RegisterView' || this.$route.name === 'ForgotPasswordView') {
        this.navigation = true;
        return;
      } this.navigation = false;
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-smooth: always;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.container {
  max-width: 1440px;
  margin: 0 auto;
}
.link {
  cursor: pointer;
  text-decoration: none;
  color: black;
}
.link-light {
  color: #fff;
}
.arrow {
  margin-left: 8px;
  width: 12px;
  path {
    fill: #000;
  }
}
.arrow-light {
  path {
    fill: #fff;
  }
}
.router-button {
  transition: 500ms ease all;
  cursor: pointer;
  margin-top: 24px;
  padding: 12px 24px;
  background-color: #303030;
  color: #fff;
  border-radius: 10px;
  border: none;
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: rgba(48, 48, 48, 0.7);
  }
}
.post-card-wrap {
  position: relative;
  padding: 80px 16px;
  background-color: #f1f1f1;
  @media (min-width: 500px) {
    padding: 100px 16px;
  }
  .post-cards {
    display: grid;
    gap: 32px;
    grid-template-columns: 1fr;
    @media (min-width: 500px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 900px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media (min-width: 1200px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}
</style>
