<template>
  <div class="post-card-wrap">
    <div class="post-cards container">
      <div class="toggle-edit">
        <span>Toggle Editing Post</span>
        <input v-model="editPost" type="checkbox" aria-label="editPost" />
      </div>
      <PostCardVue v-for="(post, index) in samplePostCards" :key="index" :post="post" />
    </div>
  </div>
</template>

<script>
import PostCardVue from '@/components/PostCard.vue';

export default {
  name: 'PostsView',
  components: { PostCardVue },
  computed: {
    samplePostCards() {
      return this.$store.state.samplePostCards;
    },
    editPost: {
      get() {
        return this.$store.state.editPost;
      },
      set(payload) {
        this.$store.commit('toggleEditPost', payload);
      },
    },
  },
  beforeDestroy() {
    this.$store.commit('toggleEditPost', false);
  },
};
</script>

<style lang="scss" scoped>
.post-cards {
  position: relative;

  .toggle-edit {
    display: flex;
    align-items: center;
    position: absolute;
    top: -70px;
    right: 0;

    span {
      margin-right: 16px;
    }

    input[type='checkbox'] {
      position: relative;
      border: none;
      -webkit-appearance: none;
      background: #fff;
      outline: none;
      width: 80px;
      height: 30px;
      border-radius: 10px;
      box-shadow: 0 4px 6px 1px rgba(0, 0, 0, 0.1), 0 2px 4px 1px rgba(0, 0, 0, 0.06);
    }

    input[type='checkbox']:before {
      content: '';
      position: absolute;
      width: 30px;
      height: 30px;
      border-radius: 10px;
      top: 0;
      left: 0;
      background: #303030;
      transform: scale(1.1);
      transition: 750ms ease all;
      box-shadow: 0 4px 6px 1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    input:checked[type='checkbox']:before {
      background: #fff;
      left: 50px;
    }
  }
}
</style>
