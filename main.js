import Vue from 'vue'
import App from './App'
import moment from 'moment'

Vue.config.productionTip = false
Vue.filter('time', (val) => {
  return moment(val).format('YYYY年M月D日');
})
Vue.filter('choice', (val) => {
  if(val){
	  return '是'
  }else{
	  return '否'
  }
})

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
