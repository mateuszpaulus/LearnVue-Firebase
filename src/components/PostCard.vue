<template>
  <div class="post-card">
    <div v-show="editPost" class="icons">
      <div class="icon" @click="editPostMeth">
        <v-icon class="edit">{{ mdiPencil }}</v-icon>
      </div>
      <div class="icon" @click="deletePost">
        <v-icon class="delete">{{ mdiDelete }}</v-icon>
      </div>
    </div>
    <img :src="post.postCoverPhoto" alt="" />
    <div class="info">
      <h4>{{ post.postTitle }}</h4>
      <h6>Posted on: {{ new Date(post.postDate).toLocaleString('en-us', { dateStyle: 'long' }) }}</h6>
      <router-link class="link" :to="{ name: 'ViewPostView', params: { postId: post.postID } }">
        View The Post <v-icon class="arrow">{{ mdiArrowRight }}</v-icon>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mdiArrowRight, mdiCircleEditOutline, mdiPencil, mdiDelete } from '@mdi/js';

export default {
  name: 'PostCardComponent',
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      mdiArrowRight,
      mdiCircleEditOutline,
      mdiPencil,
      mdiDelete,
    };
  },
  computed: {
    editPost() {
      return this.$store.state.editPost;
    },
  },
  methods: {
    deletePost() {
      this.$store.dispatch('deletePost', this.post.postID);
    },
    editPostMeth() {
      this.$router.push({ name: 'EditPost', params: { postId: this.post.postID } });
    },
  },
};
</script>

<style lang="scss" scoped>
.post-card {
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: #fff;
  min-height: 420px;
  transition: 0.5s ease all;

  &:hover {
    transform: rotateZ(-1deg) scale(1.01);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .icons {
    display: flex;
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 99;
    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 35px;
      height: 35px;
      border-radius: 5%;
      background-color: #fff;
      transition: 0.5s ease all;
      &:hover {
        background-color: #303030;
        .edit,
        .delete {
          color: #fff;
        }
      }
      &:nth-child(1) {
        margin-right: 8px;
      }
      .edit,
      .delete {
        pointer-events: none;
        height: 15px;
        width: auto;
      }
    }
  }

  img {
    display: block;
    border-radius: 8px 8px 0 0;
    z-index: 1;
    width: 100%;
    min-height: 200px;
    object-fit: cover;
  }

  .info {
    display: flex;
    flex-direction: column;
    height: 100%;
    z-index: 3;
    padding: 32px 16px;
    color: #000;

    h4 {
      padding-bottom: 8px;
      font-size: 20px;
      font-weight: 300;
    }

    h6 {
      font-weight: 400;
      font-size: 12px;
      padding-bottom: 16px;
    }

    .link {
      display: inline-flex;
      align-items: center;
      margin-top: auto;
      font-weight: 500;
      padding-top: 20px;
      font-size: 12px;
      padding-bottom: 4px;
      transition: 0.5s ease-in all;

      &:hover {
        color: rgba(48, 48, 48, 0.8);
      }

      .arrow {
        width: 10px;
      }
    }
  }
}
</style>
