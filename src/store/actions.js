import Vue from 'vue'
import api from '../api'
import router from '../routes'
export default {
// 后台注册
  UserReg({commit},data){
   api.localReg(data)
       .then(({data})=>{
         if(data.code==200){
            commit('USER_REG',data.token)
            router.replace({path:'/'})
         }else{
          //  上一个catch处理了MongoError
          Vue.prototype.$message({
            message:data.message,
            type:'error',
            showClose: true
          });
         }
       }).catch((error)=>{
        Vue.prototype.$message({
          message:error.toString(),
          type:'error',
          showClose: true
        });
       })
   },
  //  后台登录
   UserLogin({commit},data){
     api.localLogin(data)
          .then(({data})=>{
            if(data.code==200){
              // 找到用户
              commit('USER_SIGNIN',data.token)
                //替换路由
                router.replace({path:'/'})
            }else{
              // 没找到用户或者密码不对
              Vue.prototype.$message({
                message:data.message,
                type:'error',
                showClose: true
              });
            }
          }).catch(error=>{
            // 一般服务器连接不上这里就会报网络错误
            Vue.prototype.$message({
              message:error.toString(),
              type:'error',
              showClose: true
            });
          })
   },
   UserLogout({commit}){
     commit('USER_SIGNOUT');
     router.push({path:'/login'});
   },
   showProgress({commit},number){
     commit('SHOW_PROGRESS',number)
   },
   changeHeadLine({commit},headline){

     commit('HEAD_LINE',headline)
   }
}
