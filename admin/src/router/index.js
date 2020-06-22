import Vue from 'vue'
import VueRouter from 'vue-router'
import main from '@/router/main'

Vue.use(VueRouter)


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '',
      redirect: '/index/home'
    },
    main
  ]
})

export default router
