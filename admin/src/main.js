import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import moment from 'moment'
import VCharts from 'v-charts'
import axios from 'axios'

Vue.config.productionTip = false
//时间转换
Vue.filter('changeTime', (time) => {
  return moment().format('YYYY年M月D日  H:mm:ss');
})
//配置图表
Vue.use(VCharts)
//配置axios请求
Vue.prototype.$axios = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
