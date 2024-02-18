import { createRouter, createWebHistory } from "vue-router";
// import { authGuard } from "@auth0/auth0-vue";
import homeRoutes from "@/modules/home/router";
import keyRoutes from "@/modules/keys/router";
import roomsRoutes from "@/modules/rooms/router";
import assetRoutes from "@/modules/assets/router";
import personnelRoutes from "@/modules/personnel/router";
import administrationRoutes from "@/modules/administration/router";

// import { useAuthStore } from "@/stores/AuthStore";
// import myStatusRoutes from "@/modules/mystatus/router";
// import rosterRoutes from "@/modules/roster/router";
// import pagingRouter from "@/modules/paging/router";
// import adminRoutes from "@/modules/admin/router";
// import eventsRoutes from "@/modules/events/router";

// import homeRoutes from "@/modules/home/router";
const routes = [
  // {
  //   path: "/login",
  //   name: "Login",
  //   component: () => import("@/modules/login/views/Login.vue"),
  // },
  {
    path: "",
    // name: "Home",
    redirect: { name: "Dashboard" },
    // beforeEnter: authGuard,
    // component: () => import("@/views/Main.vue"),
    // redirect: "/status",
    // component: () => import("@/layouts/Layout.vue"),
    // meta: {
    //   requiresAuth: true,
    // },
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
  // const authStore = useAuthStore();
  // if (to.matched.some((record) => record.meta.requiresAuth)) {
  //   if (!authStore.isInitialized) {
  //     await authStore.initialize();
  //   }
  //   if (!authStore.isAuthenticated) {
  //     next({
  //       path: "/login",
  //       query: { redirect: to.fullPath },
  //     });
  //   } else {
  //     next();
  //   }
  // } else {
  //   next();
  // }
  next();
});

export default router;
