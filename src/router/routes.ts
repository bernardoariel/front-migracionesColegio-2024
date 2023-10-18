
import Login from 'src/pages/Login.vue';
import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/escribanos',
    component: () => import('layouts/MainLayout.vue'),
    
    children: [
      {
       path: '',
       name:'escribanos',
       component: () => import('pages/IndexPage2.vue') 
      }
    ],
    
  },
  {
    path: '/menores',
    component: () => import('layouts/MainLayout.vue'),
    
    children: [
      {
       path: '',
       name:'menores',
       component: () => import('pages/IndexPage3.vue') 
      }
    ],
    
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
