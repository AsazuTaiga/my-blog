import Vue from "vue";
import Vuex from "vuex";
import blogPosts from "./blogPosts.json";
import blogAuthorDetail from "./blogAuthorDetail.json";
import tags from "./tags.json";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // Global menu state.
    isMenuOpen: false,
    posts: undefined,
    blogPosts: blogPosts.items,
    blogAuthorDetail: blogAuthorDetail,
    tags: tags.items
  },
  getters: {
    getBlogPosts(state) {
      return state.blogPosts;
    },
    getBlogAuthorDetail(state) {
      return state.blogAuthorDetail;
    },
    getTags(state) {
      return state.tags;
    }
  },
  mutations: {
    toggleIsMenuOpen() {
      this.state.isMenuOpen = !this.state.isMenuOpen;
    }
  }
});
