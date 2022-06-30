import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import db from '@/firebase/firebaseInit';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    samplePostCards: [
      {
        postTitle: 'Post Card #1',
        postCoverPhoto: 'stock-1',
        postDate: 'June 28, 2022',
      },
      {
        postTitle: 'Post Card #2',
        postCoverPhoto: 'stock-2',
        postDate: 'June 28, 2022',
      },
      {
        postTitle: 'Post Card #3',
        postCoverPhoto: 'stock-3',
        postDate: 'June 28, 2022',
      },
      {
        postTitle: 'Post Card #4',
        postCoverPhoto: 'stock-4',
        postDate: 'June 28, 2022',
      },
    ],
    editPost: null,
    user: null,
    profileAdmin: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUserName: null,
    profileId: null,
    profileInitials: null,
  },
  getters: {},
  mutations: {
    toggleEditPost(state, payload) {
      state.editPost = payload;
    },
    updateUser(state, payload) {
      state.user = payload;
    },
    setProfileAdmin(state, payload) {
      state.profileAdmin = payload;
      console.log(state.profileAdmin);
    },
    setProfileInfo(state, doc) {
      state.profileId = doc.id;
      state.profileEmail = doc.data().email;
      state.profileFirstName = doc.data().firstName;
      state.profileLastName = doc.data().lastName;
      state.profileUserName = doc.data().userName;
      console.log(state.profileId);
    },
    setProfileInitials(state) {
      state.profileInitials = state.profileFirstName.match(/(\b\S)?/g).join('') + state.profileLastName.match(/(\b\S)?/g).join('');
    },
    changeFirstName(state, payload) {
      state.profileFirstName = payload;
    },
    changeLastName(state, payload) {
      state.profileLastName = payload;
    },
    changeUserName(state, payload) {
      state.profileUserName = payload;
    },
  },
  actions: {
    async getCurrentUser({ commit }, user) {
      const dataBase = await db.collection('users').doc(firebase.auth().currentUser.uid);
      const dbResults = await dataBase.get();
      commit('setProfileInfo', dbResults);
      commit('setProfileInitials');
      const token = await user.getIdTokenResult();
      const admin = await token.claims.admin;
      commit('setProfileAdmin', admin);
    },
    async updateUserSettings({ commit, state }) {
      const dataBase = await db.collection('users').doc(state.profileId);
      await dataBase.update({
        firstName: state.profileFirstName,
        lastName: state.profileLastName,
        userName: state.profileUserName,
      });
      commit('setProfileInitials');
    },
  },
  modules: {},
});
