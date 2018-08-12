import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)
import routes from './routes'
// 滚动条滚回顶部
const scrollBehavior =(to, from, savedPosition)=> {
  if (savedPosition) {
    return savedPosition
  } else {
    return { x: 0, y: 0 }
  }
}
const router =  new VueRouter({
    mode:'history',
    scrollBehavior,
    routes
})
// 路由钩子
router.beforeEach(({meta,path},from,next)=>{
  store.dispatch('showProgress',0);
  // NProgress.start();
  let {auth=true}=meta  //meta为false则auth为false；否则auth为true
  let isLogin = Boolean(store.state.token) //转换为true or false

  /*
      访问不需要权限的设置meta:false
      注册也要设置成meta:false
  */
  //访问的是需要权限的页面且没有登录
  if(auth&&!isLogin){
    return next({path:'/login'});
  }
  // 如果登录了以后再访问reg和login则路由到Home
  if(isLogin&&(path=='/login'||path=='/reg')){
    return next({path:'/admin'});
  }
  // 未登录的情况下访问reg则直接路由
  next();
})
// router.afterEach(route=>{
//   NProgress.done(true);
// })
export default router
