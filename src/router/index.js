import { createRouter, createWebHistory } from 'vue-router'

import LoginPage from '@/pages/login/LoginIndex.vue';
import DashboardPage from '@/pages/dashboard/DashboardIndex.vue';
import UserPage from '@/pages/user/UserIndex.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "login", component: LoginPage, meta: { requiresAuth: false, } },
    { path: "/dashboard", name: "dashboard", component: DashboardPage, meta: { requiresAuth: true, } },
    { path: "/users", name: "user.index", component: UserPage, meta: { requiresAuth: true, } },
  ]
})

export default router
