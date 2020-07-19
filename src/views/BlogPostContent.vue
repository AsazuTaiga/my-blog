<template>
  <v-container id="wrapper">
    <template v-if="post">
      <v-row no-gutters justify="center">
        <v-col cols="12" md="8" xl="6">
          <transition appear mode="in-out">
            <v-card id="card" class="mx-auto rounded-xl">
              <v-card-title id="title" class="font-weight-bold">
                <h1>{{ post.fields.title }}</h1>
              </v-card-title>
              <blog-tag
                v-for="tag in post.fields.tags"
                :key="tag.index"
                :tag="tag"
                class="tag"
                >{{ tag.fields.name }}</blog-tag
              >
              <div id="date">
                <v-icon>mdi-calendar-month</v-icon>
                {{ post.fields.publishDate }}
              </div>
              <v-card-text
                id="body"
                class="black--text"
                v-html="html"
              ></v-card-text>
              <v-card-text>
                <v-row justify="end">
                  <blog-share-buttons
                    :url="url"
                    :title="post.fields.title"
                  ></blog-share-buttons>
                </v-row>
              </v-card-text>
            </v-card>
          </transition>
        </v-col>
      </v-row>
    </template>
    <v-row v-else id="loading-wrapper" justify="center">
      <blog-loading id="loading"></blog-loading>
    </v-row>
  </v-container>
</template>

<script>
import BlogTag from "@/components/BlogTag";
import BlogLoading from "@/components/BlogLoading";
import BlogShareButtons from "@/components/BlogShareButtons";
import ContentfulAdapter from "@/api/ContentfulAdapter";
import marked from "marked";
import hljs from "highlight.js";

export default {
  name: "BlogPostContent",
  components: {
    BlogTag,
    BlogLoading,
    BlogShareButtons
  },
  props: ["slug"],
  data() {
    return {
      post: undefined,
      url: location.origin + "/#" + this.$route.path
    };
  },
  computed: {
    html() {
      return marked(this.post.fields.body);
    }
  },
  created() {
    marked.setOptions({
      langPrefix: "hljs language-",
      highlight: function(code, lang) {
        return hljs.highlightAuto(code, [lang]).value;
      }
    });
    ContentfulAdapter.fetchBlogPostsBySlug(this.slug).then(response => {
      if (!response.items.length) {
        this.$router.push("/error");
      }
      this.post = response.items[0];
    });
  },
  watch: {
    $route(to) {
      this.post = undefined;
      ContentfulAdapter.fetchBlogPostsBySlug(to.params.slug).then(response => {
        if (!response.items.length) {
          this.$router.push("/error");
        } else {
          this.post = response.items[0];
        }
      });
    }
  }
};
</script>

<style src="highlight.js/styles/gruvbox-dark.css"></style>
<style lang="scss" scoped>
#wrapper {
  position: relative;
  #card {
    padding: 2vw;
    margin: 2vw 0 2vw 0;
    z-index: 1;
    overflow: hidden;
    background: transparent;
    box-shadow: 41px 41px 82px #c7c7c7, -41px -41px 82px #ffffff !important;
    #title h1 {
      font-size: 4vh;
      line-height: 5vh;
    }
    .tag {
      margin-left: 16px;
      cursor: pointer;
    }
    #date {
      width: auto;
      text-align: right;
      padding: 8px 20px;
      color: #616161;
    }
    #body ::v-deep {
      font-size: 1.8vh;
      line-height: 3.6vh;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      white-space: pre-wrap;
      h2 {
        font-size: 3vh;
        font-family: "Noto Sans JP";
        line-height: 3.5vh;
        box-sizing: border-box;
        padding: 1vh 0 1vh 3vh;
        position: relative;

        &::before {
          content: "";
          height: 70%;
          width: 0.5vh;
          top: 0;
          left: 0;
          background-color: #f44336;
          position: absolute;
        }

        &::after {
          content: "";
          height: 30%;
          width: 0.5vh;
          bottom: 0;
          left: 0;
          background-color: #aaaaaa;
          position: absolute;
        }
      }
      code {
        font-family: "Consolas", "Monaco", "Andale Mono", "Ubuntu Mono",
          monospace;
      }
      img {
        max-width: 100%;
      }
      p {
        margin: 0;
      }
      ul,
      ol {
        margin-top: -4vh;
      }
      li {
        margin-bottom: -3vh;
      }
    }
  }
}
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
</style>
