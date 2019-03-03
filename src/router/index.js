import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import goods from '@/components/goods'
import ratings from '@/components/ratings'
import seller from '@/components/seller'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'good',
      component: goods
    },
     {
      path: '/goods',
      name: 'goods',
      component: goods
    },
     {
      path: '/ratings',
      name: 'ratings',
      component: ratings
    },
     {
      path: '/seller',
      name: 'seller',
      component: seller
    }
  ]
})
