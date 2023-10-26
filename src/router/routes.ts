
import Login from 'src/pages/Login.vue';
import { RouteRecordRaw } from 'vue-router';


const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect:'dashboard'
    
  },
  {
    path: '/dashboard',
    component: () => import('layouts/MainLayout.vue'),
    meta: { title: 'Escritorio',icon:'las la-tachometer-alt' },
  },
  {
    path: '/escribanos',
    name: 'escribanos',
    redirect:'escribanos/listado',
    component: () => import('layouts/MainLayout.vue'),
    meta: { title: 'Escribanos',icon:'las la-user-graduate' }, // Ruta principal
    children: [
      {
        path: 'listado', // Ruta para el listado
        name: 'escribanos-listado',
        component: () => import('pages/EscribanosPage.vue'),
        meta: { title: 'Listado',icon:'las la-database' },
      },
      {
        path: 'new', // Ruta para crear uno nuevo
        name: 'escribano-new',
        component: () => import('pages/FakePage.vue'),
        meta: { title: 'Nuevo Escribano', icon:'las la-user-plus' },
      },
      {
        path: 'edit/:id', // Ruta para editar
        name: 'escribano-edit',
        component: () => import('pages/FakePage.vue'),
        meta: { title: 'Editar Escribano', icon:'las la-user-edit' },
      },
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

  {
    path: '/login',
    component: Login
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];




export default routes;
