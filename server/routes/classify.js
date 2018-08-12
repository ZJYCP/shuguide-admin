const express =  require('express');
const router  = express.Router();
const api = require('../api');
const formatDate = require('../middleware/formatDate');
const checkToken = require('../middleware/checkToken');
// 创建分类 checkToken,
router.post('/create', checkToken, function (req,res,next){
  let classify = {
    classType:req.body.classType,
    createTime:formatDate()
  };

  api.createClass(classify)
      .then(()=>{
          res.send({
            code:200,
            message:'创建成功'
          });
      }).catch(err=>{
          res.send({
            code:-200,
            message:'创建失败'
          });
      });
})
// 删除分类 checkToken,
router.post('/remove', checkToken, function (req,res,next){
  api.removeClass(req.body.classId)
  .then((result)=>{
      res.send({
        code:200,
        message:'删除成功'
      });
  }).catch(err=>{
    res.send({
      code:-200,
      message:'删除失败'
    });
  })
})

// 编辑分类 checkToken,
router.post('/edit', checkToken, function (req,res,next){
  
  api.updateClass(req.body)
  .then((result)=>{
    res.send({
      code:200,
      message:'编辑成功'
    });
  }).catch(err=>{
    res.send({
      code:-200,
      message:'编辑失败'
    });
  });
})

// 获取所有分类 checkToken,
router.get('/lists', checkToken, function (req,res,next){
  api.findAllClass()
  .then((lists)=>{
    res.send({
      code:200,
      lists
    })
  })
  .catch(err=>{
    res.send({
      code:-200,
      message:err.toString()
    })
  })
})
// 无权限获取分类给前台使用
router.get('/noAuth',function (req,res,next){
  api.findAllClass()
  .then((lists)=>{
    res.send({
      code:200,
      lists
    })
  })
  .catch(err=>{
    res.send({
      code:-200,
      message:err.toString()
    })
  })
})

module.exports = router;
