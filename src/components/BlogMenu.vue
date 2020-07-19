<template>
  <div class="wrapper">
    <blog-menu-icon class="menu-icon"></blog-menu-icon>
    <div class="modal" :class="{ 'is-open': isMenuOpen }">
      <ul>
        <li
          v-for="menuItem in menuItems"
          :key="menuItem.name"
          @click="onMenuItemClick(menuItem)"
        >
          {{ menuItem.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BlogMenuIcon from "@/components/BlogMenuIcon";

export default {
  name: "BlogMenu",
  data() {
    return {
      menuItems: [
        {
          name: "Recents",
          path: "/page/1"
        },
        {
          name: "Tags",
          path: "/tags"
        },
        {
          name: "Author",
          path: "/author"
        }
      ]
    };
  },
  components: {
    BlogMenuIcon
  },
  computed: {
    isMenuOpen() {
      return this.$store.state.isMenuOpen;
    }
  },
  methods: {
    onMenuItemClick(menuItem) {
      if (this.$route.path !== menuItem.path) {
        this.$router.push(menuItem.path);
      }
      // close menu
      this.$store.commit("toggleIsMenuOpen");
    }
  }
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Exo+2:300i");

.wrapper {
  width: 100vw;
  position: absolute;
  z-index: 100;

  .menu-icon {
    position: fixed;
    top: 18px;
    right: 18px;
  }
  .modal {
    width: 100vw;
    height: 0vh;
    opacity: 0;
    top: 0;
    position: fixed;
    backdrop-filter: blur(5px);
    transition: opacity 200ms 0s ease-in-out;
    overflow: hidden;
    list-style-type: none;
    color: black;

    &.is-open {
      height: 100vh;
      opacity: 100;
    }

    ul {
      width: 100vw;
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      list-style: none;
      padding-left: 0;
      font-size: 36px;

      li {
        width: 100vw;
        margin-top: 22px;
        transition: background-color 0.1s;
        font-family: "Exo 2", sans-serif;
        display: flex;
        justify-content: center;
        &:hover {
          background-color: rgba($color: #999, $alpha: 0.1);
          cursor: pointer;
        }
      }
    }
  }
}
</style>
