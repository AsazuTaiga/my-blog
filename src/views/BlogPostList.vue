<template>
  <v-container>
    <template v-if="posts">
      <v-row>
        <v-col cols="12" md="6" xl="4" v-for="post in posts" :key="post.index">
          <transition appear mode="in-out">
            <blog-post-card class="card" :post="post" />
          </transition>
        </v-col>
      </v-row>
      <v-row no-gutters id="prev-next-wrapper">
        <v-col cols="6">
          <v-row justify="start">
            <transition appear mode="in-out">
              <v-btn
                secondary
                outlined
                :ripple="false"
                v-show="pageNumber != 1"
                @click="handlePrev()"
                >NEWER POSTS</v-btn
              >
            </transition>
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-row justify="end" v-show="!oldest">
            <transition appear mode="in-out">
              <v-btn secondary outlined :ripple="false" @click="handleNext()"
                >OLDER POSTS</v-btn
              >
            </transition>
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
import ContentfulAdapter from "@/api/ContentfulAdapter";
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
      ContentfulAdapter.fetchBlogPostsByTagAtPage(
        this.tagName,
        this.pageNumber
      ).then(response => {
        if (!response.items.length) {
          this.$router.push("/error");
        } else {
          this.posts = response.items;
        }
      });
    } else {
      ContentfulAdapter.fetchBlogPostsAtPage(this.pageNumber).then(response => {
        if (!response.items.length) {
          this.$router.push("/error");
        } else {
          this.posts = response.items;
        }
      });
    }
  },
  watch: {
    $route(to) {
      this.posts = undefined;
      if (to.params.tagName) {
        ContentfulAdapter.fetchBlogPostsByTagAtPage(
          to.params.tagName,
          to.params.pageNumber
        ).then(response => {
          if (!response.items.length) {
            this.$router.push("/error");
          } else {
            this.posts = response.items;
          }
        });
      } else {
        ContentfulAdapter.fetchBlogPostsAtPage(to.params.pageNumber).then(
          response => {
            if (!response.items.length) {
              this.$router.push("/error");
            } else {
              this.posts = response.items;
            }
          }
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
.v-enter-active,
.v-leave-active {
  transition: all 1s ease;
}
.v-enter,
.v-leave-to {
  transform: translateY(20px);
  opacity: 0;
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

#prev-next-wrapper {
  margin-top: 30px;
}
</style>
