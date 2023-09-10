const routes = [
  {
    path: "/assets",
    component: () => import("@/layouts/Layout"),
    meta: { requiresAuth: false },

    children: [
      {
        name: "Assets",
        path: "",
        meta: { requiresAuth: false },
        component: () => import("../views/Assets.vue")
      },
      {
        name: "AssetDetail",
        path: ":assetID",
        meta: { requiresAuth: false },
        component: () => import("../views/AssetDetail.vue")
      }
    ]
  }
];

export default routes;
