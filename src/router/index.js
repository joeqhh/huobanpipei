import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    redirect: "/index",
  },
  {
    path: "/index",
    name: "Index",
    component: () => import("../pages/Index.vue"),
  },
  {
    path: "/team",
    name: "Team",
    component: () => import("../pages/Team.vue"),
  },
  {
    path: "/team/update",
    name: "TeamUpdate",
    component: () => import("../pages/UpdateTeamPage.vue"),
  },
  {
    path: "/user",
    name: "User",
    component: () => import("../pages/User.vue"),
  },
  {
    path: "/user/myCreateTeam",
    name: "MyCreateTeam",
    component: () => import("../pages/MyCreateTeamPage.vue"),
  },
  {
    path: "/user/myJoinTeam",
    name: "MyJoinTeam",
    component: () => import("../pages/MyJoinTeamPage.vue"),
  },
  {
    path: "/user/userUpdate",
    name: "UserUpdate",
    component: () => import("../pages/UserUpdatePage.vue"),
  },
  {
    path: "/user/userUpdate/edit",
    name: "UserEdit",
    component: () => import("../pages/UserEdit.vue"),
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("../pages/SearchPage.vue"),
  },
  {
    path: "/search/result",
    name: "SearchResult",
    component: () => import("../pages/SearchResult.vue"),
  },

  {
    path: "/login",
    name: "Login",
    component: () => import("../pages/Login.vue"),
  },
  {
    path: "/team/add",
    name: "AddTeam",
    component: () => import("../pages/TeamAddPage.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
