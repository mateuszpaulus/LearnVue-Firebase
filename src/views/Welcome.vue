.<template>
  <div class="welcome">
    <PostVue :post="welcomeScreen" />
    <PostVue v-for="(post, index) in samplePost" :key="index" :post="post" />
    <div class="post-card-wrap">
      <div class="container">
        <h3>View More Recent BLogs</h3>
        <div class="post-cards">
          <PostCards v-for="(post, index) in samplePostCards" :key="index" :post="post" />
        </div>
      </div>
    </div>
    <div class="updates">
      <div class="container">
        <h2>Never miss a post. Register for your free account today!</h2>
        <router-link class="router-button" to="#">
          Register for Learn Vue
          <v-icon class="arrow arrow-light">
            {{ mdiArrowRight }}
          </v-icon>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import PostVue from '@/components/Post.vue';
import PostCards from '@/components/PostCard.vue';
import { mdiArrowRight } from '@mdi/js';

export default {
  name: 'WelcomeView',
  components: { PostVue, PostCards },
  data() {
    return {
      mdiArrowRight,
      welcomeScreen: {
        title: 'Welcome!',
        post:
          'Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post!',
        welcomeScreen: true,
        photo: 'coding',
      },
      samplePost: [
        {
          title: 'This is a new Post',
          postHTML:
            'Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post!',
          postCoverPhoto: 'beautiful-stories',
        },
        {
          title: 'This is a new Post',
          postHTML:
            'Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post!',
          postCoverPhoto: 'designed-for-everyone',
        },
      ],
      samplePostCards: [
        { postTitle: 'Post Card #1', postCoverPhoto: 'stock-1', postDate: 'June 28, 2022' },
        { postTitle: 'Post Card #2', postCoverPhoto: 'stock-2', postDate: 'June 28, 2022' },
        { postTitle: 'Post Card #3', postCoverPhoto: 'stock-3', postDate: 'June 28, 2022' },
        { postTitle: 'Post Card #4', postCoverPhoto: 'stock-4', postDate: 'June 28, 2022' },
      ],
    };
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
