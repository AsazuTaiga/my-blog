import Vue from "vue";
import VueRouter from "vue-router";
import BlogPostList from "@/views/BlogPostList";
import BlogPostContent from "@/views/BlogPostContent";
import BlogTagList from "@/views/BlogTagList";
import BlogAuthorDetail from "@/views/BlogAuthorDetail";

Vue.use(VueRouter);

const routes = [
  { path: "/page/:pageNumber", component: BlogPostList },
  { path: "/tag/:tagName", component: BlogPostList },
  { path: "/post/:slug", component: BlogPostContent },
  { path: "/tags", component: BlogTagList },
  { path: "/author", component: BlogAuthorDetail }
];

const router = new VueRouter({
  routes: routes
});

export default router;
