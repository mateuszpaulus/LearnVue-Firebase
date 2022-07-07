<template>
  <div class="post-view">
    <div class="container quillWrapper">
      <h2>{{ postTitle }}</h2>
      <img :src="postCoverPhoto" alt="" />
      <div class="post-content ql-editor">{{ postHTML }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PreviewPostView',
  computed: {
    postTitle() {
      return this.$store.state.postTitle;
    },
    postHTML() {
      return this.$store.state.postHTML;
    },
    postCoverPhoto() {
      return this.$store.state.postPhotoFileURL;
    },
  },
};
</script>

<style lang="scss">
.post-view {
  min-height: 100%;

  .container {
    max-width: 1000px;
    padding: 60px 25px;
  }

  .ql-editor {
    padding: 0;
  }

  h2 {
    margin-bottom: 16px;
    font-weight: 300;
    font-size: 32px;
  }

  img {
    width: 100%;
    margin-bottom: 32px;
  }
}
</style>
