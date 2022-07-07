.
<template>
  <div class="welcome">
    <PostComponent v-if="!user" :post="welcomeScreen" />
    <PostComponent v-for="(post, index) in postsGetters" :key="index" :post="post" />
    <div class="post-card-wrap">
      <div class="container">
        <h3>View More Recent Posts</h3>
        <div class="post-cards">
          <PostCardComponent v-for="(post, index) in postsCardsGetters" :key="index" :post="post" />
        </div>
      </div>
    </div>
    <div v-if="!user" class="updates">
      <div class="container">
        <h2>Never miss a post. Register for your free account today!</h2>
        <router-link class="router-button" to="#">
          Register for Learn Vue <v-icon class="arrow arrow-light">{{ mdiArrowRight }}</v-icon>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import PostComponent from '@/components/Post.vue';
import PostCardComponent from '@/components/PostCard.vue';
import { mdiArrowRight } from '@mdi/js';

export default {
  name: 'WelcomeView',
  components: { PostComponent, PostCardComponent },
  data() {
    return {
      mdiArrowRight,
      welcomeScreen: {
        title: 'Welcome!',
        post: 'Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post!',
        welcomeScreen: true,
        photo: 'coding',
      },
      // samplePost: [
      //   {
      //     title: 'This is a new Post',
      //     postHTML: 'Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post!',
      //     postCoverPhoto: 'beautiful-stories',
      //   },
      //   {
      //     title: 'This is a new Post',
      //     postHTML: 'Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post!',
      //     postCoverPhoto: 'designed-for-everyone',
      //   },
      // ],
    };
  },
  computed: {
    // samplePostCards() {
    //   return this.$store.state.samplePostCards;
    // },
    postsGetters() {
      return this.$store.getters.postsGetters;
    },
    postsCardsGetters() {
      return this.$store.getters.postsCardsGetters;
    },
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style lang="scss" scoped>
.post-card-wrap {
  h3 {
    font-weight: 300;
    font-size: 28px;
    margin-bottom: 32px;
  }
}
.updates {
  .container {
    padding: 100px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (min-width: 800px) {
      padding: 125px 25px;
      flex-direction: row;
    }
    .router-button {
      display: flex;
      font-size: 14px;
      text-decoration: none;
      @media (min-width: 800px) {
        margin-left: auto;
      }
    }
    h2 {
      font-weight: 300;
      font-size: 32px;
      max-width: 425px;
      width: 100%;
      text-align: center;
      @media (min-width: 800px) {
        text-align: initial;
        font-size: 40px;
      }
    }
  }
}
</style>
