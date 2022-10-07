const routes = [
  {
    path: "/rooms",
    component: () => import("@/layouts/Layout"),
    meta: { requiresAuth: false },

    children: [
      {
        name: "Rooms",
        path: "",
        meta: { requiresAuth: false },
        component: () => import("../views/Rooms.vue")
      },
      {
        name: "RoomDetail",
        path: ":roomID",
        meta: { requiresAuth: false },
        component: () => import("../views/RoomDetail.vue")
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
