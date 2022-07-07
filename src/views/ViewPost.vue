<template>
  <div v-if="currentPost" class="post-view">
    <div class="container quillWrapper">
      <h2>{{ currentPost[0].postTitle }}</h2>
      <h4>Posted on: {{ new Date(currentPost[0].postDate).toLocaleString('en-us', { dateStyle: 'long' }) }}</h4>
      <img :src="currentPost[0].postCoverPhoto" alt="" />
      <div class="post-content ql-editor">{{ currentPost[0].postHTML }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ViewPostView',
  data() {
    return {
      currentPost: null,
    };
  },
  async mounted() {
    this.currentPost = await this.$store.state.postsStorage.filter((post) => post.postID === this.$route.params.postId);
  },
};
</script>

<style lang="scss">
.post-view {
  h4 {
    font-weight: 400;
    font-size: 14px;
    margin-bottom: 24px;
  }
}
</style>
