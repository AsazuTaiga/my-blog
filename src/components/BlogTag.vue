<template>
  <v-chip
    label
    ripple
    small
    outlined
    id="tag"
    class="lighten-1 red"
    text-color="red"
    @click.stop="handleClick(tag.fields.name)"
    >{{ tag.fields.name }}</v-chip
  >
</template>

<script>
export default {
  name: "BlogTag",
  props: ["tag"],
  methods: {
    handleClick(tagName) {
      if (this.$route.path !== "/tag/" + tagName + "/page/1") {
        this.$router.push("/tag/" + tagName + "/page/1");
      }
    }
  }
};
</script>

<style scoped>
#tag {
  cursor: pointer;
  margin: 3px 0 3px 3px;
}
</style>
