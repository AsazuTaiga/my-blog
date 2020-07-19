import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // Global menu state.
    isMenuOpen: false,
    posts: undefined
  },
  mutations: {
    toggleIsMenuOpen() {
      this.state.isMenuOpen = !this.state.isMenuOpen;
    }
  }
});
