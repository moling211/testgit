import Vue from 'vue'
import VueRouter from 'vue-router'
import Good from '../components/goods/Goods'
import Seller from '../components/seller/Seller'
import Ratings from '../components/ratings/Ratings'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/goods'
    },
    {
      path: '/goods',
      name: 'Good',
      component: Good
    },
    {
      path: '/seller',
      name: 'Seller',
      component: Seller
    },
    {
      path: '/ratings',
      name: 'Ratings',
      component: Ratings
    }
  ]
})
