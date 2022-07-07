import Vue from 'vue';
import VueRouter from 'vue-router';
import WelcomeView from '@/views/Welcome.vue';
import PostsView from '@/views/Posts.vue';
import LoginView from '@/views/Login.vue';
import RegisterView from '@/views/Register.vue';
import ForgotPasswordView from '@/views/ForgotPassword.vue';
import ProfileView from '@/views/Profile.vue';
import AdminView from '@/views/Admin.vue';
import CreatePostView from '@/views/CreatePost.vue';
import PreviewPostView from '@/views/PreviewPost.vue';
import ViewPostView from '@/views/ViewPost.vue';
import EditPost from '@/views/EditPost.vue';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'WelcomeView',
    component: WelcomeView,
    meta: {
      title: 'Welcome',
      requiresAuth: false,
    },
  },
  {
    path: '/posts',
    name: 'PostsView',
    component: PostsView,
    meta: {
      title: 'Posts',
      requiresAuth: false,
    },
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView,
    meta: {
      title: 'Login',
      requiresAuth: false,
    },
  },
  {
    path: '/register',
    name: 'RegisterView',
    component: RegisterView,
    meta: {
      title: 'Register',
      requiresAuth: false,
    },
  },
  {
    path: '/forgot-password',
    name: 'ForgotPasswordView',
    component: ForgotPasswordView,
    meta: {
      title: 'Forgot Password',
      requiresAuth: false,
    },
  },
  {
    path: '/profile',
    name: 'ProfileView',
    component: ProfileView,
    meta: {
      title: 'Profile',
      requiresAuth: true,
    },
  },
  {
    path: '/admin',
    name: 'AdminView',
    component: AdminView,
    meta: {
      title: 'Admin',
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: '/create-post',
    name: 'CreatePostView',
    component: CreatePostView,
    meta: {
      title: 'Create Post',
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: '/preview-post',
    name: 'PreviewPostView',
    component: PreviewPostView,
    meta: {
      title: 'Preview Post',
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: '/view-post/:postId',
    name: 'ViewPostView',
    component: ViewPostView,
    meta: {
      title: 'View Post',
      requiresAuth: false,
    },
  },
  {
    path: '/edit-post/:postId',
    name: 'EditPost',
    component: EditPost,
    meta: {
      title: 'Edit Post',
      requiresAuth: true,
      requiresAdmin: true,
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
router.beforeEach(async (to, from, next) => {
  const user = firebase.auth().currentUser;
  let admin = null;
  if (user) {
    const token = await user.getIdTokenResult();
    admin = token.claims.admin;
  }
  if (to.matched.some((res) => res.meta.requiresAuth)) {
    if (user) {
      if (to.matched.some((res) => res.meta.requiresAdmin)) {
        if (admin) {
          return next();
        }
        return next({ name: 'WelcomeView' });
      }
      return next();
    }
    return next({ name: 'WelcomeView' });
  }
  return next();
});

export default router;
