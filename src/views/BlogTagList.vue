<template>
  <v-container fluid>
    <v-row v-if="tags">
      <v-col v-for="tag in tags" :key="tag.index" cols="12" md="4">
        <v-row justify="center">
          <blog-tag class="tag" :tag="tag"></blog-tag>
        </v-row>
      </v-col>
    </v-row>
    <v-row v-else id="loading-wrapper" justify="center">
      <blog-loading id="loading"></blog-loading>
    </v-row>
  </v-container>
</template>

<script>
import BlogTag from "@/components/BlogTag";
import BlogLoading from "@/components/BlogLoading";
export default {
  name: "BlogTagList",
  components: {
    BlogTag,
    BlogLoading
  },
  data() {
    return {
      tags: undefined
    };
  },
  created() {
    this.tags = this.$store.state.tags;
  }
};
</script>

<style lang="scss" scoped>
.tag {
  height: 60px;
  width: 70%;
  font-size: 18px;
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
