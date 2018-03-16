import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/Index.vue'
import UserPage from '../pages/User/userPage.vue'
import Login from '../pages/Login.vue'
import IndexEcharts from '../pages/indexEcharts.vue'
import CardList from '../pages/card/cardList.vue'
import MerchantList from '../pages/merchant/merchantList.vue'
import ManagerList from '../pages/manager/managerList.vue'
import CustomService from '../pages/manager/customService.vue'
import NotFound from '../pages/404.vue'

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/index',
    component: Index,
    redirect: '/Echarts',
    children: [
      {
        path: '/Echarts',
        component: IndexEcharts
      },
      {
        path: '/user',
        component: UserPage
      },
      {
        path: '/cardList',
        component: CardList
      },
      {
        path: '/merchantList',
        component: MerchantList
      },
      {
        path: '/managerList',
        component: ManagerList
      },
      {
        path: '/customService',
        component: CustomService
      }
    ]
  },
  {
    path: '/404',
    component: NotFound
  },
  {
    path: '*',
    redirect: { path: '/404' }
  }
]
export default new Router({
  routes
})
