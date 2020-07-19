<template>
  <v-app-bar
    id="app-bar"
    app
    color="transparent"
    min-height="62"
    max-height="62"
  >
    <div id="blog-title-wrapper">
      <span id="blog-title" @click="handleTitleClick">
        Coincidence
        <span id="blog-title-sub">
          tech & hobbys
        </span>
      </span>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  name: "BlogHeader",
  methods: {
    handleTitleClick() {
      if (this.$route.path !== "/page/1") {
        this.$router.push("/page/1");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#app-bar {
  backdrop-filter: blur(5px);

  #blog-title-wrapper {
    font-family: "Exo 2", sans-serif;
    font-style: italic;
    width: 100%;
    text-align: center;
    font-size: 22px;

    #blog-title {
      cursor: pointer;

      #blog-title-sub {
        font-size: 10px;
        margin-left: 10px;
      }
    }
  }
}
</style>
