<template>
  <div>
    <v-icon class="rounde-circle gray">mdi-share-variant</v-icon>
    <v-chip
      class="share-btn"
      small
      v-for="service in services"
      :key="service.index"
      :style="{ background: service.color }"
    >
      <ShareNetwork
        class="white--text"
        :network="service.name"
        :url="url"
        :title="title"
        :quote="title"
      >
        <span>{{ service.name }}</span>
      </ShareNetwork>
    </v-chip>
  </div>
</template>

<script>
export default {
  name: "BlogShareButtons",
  data() {
    return {
      services: [
        { name: "twitter", color: "#1da1f2" },
        { name: "facebook", color: "#1877f2" },
        { name: "line", color: "#00c300" }
      ]
    };
  },
  props: ["url", "title"]
};
</script>

<style lang="scss" scoped>
.share-btn {
  margin-left: 10px;
}
</style>
