<template>
  <v-container>
    <template v-if="authorDetail">
      <div>
        <v-row justify="center">
          <v-col cols="12" md="3" align-self="center">
            <v-row justify="center">
              <v-img
                id="icon"
                :src="authorDetail.fields.image.fields.file.url"
                aspect-ratio="1"
                class="grey lighten-2 rounded-circle"
              />
            </v-row>
          </v-col>
          <v-col cols="12" md="3" align-self="center">
            <h1 id="name">{{ authorDetail.fields.name }}</h1>
            <v-chip id="github" small :href="authorDetail.fields.github">
              github
            </v-chip>
            <v-chip id="twitter" small :href="authorDetail.fields.twitter">
              twitter
            </v-chip>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" md="8" xl="4">
            <div id="short-bio" v-html="shortBioHtml"></div>
          </v-col>
        </v-row>
      </div>
    </template>
    <v-row v-else id="loading-wrapper" justify="center">
      <blog-loading id="loading"></blog-loading>
    </v-row>
  </v-container>
</template>

<script>
import BlogLoading from "@/components/BlogLoading";
import marked from "marked";
export default {
  name: "BlogAuthorDetail",
  components: {
    BlogLoading
  },
  data() {
    return {
      authorDetail: undefined
    };
  },
  computed: {
    shortBioHtml() {
      return marked(this.authorDetail.fields.shortBio);
    }
  },
  created() {
    this.authorDetail = this.$store.state.blogAuthorDetail;
  }
};
</script>

<style lang="scss" scoped>
#icon {
  min-width: 200px;
  max-width: 200px;
  height: 200px;
  box-shadow: 15px 15px 30px #b8b8b8, -15px -15px 30px #ffffff;
  margin: 30px;
}
#name {
  font-family: "Exo 2", sans-serif;
}
#github {
  background-color: #4183c4;
  color: white;
}
#twitter {
  margin-left: 10px;
  background-color: #1da1f2;
  color: white;
}
#short-bio {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  white-space: pre-wrap;
}
#loading-wrapper {
  position: relative;
  #loading {
    position: fixed;
    top: 50vh;
    left: 50vw;
    transform: translate(-50%, -50%);
  }
}
</style>
