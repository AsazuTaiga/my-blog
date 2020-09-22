<template>
  <v-app>
    <blog-menu />
    <blog-header />
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import BlogHeader from "@/components/BlogHeader";
import BlogMenu from "@/components/BlogMenu";

export default {
  name: "App",
  components: {
    BlogHeader,
    BlogMenu
  },
  watch: {
    $route: {
      handler: () => {
        window.scrollTo({
          top: 0
        });
      },
      deep: true
    }
  }
};
</script>
