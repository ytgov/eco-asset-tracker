import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store/index";

import homeRoutes from "@/modules/home/router";
import authenticationRoutes from "@/modules/authentication/router";
import roomsRoutes from "@/modules/rooms/router";
import assetRoutes from "@/modules/assets/router";
import keyRoutes from "@/modules/keys/router";
import personnelRoutes from "@/modules/personnel/router";
import administrationRoutes from "@/modules/administration/router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    // component: () => import("@/views/Default.vue"),
    redirect: "/dashboard",
  },
  // {
  //   path: "/dashboard",
  //   // component: () => import("@/views/Default.vue"),
  //   redirect: '/rooms'
  // },

  ...homeRoutes,
  ...authenticationRoutes,
  ...roomsRoutes,
  ...assetRoutes,
  ...administrationRoutes,
  ...keyRoutes,
  ...personnelRoutes,
  // ...administrationRoutes,

  {
    path: "*",
    name: "Not Found",
    component: () => import("@/views/NotFound.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

import { getInstance } from "@/auth/auth0-plugin";
let authService;

router.beforeEach(async (to, from, next) => {
  // return next();
  var requiresAuth = to.meta.requiresAuth || false;

  if (!requiresAuth) {
    return next();
  }

  if (!authService) {
    authService = await getInstance();
    console.log("Creating auth Service");
  }
  /* eslint-disable */
  const guardAction = () => {
    if (authService.isAuthenticated) {
      return next();
    }

    authService.loginWithRedirect({ appState: { targetUrl: to.fullPath } });
  };

  // If the Auth0Plugin has loaded already, check the authentication state
  if (!authService.isLoading) {
    return guardAction();
  }

  authService.$watch("isLoading", (isLoading) => {
    if (isLoading === false) {
      return guardAction();
    }
  });

  await store.dispatch("administration/users/getCurrentUser");

  // let user = await store.dispatch("getCurrentUser", { accessToken });
  // if (user && user.status == "Inactive") {
  //   return "inactive";
  // }

  /*   let i = window.setInterval(async () => {
      if (authService.isLoading === false) {
        window.clearInterval(i);

        next(await kick());
      }
    }, 100); */
});

async function kick() {
  if (!authService) {
    authService = await getInstance();
  }

  const accessToken = await authService.getTokenSilently();

  let user = await store.dispatch("getCurrentUser", { accessToken });

  //Disabled because this breaks things -
  //@MJ what is the purpose inactive check?

  // if (user && user.status == "Inactive")
  // return "inactive";

  return;
}
export default router;
