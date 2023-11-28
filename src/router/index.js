import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/layout/index.vue'
Vue.use(Router)

/* Layout */
import businessRoute from './modules/business.route'
import oneRoute from './modules/one.route'


export const constantRoutes = [
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    redirect: '/dashboard',
    component:()=>layout,
    children: [
      {
        path: 'demo',
        name: 'demo',
        component: () => import('@/views/demo-view/index'),
        meta: { title: '主页', icon: 'dashboard' }
      }
    ]
  },
  businessRoute,
  oneRoute,
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()


export default router
