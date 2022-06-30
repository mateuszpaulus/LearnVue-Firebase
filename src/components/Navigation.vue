<template>
  <header>
    <nav class="container">
      <div class="brand">
        <router-link class="header" :to="{ name: 'WelcomeView' }"> Learn Vue </router-link>
      </div>
      <div class="nav-links">
        <ul v-show="!mobile">
          <router-link class="link" :to="{ name: 'WelcomeView' }"> Welcome </router-link>
          <router-link class="link" :to="{ name: 'PostsView' }"> Posts </router-link>
          <router-link class="link" to="#"> Create Post </router-link>
          <router-link v-if="!user" class="link" :to="{ name: 'LoginView' }"> Login / Register </router-link>
        </ul>
        <div v-if="user" ref="profile" class="profile" @click="toggleProfileMenu">
          <span>{{ $store.state.profileInitials }}</span>
          <div v-show="profileMenu" class="profile-menu">
            <div class="info">
              <p class="initials">{{ $store.state.profileInitials }}</p>
              <div class="right">
                <p>{{ $store.state.profileFirstName }} {{ $store.state.profileLastName }}</p>
                <p>{{ $store.state.profileUserName }}</p>
                <p>{{ $store.state.profileEmail }}</p>
              </div>
            </div>
            <div class="options">
              <div class="option">
                <router-link class="option" to="#">
                  <v-icon class="icon">{{ mdiAccount }}</v-icon>
                  <p>Profile</p>
                </router-link>
              </div>
              <div class="option">
                <router-link class="option" to="#">
                  <v-icon class="icon">{{ mdiAccountSupervisor }}</v-icon>
                  <p>Admin</p>
                </router-link>
              </div>
              <div class="option" @click="logOut">
                <v-icon class="icon">{{ mdiLogoutVariant }}</v-icon>
                <p>Log out</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <v-icon v-show="mobile" class="menu-icon" @click="toggleMobileNav">
      {{ mdiMenu }}
    </v-icon>
    <transition name="mobile-nav">
      <ul v-show="mobileNav" class="mobile-nav">
        <router-link class="link" :to="{ name: 'WelcomeView' }"> Welcome </router-link>
        <router-link class="link" :to="{ name: 'PostsView' }"> Posts </router-link>
        <router-link class="link" to="#"> Create Post </router-link>
        <router-link v-if="!user" class="link" :to="{ name: 'LoginView' }"> Login / Register </router-link>
      </ul>
    </transition>
  </header>
</template>

<script>
import { mdiMenu, mdiAccount, mdiLogoutVariant, mdiAccountSupervisor } from '@mdi/js';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export default {
  name: 'NavigationComponent',
  data() {
    return {
      mdiMenu,
      mdiAccount,
      mdiLogoutVariant,
      mdiAccountSupervisor,
      profileMenu: null,
      mobile: null,
      mobileNav: null,
      windownWidth: null,
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
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
    toggleProfileMenu(e) {
      if (e.target === this.$refs.profile) {
        this.profileMenu = !this.profileMenu;
      }
    },
    logOut() {
      firebase.auth().signOut();
      window.location.reload();
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
      color: #7b8080;
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
        margin-right: 32px;
        .link {
          margin-right: 32px;
        }
        .link:last-child {
          margin-right: 0;
        }
      }
      .profile {
        position: relative;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        border-radius: 25%;
        color: #fff;
        background-color: #303030;

        span {
          pointer-events: none;
        }

        .profile-menu {
          position: absolute;
          top: 60px;
          right: 0;
          width: 275px;
          background-color: #303030;
          box-shadow: 0 4px 6px 1px rgba(0, 0, 0, 0.1), 0 2px 4px 1px rgba(0, 0, 0, 0.06);

          .info {
            display: flex;
            align-items: center;
            padding: 15px;
            border-bottom: 1px solid #fff;

            .initials {
              position: initial;
              width: 30px;
              height: 30px;
              background-color: #fff;
              color: #303030;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 25%;
            }

            .right {
              flex: 1;
              margin-left: 24px;
              p:nth-child(1) {
                font-size: 14px;
                margin-bottom: 3px;
              }

              p:nth-child(2) {
                font-size: 12px;
                margin-bottom: 3px;
              }

              p:nth-child(3) {
                font-size: 12px;
              }
            }
          }

          .options {
            padding: 15px;
            .option {
              text-decoration: none;
              color: #fff;
              display: flex;
              align-items: center;
              margin-bottom: 12px;

              .icon {
                width: 18px;
                height: auto;
                color: #fff;
              }
              p {
                font-size: 14px;
                margin-left: 12px;
              }

              &:last-child {
                margin-bottom: 0px;
              }
            }
          }
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
