import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    samplePostCards: [
      { postTitle: 'Post Card #1', postCoverPhoto: 'stock-1', postDate: 'June 28, 2022' },
      { postTitle: 'Post Card #2', postCoverPhoto: 'stock-2', postDate: 'June 28, 2022' },
      { postTitle: 'Post Card #3', postCoverPhoto: 'stock-3', postDate: 'June 28, 2022' },
      { postTitle: 'Post Card #4', postCoverPhoto: 'stock-4', postDate: 'June 28, 2022' },
    ],
    editPost: null,
  },
  getters: {},
  mutations: {
    toggleEditPost(state, payload) {
      state.editPost = payload;
    },
  },
  actions: {},
  modules: {},
});
