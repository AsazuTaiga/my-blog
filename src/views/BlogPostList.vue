<template>
  <v-container>
    <template v-if="posts">
      <v-row>
        <v-col cols="12" md="6" xl="4" v-for="post in posts" :key="post.index">
          <blog-post-card class="card" :post="post" />
        </v-col>
      </v-row>
      <v-row no-gutters id="prev-next-wrapper">
        <v-col cols="6">
          <v-row justify="start">
            <v-btn
              secondary
              outlined
              :ripple="false"
              v-show="pageNumber != 1"
              @click="handlePrev()"
              >NEWER POSTS</v-btn
            >
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-row justify="end" v-show="!oldest">
            <v-btn secondary outlined :ripple="false" @click="handleNext()"
              >OLDER POSTS</v-btn
            >
          </v-row>
        </v-col>
      </v-row>
    </template>
    <v-row v-else id="loading-wrapper" justify="center">
      <blog-loading id="loading"></blog-loading>
    </v-row>
  </v-container>
</template>

<script>
import BlogPostCard from "@/components/BlogPostCard";
import BlogLoading from "@/components/BlogLoading";
export default {
  name: "BlogPostList",
  components: { BlogPostCard, BlogLoading },
  data() {
    return {
      posts: undefined
    };
  },
  computed: {
    oldest() {
      return 12 > this.posts.length;
    }
  },
  props: ["pageNumber", "tagName"],
  created() {
    // /page/pageNumber
    if (this.tagName) {
      this.posts = this.$store.state.blogPosts
        .filter(post => {
          if (!post.fields.tags) {
            return false;
          }
          for (let tag of post.fields.tags) {
            if (tag.fields.name.includes(this.tagName)) {
              return true;
            }
          }
          return false;
        })
        .slice((this.pageNumber - 1) * 12, this.pageNumber * 12);
    } else {
      this.posts = this.$store.state.blogPosts.slice(
        (this.pageNumber - 1) * 12,
        this.pageNumber * 12
      );
    }
  },
  watch: {
    $route(to) {
      if (to.params.tagName) {
        this.posts = this.$store.state.blogPosts
          .filter(post => {
            if (!post.fields.tags) {
              return false;
            }
            for (let tag of post.fields.tags) {
              if (tag.fields.name.includes(to.params.tagName)) {
                return true;
              }
            }
            return false;
          })
          .slice((this.pageNumber - 1) * 12, this.pageNumber * 12);
      } else {
        this.posts = this.$store.state.blogPosts.slice(
          (to.params.pageNumber - 1) * 12,
          to.params.pageNumber * 12
        );
      }
    }
  },
  methods: {
    // tagの変更時の処理
    handleNext() {
      window.scrollTo({ top: 0 });
      this.$router.push("/page/" + (Number(this.pageNumber) + 1));
    },
    handlePrev() {
      window.scrollTo({ top: 0 });
      this.$router.push("/page/" + (Number(this.pageNumber) - 1));
    }
  }
};
</script>

<style lang="scss" scoped>
#loading-wrapper {
  position: relative;
  #loading {
    position: fixed;
    top: 50vh;
    left: 50vw;
    transform: translate(-50%, -50%);
  }
}

#prev-next-wrapper {
  margin-top: 30px;
}
</style>
