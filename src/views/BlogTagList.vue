<template>
  <v-container fluid>
    <v-row v-if="tags">
      <v-col v-for="tag in tags" :key="tag.index" cols="12" md="4">
        <v-row justify="center">
          <transition appear mode="in-out">
            <blog-tag class="tag" :tag="tag"></blog-tag>
          </transition>
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
