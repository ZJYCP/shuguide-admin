const query = require('../db/');
const {PAGECOUNT} = require('../config/');

module.exports = {
    createUser:function ({username,password}){
	    return query(`INSERT INTO user(username,password) VALUES('${username}','${password}')`);
    },
    // 获取用户 管理员
    getUserByName:function (username){
        return query(`SELECT * FROM user WHERE username = '${username}'`);
    },
   //  创建分类 管理员
   createClass:function ({campus,content,id}){
    return query(`INSERT INTO pa_kind(campus,content,id) VALUES('${campus}','${content}','${id}')`);
   },
   // 删除分类 管理员
   removeClass:function (classUid){
        return query(`DELETE FROM pa_kind WHERE uid = '${classUid}'`);
   },
   // 编辑分类 管理员
   updateClass:function ({uid,id,content}){
        return query(`UPDATE pa_kind SET content = '${content}',id='${id}' WHERE uid = ${uid}`);
   },
   // 查询所有分类
   findAllClass:function (){
        return query(`SELECT * FROM pa_kind`);
   },
   // 创建地点 管理员
   createPlace:function ({content,id,title,synopsis,longitude,latitude,destination,description,img}){
        return query(`INSERT INTO pa_place(kind,id,title,synopsis,longitude,latitude,destination,description,headimg,detailimg) 
                    VALUES('${content}','${id}','${title}','${synopsis}','${longitude}','${latitude}','${destination}','${description}','${img}','${img}')`);
   },
   //获取文章列表 管理员
   getPlaceList: function(page){
    if(page){
      let skip  = (page-1)*PAGECOUNT;  //skip(skip):从skip处开始查询; limit(limit):查询limit条; sort({_id:-1}):降序
    return Promise.all([ //Promise.all 都成功执行返回resolved 一个失败返回rejected
       query(`SELECT * FROM pa_place ORDER BY uid DESC LIMIT ${skip},${PAGECOUNT}`),
       query(`SELECT count(uid) FROM pa_place`)
      ]);
    }else{
       return query(`SELECT * FROM pa_place ORDER BY uid DESC`);
    }
   },
   // 根据classify获取所有文章 用户
   getPlaceByClassify:function (kind){
        return query(`SELECT id FROM pa_place WHERE kind = '${kind}' ORDER BY id DESC LIMIT 1`);
   },
   //获取一篇文章 管理员
   getOnePlace(uid){
        return query(`SELECT * FROM pa_place WHERE uid = '${uid}'`);
   },
   //查看一篇文章
   lookOnePlace(articleId){
        return query(`SELECT articleId,classType,title,contentToMark,createTime FROM article WHERE articleId = ${articleId}`);
   },
   // 删除一篇文章 管理员
   removeOnePlace:function (uid){
        return query(`DELETE FROM pa_place WHERE uid = '${uid}'`);
   },
   // 编辑一篇文章 管理员
   updatePlace:function ({uid,kind,id,title,synopsis,longitude,latitude,destination,description,img}){
        return query(`UPDATE pa_place SET 
        kind = '${kind}',
        id = '${id}',
        title= '${title}',
        synopsis = '${synopsis}',
        longitude = '${longitude}',
        latitude='${latitude}',
        destination='${destination}',
        description='${description}',
        headimg='${img}',
        detailimg='${img}'
        WHERE uid = ${uid}`);
   },

   getNewsList: function(page) {
     if (page) {
       let skip = (page - 1) * PAGECOUNT;  //skip(skip):从skip处开始查询; limit(limit):查询limit条; sort({_id:-1}):降序
       return Promise.all([ //Promise.all 都成功执行返回resolved 一个失败返回rejected
         query(`SELECT * FROM pa_detail ORDER BY id DESC LIMIT ${skip},${PAGECOUNT}`),
         query(`SELECT count(id) FROM pa_detail`)
       ]);
     } else {
       return query(`SELECT id FROM pa_detail ORDER BY id DESC`);
     }
   },

  editNews:function ({id,hp_title,hp_img_url,hp_author,hp_content,hp_makettime}) {
      return query(`UPDATE pa_detail SET
      hp_title='${hp_title}',
      hp_img_url='${hp_img_url}',
      hp_author='${hp_author}',
      hp_content='${hp_content}',
      hp_makettime='${hp_makettime}'
      WHERE id =${id}`)
  },

  createNews:function ({hp_title,hp_img_url,hp_author,hp_content,hp_makettime}) {
      return query(`INSERT INTO pa_detail(hp_title,hp_img_url,hp_author,hp_content,hp_makettime) VALUES ('${hp_title}','${hp_img_url}','${hp_author}','${hp_content}','${hp_makettime}')`)
  },

  removeNews:function ({id}){
    return query(`DELETE FROM pa_detail WHERE id = ${id}`);
  },
  }
