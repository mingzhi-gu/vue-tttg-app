import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/home.vue';

Vue.use(VueRouter);
VueRouter.prototype.back = false;
VueRouter.prototype.goback = function goback() {
  this.back = true;
  this.go(-1);
};

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'classify',
        name: 'Classify',
        component: () => import('../views/page/classify.vue'),
      },
      {
        path: 'shopping',
        name: 'Shopping',
        component: () => import('../views/page/shopping.vue'),
      },
    ],
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/search.vue'),
  },
  {
    path: '*',
    redirect: '/home/classify',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
