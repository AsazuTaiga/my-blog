import Vue from "vue";
import VueRouter from "vue-router";
const BlogPostList = () => import("@/views/BlogPostList");
const BlogPostContent = () => import("@/views/BlogPostContent");
const BlogTagList = () => import("@/views/BlogTagList");
const BlogAuthorDetail = () => import("@/views/BlogAuthorDetail");
const BlogError = () => import("@/views/BlogError");

Vue.use(VueRouter);

const routes = [
  { path: "/page/:pageNumber", component: BlogPostList, props: true },
  {
    path: "/tag/:tagName/page/:pageNumber",
    component: BlogPostList,
    props: true
  },
  { path: "/post/:slug", component: BlogPostContent, props: true },
  { path: "/tags", component: BlogTagList },
  { path: "/author", component: BlogAuthorDetail },
  { path: "/error", component: BlogError },
  { path: "*", redirect: "/page/1" }
];

const router = new VueRouter({
  routes: routes,
  mode: "history"
});

export default router;
