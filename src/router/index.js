import Vue from "vue";
import VueRouter from "vue-router";
import BlogPostList from "@/views/BlogPostList";
import BlogPostContent from "@/views/BlogPostContent";
import BlogTagList from "@/views/BlogTagList";
import BlogAuthorDetail from "@/views/BlogAuthorDetail";
import BlogError from "@/views/BlogError";

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
  routes: routes
});

export default router;
