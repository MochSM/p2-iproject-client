import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const accessToken = localStorage.getItem('access_token');
  const authRoutes = ['Login', 'Register'];
  if (authRoutes.includes(to.name) && accessToken) next({ name: 'Home' });
  else if (to.name === 'Home' && !accessToken) next({ name: 'Login' });
  else next();
});

export default router;
