import assetTypesRoutes from "../assetTypes/router/index.js";
const routes = [
  {
    path: "/administration",
    name: "AdministrationHome",
    component: () => import("@/layouts/Layout.vue"),
    meta: { requiresAuth: false },
    children: [
      {
        path: "asset-types",
        meta: { requiresAuth: false },
        component: () => import("../views/Home.vue"),
        children: [...assetTypesRoutes]
      },
      {
        path: "users",
        name: "AdminUsers",
        component: () => import("../views/Users"),
        meta: { requiresAuth: true }
      },
      {
        path: "",
        name: "AdministrationHome",
        component: () => import("../views/Home"),
        meta: { requiresAuth: true }
      }
    ]
  }
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
