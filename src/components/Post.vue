<template>
  <div class="post-wrapper" :class="{ 'no-user': !user }">
    <div class="post-content">
      <div>
        <h2 v-if="post.welcomeScreen">{{ post.title }}</h2>
        <h2 v-else>{{ post.postTitle }}</h2>
        <p v-if="post.welcomeScreen">{{ post.post }}</p>
        <p v-else class="content-preview">{{ post.postHTML }}</p>
        <router-link v-if="post.welcomeScreen" class="link link-light" :to="{ name: 'LoginView' }">
          Login/Register<v-icon class="arrow arrow-light">{{ mdiArrowRight }}</v-icon>
        </router-link>
        <router-link v-else class="link" :to="{ name: 'ViewPostView', params: { postId: post.postID } }">
          View The Posts <v-icon class="arrow">{{ mdiArrowRight }}</v-icon>
        </router-link>
      </div>
    </div>
    <div class="post-photo">
      <img v-if="post.welcomeScreen" :src="require(`@/assets/postPhotos/${post.photo}.jpg`)" alt="" />
      <img v-else :src="post.postCoverPhoto" alt="" />
    </div>
  </div>
</template>

<script>
import { mdiArrowRight } from '@mdi/js';

export default {
  name: 'PostComponent',
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      mdiArrowRight,
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style lang="scss" scoped>
.post-wrapper {
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  @media (min-width: 700px) {
    min-height: 650px;
    max-height: 650px;
    flex-direction: row;
  }
  .post-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 4;
    order: 2;
    @media (min-width: 700px) {
      order: 1;
    }
    @media (min-width: 800px) {
      flex: 3;
    }

    div {
      max-width: 375px;
      padding: 72px 24px;
      @media (min-width: 700px) {
        padding: 0 24px;
      }

      h2 {
        font-size: 32px;
        font-weight: 300;
        text-transform: uppercase;
        margin-bottom: 24px;
        @media (min-width: 700px) {
          font-size: 40px;
        }
      }

      p {
        font-size: 15px;
        font-weight: 300;
        line-height: 1.7;
      }

      .content-preview {
        font-size: 13px;
        max-height: 24px;
        width: 250px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .link {
        display: inline-flex;
        align-items: center;
        margin-top: 32px;
        padding-bottom: 4px;
        border-bottom: 1px solid transparent;
        transition: 0.5s ease-in all;
        &:hover {
          border-bottom-color: #303030;
        }
      }
      .link-light {
        &:hover {
          border-bottom-color: #ffff;
        }
      }
    }
  }
  .post-photo {
    order: 1;
    flex: 3;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

    @media (min-width: 700px) {
      order: 2;
    }
    @media (min-width: 800px) {
      flex: 4;
    }

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &:nth-child(even) {
    .post-content {
      order: 2;
    }
    .post-photo {
      order: 1;
    }
  }
}

.no-user:first-child {
  .post-content {
    background-color: #303030;
    color: #fff;
  }
}
</style>
