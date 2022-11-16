const routes = [
  {
    path: "",
    component: () => import("../views/Users.vue"),
    meta: { requiresAuth: true },

    children: [
      {
        name: "UserDetail",
        path: ":userID",
        meta: { requiresAuth: false },
        // component: () => import("../views/RoomDetail.vue"),
      },
      // {
      //   path: 'users',
      //   name: "AdminUsers",
      //   component: () =>
      //     import("../views/Users"),
      //   meta: { requiresAuth: true },
      // }
    ],
  },
];

export default routes;
