import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashboardPage from '../pages/DashboardPage.vue'
import FormPage from '../pages/FormPage.vue'
import BasicPage from '../pages/BasicPage.vue'
import LogDashboardPage from '../pages/LogDashboardPage.vue'
import LogDashboardPage2 from '../pages/LogDashboardPage2.vue'
import RemoteApiPage from '../pages/RemoteApiPage.vue'
import LocalApiPage from '../pages/LocalApiPage.vue'





const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'logdashboard2',
      component: LogDashboardPage2,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    { path: '/dashboard', component: DashboardPage },
    { path: '/form', component: FormPage },
    { path: '/basic', component: BasicPage },
    { path: '/logdashboard', component: LogDashboardPage },
    { path: '/logdashboard2', component: LogDashboardPage2 },
    { path: '/remoteapi', component: RemoteApiPage },
    { path: '/localapi', component: LocalApiPage },

 
  ],
})

export default router
