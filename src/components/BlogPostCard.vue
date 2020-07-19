<template>
  <div id="wrapper" @click="handleCardClick">
    <v-card flat refs="card" id="card" class="mx-auto transparent rounded-xl">
      <v-card-title
        id="title"
        class="grey--text text--darken-2 font-weight-bold"
        >{{ post.fields.title }}</v-card-title
      >
      <blog-tag
        v-for="tag in post.fields.tags"
        :key="tag.index"
        :tag="tag"
        class="tag"
      ></blog-tag>
      <div id="date">
        <v-icon>mdi-calendar-month</v-icon>
        {{ post.fields.publishDate }}
      </div>
      <v-card-text id="text">{{ ellipsizedDescription }}</v-card-text>
      <v-icon x-large id="go-icon">mdi-arrow-right-bold-box-outline</v-icon>
    </v-card>
  </div>
</template>

<script>
import BlogTag from "@/components/BlogTag";

const DESCRIPTION_MAX = 180;
const removeMd = require("remove-markdown");

export default {
  name: "BlogPostCard",
  components: {
    BlogTag
  },
  props: ["post"],
  computed: {
    ellipsizedDescription() {
      return (
        removeMd(this.post.fields.body)
          .trim()
          .substring(0, DESCRIPTION_MAX) + "..."
      );
    }
  },
  methods: {
    handleCardClick() {
      this.$router.push("/post/" + this.post.fields.slug);
    }
  }
};
</script>

<style lang="scss" scoped>
#wrapper {
  position: relative;
  margin: 4vh 2vw;
  #card {
    padding: 2vw;
    z-index: 1;
    overflow: hidden;
    #title {
      font-size: 3.5vh;
      line-height: 4.3vh;
      transition: color 0.2s ease;
    }
    #go-icon {
      left: 13px;
      transition: color 0.2s ease;
    }
    .tag {
      margin-left: 16px;
    }
    #date {
      width: auto;
      text-align: right;
      padding: 8px 20px;
      font-size: 1.5vh !important;
      color: #616161;
    }
    #text {
      font-size: 1.8vh;
      line-height: 2.8vh;
    }
    box-shadow: 41px 41px 82px #c7c7c7, -41px -41px 82px #ffffff !important;
    background: #ededed;
    transition: all 0.5s ease;
    &:hover {
      cursor: pointer;
      box-shadow: 23px 23px 46px #b2b2b2, -23px -23px 46px #ffffff !important;
      z-index: 4;

      #title {
        color: #ff5252 !important;
      }
      #go-icon {
        color: #ff5252 !important;
      }
    }
  }
}
</style>
