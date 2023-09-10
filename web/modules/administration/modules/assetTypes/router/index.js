const routes = [
  {
    path: "",
    name: "",
    component: () => import("../views/assetTypes.vue"),
    meta: { requiresAuth: false },
    children: [
      // {
      //   name: "",
      //   path: "",
      //   meta: { requiresAuth: false }
      //   // component: () => import("../views/Rooms.vue"),
      // },
      // {
      //   name: "UserDetail",
      //   path: ":userID",
      //   meta: { requiresAuth: false }
      //   // component: () => import("../views/RoomDetail.vue"),
      // }
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
