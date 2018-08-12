const Router = require('koa-router');
const router = new Router();
const api = require('../api');

const formatDate = require('../middleware/formatDate'); //时间格式化函数
const {PAGECOUNT} = require('../config/'); //常量表
const checkToken = require('../middleware/checkToken'); //权限验证

router
// 创建一篇文章
.post('/create', async(ctx,next)=>{
  let place = ctx.request.body;
  await api.getPlaceByClassify(place.content)
      .then((res)=>{
        let id=res[0].id
        id=parseInt(id.substring(id.length-2))+1
        if(id<10)
          id='0'+id
        place.id=place.content+String(id)
      }).catch(err=>{
        place.id=place.content+'01'
      });
  place.destination=place.longitude+','+place.latitude
  place.img=place.id+'.jpg'

  await checkToken(ctx,next);
  await api.createPlace(place)
      .then(()=>{
          ctx.body = {
            code:200,
            message:place
          };
      }).catch(err=>{
          ctx.body = {
            code:-200,
            message:place
          };
      });
})
// 获取文章列表(带分页获取,需要验证权限) checkToken,
.post('/lists', async(ctx,next)=>{
  await checkToken(ctx,next);
  await api.getPlaceList(ctx.request.body.page)
      .then((res)=>{
        let placeLists = res[0];
        let total = res[1][0]['count(uid)'];
        ctx.body = {
          code:200,
          placeLists,
          total
        };
      }).catch(err=>{
        ctx.body = {
          code:-200,
          message:err.toString()
        };
      });
})


// 根据articleId获取其中一篇文章（有权限）//checkToken,
.post('/onePage', async(ctx,next)=>{
  await checkToken(ctx,next);
  await api.getOnePlace(ctx.request.body.uid)
      .then((res)=>{
        if(res){
          ctx.body = {
            code:200,
            onePlace:res[0]
          };
        }else{
          throw new Error('没有找到该文章');
        }
      }).catch(err=>{
        ctx.body = {
          code:-200,
          message:err.toString()
        };
      });
})

// 删除一篇文章 checkToken,
.post('/remove', async(ctx,next)=>{
  await checkToken(ctx,next);
  await api.removeOnePlace(ctx.request.body.uid)
      .then((res)=>{
          ctx.body = {
            code:200,
            message:'删除成功'
          };
        }).catch(err=>{
          ctx.body = {
            code:-200,
            message:'删除失败'
          };
      });
})
// 编辑文章 checkToken,
.post('/edit', async(ctx,next)=>{
  let place=ctx.request.body

  await api.getPlaceByClassify(place.kind)
  .then((res)=>{
    if(place.content!=0){
      let id=res[0].id
      id=parseInt(id.substring(id.length-2))+1
      if(id<10)
        id='0'+id
      place.id=place.kind+String(id)
    }
  }).catch(err=>{
    place.id=place.kind+'01'
  })
place.destination=place.longitude+','+place.latitude
place.img=place.id+'.jpg'

  await checkToken(ctx,next);
  await api.updatePlace(place)
  .then(()=>{
      ctx.body = {
        code:200,
        message:'编辑成功'+place
      };
  }).catch(err=>{
    ctx.body = {
      code:-200,
      message:err
    };
  });
});

module.exports = router
