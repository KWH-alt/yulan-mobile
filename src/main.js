// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import axios from "axios";
import Calendar from "vue-mobile-calendar";
import VueAwesomeSwiper from "vue-awesome-swiper";
import { Picker } from "vant";
import store from "./store";
//订单系统的URL
import Global from "./Global.vue";
import mui from "./assets/mui/js/mui";
import IScroll from "./assets/iscroll/iscroll"
//import * as baseUrlASP from "./api/httpASP.js";

axios.defaults.baseURL = "http://14.29.221.109:10250/yulan";
//全局loading
axios.interceptors.request.use(
  config => {
    store.commit("showLoading");
    return config;
  },
  error => {
    store.commit("hideLoading");
    return Promise.resolve(error);
  }
);
axios.interceptors.response.use(
  response => {
    store.commit("hideLoading");
    return Promise.resolve(response);
  },

  error => {
    store.commit("hideLoading");
    return Promise.reject(error);
  }
);
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
Vue.use(Calendar);
Vue.use(Picker);
Vue.use(VueAwesomeSwiper);

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.prototype.orderBaseUrl = orderBaseUrl;
Vue.prototype.capitalUrl = Global.capitalUrl;
Vue.prototype.mui = mui;
Vue.prototype.IScroll = IScroll;
Vue.prototype.baseUrlASP = baseUrl;

export const $http = axios;

vm = new Vue({
  el: "#app",
  store,
  router,
  components: { App },
  template: "<App/>"
});
vm.UpdateVersion = Global.UpdateVersion;
app = vm.$children[0];

document.addEventListener("plusready", function(a) {
  //等待plus ready后再调用H5+ API：
  // 在这里调用5+ API
  var first = null;
  window.plus = plus;
  vm.plus = plus;
  plus.key.addEventListener(
    "backbutton",
    function() {
      //监听返回键
      if (window.vTop) {
        window.vTop.back();
        return;
      }
      if (!first) {
        first = new Date().getTime(); //获取第一次点击的时间戳
        mui.toast("再按一次切换至桌面", { duration: 1000 }); // 调用mui 上的toast 提示框
        setTimeout(function() {
          first = null;
        }, 1000);
      } else {
        if (new Date().getTime() - first < 1000) {
          //获取第二次点击的时间戳, 两次之差 小于 1000ms 说明1s点击了两次,
          plus.android.runtimeMainActivity().moveTaskToBack(false); //返回桌面
          //plus.runtime.quit(); //退出应用
        }
      }
    },
    false
  );
  vm.UpdateVersion();
});
document.addEventListener("resume", function(){
	//从后台切换到前台,检查更新
	vm.UpdateVersion();
}, false);
document.addEventListener("pause", function(){
	//从前台切换到后台
  console.log("已切换至后台");
  mui.toast("温馨提示：玉兰B2B继续在后台运行", { duration: 1500 });
  
}, false);
// 获取错误信息
document.addEventListener("error",function(e){
  mui.alert("请求的页面无法打开", '发生错误');
},false);
// 禁止选择
document.oncontextmenu=function(){
	return false;
};

