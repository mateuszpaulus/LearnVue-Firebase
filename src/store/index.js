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
    setProfileInfo(state, doc) {
      state.profileId = doc.id;
      state.profileEmail = doc.data().email;
      state.profileFirstName = doc.data().firstName;
      state.profileLastName = doc.data().lastName;
      state.profileUserName = doc.data().userName;
    },
    setProfileInitials(state) {
      state.profileInitials = state.profileFirstName.match(/(\b\S)?/g).join('') + state.profileLastName.match(/(\b\S)?/g).join('');
    },
  },
  actions: {
    async getCurrentUser({ commit }) {
      const dataBase = await db.collection('users').doc(firebase.auth().currentUser.uid);
      const dbResults = await dataBase.get();
      commit('setProfileInfo', dbResults);
      commit('setProfileInitials');
      console.log(dbResults);
    },
  },
  modules: {},
});
