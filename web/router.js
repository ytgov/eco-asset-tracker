import { createRouter, createWebHistory } from "vue-router";
import { authGuard } from "@auth0/auth0-vue";
//If you need to manipualte auth elements directly use:
// import { auth0 } from "@/plugins/auth";
import homeRoutes from "@/modules/home/router";
import keyRoutes from "@/modules/keys/router";
import roomsRoutes from "@/modules/rooms/router";
import assetRoutes from "@/modules/assets/router";
import personnelRoutes from "@/modules/personnel/router";
import administrationRoutes from "@/modules/administration/router";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "",
    name: "home",

    redirect: { name: "Dashboard" },
    beforeEnter: authGuard,

    children: [
      ...homeRoutes,
      // ...authenticationRoutes,
      ...roomsRoutes,
      ...assetRoutes,
      ...administrationRoutes,
      ...keyRoutes,
      ...personnelRoutes,
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/page-not-found",
    name: "PageNotFound",
    component: () => import("@/views/404.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.length === 0) {
    console.log("No route matched");
    next({
      path: "/page-not-found",
      // query: { redirect: to.fullPath, redirect: ""
    });
  }

  next();
});

export default router;
