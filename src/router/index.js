import Vue from "vue";
import Router from "vue-router";
import store from "../store";

import Login from "../views/Login.vue";
import Unauthorized from "../views/Unauthorized.vue";
import NotFound from "../views/NotFound.vue";

import AdminDashboard from "../views/dashboards/AdminDashboard.vue";
import ManagerDashboard from "../views/dashboards/ManagerDashboard.vue";
import DirectorDashboard from "../views/dashboards/DirectorDashboard.vue";
import CandidateDashboard from "../views/dashboards/CandidateDashboard.vue";

import JobsList from "../views/jobs/JobsList.vue";
import JobCreate from "../views/jobs/JobCreate.vue";
import ApplicationsList from "../views/applications/ApplicationsList.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    { path: "/login", component: Login, meta: { public: true } },
    { path: "/unauthorized", component: Unauthorized, meta: { public: true } },

    // Dashboards
    { path: "/admin", component: AdminDashboard, meta: { roles: ["HR_ADMIN"] } },
    { path: "/manager", component: ManagerDashboard, meta: { roles: ["HIRING_MANAGER"] } },
    { path: "/director", component: DirectorDashboard, meta: { roles: ["DIRECTOR"] } },
    { path: "/candidate", component: CandidateDashboard, meta: { roles: ["CANDIDATE"] } },

    // Shared routes
    { path: "/jobs", component: JobsList, meta: { roles: ["HR_ADMIN", "HIRING_MANAGER", "DIRECTOR", "CANDIDATE"] } },
    { path: "/jobs/create", component: JobCreate, meta: { roles: ["HR_ADMIN"] } },
    { path: "/applications", component: ApplicationsList, meta: { roles: ["HR_ADMIN", "HIRING_MANAGER"] } },

    { path: "/", redirect: "/login" },
    { path: "*", component: NotFound, meta: { public: true } }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.meta.public) return next();

  const isAuthed = store.getters.isAuthed;
  if (!isAuthed) return next("/login");

  const allowedRoles = to.meta.roles;
  if (!allowedRoles) return next();

  const role = store.getters.role;
  if (allowedRoles.includes(role)) return next();

  return next("/unauthorized");
});

export default router;