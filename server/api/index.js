const query = require('../db/');
const {PAGECOUNT} = require('../config/');

module.exports = {
    // 创建用户 管理员
    createUser:function ({username,password}){
	    return query(`INSERT INTO user(username,password) VALUES('${username}','${password}')`);
    },
    // 获取用户 管理员
    getUserByName:function (username){
        return query(`SELECT * FROM USER WHERE username = '${username}'`);
    },
   //  创建分类 管理员
   createClass:function ({classType,createTime}){
    return query(`INSERT INTO classify(classType,createTime) VALUES('${classType}','${createTime}')`); 
   },
   // 删除分类 管理员
   removeClass:function (classId){
        return query(`DELETE FROM classify WHERE classId = '${classId}'`); 
   },
   // 编辑分类 管理员
   updateClass:function ({classId,classType}){
        return query(`UPDATE classify SET classType = '${classType}' WHERE classId = ${classId}`); 
   },
   // 查询所有分类
   findAllClass:function (){
        return query(`SELECT * FROM classify`);
   },
   // 创建文章 管理员
   createArticle:function ({classType,title,content,contentToMark,createTime,brief}){
        return query(`INSERT INTO article(classType,title,content,contentToMark,createTime,brief) 
                    VALUES('${classType}','${title}','${content}','${contentToMark}','${createTime}','${brief}')`);
   },
   //获取文章列表 管理员
   getArticlesList: function(page){
    if(page){
      let skip  = (page-1)*PAGECOUNT;  //skip(skip):从skip处开始查询; limit(limit):查询limit条; sort({_id:-1}):降序
    return Promise.all([ //Promise.all 都成功执行返回resolved 一个失败返回rejected
       query(`SELECT articleId,classType,title,createTime,brief FROM article ORDER BY articleId DESC LIMIT ${skip},${PAGECOUNT}`),
       query(`SELECT count(articleId) FROM article`)
      ]);
    }else{
       return query(`SELECT * FROM article ORDER BY articleId DESC`);
    }
   },
   // 根据classify获取所有文章 用户
   getArticlesByClassify:function (classType){
        return query(`SELECT articleId,classType,title,createTime,brief FROM article WHERE classType = '${classType}' ORDER BY articleId DESC`);
   },
   //获取一篇文章 管理员
   getOneArticle(articleId){
        return query(`SELECT articleId,classType,title,content,createTime,brief FROM article WHERE articleId = ${articleId}`);
   },
   //查看一篇文章 
   lookOneArticle(articleId){
        return query(`SELECT articleId,classType,title,contentToMark,createTime FROM article WHERE articleId = ${articleId}`);
   },
   // 删除一篇文章 管理员
   removeOneArticle:function (articleId){
        return query(`DELETE FROM article WHERE articleId = '${articleId}'`); 
   },
   // 编辑一篇文章 管理员
   updateArticle:function ({articleId,classType,title,content,contentToMark,brief}){
        return query(`UPDATE article SET 
        classType = '${classType}',
        title = '${title}',
        content= '${content}',
        contentToMark = '${contentToMark}',
        brief = '${brief}'
        WHERE articleId = ${articleId}`);
   }
  }