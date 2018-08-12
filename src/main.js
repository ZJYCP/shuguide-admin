// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App';
import './assets/css/commen.css';//这里的样式可以覆盖index.css
Vue.use(ElementUI);
import router from './routes/'
import store from './store/'
import api from './api/'  //api函数
import con from './config/' //常量表
Vue.prototype.$api = api;
Vue.prototype.$con = con;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }//此处的components用在了上面的template里面用来编译
})

