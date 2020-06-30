import Vue from 'vue'
import VueRouter from 'vue-router'
import main from '@/router/main'

Vue.use(VueRouter)


const router = new VueRouter({
  routes: [
    {
      path: '',
      redirect: '/index/home'
    },
    main
  ]
})

export default router
