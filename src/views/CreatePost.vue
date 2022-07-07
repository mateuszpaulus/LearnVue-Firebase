<template>
  <div class="create-post">
    <PostPreviewComponent v-show="$store.state.postPhotoPreview" />
    <LoadingComponent v-show="loading" />
    <div class="container">
      <div :class="{ invisible: !error }" class="err-message">
        <p><span>Error:</span>{{ errorMsg }}</p>
      </div>
      <div class="post-info">
        <input v-model="postTitle" type="text" placeholder="Enter Post Title" aria-label="postTitle" />
        <div class="upload-file">
          <label for="post-photo">Upload Cover Photo</label>
          <input id="post-photo" ref="postPhoto" type="file" accept=".png, .jpg, ,jpeg" @change="fileChange" />
          <button class="preview router-button" :class="{ 'button-inactive': !$store.state.postPhotoFileURL }" @click="openPreview">Preview Photo</button>
          <span>File Chosen: {{ $store.state.postPhotoName }}</span>
        </div>
      </div>
      <div class="editor">
        <vue-editor v-model="postHTML" :editor-options="editorSettings" use-custom-image-handler @image-added="imageHandler" />
      </div>
      <div class="post-actions">
        <button class="router-button" @click="uploadPost">Publish Post</button>
        <router-link class="router-button" :to="{ name: 'PreviewPostView' }">Post Preview</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import db from '@/firebase/firebaseInit';
import LoadingComponent from '@/components/Loading.vue';
import PostPreviewComponent from '@/components/PostPreview.vue';

const Quill = require('quill');

window.Quill = Quill;
const ImageResize = require('quill-image-resize-module').default;

Quill.register('modules/imageResize', ImageResize);

export default {
  name: 'CreatePostView',
  components: {
    PostPreviewComponent,
    LoadingComponent,
  },
  data() {
    return {
      file: null,
      error: null,
      errorMsg: null,
      loading: null,
      editorSettings: {
        modules: {
          imageResize: {},
        },
      },
    };
  },
  computed: {
    profileId() {
      return this.$store.state.profileId;
    },
    postCoverPhotoName() {
      return this.$store.state.postPhotoName;
    },
    postTitle: {
      get() {
        return this.$store.state.postTitle;
      },
      set(payload) {
        this.$store.commit('updatePostTitle', payload);
      },
    },
    postHTML: {
      get() {
        return this.$store.state.postHTML;
      },
      set(payload) {
        this.$store.commit('newPost', payload);
      },
    },
  },
  methods: {
    fileChange() {
      // eslint-disable-next-line prefer-destructuring
      this.file = this.$refs.postPhoto.files[0];
      const fileName = this.file.name;
      this.$store.commit('fileNameChange', fileName);
      this.$store.commit('createFileURL', URL.createObjectURL(this.file));
    },

    openPreview() {
      this.$store.commit('openPhotoPreview');
    },

    imageHandler(file, Editor, cursorLocation, resetUploader) {
      this.loading = true;
      const storageRef = firebase.storage().ref();
      const docRef = storageRef.child(`documents/postPhotos/${file.name}`);
      docRef.put(file).on(
        'state_changed',
        (snapshot) => {
          console.log(snapshot);
          console.log('[Upload the file successfully]');
        },
        (err) => {
          console.log(err);
          this.loading = false;
        },
        async () => {
          const downloadURL = await docRef.getDownloadURL();
          Editor.insertEmbed(cursorLocation, 'image', downloadURL);
          resetUploader();
          this.loading = false;
        },
      );
    },

    uploadPost() {
      if (this.postTitle.length !== 0 && this.postHTML.length !== 0) {
        if (this.file) {
          this.loading = true;
          const storageRef = firebase.storage().ref();
          const docRef = storageRef.child(`documents/postCoverPhotos/${this.$store.state.postPhotoName}`);
          docRef.put(this.file).on(
            'state_changed',
            (snapshot) => {
              console.log(snapshot);
            },
            (err) => {
              console.log(err);
              this.loading = false;
            },
            async () => {
              const downloadURL = await docRef.getDownloadURL();
              const timestamp = await Date.now();
              const dataBase = await db.collection('posts').doc();

              await dataBase.set({
                postID: dataBase.id,
                postHTML: this.postHTML,
                postCoverPhoto: downloadURL,
                postCoverPhotoName: this.postCoverPhotoName,
                postTitle: this.postTitle,
                profileId: this.profileId,
                date: timestamp,
              });
              await this.$store.dispatch('getPost');
              this.loading = false;
              this.$router.push({ name: 'ViewPostView', params: { postId: dataBase.id } });
            },
          );
          return;
        }
        this.error = true;
        this.errorMsg = 'Please ensure you uploaded a cover photo!';
        setTimeout(() => {
          this.error = false;
        }, 5000);
        return;
      }
      this.error = true;
      this.errorMsg = 'Please ensure Post Title & Post has been filled!';
      setTimeout(() => {
        this.error = false;
      }, 5000);
    },
  },
};
</script>

<style lang="scss">
.create-post {
  position: relative;
  height: 100%;

  button {
    margin-top: 0;
  }

  .router-button {
    text-decoration: none;
    color: #fff;
  }

  label,
  /* button, */
  .router-button {
    transition: 0.5s ease-in-out all;
    align-self: center;
    font-size: 14px;
    cursor: pointer;
    border-radius: 20px;
    padding: 12px 24px;
    color: #fff;
    background-color: #303030;
    text-decoration: none;

    &:hover {
      background-color: rgba(48, 48, 48, 0.9);
    }
  }

  .container {
    position: relative;
    height: 100%;
    padding: 10px 25px 60px;
  }

  // error styling
  .invisible {
    opacity: 0 !important;
  }

  .err-message {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    color: #fff;
    margin-bottom: 10px;
    background-color: #303030;
    opacity: 1;
    transition: 0.5s ease all;

    p {
      font-size: 14px;
    }

    span {
      font-weight: 600;
    }
  }

  .post-info {
    display: flex;
    margin-bottom: 32px;

    input:nth-child(1) {
      min-width: 300px;
    }

    input {
      transition: 0.5s ease-in-out all;
      padding: 10px 4px;
      border: none;
      border-bottom: 1px solid #303030;

      &:focus {
        outline: none;
        box-shadow: 0 1px 0 0 #303030;
      }
    }

    .upload-file {
      flex: 1;
      margin-left: 16px;
      position: relative;
      display: flex;

      input {
        display: none;
      }

      .preview {
        margin-left: 16px;
        text-transform: initial;
      }

      span {
        font-size: 12px;
        margin-left: 16px;
        align-self: center;
      }
    }
  }

  .editor {
    height: 60vh;
    display: flex;
    flex-direction: column;

    .quillWrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .ql-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: scroll;
    }

    .ql-editor {
      padding: 20px 16px 30px;
    }
  }

  .post-actions {
    margin-top: 32px;

    button {
      margin-right: 16px;
    }
  }
}
</style>
