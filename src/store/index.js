import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import db from '@/firebase/firebaseInit';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // samplePostCards: [
    //   {
    //     postTitle: 'Post Card #1',
    //     postCoverPhoto: 'stock-1',
    //     postDate: 'June 28, 2022',
    //   },
    //   {
    //     postTitle: 'Post Card #2',
    //     postCoverPhoto: 'stock-2',
    //     postDate: 'June 28, 2022',
    //   },
    //   {
    //     postTitle: 'Post Card #3',
    //     postCoverPhoto: 'stock-3',
    //     postDate: 'June 28, 2022',
    //   },
    //   {
    //     postTitle: 'Post Card #4',
    //     postCoverPhoto: 'stock-4',
    //     postDate: 'June 28, 2022',
    //   },
    // ],
    postsStorage: [],
    postLoaded: null,
    postHTML: 'Write your blog title here...',
    postTitle: '',
    postPhotoName: '',
    postPhotoFileURL: null,
    postPhotoPreview: null,
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
  getters: {
    postsGetters(state) {
      return state.postsStorage.slice(4, 6);
    },
    postsCardsGetters(state) {
      return state.postsStorage.slice(0, 4);
    },
  },
  mutations: {
    newPost(state, payload) {
      state.postHTML = payload;
    },
    updatePostTitle(state, payload) {
      state.postTitle = payload;
    },
    fileNameChange(state, payload) {
      state.postPhotoName = payload;
    },
    createFileURL(state, payload) {
      state.postPhotoFileURL = payload;
    },
    openPhotoPreview(state) {
      state.postPhotoPreview = !state.postPhotoPreview;
    },
    toggleEditPost(state, payload) {
      state.editPost = payload;
    },
    setPostState(state, payload) {
      state.postTitle = payload.postTitle;
      state.postHTML = payload.postHTML;
      state.postPhotoFileURL = payload.postCoverPhoto;
      state.postPhotoName = payload.postCoverPhotoName;
    },
    filterPost(state, payload) {
      state.postsStorage = state.postsStorage.filter((post) => post.postID !== payload);
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
      console.log('state.profileId', state.profileId);
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
    async getPost({ state }) {
      const dataBase = await db.collection('posts').orderBy('date', 'desc');
      const dbResults = await dataBase.get();
      dbResults.forEach((doc) => {
        if (!state.postsStorage.some((post) => post.postID === doc.id)) {
          const data = {
            postID: doc.data().postID,
            postHTML: doc.data().postHTML,
            postCoverPhoto: doc.data().postCoverPhoto,
            postTitle: doc.data().postTitle,
            postCoverPhotoName: doc.data().postCoverPhotoName,
            postDate: doc.data().date,
          };
          state.postsStorage.push(data);
        }
      });
      state.postLoaded = true;
    },
    async updatePost({ commit, dispatch }, payload) {
      commit('filterPost', payload);
      await dispatch('getPost');
    },
    async deletePost({ commit }, payload) {
      const getPost = await db.collection('posts').doc(payload);
      await getPost.delete();
      commit('filterPost', payload);
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
