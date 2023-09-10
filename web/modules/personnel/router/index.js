const routes = [
  {
    path: "/personnel",
    component: () => import("@/layouts/Layout"),
    meta: { requiresAuth: false },
    children: [
      {
        name: "Personnel",
        path: "",
        meta: { requiresAuth: false },
        component: () => import("../views/Personnel.vue")
      },
      {
        name: "PersonnelDetails",
        path: ":personnelID",
        meta: { requiresAuth: false },
        component: () => import("../views/PersonnelDetail.vue")
      }
    ]
  }
];

export default routes;
