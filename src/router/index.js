import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/Index.vue'
import User from '../pages/User'
import Login from '../pages/Login.vue'
import home from '../pages/home.vue'
import Activity from '../pages/Activity/index.vue'
import Dynamic from '../pages/Dynamic/Dynamic.vue'
import CustomService from '../pages/manager/customService.vue'
import NotFound from '../pages/404.vue'
import Label from '../pages/Label'
import Spread from '../pages/Spread'
import addSpread from '../pages/Spread/addSpread.vue'
import Gather from '../pages/Gather'
import addGather from '../pages/Gather/addGather.vue'
import Tree from '../pages/Tree'
import test from '../pages/test.vue'

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/index',
    component: Index,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: home
      },
      {
        path: '/user',
        name: 'user',
        component: User
      },
      {
        path: '/Activity',
        name: 'activity',
        component: Activity
      },
      {
        path: '/Dynamic',
        name: 'dynamic',
        component: Dynamic
      },
      {
        path: '/customService',
        name: 'custom',
        component: CustomService
      },
      {
        path: '/Label',
        name: 'label',
        component: Label
      },
      {
        path: '/Tree',
        name: 'tree',
        component: Tree
      },
      {
        path: '/Gather',
        name: 'gather',
        component: Gather
      },
      {
        path: '/addGather',
        name: 'addGather',
        component: addGather
      },
      {
        path: '/Spread',
        name: 'spread',
        component: Spread
      },
      {
        path: '/addSpread',
        name: 'addSpread',
        component: addSpread
      },
      {
        path: '/test',
        name: 'test',
        component: test
      }
    ]
  },
  {
    path: '/404',
    name: 'notFound',
    component: NotFound
  },
  {
    path: '*',
    redirect: {path: '/404'}
  }
]

export default new Router({
  routes
})
