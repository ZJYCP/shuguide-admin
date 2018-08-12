// 验证token中间件
const jwt = require('jsonwebtoken');
module.exports = function (ctx,next) {
  if (ctx.request.headers['authorization']) {
    let token = ctx.request.headers['authorization'].split(' ')[1]
    let decoded = jwt.decode(token, process.env.JWT_SECRET)
    // 如果过期了就重新登录
    // 验证token也需要优化
    if (token && decoded.exp <= Date.now() / 1000) {
      ctx.body = {
        code: 401,
        message: "授权已经过期，请重新登陆"
      };
      return;
    }else{
      next();
    }
  }
}
