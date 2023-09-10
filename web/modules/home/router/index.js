const routes = [
  {
    path: "/",
    component: () => import("@/layouts/Layout"),
    children: [
      {
        name: "Dashboard",
        path: "dashboard",
        meta: { requiresAuth: false },
        component: () => import("../views/Dashboard.vue")
      },
      {
        name: "Profile",
        path: "profile",
        meta: { requiresAuth: true },
        component: () => import("../views/Profile")
      }
    ]
  }
];

export default routes;
