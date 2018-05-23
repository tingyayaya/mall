import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Mine from '@/views/Mine'
import Find from '@/views/Find'
import Cart from '@/views/Cart'
import Category from '@/views/Category'

Vue.use(Router)

export default new Router({
  routes: [
    {
     path: '/',
     redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/mine',
      name: 'mine',
      component: Mine
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/find',
      name: 'find',
      component: Find
    },
    {
      path: '/category',
      name: 'category',
      component: Category
    }
  ]
})
