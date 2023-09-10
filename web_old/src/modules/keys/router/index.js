const routes = [
  {
    path: "/keys",
    component: () => import("@/layouts/Layout"),
    meta: { requiresAuth: false },

    children: [
      {
        name: "Keys",
        path: "",
        meta: { requiresAuth: false },
        component: () => import("../views/Keys.vue")
      },
      {
        name: "KeyDetails",
        path: ":keyID",
        meta: { requiresAuth: false },
        component: () => import("../views/KeyDetail.vue")
      }
      // {
      //   path: 'users',
      //   name: "AdminUsers",
      //   component: () =>
      //     import("../views/Users"),
      //   meta: { requiresAuth: true },
      // }
    ]
  }
];

export default routes;
