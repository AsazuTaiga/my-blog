<template>
  <div class="wrapper">
    <blog-menu-icon class="menu-icon"></blog-menu-icon>
    <div class="modal" :class="{ 'is-open': isMenuOpen }">
      <div>MENU</div>
      <ul>
        <li>About</li>
        <li>Tags</li>
        <li>Author</li>
      </ul>
    </div>
  </div>
</template>

<script>
import BlogMenuIcon from "@/components/BlogMenuIcon";

export default {
  name: "BlogMenu",
  components: {
    BlogMenuIcon
  },
  computed: {
    isMenuOpen() {
      return this.$store.state.isMenuOpen;
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 100;

  .menu-icon {
    position: fixed;
    top: 18px;
    right: 18px;
  }
  .modal {
    width: 100%;
    height: 0%;
    top: 0;
    position: fixed;
    background: rgba($color: #000000, $alpha: 0.8);
    backdrop-filter: blur(5px);
    transition: all 400ms 0s ease-in-out;
    overflow: hidden;
    list-style-type: none;
    color: white;

    &.is-open {
      height: 100%;
    }

    div {
      width: 100%;
      text-align: center;
      font-size: 48px;
    }

    ul {
      width: 100%;
      text-align: center;
      list-style: none;
      padding-left: 0;
      font-size: 36px;

      li {
        margin-top: 22px;
        transition: background-color 0.1s;
        &:hover {
          background-color: rgba($color: #ffffff, $alpha: 0.1);
          cursor: pointer;
        }
      }
    }
  }
}
</style>
