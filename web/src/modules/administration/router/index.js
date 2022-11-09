import assetTypesRoutes from "../modules/assetTypes/router/index.js";
import usersRoutes from "../modules/users/router/index.js";
import systemRoutes from "../modules/system/router/index.js";
const routes = [
  {
    path: "/administration",
    name: "",
    component: () => import("@/layouts/Layout.vue"),
    // component: () => import("../views/Home.vue"),

    meta: { requiresAuth: false },
    children: [
      {
        path: "asset-types",
        meta: { requiresAuth: false },
        component: () => import("../views/Home.vue"),
        children: [...assetTypesRoutes],
      },
      {
        path: "users",
        name: "UserAdmin",
        component: () => import("../views/Home.vue"),
        meta: { requiresAuth: true },
        children: [...usersRoutes],
      },
      {
        path: "system",
        name: "system",
        component: () => import("../views/Home.vue"),
        meta: { requiresAuth: true },
        children: [...systemRoutes],
      },
      {
        path: "",
        name: "AdministrationHome",
        component: () => import("../views/Home"),
        meta: { requiresAuth: true },
      },
    ],
  },
  // {
  //   path: "/administration/asset-types",
  //   meta: { requiresAuth: false },
  //   component: () =>
  //     import("@/layouts/Layout.vue"),
  //     children: [
  //       ...assetTypesRoutes,
  //     ]
  // },
];

export default routes;
