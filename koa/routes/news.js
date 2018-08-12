const Router = require('koa-router');
const router = new Router();
const api = require('../api');
const moment = require('moment');

const formatDate = require('../middleware/formatDate');
const checkToken = require('../middleware/checkToken');

router
// 创建分类 checkToken,
.post('/list', async(ctx,next)=>{
  let page=ctx.request.body.page
  await checkToken(ctx,next);
  await api.getNewsList(ctx.request.body.page)
      .then((res)=>{
        let newsList = res[0];
        let total = res[1][0]['count(id)'];
        let time='1'
         newsList.forEach(news => {
           news.hp_makettime=moment(news.hp_makettime).format('YYYY-MM-DD');
         });
          ctx.body = {
            code:200,
            message:'创建成功',
            newsList,
            total,
          };
      }).catch(err=>{
          ctx.body = {
            code:-200,
            message:'创建失败'+err
          };
      });
})

.post('/edit',async (ctx,next)=>{
  await checkToken(ctx,next);
  await api.editNews(ctx.request.body)
    .then(()=>{
      ctx.body={
        code:200,
        message:'修改成功'
      }
    }).catch(err=> {
      ctx.body = {
        code: -200,
        message: '修改失败' + err
      };
    });
})

  .post('/create',async (ctx,next)=>{
    await checkToken(ctx,next);
    await api.createNews(ctx.request.body)
      .then(()=>{
        ctx.body={
          code:200,
          message:'创建成功'
        }
      }).catch(err=> {
        ctx.body = {
          code: -200,
          message: '创建失败' + err
        };
      });
  })

  .post('/remove',async (ctx,next)=>{
    await checkToken(ctx,next);
    let id=ctx.request.body
    await api.removeNews(ctx.request.body)
      .then(()=>{
        ctx.body={
          code:200,
          message:'删除成功',
          id
        }
      }).catch(err=> {
        ctx.body = {
          code: -200,
          message: '删除失败' + err
        };
      });
  })
  module.exports = router;
