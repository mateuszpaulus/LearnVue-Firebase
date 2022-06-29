import Vue from 'vue';
import VueRouter from 'vue-router';
import WelcomeView from '@/views/Welcome.vue';
import PostsView from '@/views/Posts.vue';
import LoginView from '@/views/Login.vue';
import RegisterView from '@/views/Register.vue';
import ForgotPasswordView from '@/views/ForgotPassword.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'WelcomeView',
    component: WelcomeView,
    meta: {
      title: 'Welcome',
    },
  },
  {
    path: '/posts',
    name: 'PostsView',
    component: PostsView,
    meta: {
      title: 'Posts',
    },
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView,
    meta: {
      title: 'Login',
    },
  },
  {
    path: '/register',
    name: 'RegisterView',
    component: RegisterView,
    meta: {
      title: 'Register',
    },
  },
  {
    path: '/forgot-password',
    name: 'ForgotPasswordView',
    component: ForgotPasswordView,
    meta: {
      title: 'Forgot Password',
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Learn Vue`;
  next();
});

export default router;
