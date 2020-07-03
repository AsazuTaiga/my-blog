<template>
  <v-app>
    <blog-menu />
    <blog-header />
    <v-main></v-main>
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

  data: () => ({
    //
  })
};
</script>
