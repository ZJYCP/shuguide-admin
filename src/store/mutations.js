import {USER_SIGNIN,USER_SIGNOUT,USER_REG,SHOW_PROGRESS,HEAD_LINE} from './types'
export default  {
  //用户注册
  [USER_REG](state,token){
    localStorage.setItem('jwt',token);
    state.token = token;
  },
  //用户登录
  [USER_SIGNIN](state,token){
    localStorage.setItem('jwt',token);
    state.token = token;
  },
  //用户注销
  [USER_SIGNOUT](state){
    localStorage.removeItem('jwt');
    state.token = null;
  },
  [SHOW_PROGRESS](state,number){
    state.progress = number
  },
  [HEAD_LINE](state,headline){
    state.headline  = headline
  }
}
