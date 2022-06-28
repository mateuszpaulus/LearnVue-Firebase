<template>
  <header>
    <nav class="container">
      <div class="brand">
        <router-link class="header" :to="{ name: 'WelcomeView'}">
          Learn Vue
        </router-link>
      </div>
      <div class="nav-links">
        <ul v-show="!mobile">
          <router-link class="link" to="#">
            Welcome
          </router-link>
          <router-link class="link" to="#">
            Posts
          </router-link>
          <router-link class="link" to="#">
            Create Post
          </router-link>
          <router-link class="link" to="#">
            Login/Register
          </router-link>
        </ul>
      </div>
    </nav>
    <v-icon v-show="mobile" class="menu-icon" @click="toggleMobileNav">
      {{ mdiMenu }}
    </v-icon>
    <transition name="mobile-nav">
      <ul v-show="mobileNav" class="mobile-nav">
        <router-link class="link" to="#">
          Welcome
        </router-link>
        <router-link class="link" to="#">
          Posts
        </router-link>
        <router-link class="link" to="#">
          Create Post
        </router-link>
        <router-link class="link" to="#">
          Login/Register
        </router-link>
      </ul>
    </transition>
  </header>
</template>

<script>
import { mdiMenu } from '@mdi/js';

export default {
  name: 'NavigationVue',
  data() {
    return {
      mdiMenu,
      mobile: null,
      mobileNav: null,
      windownWidth: null,
    };
  },
  created() {
    window.addEventListener('resize', this.checkScreen);
    this.checkScreen();
  },
  methods: {
    checkScreen() {
      this.windownWidth = window.innerWidth;
      if (this.windownWidth <= 750) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
      this.mobileNav = false;
    },
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav;
    },

  },
};
</script>

<style lang="scss" scoped>
header {
  background-color: #fff;
  padding: 0 25px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 99;
  .link {
    font-weight: 500;
    padding: 0 8px;
    transition: 0.3s color ease;
    &:hover {
      color:#7b8080;
    }
  }
  nav {
    display: flex;
    padding: 20px 0;
    .brand {
      display: flex;
      align-items: center;
      .header {
        font-weight: 600;
        font-size: 24px;
        color: #000;
        text-decoration: none;
      }
    }
    .nav-links {
      position: relative;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: flex-end;
      ul {
        .link {
          margin-right: 32px;
        }
        .link:last-child {
          margin-right: 0;
        }
      }
    }
  }
  .menu-icon {
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 25px;
    height: 25px;
    width: auto;
  }
  .mobile-nav {
    padding: 20px;
    width: 70%;
    max-width: 250px;
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100%;
    background-color: #303030;
    top: 0;
    left: 0;
    .link {
      padding: 15px 0;
      color: #fff;
    }
  }
  .mobile-nav-enter-active,
  .mobile-nav-leave-active {
    transition: all 1s ease;
  }
  .mobile-nav-enter {
    transform: translateX(-250px);
  }
  .mobile-nav-enter-to {
    transform: translateX(0);
  }
  .mobile-nav-leave-to {
    transform: translateX(-250px);
  }
}
</style>
