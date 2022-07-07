import Vue from 'vue';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import Vue2Editor from 'vue2-editor';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.use(Vue2Editor);
Vue.config.productionTip = false;

let app;
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: (h) => h(App),
    }).$mount('#app');
  }
});
