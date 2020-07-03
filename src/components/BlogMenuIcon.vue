<template>
  <div
    class="app-bar-icon"
    :class="{ 'is-open': isMenuOpen }"
    @click="$store.commit('toggleIsMenuOpen')"
  >
    <span class="top"></span>
    <span class="middle"></span>
    <span class="bottom"></span>
  </div>
</template>

<script>
export default {
  name: "BLogMenuIcon",
  computed: {
    isMenuOpen() {
      return this.$store.state.isMenuOpen;
    }
  }
};
</script>

<style lang="scss" scoped>
.app-bar-icon {
  width: 30px;
  height: 26px;
  position: relative;
  transition: transform 0.2s;
  z-index: 110;
  &:hover {
    transform: scaleY(0.7);
    cursor: pointer;
  }
  &.is-open:hover {
    transform: scale(0.9, 0.9);
    cursor: pointer;
  }

  span {
    width: 100%;
    height: 2px;
    background-color: #fff;
    border-radius: 4px;
    position: absolute;
    left: 0;
    transition: all 0.3s;

    &.top {
      top: 0;
    }
    &.middle {
      top: 12px;
    }
    &.bottom {
      bottom: 0;
    }
  }

  &.is-open {
    .top {
      top: 12px;
      transform: rotate(-45deg);
    }
    .middle {
      background: transparent;
    }
    .bottom {
      top: 12px;
      transform: rotate(45deg);
    }
  }
}
</style>
