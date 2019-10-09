// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Calendar from 'vue-mobile-calendar'
import VueAwesomeSwiper from 'vue-awesome-swiper';
import { Picker } from 'vant'
import store from './store'
//订单系统的URL
import orderBaseUrl from './Global.vue'



axios.defaults.baseURL = 'http://14.29.221.109:10250/yulan';
//中断请求
// axios.interceptors.request.use(
//   config => {
//     config.cancelToken = new axios.CancelToken(function (cancel) {
//       store.commit('pushToken', {cancelToken: cancel})
//     })
//     return config
//   }
// )

// router.beforeEach(function (to, from, next) {
//   store.commit('clearToken') // 取消请求
//   next()
// })
Vue.use(Calendar)
Vue.use(Picker);
Vue.use(VueAwesomeSwiper);

Vue.config.productionTip = false;
Vue.prototype.$http=axios;
Vue.prototype.orderBaseUrl = orderBaseUrl.orderBaseUrl;
Vue.prototype.capitalUrl = orderBaseUrl.capitalUrl;

export const $http = axios;

vm = new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
